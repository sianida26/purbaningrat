<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $faker = Faker::create('id_ID');

        for($i = 0; $i < 10; $i++){
            $post = new \App\Models\Post();
            $post->title = $faker->sentence(5);
            $post->content = $faker->paragraph(5);
            $post->save();
        }
    }
}
