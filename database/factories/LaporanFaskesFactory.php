<?php

use Faker\Generator as Faker;
use App\LaporanFaskes;
use Illuminate\Support\Str;
use App\Puskesmas;
use App\Kecamatan;
use App\Kelurahan;
$factory->define(LaporanFaskes::class, function (Faker $faker) {
    return [
        'kd_pasien' => Puskesmas::all()->random()->kode_puskesmas.$faker->randomNumber($nbDigits = NULL, $strict = false),
        'nik_pasien' => $faker->numberBetween($min = 300000000, $max = 350000000),
        'nama_pasien' => $faker->name,
        'alamat' => $faker->address,
        'kd_kel' => "327306000".$faker->numberBetween($min = 1, $max = 8),
        'kd_kec' => "3273060",
        'umur' => $faker->numberBetween($min = 1, $max = 70),
        'kd_icd' => $faker->randomElement(['A90', 'A91']),
        'kode_faskes' => Puskesmas::all()->random()->kode_puskesmas,
        'ns1' => 1,
        'kategori_pasien_wabah' => $faker->streetname,
        'status_layanan' => $faker->numberBetween($min = 1, $max = 3),
        'tgl_pelaynan' => $faker->dateTimeBetween($startDate = '-8 months', $endDate = 'now', $timezone = null, $format = 'Y-m-d') 
    ];
});
