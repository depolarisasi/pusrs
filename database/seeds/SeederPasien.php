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
        factory(App\LaporanFaskes::class,10)->create()->each(function($u) {
            $u->save(factory(App\LaporanFaskes::class)->make());
          });
    }
}
