<?php

namespace App\Http\Controllers;

use Iankumu\Mpesa\Facades\Mpesa;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

class MpesaController extends Controller
{
    public function index()
    {
        return Inertia::render('Payments/Mpesa');
    }

    public function stkpush()
    {
        return Inertia::render('Payments/Partials/Stkpush');
    }
    public function c2b()
    {
        return Inertia::render('Payments/Partials/C2B');
    }
    public function b2c()
    {
        return Inertia::render('Payments/Partials/B2C');
    }
    public function accountBalance()
    {
        return Inertia::render('Payments/Partials/AccountBalance');
    }
    public function transactionStatus()
    {
        return Inertia::render('Payments/Partials/TransactionStatus');
    }
    public function reversals()
    {
        return Inertia::render('Payments/Partials/Reversals');
    }

    public function simulate_balance(Request $request)
    {
        $shortcode = $request->input('shortcode');
        $identifier = $request->input('identiertype');
        $remarks = $request->input('remarks');
        $response=Mpesa::accountBalance($shortcode,$identifier,$remarks);

        $result = json_decode((string)$response);

        return Inertia::render('Payments/Partials/AccountBalance',[
            'response'=>$result
        ]);
    }
    public function simulate_status(Request $request)
    {
        $shortcode = $request->input('shortcode');
        $identifier = $request->input('identiertype');
        $transactionid = $request->input('transactionid');
        $remarks = $request->input('remarks');
        $response=Mpesa::transactionStatus($shortcode,$transactionid,$identifier,$remarks);

        $result = json_decode((string)$response);

        return Inertia::render('Payments/Partials/TransactionStatus',[
            'response'=>$result
        ]);
    }
    public function simulate_reversals(Request $request)
    {
        $shortcode = $request->input('shortcode');
        $transactionid = $request->input('transactionid');
        $amount = $request->input('amount');
        $remarks = $request->input('remarks');
        $response=Mpesa::reversal($shortcode,$transactionid,$amount,$remarks);

        $result = json_decode((string)$response);

        return Inertia::render('Payments/Partials/Reversals',[
            'response'=>$result
        ]);
    }

    public function result(Request $request)
    {
        Log::info('Results endpoint has been hit');
        Log::info($request->all());
    }
    public function timeout(Request $request)
    {
        Log::info('Timeout endpoint has been hit');
        Log::info($request->all());
    }

        /** 
     * Generate Access Token
     * */
    public function generateAccessToken()
    {
        // we define our consumer key and we get the value from the app we created in the Daraja account.
        $consumer_key= env('MPESA_CONSUMER_KEY');
        // we define consumer secret we get the value from the app we created in the Daraja account.
        $consumer_secret=env('MPESA_CONSUMER_SECRET');
         // we use Base64 to combine our consumer key and consumer secret. Base64 is simply a group of binary-to-text encoding schemes that represent binary data in an ASCII string format.

        // $security_credentials="nenHN/K1ZvLNfQV9fj9WBz0wjUIOPbPsRqEKSphv91Mb69+eWdL4mFrGmSIItteT2O1Ix+Bv1TdzDW0ByeS6YilkKbWeyn4fhsLRWJf5FRBd/taz0j6gnsHJAXE+CrYA8XZJjYJF7Qx8sagL3M+K47v2EYQwFmkoyvUTPoG/tiDOxoZXC3T7vRACSsjXF6f+HjZmHC4j/t66HHjNqtdZQNc8iPecKQCY+FtwaP4qhTv0dx64x3PYZ3qRoL8VJIc18Xij/KBNY2kW+vc8TSWbU3OWnhNXqLiLXjkOGSzr3xDAqtTJW4Of4TsbN3Mq5oap+kmmqquhoSK1wyZC8EWBkw==";

        $credentials = base64_encode($consumer_key.":".$consumer_secret);
        // return $credentials;
        // we define a URL to generate access token provided to us by Safaricom Mpesa API.
        $url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
        // we use curl_setopt to set our options for our curl transfer. Learn more about curl option.
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array("Authorization: Basic cFJZcjZ6anEwaThMMXp6d1FETUxwWkIzeVBDa2hNc2M6UmYyMkJmWm9nMHFRR2xWOQ=="));
        curl_setopt($curl, CURLOPT_HEADER,false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        // we create a variable in which we pass the response from Safaricom M-pesa API.
        $curl_response = curl_exec($curl);
        // we use json_decode to convert a JSON object to a php object.
        $access_token=json_decode($curl_response);
        // we access our generated M-pesa access token.
        return $access_token->access_token;
    }
}
