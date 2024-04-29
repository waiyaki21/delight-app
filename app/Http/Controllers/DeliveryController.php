<?php

namespace App\Http\Controllers;

use App\Models\Buyer;
use App\Models\Delivery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DeliveryController extends Controller
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
        // validate the request data
        request()->validate(
            [
                'first_name'            => 'required',
                'second_name'           => 'required',
                'email'                 => 'required',
                'phone_number'          => 'required',
                'city'                  => 'required',
                'estate'                => 'required',
                'apartment'             => 'required',
            ],
            [
                'first_name.required'       => 'Delivery First Name is required',
                'second_name.required'      => 'Delivery Second Name is required',
                'email.required'            => 'Delivery email is required',
                'phone_number.required'     => 'Delivery phone_number is required',
                'city.required'             => 'Delivery city is required',
                'estate.required'           => 'Delivery estate is required',
                'apartment.required'        => 'Delivery apartment is required',
            ]
        );

        // get buyer 
        $buyer = Buyer::where('user_id', Auth::user()->id)->first();

        // create the record
        Delivery::create([
                'user_id'                   => Auth::user()->id,
                'buyer_id'                  => $buyer->id,
                'first_name'                => $request->first_name,
                'second_name'               => $request->second_name,
                'email'                     => $request->email,
                'phone_number'              => $request->phone_number,
                'city'                      => $request->city,
                'estate'                    => $request->estate,
                'apartment'                 => $request->apartment,
        ]);

        // get delivery
        $delivery = Delivery::orderBy('created_at', 'desc')->first();

        return response()->json([null, 200,  $delivery]);
    }

    public function show(Delivery $delivery)
    {
        //
    }

    public function edit(Delivery $delivery)
    {
        //
    }

    public function update(Request $request, Delivery $delivery)
    {
        //
    }

    public function destroy(Delivery $delivery)
    {
        $delivery = Delivery::where('id', $delivery->id)
                        ->first();

        // delete the Delivery
        $delivery->delete();

        //return json
        return response()->json([null, 200]);
    }
}
