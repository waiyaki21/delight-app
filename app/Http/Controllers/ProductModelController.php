<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductModel;
use Illuminate\Http\Request;

class ProductModelController extends Controller
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
        // Validate the request data
        $request->validate(
            [
                'name' => 'required|string|max:255',
            ],
            [
                'name.required' => 'Model Name is required',
            ]
        );

        // Check if a record with the same name and product_id already exists
        $existingModel = ProductModel::where('product_id', $product->id)
            ->where('name', $request->name)
            ->first();

        if ($existingModel) {
            return response()->json([
                'message' => 'A model with this name already exists for the selected product.',
                'type'    => 'danger'
            ], 422); // Unprocessable Entity
        }

        // Create the record if it doesn't exist
        $newModel = ProductModel::create([
            'catergory_id' => $product->catergory_id,
            'brand_id'     => $product->brand_id,
            'product_id'   => $product->id,
            'name'         => $request->name,
        ]);

        return response()->json([
            'message' => 'Model created successfully.',
            'type'    => 'success',
            'model'   => $newModel,
        ], 201); // Created
    }

    public function show(ProductModel $productModel)
    {
        //
    }

    public function edit(ProductModel $productModel)
    {
        //
    }

    public function update(Request $request, ProductModel $productModel)
    {
        //
    }

    public function destroy(ProductModel $productModel)
    {
        $model = ProductModel::where('id', $productModel->id)
                            ->first();

        // delete the ProductFeature
        $model->delete();

        //return json
        return response()->json([null, 200]);
    }
}
