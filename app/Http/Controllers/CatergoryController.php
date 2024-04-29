<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Admin;
use App\Models\Brand;
use App\Models\Product;
use App\Models\Catergory;
use Illuminate\Http\Request;
use App\Models\CatergoryBanner;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Intervention\Image\Facades\Image;

class CatergoryController extends Controller
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
                // 'banner'             => 'required',
            ],
            [
                'name.required'      => 'Catergory Name is required',
                // 'banner.required'    => 'Catergory Banner is required',
            ]
        );

        // get admin 
        $admin = Admin::where('user_id', Auth::user()->id)->first();

        // create the record
        Catergory::create([
                'user_id'                   => Auth::user()->id,
                'admin_id'                  => $admin->id,
                'name'                      => $request->name
        ]);

        // get catergory
        $catergory = Catergory::orderBy('created_at', 'desc')->first();

        // $this->storeBanner($request, $catergory);

        return response()->json([null, 200,  $catergory, $catergory->id]);
    }

    public function storeBanner(Request $request, Catergory $catergory)
    {
        // validation 
        $request->validate([
                'banner'            => 'required',
            ],
            [
                'banner.required'   => 'Catergory Banner is required',
            ]
        );
        
        // upload banner
        $banner = $request->file('banner');

        // delete banner if many 
        $banners = CatergoryBanner::where('catergory_id', $catergory->id)->count();

        if ($banners >= 1) {
            $this->deleteBanner($catergory->id);
        }

        // save path 
        $save_path = public_path('/catergories/catergory_'. $catergory->id . '/banner/');
        // if path doesnt exist make it 
        if (!file_exists($save_path)) {
            mkdir($save_path, 0777, true);
        }
        // get name 
        $filename =  $banner->getClientOriginalName();

        // crop & save image 
        Image::make($banner)->save( public_path('/catergories/catergory_'. $catergory->id . '/banner/'. $filename));
        // return $img->response('jpg');
          
        // new upload banner instance
        $bannerUpload = new CatergoryBanner;

        // enter data 
        $bannerUpload->catergory_id  = $catergory->id;
        $bannerUpload->name          = $filename;
        $bannerUpload->path          = '/catergories/catergory_'. $catergory->id . '/banner/' . $filename;

        // save data 
        $bannerUpload->save();

        // update catergory 
        Catergory::where('id', $catergory->id)
                ->update([
                    'banner_name' => $filename,
                    'banner_path' => '/catergories/catergory_' . $catergory->id . '/banner/' . $filename,
                ]);

        // get catergory
        $catergory = Catergory::orderBy('created_at', 'desc')->first();

        return response()->json([null, 200,  $catergory, $catergory->id]);
    }

    public function editBanner($catergory)
    {
        $banner = CatergoryBanner::where('catergory_id', $catergory->id)
                                ->first();

        Catergory::where('id', $catergory->id)
                        ->update([
                            'banner_name' => $banner->banner_name,
                            'banner_path' => $banner->banner_path,
                        ]);
    }

    public function show(Catergory $catergory)
    {
        return view('home');
    }

    public function showLatest()
    {
        return view('home');
    }

    public function deleteBanner($catergory)
    {

        $banners = CatergoryBanner::where('catergory_id', $catergory)->count();

        if ($banners == 1) {
            $banner  = CatergoryBanner::where('catergory_id', $catergory)
                ->first();

            $path = public_path('/catergories/catergory_' . $catergory . '/banner/' . $banner->name);

            File::delete($path);

            $banner->delete();
        } else {
            $banners  = CatergoryBanner::where('catergory_id', $catergory)
                ->get();

            foreach ($banners as $banner) {

                $path = public_path('/catergories/catergory_' . $catergory . '/banner/' . $banner->name);

                File::delete($path);

                $banner->delete();
            }
        }

        // get remaining files 
        $path = public_path('/catergories/catergory_' . $catergory . '/banner/');

        $files = File::files($path);

        foreach ($files as $index => $file) {
            $name       = $files[$index]->getFilename();

            $newpath = public_path('/catergories/catergory_' . $catergory . '/banner/' . $name);

            File::delete($newpath);
        }
    }

    public function deleteFolder($catergory)
    {
        $path = public_path('/catergories/catergory_' . $catergory . '/banner/');

        File::delete($path);

        $newpath = public_path('/catergories/catergory_' . $catergory);

        File::delete($newpath);
    }

    public function update(Request $request, Catergory $catergory)
    {
        //get the data and update
        $catergory->update($request->all());

        $catergory = Catergory::where('id', $catergory->id)
                        ->first();

        //return json
        return response()->json([null, 200, $catergory->id, $catergory]);
    }

    public function destroy(Catergory $catergory)
    {
        $brands = Brand::where('catergory_id', $catergory->id)
                        ->get();

        $products = Product::where('catergory_id', $catergory->id)
                        ->get();

        $catergory = Catergory::where('id', $catergory->id)
                        ->first();

        $this->deleteBanner($catergory->id);

        // get product & delete
        foreach ($products as $product) {
            $file = Product::find($product->id);
            $file->delete();
        }
        // get brands & delete
        foreach ($brands as $brand) {
            $file = Brand::find($brand->id);
            $file->delete();
        }
        // delete the catergory
        $catergory->delete();

        //return json
        return response()->json([null, 200]);
    }

    // API CALLS 
    public function getCatergories()
    {
        $catergories = Catergory::orderBy('created_at', 'asc')
                                ->with('brands.inStockProducts:id,brand_id')
                                ->get();

        return $catergories;
    }

    public function getCatergoriesMain()
    {
        $catergories    = Catergory::orderBy('created_at', 'asc')
                                ->where('name', '!=', 'TVs')
                                ->with('inStockProducts.brand.catergory:id,name')
                                ->get();

        $catergoriesTV  = Catergory::where('name', 'TVs')
                                ->with('inStockProducts.brand.catergory:id,name')
                                ->get();

        $banners        = CatergoryBanner::with('catergory:id,name')
                                    ->take('3')
                                    ->get();

        return [ $catergories , $catergoriesTV, $banners];
    }

    // get brands 
    public function getBrands(Catergory $catergory)
    {
        $brands = Brand::where('catergory_id', $catergory->id)
                                ->orderBy('created_at', 'asc')
                                ->get();

        return $brands;
    }

    // get catergory with brands and products 
    public function getCatergory(Catergory $catergory)
    {
        $catergory = Catergory::where('id', $catergory->id)
                                ->orderBy('created_at', 'asc')
                                ->with('inStockProducts.brand')
                                ->first();

        return $catergory;
    }
}
