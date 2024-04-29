<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class ProductImageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ProductImage  $productImage
     * @return \Illuminate\Http\Response
     */
    public function show(ProductImage $productImage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ProductImage  $productImage
     * @return \Illuminate\Http\Response
     */
    public function edit(ProductImage $productImage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ProductImage  $productImage
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProductImage $productImage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ProductImage  $productImage
     * @return \Illuminate\Http\Response
     */
    

    public function destroy(ProductImage $productImage)
    {
        // get the image 
        $image = ProductImage::where('id', $productImage->id)
                        ->first();

        // get path 
        $path   = public_path('/products/product_' . $image->product_id . '/' . $image->name);

        // delete file 
        File::delete($path);

        // delete the productImage
        $image->delete();

        //return json
        return response()->json([null, 200]);
    }

    public function deleteImages($product)
    {
        $images = ProductImage::where('product_id', $product)->count();

        if ($images == 1) {
            $image  = ProductImage::where('product_id', $product)->first();

            $path = public_path('/products/product_' . $product . '/' . $image->name);

            File::delete($path);

            $image->delete();
        } else {
            $images  = ProductImage::where('product_id', $product)->get();

            foreach ($images as $image) {

                $path = public_path('/products/product_' . $product . '/' . $image->name);

                File::delete($path);

                $image->delete();
            }
        }

        // get remaining files 
        $path = public_path('/products/product_' . $product . '/');

        $files = File::files($path);

        foreach ($files as $index => $file) {
            $name       = $files[$index]->getFilename();

            $newpath    = public_path('/products/product_' . $product . '/' . $name);

            File::delete($newpath);
        }
    }
}
