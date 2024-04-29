<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Catergory;
use Illuminate\Http\Request;

class BrandController extends Controller
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
    public function store(Request $request, Catergory $catergory)
    {   
        // validate the request data
        request()->validate(
            [
                'name'               => 'required',
            ],
            [
                'name.required'      => 'Brand Name is required'
            ]
        );

        // create the record
        Brand::create([
                'name'                      => $request->name,
                'catergory_id'              => $catergory->id,
        ]);

        return response()->json([null, 200]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function show(Brand $brand)
    {
        return view('home');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function edit(Brand $brand)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Brand $brand)
    {
        // dd($brand);

        //get the data and update
        $brand->update($request->all());

        //return json
        return response()->json([null, 200, $brand->id]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function destroy(Brand $brand)
    {
        $brand = Brand::where('id', $brand->id)
                        ->first();

        $brand->delete();

        //return json
        return response()->json([null, 200]);
    }


    // API CALLS 
    public function getBrand(Brand $brand)
    {
        $brand = Brand::where('id', $brand->id)
                        ->orderBy('created_at', 'asc')
                        ->with('inStockProducts.catergory')
                        ->first();

        return $brand;
    }
}
