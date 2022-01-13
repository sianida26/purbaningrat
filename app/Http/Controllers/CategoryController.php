<?php

namespace App\Http\Controllers;

use App\Models\Category;

use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * @response {
     *  id: number
     * }
     */
    public function create(Request $request){
        //check if category name is already in the database
        $category = Category::where('name', $request->name)->first();
        if($category){
            return response()->json([
                'message' => 'Kategori sudah ada',
                'category' => $category
            ], 422);
        }
        $category = new Category;
        $category->name = $request->name;
        $category->save();
        return response()->json([
            'id' => $category->id
        ], 200);
    }
}
