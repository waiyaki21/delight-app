<?php

namespace App\Http\Controllers;

// models 
use App\Models\User;
use App\Models\Admin;
use App\Models\Brand;
use App\Models\Product;
use App\Models\CartItem;
// facades 
use App\Models\Catergory;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use App\Models\ProductFeature;
use App\Models\ProductThumbnail;

use App\Models\ProductDescription;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Intervention\Image\Facades\Image;

use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\ProductImageController;
use App\Models\Favorite;
use App\Models\ProductModel;
use App\Notifications\ProductFavorited;

class ProductController extends Controller
{
    public function index()
    {
        return view('home');
    }

    public function store(Request $request)
    {  
        // validate the request data
        request()->validate(
            [
                'name'               => 'required',
                'catergory_id'       => 'required',
                'brand_id'           => 'required',
                'price'              => 'required',
                'stock'              => 'required',
                'info'               => 'required',
                'thumbnail'          => 'required|max:100000',
                'files'              => 'required|max:100000'
            ],
            [
                'name.required'         => 'Product Name is required',
                'catergory_id.required' => 'Product Catergory is required',
                'brand_id.required'     => 'Product Brand is required',
                'price.required'        => 'Product Price is required',
                'stock.required'        => 'Product Stock is required',
                'info.required'         => 'Product Info is required',
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
                'info'                      => $request->info,
        ]);

        // get the product record
        $product = Product::orderBy('created_at', 'desc')->first();

        return response()->json([null, 200,  $product->id]);
    }

    public function storeThumbnail(Request $request, Product $product)
    {
        // validation 
        $request->validate([
                'thumbnail' => 'required',
            ],
            [
                'thumbnail.required'    => 'Product Thumbnail Image is required',
            ]
        );
        
        // upload thumbnail
        $thumbnail = $request->file('thumbnail'); 

        // save path 
        $save_path = public_path('/products/product_'. $product->id . '/thumbnail/');
        // if path doesnt exist make it 
        if (!file_exists($save_path)) {
            mkdir($save_path, 0777, true);
        }
        // get name 
        $filename =  $thumbnail->getClientOriginalName();

        // crop & save image 
        Image::make($thumbnail)->resize(300 ,300)->save( public_path('/products/product_'. $product->id . '/thumbnail/'. $filename));
        // return $img->response('jpg');

        // delete thumbs if many 
        $thumbs = ProductThumbnail::where('product_id', $product->id)->count();

        if ($thumbs > 1) {
            $this->deleteThumbnail($product->id);
        }
          
        // new upload thumbnail instance
        $thumbnailUpload = new ProductThumbnail;

        // enter data 
        $thumbnailUpload->product_id    = $product->id;
        $thumbnailUpload->name          = $filename;
        $thumbnailUpload->path          = '/products/product_'. $product->id . '/thumbnail/' . $filename;

        // save thumbnail data 
        $thumbnailUpload->save();

        // update product 
        $this->editThumb($product);
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
        // dd($request);
 
        // upload thumbnail
        $thumbnail  = $request->file('thumbnail'); 
        $filename   = $thumbnail->getClientOriginalName();

        // store image
        // Storage::putFileAs(
        //     'products/product_'.$product->id.'/thumbnail' , $request->file('thumbnail'),  $filename
        // );

        // store image online 
        // Storage::disk('upload-ftp')->put(
        //     // '/product_'.$product->id.'/thumbnail' , $request->file('thumbnail'),  $filename
        //     '/product_test/thumbnail' , $request->file('thumbnail')
        // );

        // THIS WORKS 
        $path = Storage::putFileAs('/product_'.$product->id.'/thumbnail' , $request->file('thumbnail'), $filename);
        // return $path;
        // $path = $request->file('thumbnail')->storeAs(
        //             '/product_test/thumbnail/',
        //             $request->file('thumbnail'),
        //             'upload-ftp'
        //         );


        // return $thumbnail;
        if($request->has('thumbnail')) {
            $image      = $request->file('thumbnail');
            $filename   = $image->getClientOriginalName();
            // return $filename;

            // save path 
            // $save_path = public_path('/products/product_'. $product->id . '/thumbnail/');
            // if path doesnt exist make it 
            // if (!file_exists($save_path)) {
            //     mkdir($save_path, 0777, true);
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

            // update product 
            // $this->editThumb($product);
            return response()->json([null, 200]);
        } else {
            return response()->json([null, 500]);
        }
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

        $prod = Product::where('id', $product->id)->first();

        if ($prod->stock >= 1) {
            Product::where('id', $product->id)
                ->update([
                    'sold_out' => '0'
                ]);
        }

        return response()->json([null, 200]);
    }

    public function deleteThumbnail($product)
    {
        
        $thumbnails = ProductThumbnail::where('product_id', $product)->count();

        if ($thumbnails == 1) {
            $thumb  = ProductThumbnail::where('product_id', $product)
                                    ->first();

            $path = public_path('/products/product_' . $product . '/thumbnail/' . $thumb->name);

            File::delete($path);

            $thumb->delete();

        } else {
            $thumbs  = ProductThumbnail::where('product_id', $product)
                                    ->get();

            foreach ($thumbs as $thumb) {

                $path = public_path('/products/product_'.$product. '/thumbnail/' . $thumb->name);

                File::delete($path);

                $thumb->delete();
            } 
        }

        // get remaining files 
        $path = public_path('/products/product_' . $product . '/thumbnail/');

        $files = File::files($path);

        foreach ($files as $index => $file) {
            $name       = $files[$index]->getFilename();

            $newpath = public_path('/products/product_' . $product . '/thumbnail/'. $name);

            File::delete($newpath);
        }
    }

    public function deleteFolder($product)
    {
        $path = public_path('/products/product_' .$product . '/thumbnail/');

        File::delete($path);

        $newpath = public_path('/products/product_' . $product);

        File::delete($newpath);
    }

    public function destroy(Product $product)
    {
        // get the product 
        $product    = Product::findOrFail($product->id);

        // get the features 
        $features   = ProductFeature::where('product_id', $product->id)->get();

        // delete cart items
        $destroy = new CartItemController();
        $destroy->cartRemove($product); 

        // delete images
        $destroy = new ProductImageController();
        $destroy->deleteImages($product->id);

        // delete favorites
        $destroy = new FavoriteController();
        $destroy->deleteProducts($product->id); 

        // delete feature
        foreach ($features as $feature) {
            $feature->delete(); 
        }

        // delete thumbnail
        $this->deleteThumbnail($product->id);

        // delete folder
        $this->deleteFolder($product->id); 

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
                                ])
                                ->orderBy('created_at', 'desc')
                                ->with('brand','catergory','favorites')
                                ->take(16)
                                ->get();

        $random     =   Product::where([
                                    ['sold_out', '0'],
                                ])
                            ->with('brand', 'catergory', 'favorites')
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
        $product        = Product::where('id',$product->id)
                            ->with('thumbnail','cartitems')
                            ->first();

        $brand          = Brand::where('id', $product->brand_id)
                            ->first();

        $images         = ProductImage::where('product_id', $product->id)
                            ->orderBy('created_at', 'desc')
                            ->get(); 
                        
        $catergory      = Catergory::where('id', $product->catergory_id)
                            ->first();

        $features       = ProductFeature::where('product_id', $product->id)
                            ->get();

        $description    = ProductDescription::where('product_id', $product->id)
                            ->get();

        $models         = ProductModel::where('product_id', $product->id)
                            ->get();

        return [$product, $brand, $images, $catergory, $features, $description, $models];
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

    public function getLatestProducts($id)
    {
        $products   =   Product::where([
                                    ['sold_out', '0'],
                                ])
                                ->orderBy('created_at', 'desc')
                                ->with('thumbnail', 'brand','catergory','favorites')
                                ->take(16)
                                ->get();

        $name = 'Latest Arrivals';

        return [$name, $products];
    }

    public function getCatergoryProducts(Catergory $catergory)
    {
        $products = Product::where('catergory_id', $catergory->id)
                            ->where('sold_out', '0')
                            ->orderBy('created_at', 'asc')
                            ->with('thumbnail','brand','catergory', 'favorites')
                            ->get();

        return [$catergory->name, $products];
    }

    public function getBrandProducts(Brand $brand)
    {
        $products = Product::where('brand_id', $brand->id)
                            ->where('sold_out', '0')
                            ->orderBy('created_at', 'asc')
                            ->with('thumbnail', 'brand', 'catergory', 'favorites')
                            ->get();

        return [$brand->name, $products];
    }

    public function getFavoritesProducts($id)
    {
        // Get a user and load their favorite products
        $user = User::with('favorites.product')->find($id);

        // Get all the products from favorites
        $products = $user->favorites()
                                ->with('product.thumbnail', 'product.brand', 'product.catergory', 'product.favorites')
                                ->get()
                                ->pluck('product');

        $name = 'Favorites';

        return [$name, $products];
    }
}
