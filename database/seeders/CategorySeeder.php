<?php

namespace Database\Seeders;

use App\Models\Category;

use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Primer, Literasi, Mocopat, Elemen, Tegese Tembung, Catur, Astronomi, Pengantar, Eksperimen Pikiran, Penulis Obskur, Tanah Jawa, Nusantara, Kronologis, Luar Negeri, Puisi, Lukisan, Sketsa, Novel
        $categories = [
            'Literasi',
            'Mocopat',
            'Elemen',
            'Tegese Tembung',
            'Catur',
            'Astronomi',
            'Pengantar',
            'Eksperimen Pikiran',
            'Penulis Obskur',
            'Tanah Jawa',
            'Nusantara',
            'Kronologis',
            'Luar Negeri',
            'Puisi',
            'Lukisan',
            'Sketsa',
            'Novel'
        ];

        foreach ($categories as $category) {
            //if category exists, then continue
            if (Category::where('name', $category)->exists()) {
                $this->command->warn("Category $category already exists");
                continue;
            }
            Category::create([
                'name' => $category
            ]);
            $this->command->info("Category $category created");
        }
    }
}
