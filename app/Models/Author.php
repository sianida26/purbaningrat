<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    use HasFactory;

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];
    
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getPPFilename(){
        return $this->profile_photo_filename ? $this->profile_photo_filename : 'default.jpeg';
    }
}
