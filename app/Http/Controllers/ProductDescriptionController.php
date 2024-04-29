<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\ProductDescription;

class ProductDescriptionController extends Controller
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
    public function store(Request $request, Product $product)
    {
        // validate the request data
        request()->validate(
            [
                'header'         => 'required',
                'body'         => 'required',
            ],
            [
                'header.required'     => 'Description header is required',
                'body.required'     => 'Description Body is required',
            ]
        );

        // create the record
        ProductDescription::create([
                'product_id'       => $product->id,
                'header'             => $request->header,
                'body'             => $request->body,
        ]);

        // get the product record
        $product = Product::orderBy('created_at', 'desc')->first();

        return response()->json([null, 200,  $product->id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ProductDescription  $productDescription
     * @return \Illuminate\Http\Response
     */
    public function show(ProductDescription $productDescription)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ProductDescription  $productDescription
     * @return \Illuminate\Http\Response
     */
    public function edit(ProductDescription $productDescription)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ProductDescription  $productDescription
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProductDescription $productDescription)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ProductDescription  $productDescription
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProductDescription $productDescription)
    {
        $description = ProductDescription::where('id', $productDescription->id)
                        ->first();

        // delete the ProductFeature
        $description->delete();

        //return json
        return response()->json([null, 200]);
    }
}
