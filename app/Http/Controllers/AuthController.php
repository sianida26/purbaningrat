<?php

namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    //

    public function login(Request $request)
    {
        if (Auth::attempt(['username' => $request->username, 'password' => $request->password])){
            $user = User::firstWhere('username', $request->username);
            //update last login
            $user->last_login = now();
            $user->save();

            return [
                'username' => $user->username,
                'name' => $user->name,
                'token' => $user->createToken('auth token')->accessToken,
            ];
        } else {
            return response()->json(['message' => 'Username atau password salah'], 401);
        }
    }
}
