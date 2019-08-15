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

ToDo for Apps API, setelah yg diatas beres
- User dapat signup, login, edit profile dan melakukan laporan gigitan nyamuk (bikin model, & table baru)
 
- Laporan penyakit (API dari web) dan juga laporan kasus gigitan nyamuk (laporan pengguna). Laporan pengguna dan faskes menggunakan warna berbeda, - DBD Hotspot memperlihatkan peta yang diberi warna gelap berdasarkan laporan terkonfirmasi dari fasilitas kesehatan (API dari web) 
- Alamat, gender, umur, dan bisa menambah histori kesehatan (laporan / konfirmasi) DBD - Rumah sakit terdekat / petunjuk ke RS terdekat jika pengguna termasuk dalam area hotspot dan melaporkan gigitan nyamuk atau melaporkan gejala DBD 
- Educational Video (Api dari dari web) - Berita (Api dari web) - Links website dinas kesehatan terdekat 
- Reminder Alert : Berupa reminder notification dari web API dan berupa tips / trik pencegahan praktis  
