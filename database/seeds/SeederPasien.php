<?php

use Illuminate\Database\Seeder;

class SeederPasien extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Pasien::class, 100)->create()->each(function($u) {
            $u->save(factory(App\Pasien::class)->make());
          });
    }
}
