@extends('layouts.app')
@section('css')
@endsection
@section('content')
<div class="my-3 my-md-5">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <center><h1>Pilih Pemetaan</h1></center>
              </div>
              <div class="col-md-6">
            <center> <a href="{{url('pemetaan/kecamatan')}}" class="btn btn-lg btn-primary">Berdasarkan Kecamatan</a></center>
            </div>
            <div class="col-md-6">
                <center> <a href="{{url('pemetaan/faskes')}}" class="btn btn-lg btn-primary">Berdasarkan Fasilitas Kesehatan</a></center>
            </div>
        </div>
      </div>
    </div>
 
@endsection