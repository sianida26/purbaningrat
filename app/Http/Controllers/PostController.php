<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;

use Carbon\Carbon;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class PostController extends Controller
{
    //

    public function getData(Request $request){

        $post = Post::find($request->id);

        $categories = Category::select('id', 'name')->get();

        if ($post){
            //if post is found
            return response()->json([
                'id' => $post->id,
                'title' => $post->title,
                'content' => $post->content,
                'slug' => $post->slug,
                'tags' => $post->tags,
                'categories' => $categories,
                'selected_categories' => $post->getCategoryIds(),
                'updated_at' => $post->updated_at,                
            ], 200);
        }
        else {
            //if post is not found, then create a new one

            //default values
            $title = 'Dokumen tanpa judul';
            $content = 'Dokumen tanpa isi';
            $slug = 'dokumen-tanpa-judul';
            $tags = [];

            //check if slug is already in the database. if exists, then add a random 5 character string to the end of the slug
            while (Post::where('slug', $slug)->exists()){
                $slug = 'dokumen-tanpa-judul-' . Str::lower(Str::random(5));
            }

            //create model
            $post = Post::create([
                'title' => $title,
                'content' => $content,
                'slug' => $slug,
                'tags' => $tags,
                'user_id' => Auth::id(),
            ]);

            //return the created model
            return response()->json([
                'id' => $post->id,
                'title' => $post->title,
                'content' => $post->content,
                'slug' => $post->slug,
                'tags' => $post->tags,
                'categories' => $categories,
                'selected_categories' => $post->getCategoryIds(),
                'updated_at' => $post->updated_at,                
            ], 200);
        }
    }

    public function autosave(Request $request){
        $post = Post::find($request->id);

        if ($post->user_id !== Auth::id()) {
            return response()->json([
                'message' => 'You are not authorized to edit this post'
            ], 401);
        }

        if ($post){
            //if post is found
            $post->title = $request->title;
            $post->content = $request->content;
            $post->slug = $request->slug;
            $post->tags = $request->tags;
            $post->categories()->sync($request->categories);
            $post->save();
            return response()->json([
                'id' => $post->id,
                'title' => $post->title,
                'content' => $post->content,
                'slug' => $post->slug,
                'tags' => $post->tags,
                'categories' => $post->getCategoryIds(),
                'updated_at' => $post->updated_at,                
            ], 200);
        }
    }
}
