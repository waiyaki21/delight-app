<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Catergory;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search($name)
    {
        $result = Product::where('name','LIKE','%'.$name.'%')
                        // ->orWhere('email','LIKE','%'.$name.'%')
                        ->get();

        // return $result;
        return view('search', compact('result'));
    }

    public function searchProducts($name)
    {
        $result = Product::where('name','LIKE','%'.$name.'%')
                        // ->orWhere('email','LIKE','%'.$name.'%')
                        ->with('catergory','brand','favorites')
                        ->where('sold_out', '0')
                        ->orderBy('price', 'desc')
                        ->get();

        $first = Product::where('name','LIKE','%'.$name.'%')
                        ->where('sold_out', '0')
                        ->orderBy('price', 'desc')
                        ->first('price');
        $maxPrice = intval($first->price);

        $last = Product::where('name','LIKE','%'.$name.'%')
                        ->where('sold_out', '0')
                        ->orderBy('price', 'asc')
                        ->first('price');
        $minPrice = intval($last->price);

        return [$result, $maxPrice, $minPrice];
    }

    public function searchProductsPrice($name, $min, $max)
    {
        // convert into int
        $minPrice = intval($min);
        $maxPrice = intval($max);

        // find products 
        $result = Product::where('name','LIKE','%'.$name.'%')
                        ->whereBetween('price', [$minPrice, $maxPrice])
                        ->with('catergory','brand','favorites')
                        ->where('sold_out', '0')
                        ->orderBy('price', 'desc')
                        ->get();

        return $result;
    }

    public function searchProductsPriceAsc($name, $min, $max)
    {
        // convert into int
        $minPrice = intval($min);
        $maxPrice = intval($max);

        // find products 
        $result = Product::where('name','LIKE','%'.$name.'%')
                        ->whereBetween('price', [$minPrice, $maxPrice])
                        ->with('catergory','brand','favorites')
                        ->where('sold_out', '0')
                        ->orderBy('price', 'asc')
                        ->get();

        return $result;
    }

    public function searchProductsPriceNewest($name, $min, $max)
    {
        // convert into int
        $minPrice = intval($min);
        $maxPrice = intval($max);

        // find products 
        $result = Product::where('name','LIKE','%'.$name.'%')
                        ->whereBetween('price', [$minPrice, $maxPrice])
                        ->with('catergory','brand','favorites')
                        ->where('sold_out', '0')
                        ->orderBy('created_at', 'desc')
                        ->get();

        return $result;
    }

    public function getProducts()
    {
        $products   =   Product::where('stock' ,'>', '0')
                                ->orderBy('name', 'asc')
                                ->with('thumbnail','brand','catergory')
                                // ->take(10)
                                ->paginate(10);
                                // ->get();

        return $products;
    }

    public function getProductsPage()
    {
        //products
        $products   =   Product::where('stock' ,'>', '0')
                                ->orderBy('name', 'asc')
                                ->with('thumbnail','brand','catergory')
                                // ->take(10)
                                ->paginate(10);

        return response()->json($products);

    }

    public function getCatergory(Catergory $catergory)
    {
        $products   =   Product::where([
                                    ['stock' ,'>', '0'],
                                    ['catergory_id' , $catergory->id]
                                ])
                                ->orderBy('name', 'asc')
                                ->with('thumbnail','brand','catergory')
                                // ->take(10)
                                ->get();

        return $products;
    }

    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
