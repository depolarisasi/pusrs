@extends('layouts.app')
@section('content')
<div class="my-3 my-md-5">
          <div class="container">
            <div class="row">
              <div class="col-md-9">
                <form action="#" method="post" class="card">
                  @csrf
                  <div class="card-header">
                    <h3 class="card-title">Setting Pengguna</h3>
                  </div>
                  <div class="card-body">
                 
                        <div class="form-group">
                          <label class="form-label">Nama Pengguna</label>
                          <div class="form-control-plaintext">{{Auth::user()->name}} ({{Auth::user()->email}})</div>
                          <small>Untuk mengubah email harap hubungi administrator</small>
                        </div>
                        <div class="form-group">
                          <label class="form-label">Kode Faskes</label>
                         
                          <div class="form-control-plaintext">{{Auth::user()->kode_faskes}}</div>
                        </div>
                        <div class="form-group">
                          <label class="form-label">Kelurahan Faskes</label>
                          <div class="form-control-plaintext">{{Auth::user()->nama_kelurahan}}</div>
                        </div>
                        <div class="form-group">
                          <label class="form-label">Kecamatan Faskes</label>
                          <div class="form-control-plaintext">{{Auth::user()->nama_kecamatan}}</div>
                        </div>
                        <div class="form-group">
                          <label class="form-label">Alamat Lengkap Faskes</label>
                          @if(Auth::user()->role == 1 || Auth::user()->role == 2)
                          <div class="form-control-plaintext">{{$detail->alamat_puskesmas}}</div>
                          @else
                          <div class="form-control-plaintext">{{$detail->alamat_rs}}</div>
                          @endif
                        </div>
                        <div class="form-group">
                          <label class="form-label">Nomor Telp</label>
                          @if(Auth::user()->role == 1 || Auth::user()->role == 2)
                          <div class="form-control-plaintext">{{$detail->telp_puskesmas}}</div>
                          @else
                          <div class="form-control-plaintext">{{$detail->telp_rs}}</div>
                          @endif
                        </div>
                       
                        
                    
                 
                </div>
                <div class="card-footer text-right">
                  <div class="d-flex">
                   <!-- <button type="submit" class="btn btn-primary ml-auto">Update</button>-->
                  </div>
                </div>
              </form>
            
            </div>

            <div class="col-md-3">
                <div class="card">
                <div class="card-body">
                <center>
                    <a href="{{url('setting/password')}}" class="btn btn-md btn-primary">Ubah Password</a>
                    </center>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
 
@endsection