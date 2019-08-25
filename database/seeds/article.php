<?php

use Illuminate\Database\Seeder;

class article extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {for($i = 0; $i<5 ; $i++) { 
        DB::table('articles')->insert([
            'judul' => 'test' . $i,
            'slug' => 'test1' . $i,
            'penulis' => 1,
            'isi' => 'dummy',
            'foto' =>'dummy',
            'thumbnailFoto' => 'dummy',
            'tanggal' =>'2019-01-01'

        ]);
    }
}
}
