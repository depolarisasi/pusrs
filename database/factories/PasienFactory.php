<?php

use Faker\Generator as Faker;
use App\Pasien;
use Illuminate\Support\Str;
use App\Puskesmas;
use App\Kecamatan;
use App\Kelurahan;
$factory->define(Pasien::class, function (Faker $faker) {
    return [
        'kd_pasien' => Puskesmas::all()->random()->kode_puskesmas.$faker->randomNumber($nbDigits = NULL, $strict = false),
        'nik' => $faker->numberBetween($min = 300000000, $max = 350000000),
        'nama_pasien' => $faker->name,
        'alamat' => $faker->address,
        'kd_kel' => Kelurahan::all()->random()->kode_kelurahan,
        'kd_kec' => Kecamatan::all()->random()->kode_kecamatan,
        'umur' => $faker->numberBetween($min = 1, $max = 70),
        'kd_icd' => $faker->randomElement(['A90', 'A91']),
        'kode_faskes' => Puskesmas::all()->random()->kode_puskesmas,
        'ns1' => 1,
        'kategori_pasien_wabah' => $faker->streetname,
        'status_layanan' => $faker->numberBetween($min = 1, $max = 3),
        'tgl_pelaynan' => $faker->date($format = 'Y-m-d', $max = 'now') 
    ];
});
