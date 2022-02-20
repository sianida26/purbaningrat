<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ProfileController extends Controller
{
    //returns user data
    public function getData(Request $request){
        $user = Auth::user();

        return [
            'photo' => $user->author->profile_photo_filename ? $user->author->profile_photo_filename : 'default.jpeg',
            'name' => $user->name,
            'location' => $user->author->location,
            'bio' => $user->author->description,
        ];
    }

    public function changePhoto(Request $request){
        $user = Auth::user();

        //save photo
        $file = $request->file('file')->store('public/profiles');
        $filename = Str::afterLast($file, '/');
        $user->author->profile_photo_filename = $filename;
        $user->author->save();

        return [
            'photo' => $user->author->profile_photo_filename ? $user->author->profile_photo_filename : 'default.jpeg',
        ];
    }

    public function changeData(Request $request){
        $user = Auth::user();

        $user->name = $request->name;
        $user->author->location = $request->location;
        $user->author->description = $request->bio;
        $user->author->save();
        $user->save();

        return [
            'photo' => $user->author->profile_photo_filename ? $user->author->profile_photo_filename : 'default.jpeg',
            'name' => $user->name,
            'location' => $user->author->location,
            'bio' => $user->author->description,
        ];
    }
}
