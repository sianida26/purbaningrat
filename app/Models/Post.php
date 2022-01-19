<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'categories' => 'array',
        'tags' => 'array',
    ];

    /**
     * Get the user that owns the post.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * The categories that belong to the post.
     */
    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    /**
     * Get category ids
     */
    public function getCategoryIds(){
        return $this->categories()->get()->pluck('id')->toArray();
    }

    /**
     * Get post word count
     */
    public function countWords(){
        return str_word_count(strip_tags($this->content));
    }

    /**
     * Get post read time (200 wpm read)
     */
    public function getReadTime(){
        $t = round($this->countWords() / 200);
        return $t < 1 ? 1 : $t; //minimal 1 menit
    }
}
