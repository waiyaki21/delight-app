<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductFeature;
use Illuminate\Http\Request;

class ProductFeatureController extends Controller
{

    public function index()
    {
        //
    }

    public function create()
    {
        //
    }

    public function store(Request $request, Product $product)
    {  
        // validate the request data
        request()->validate(
            [
                'header'       => 'required',
                'body'         => 'required',
            ],
            [
                'header.required'   => 'Feature Header is required',
                'body.required'     => 'Feature Body is required',
            ]
        );

        // create the record
        ProductFeature::create([
                'product_id'       => $product->id,
                'header'           => $request->header,
                'body'             => $request->body,
        ]);

        // get the product record
        $product = Product::orderBy('created_at', 'desc')->first();

        return response()->json([null, 200,  $product->id]);
    }

    public function show(ProductFeature $productFeature)
    {
        //
    }

    public function edit(ProductFeature $productFeature)
    {
        //
    }

    public function update(Request $request, ProductFeature $productFeature)
    {
        //
    }

    public function destroy(ProductFeature $productFeature)
    {
        $feature = ProductFeature::where('id', $productFeature->id)
                        ->first();

        // delete the ProductFeature
        $feature->delete();

        //return json
        return response()->json([null, 200]);
    }
}
