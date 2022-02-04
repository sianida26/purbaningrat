<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Author;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $users = [
            [
                'username' => 'admin',
                'name' => 'Administrator',
                'password' => 'StdPwdAdmin2022',
            ],
            [
                'username' => 'oneadmin',
                'name' => 'Subal Yudhapati Purbaningrat',
                'password' => 'prbngrt123',
            ],
        ];

        foreach ($users as $user) {
            //if user exists, skip
            if (User::where('username', $user['username'])->exists()) {
                $this->command->warn("User {$user['username']} already exists");
                continue;
            }
            $model = User::create([
                'name' => $user['name'],
                'username' => $user['username'],
                'password' => Hash::make($user['password']),
            ]);

            $model->author()->create([
                'location' => '',
                'description' => '',
            ]);

            $this->command->info("User {$user['username']} created");
        }
    }
}
