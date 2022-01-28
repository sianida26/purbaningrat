<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
}
