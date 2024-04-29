<?php

namespace App\Http\Controllers;

// models 
use App\Models\User;
use App\Models\Admin;
use App\Models\Brand;
use App\Models\Product;
use App\Models\Catergory;
// facades 
use App\Models\ProductImage;
use Illuminate\Http\Request;
use App\Models\ProductFeature;
use App\Models\ProductThumbnail;
use App\Models\ProductDescription;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Cache;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;

use App\Http\Controllers\CartItemController;
use App\Http\Controllers\ProductImageController;

class ProductController extends Controller
{
    public function index()
    {
        return view('home');
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {  
        // dd($request->file('thumbnail'));

        // validate the request data
        request()->validate(
            [
                'name'               => 'required',
                'catergory_id'       => 'required',
                'brand_id'           => 'required',
                'price'              => 'required',
                'stock'              => 'required',
                'thumbnail'          => 'required',
                'files'              => 'required'
            ],
            [
                'name.required'         => 'Product Name is required',
                'catergory_id.required' => 'Product Catergory is required',
                'brand_id.required'     => 'Product Brand is required',
                'price.required'        => 'Product Price is required',
                'stock.required'        => 'Product Stock is required',
                'thumbnail.required'    => 'Product Thumbnail Image is required',
                'files.required'        => 'Product Files image is required'
            ]
        );

        // get admin 
        $admin = Admin::where('user_id', Auth::user()->id)->first();

        // create the record
        Product::create([
                'user_id'                   => Auth::user()->id,
                'admin_id'                  => $admin->id,
                'catergory_id'              => $request->catergory_id,
                'brand_id'                  => $request->brand_id,
                'name'                      => $request->name,
                'price'                     => $request->price,
                'stock'                     => $request->stock,
        ]);

        // get the product record
        $product = Product::orderBy('created_at', 'desc')->first();

        return response()->json([null, 200,  $product->id]);
    }

    public function storeThumbnail(Request $request, Product $product)
    {
        $thumbnail = $request->file('thumbnail');
        
        // get name 
        $filename =  $thumbnail->getClientOriginalName();
        
        // validation 
        $request->validate([
            'thumbnail' => 'required',
        ]);
      
        $imageName = time().'.'.$request->thumbnail->extension();  

        // save path 
        $save_path = public_path() . '/products/product_' . $product->id . '/thumbnail/ ';
        // if path doesnt exist make it 
        if (!file_exists($save_path)) {
            mkdir($save_path, 0777, true);
        }
       
        // $request->image->file(public_path(), $imageName);
        // $request->thumbnail->storeAs(public_path() . '/products/product_' . $product->id . '/thumbnail/', $imageName);
        
        Image::make($thumbnail)->resize(300 ,300)->save( public_path('/products/product_'. $product->id . '/thumbnail/'. $filename));
        
        // $file_path = $thumbnail->move(public_path('/products/product_'. $product->id . '/thumbnail/'), $filename);

        // new upload thumbnail instance
        $thumbnailUpload = new ProductThumbnail;

        // enter data 
        $thumbnailUpload->product_id    = $product->id;
        $thumbnailUpload->name          = $filename;
        $thumbnailUpload->path          = '/products/product_'. $product->id . '/thumbnail/' . $filename;

        // save thumbnail data 
        $thumbnailUpload->save();
        
        // get thumbnail 
        $thumb = ProductThumbnail::where('product_id', $product->id)
                                    ->first();
        // edit product 
        Product::where('id', $product->id)
                        ->update([
                            'thumbnail_name' => $thumb->name,
                            'thumbnail_path' => $thumb->path,
                        ]);
        
        // response 
        return response()->json([null, 200]);
       
    }
    
    public function storeImages(Request $request, Product $product)
    {
        // validation 
        $request->validate([
                'file' => 'required',
            ],
            [
                'file.required'    => 'Product File Images are required',
            ]
        );
        
        // upload file
        $file = $request->file('file'); 
        
        // save path 
        $save_path = public_path() . '/products/product_' . $product->id . '/';
        // if path doesnt exist make it 
        if (!file_exists($save_path)) {
            mkdir($save_path, 0777, true);
        }

        // new upload instance
        $fileUpload = new ProductImage;

        // enter data 
        $file_name              = $file->getClientOriginalName();
        $file_path              = $file->move(public_path('/products/product_'. $product->id . '/'), $file_name);
        $fileUpload->product_id = $product->id;
        $fileUpload->name       = $file_name;
        $fileUpload->path       = '/products/product_'. $product->id . '/' . $file_name;

        // save data 
        $fileUpload->save();
    }
    
    public function updateThumbnail(Request $request, Product $product)
    { 
        // upload thumbnail
        $thumbnail  = $request->file('thumbnail'); 
        $filename   = $thumbnail->getClientOriginalName();
        // return $filename;
        
        // THIS WORKS 
        // $path = Storage::putFileAs('/product_'.$product->id.'/thumbnail' , $request->file('thumbnail'), $filename);
        
        Image::make($thumbnail)->resize(300 ,300)->save( public_path('/products/product_'. $product->id . '/thumbnail/'. $filename));
        
        // $file_path = $thumbnail->move(public_path('/products/product_'. $product->id . '/thumbnail/'), $filename);
        // return $file_path;
        
        if($request->has('thumbnail')) {
            $image      = $request->file('thumbnail');
            $filename   = $image->getClientOriginalName();
            // return $filename;

            // save path 
            // $save_path = public_path('/products/product_'. $product->id . '/thumbnail/');
            // if path doesnt exist make it 
            // if (!file_exists($save_path)) {
            //     mkdir($save_path, 666, true);
            // }
            
            // new upload thumbnail instance
            ProductThumbnail::where('product_id', $product->id)
                            ->update([
                                'name'      => $filename,
                                'path'      => '/products/product_'. $product->id . '/thumbnail/' . $filename
                            ]);

            Product::where('id', $product->id)
                            ->update([
                                'thumbnail_name'      => $filename,
                                'thumbnail_path'      => '/products/product_'. $product->id . '/thumbnail/' . $filename
                            ]);

            return response()->json([null, 200]);
        } else {
            return response()->json([null, 500]);
        }
    }

    public function updateThumbnailOriginal(Request $request, Product $product)
    { 
 
        // upload thumbnail
        $thumbnail = $request->file('thumbnail'); 
        // return $thumbnail;
        if($request->has('thumbnail')) {
            $image = $request->file('thumbnail');
            $filename = $image->getClientOriginalName();
            return $thumbnail;
        }

        // save path 
        $save_path = public_path('/products/product_'. $product->id . '/thumbnail/');
        // if path doesnt exist make it 
        if (!file_exists($save_path)) {
            mkdir($save_path, 666, true);
        }
        // get name 
        $filename =  $thumbnail->getClientOriginalName();

        // crop & save image 
        Image::make($thumbnail)->resize(300 ,300)->save( public_path('/products/product_'. $product->id . '/thumbnail/'. $filename));
        // return $img->response('jpg');
          
        // new upload thumbnail instance
        ProductThumbnail::where('product_id', $product->id)
                        ->update([
                            'name'      => $filename,
                            'path'      => '/products/product_'. $product->id . '/thumbnail/' . $filename
                        ]);

        // update product 
        $this->editThumb($product);

        return response()->json([null, 200]);
    }

    public function editThumb($product)
    {
        $thumb = ProductThumbnail::where('product_id', $product->id)
                                    ->first();

        Product::where('id', $product->id)
                        ->update([
                            'thumbnail_name' => $thumb->name,
                            'thumbnail_path' => $thumb->path,
                        ]);
    }

    public function update(Request $request, Product $product)
    {
        //get the data and update
        $product->update($request->all());

        $prod = Product::where('id', $product->id)
                    ->first();

        if ($prod->stock >= 1) {
            Product::where('id', $product->id)
                    ->update([
                        'sold_out' => '0'
                    ]);
        }

        return response()->json([null, 200]);
    }

    public function destroy(Product $product)
    {
        // get the product 
        $product = Product::findOrFail($product->id);

        // get the images 
        $images = ProductImage::where('product_id', $product->id)->get();

        // get the thumbnail 
        $thumbnail = ProductThumbnail::where('product_id', $product->id)->first();

        // get the features 
        $features = ProductFeature::where('product_id', $product->id)->get();

        // delete cart items
        $destroy = new CartItemController();
        $destroy->cartRemove($product); 

        // delete images
        foreach ($images as $image) {
            $destroy = new ProductImageController();
            $destroy->destroyAll($image); 
        }

        // delete feature
        foreach ($features as $feature) {
            $feature->delete(); 
        }

        // delete thumbnail
        // $destroyAll = new ProductThumbnailController();
        // $destroyAll->destroyThumb($product); 

        // delete product
        $product->delete();

        //return json
        return response()->json([null, 200]);
    }

    public function productStock(User $user)
    {
        return view('home');
    }

    // api calls 
    public function getProducts()
    {
        $products   =   Product::where([
                                    ['sold_out', '0'],
                                    // ['catergory_id' ,'!=', '9']
                                ])
                                ->orderBy('created_at', 'desc')
                                ->with('brand','catergory')
                                ->take(16)
                                ->get();

        $random     =   Product::where([
                                    ['sold_out', '0'],
                                ])
                            ->with('brand','catergory')
                            ->inRandomOrder()
                            ->limit(16)
                            ->get();                            

        return [$products ,$random];
    }

    public function getNewProduct()
    {
        $product = Product::orderBy('created_at', 'desc')
                            ->with('features','thumbnail','images','brand','catergory')
                            ->first();

        return $product;
    }

    public function getProduct(Product $product)
    {
        $product = Product::where('id',$product->id)
                            ->with('thumbnail')
                            ->first();

        $brand = Brand::where('id', $product->brand_id)
                        ->first();

        $images = ProductImage::where('product_id', $product->id)
                        ->orderBy('created_at', 'desc')
                        ->get(); 
                        
        $catergory = Catergory::where('id', $product->catergory_id)
                        ->first();

        $features = ProductFeature::where('product_id', $product->id)
                        ->get();

        $description = ProductDescription::where('product_id', $product->id)
                        ->get();

        return [$product, $brand, $images, $catergory, $features, $description];
    }

    public function getStock()
    {
        $all        = Product::orderBy('created_at', 'desc')
                            ->with('soldunits')
                            ->get();

        $allSum        = Product::orderBy('created_at', 'desc')
                            ->with('soldunits')
                            ->sum('price');

        $inStock    = Product::where('sold_out', '0')
                            ->orderBy('created_at', 'desc')
                            ->with('soldunits')
                            ->get();

        $inStockSum    = Product::where('sold_out', '0')
                            ->orderBy('created_at', 'desc')
                            ->with('soldunits')
                            ->sum('price');

        $outOfStock = Product::where('sold_out', '1')
                            ->orderBy('created_at', 'desc')
                            ->with('soldunits')
                            ->get();
        
        $outOfStockSum    = Product::where('sold_out', '1')
                            ->orderBy('created_at', 'desc')
                            ->with('soldunits')
                            ->sum('price');

        return [$all, $inStock, $outOfStock, $allSum, $inStockSum, $outOfStockSum];
    }
}