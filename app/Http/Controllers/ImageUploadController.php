<?php
  
namespace App\Http\Controllers;
  
use Illuminate\Http\Request;

use Illuminate\Support\Facades\File;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;
  
class ImageUploadController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('imageUpload');
    }
      
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
      
        $imageName = time().'.'.$request->image->extension();  
       
        $request->image->move(public_path('images'), $imageName);

        // upload thumbnail
        $image = $request->file('image'); 
    
        Image::make($image)->resize(300 ,300)->save( public_path('images'), $imageName);
        // /* 
        //     Write Code Here for
        //     Store $imageName name in DATABASE from HERE 
        // */
      
        return back()
            ->with('success','You have successfully upload image.')
            ->with('image',$imageName); 
        // $extension = $request->file->getClientOriginalExtension();

        // dd($extension); 
        
        // $localFile = File::get('path/to/local-file.ext');

        // Storage::disk('custom-ftp')->put('path/to/distant-file.ext', $localFile);
    }

    /**

     * Show the form for creating a new resource.

     *

     * @return \Illuminate\Http\Response

     */

     public function resizeImage()

     {
 
         return view('resizeImage');
 
     }
 
   
 
     /**
 
      * Show the form for creating a new resource.
 
      *
 
      * @return \Illuminate\Http\Response
 
      */
 
     public function resizeImagePost(Request $request)
 
     {
 
         $this->validate($request, [
 
             'title' => 'required',
 
             'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
 
         ]);
 
   
 
         $image = $request->file('image');
 
         $input['imagename'] = time().'.'.$image->getClientOriginalExtension();
 
      
 
         $destinationPath = public_path('/thumbnail');
 
         $img = Image::make($image->getRealPath());
 
         $img->resize(100, 100, function ($constraint) {
 
             $constraint->aspectRatio();
 
         })->save($destinationPath.'/'.$input['imagename']);
 
    
 
         $destinationPath = public_path('/images');
 
         $image->move($destinationPath, $input['imagename']);
 
    
 
         $this->postImage->add($input);
 
    
 
         return back()
 
             ->with('success','Image Upload successful')
 
             ->with('imageName',$input['imagename']);
 
     }
}