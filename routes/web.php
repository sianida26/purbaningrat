<?php

use App\Http\Controllers\PostController;

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

//admin pages
Route::view('/admin', 'admin.app')->where('path', '.*$');
Route::view('/admin/{path}', 'admin.app')->where('path', '.*$');


//blog pages
Route::get('/blog/{slug}', [PostController::class, 'view'])->where('slug', '.+$');

Route::get('/kategori/{category}', [PostController::class, 'categoryView'])->where('category', '.+$');
