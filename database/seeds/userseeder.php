<?php

use Illuminate\Database\Seeder;

class userseeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
             DB::table('users')->insert([
             'Id'=>'4',
            'name' => 'admin',
            'email' => 'admin'.'@gmail.com',
            'password' => bcrypt('admin123')
        ]);
    }
}
