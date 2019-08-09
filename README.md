# PUSRS Hub

PUSRS hub adalah sebuah sistem pengontrolan penyakit dengue di Kota Bandung, program ini digagas oleh Divisi Parasitologi Fakultas Kedokteran Unpad bekerja sama dengan Dinas Kesehatan Kota Bandung.
Tujuannya adalah mendapatkan insight lebih dalam bagaiamana penyebaran wabah DBD di kota Bandung. Permasalahan awalnya adalah ketidakcocokan laporan dari puskesmas dan rumah sakit, dimana terdapat double data dan fail diagnostic pada dbd. 

Dengan sistem ini diharapkan laporan lebih selaras dan terkontrol serta dapat menjadi early warning system tentang kondisi kesehatan warga kota Bandung khususnya DBD.

System detail :
Language used : PHP 7.3 (with Laravel Framework)


## Where to start ?

1. Clone repository ini
2. Install php composer
3. Run command berikut :
```
composer install //install composer dependencies
npm install //install js plugins
cp .env.example .env //buat .env 
php artisan key:generate //generate new key untuk hashing
php artisan migrate
```
4. Buat database, lalu download database yg tersedia yg sudah berisi data, lalu import database tersebut
5. Lihat dokumentasi yg tersedia di code

ToDo
- find alternatif untuk peta yang bisa memetakan heatmap berdasarkan jumlah kasus
- ubah algoritma laporan, 1 pasien dapat memiliki banyak kasus / laporan tapi tidak boleh dalam bulan yang sama (jika dibulan yang sama dianggap 1 laporan)
- buat API untuk keperluan mobile apps
- pemetaan berdasarkan kecamatan, cari peta kelurahan 
- buat chart untuk kasus perbulan, pertahun dan per minggu, chartnya bisa pake donut, atau linechart
- buat fitur export laporan kedalam bentuk xlsx
