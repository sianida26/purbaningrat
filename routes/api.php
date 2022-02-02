<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware('guest')->group(function(){
    
    Route::prefix('admin')->group(function(){

        Route::post('/login', [AuthController::class, 'login'])->name('login');

    });
});

Route::middleware('auth:api')->group(function(){

    Route::prefix('admin')->group(function(){

        // Route::post('/addCategory', [CategoryController::class, 'create']);
        Route::prefix('category')->group(function(){

            Route::post('create', [CategoryController::class, 'create']);
        });

        Route::prefix('post')->group(function(){

            Route::post('autosave', [PostController::class, 'autosave']);
            Route::post('getAll', [PostController::class, 'getAll']);
            Route::post('getData', [PostController::class, 'getData']);
            Route::post('uploadImage', [PostController::class, 'uploadImage']);
            Route::post('uploadCover', [PostController::class, 'uploadCover']);
            Route::post('delete', [PostController::class, 'deletePost']);
        });

        Route::prefix('profil')->group(function(){

            Route::get('getData', [ProfileController::class, 'getData']);
            Route::post('changePhoto', [ProfileController::class, 'changePhoto']);
            Route::post('changeData', [ProfileController::class, 'changeData']);
        });
    });
});
