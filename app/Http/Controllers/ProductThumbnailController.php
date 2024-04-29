<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductThumbnail;
use Illuminate\Support\Facades\File;

class ProductThumbnailController extends Controller
{

    public function index()
    {
        //
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show(ProductThumbnail $productThumbnail)
    {
        //
    }

    public function edit(ProductThumbnail $productThumbnail)
    {
        //
    }

    public function update(Request $request, ProductThumbnail $productThumbnail)
    {
        //
    }

    public function destroyThumb($product)
    {
        $product_media = ProductThumbnail::where('product_id', $product->id)->first();
        // dd($request);

        // get product media & delete
        foreach ($product_media as $media) {
            $path =$product_media->path;
            if(File::exists($path)){
                File::delete($path);
            }
            $file = ProductThumbnail::find($product_media->id);
            $file->delete();
        }
    }

    public function destroyThumbAll($productThumbnail)
    {
        $product_media = ProductThumbnail::where('product_id', $productThumbnail->product_id)->first();

        // get product media & delete
        // foreach ($product_media as $media) {
            $path =$product_media->path;
            if(File::exists($path)){
                File::delete($path);
            }
            // $file = ProductThumbnail::find($product_media->id);
            $product_media->delete();
        // }
    }
}
