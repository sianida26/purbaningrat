<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;

use Carbon\Carbon;

use Debugbar;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
// use Illuminate\Support\Array;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class PostController extends Controller
{
    //
    public function view(Request $request){

        $post = Post::where('slug', $request->slug)->firstOrFail();
        Debugbar::info($request->slug);

        //check if has token
        if($request->has('t')){
            
            Debugbar::info($request->t);
            Debugbar::info($post->id);
            Debugbar::info($post->user->id);
            $checkHash = $post->token === $request->t;
            if ($checkHash) {
                Debugbar::info('hash match');
                return view('blog', ['post' => $post]);
            } else {
                Debugbar::info('hash not match');
                abort(404);
                return;
            }
        }

        Debugbar::info('no token');
        if (!$post->is_public) abort(404);

        $post->views = $post->views + 1;
        $post->save(['timestamps' => false]);
        return view('blog', ['post' => $post]);
    }

    public function getData(Request $request){

        $post = Post::find($request->postId);

        $categories = Category::select('id', 'name')->get();

        if ($post){
            //if post is found
            return response()->json([
                'id' => $post->id,
                'title' => $post->title,
                'content' => $post->content,
                'slug' => $post->slug,
                'tags' => $post->tags,
                'subtitle' => $post->subtitle,
                'categories' => $categories,
                'cover_filename' => $post->cover_filename,
                'token' => hash('sha256',$post->id . '_' . $post->user->id),
                'visibility' => $post['is_public'],
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
            $subtitle = '';
            $token =  hash('sha256', rand(0, 1000000) . '_' . rand(0, 1000000));
            $cover_filename = 'default.jpeg';
            $tags = [];

            //regenerate token if token already exists
            while (Post::where('token', $token)->exists()) {
                $token =  hash('sha256', rand(0, 1000000) . '_' . rand(0, 1000000));
            }

            //check if slug is already in the database. if exists, then add a random 5 character string to the end of the slug
            while (Post::where('slug', $slug)->exists()){
                $slug = 'dokumen-tanpa-judul-' . Str::lower(Str::random(5));
            }

            //create model
            $post = Post::create([
                'title' => $title,
                'content' => $content,
                'slug' => $slug,
                'subtitle' => $subtitle,
                'cover_filename' => $cover_filename,
                'tags' => $tags,
                'is_public' => false,
                'user_id' => Auth::id(),
            ]);

            //return the created model
            return response()->json([
                'id' => $post->id,
                'title' => $post->title,
                'content' => $post->content,
                'slug' => $post->slug,
                'tags' => $post->tags,
                'cover_filename' => $post->cover_filename,
                'subtitle' => $post->subtitle,
                'token' => $token,
                'visibility' => $post['is_public'],
                'categories' => $categories,
                'selected_categories' => $post->getCategoryIds(),
                'updated_at' => $post->updated_at,                
            ], 200);
        }
    }

    public function autosave(Request $request){
        //TODO: only change on difference
        $post = Post::find($request->id);

        if ($post->user_id !== Auth::id()) {
            return response()->json([
                'message' => 'You are not authorized to edit this post'
            ], 401);
        }

        // $categories = collect($request->categories)->map(function($category){
        //     Debugbar::info($category);
        //     return Category::find($category);
        // });

        if ($post){
            //if post is found
            $post->title = $request->title;
            $post->content = $request->content;
            $post->slug = $request->slug;
            $post->subtitle = $request->subtitle;
            $post->tags = $request->tags;
            $post->cover_filename = $request->cover_filename;
            $post['is_public'] = $request->visibility;
            $post->categories()->sync($request->categories);
            $post->save();
            return response()->json([
                'id' => $post->id,
                'title' => $post->title,
                'content' => $post->content,
                'token' => $post->token,
                'slug' => $post->slug,
                'tags' => $post->tags,
                'cover_filename' => $post->cover_filename,
                'subtitle' => $post->subtitle,
                'visibility' => $post['is_public'],
                'categories' => $post->getCategoryIds(),
                'updated_at' => $post->updated_at,                
            ], 200);
        }
    }

    public function getAll(){
        $posts = Post::with('user')
            ->get()
            ->map(function($post){
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'views' => $post->views,
                    'slug' => $post->slug,
                    'token' => $post->token,
                    'is_public' => $post->is_public,
                    'updated_at' => $post->updated_at,
                ];
            });

        $published = $posts->filter(function($post){
            return $post['is_public'];
        })->values()->all();

        $draft = $posts->filter(function($post){
            return !$post['is_public'];
        })->values()->all();

        return response()->json([
            'published' => $published,
            'draft' => $draft,
        ], 200);
        
    }

    public function uploadImage(Request $request){

        $file = $request->file('image')->store('public/images');

        return [
            'location' => $request->getSchemeAndHttpHost().'/storage/images/' . Str::afterLast($file, '/'),
        ];
    }

    public function uploadCover(Request $request){

        $post = Post::findOrFail($request->post_id);
        $file = $request->file('file')->store('public/images/cover');
        $filename = Str::afterLast($file, '/');
        $oldFilename = $post->cover_filename;
        $post = $post->update([
            'cover_filename' => $filename,
        ]);

        if ($oldFilename !== 'default.jpeg'){
            Storage::delete('public/images/cover/' . $oldFilename);
        }

        return [
            'filename' => $filename,
        ];
    }

    public function deletePost(Request $request){

        $post = Post::findOrFail($request->id);
        //check if the post is owned by the user
        if ($post->user_id !== Auth::id()){
            return response()->json([
                'message' => 'Anda tidak berhak untuk menghapus postingan ini'
            ], 401);
        }

        $post->delete();
    }

    public function categoryView(Request $request){

        Debugbar::info($request->category);

        return view('category', [
            'category' => $request->category,
        ]);
    }
}
