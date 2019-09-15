@extends('layouts.app')
@section('css')
<style>

.thumbnail {
  width : 200px;
  height: 200px;
}

.italic { font-style: italic; }
.small { font-size: 0.8em; }

/** LIGHTBOX MARKUP **/

.lightbox {
	/** Default lightbox to hidden */
	display: none;

	/** Position and style */
	position: fixed;
	z-index: 999;
	width: 100%;
	height: 100%;
	text-align: center;
	top: 0;
	left: 0;
	background: rgba(0,0,0,0.8);
}

.lightbox img {
	/** Pad the lightbox image */
	max-width: 90%;
	max-height: 80%;
	margin-top: 2%;
}

.lightbox:target {
	/** Remove default browser outline */
	outline: none;

	/** Unhide lightbox **/
	display: block;
}
</style>
@endsection
@section('content')
<div class="my-3 my-md-5">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-header">
                    <h3 class="card-title">Detail Pasien</h3>
                   
                  </div>
                  <div class="card-body">
                
                 <br>
                
                        <div class="row">
                        <div class="col-md-9">
                        <div class="table-responsive">
                  <table class="table " style="width:100%">
        <tbody>
            <tr>
                <td><b>NIK Pasien</b></td>
                <td>{{$pasien->nik}}</td>
                </tr>
                <tr>
                <tr>
                <td><b>Nama Pasien, umur</b></td>
                @php
              $userDob = $pasien->tanggallahir;
              $dob = new DateTime($userDob);
              $now = new DateTime();
              $difference = $now->diff($dob);
              $age = $difference->y;
              @endphp
                <td>{{$pasien->nama_pasien}} ({{$age}} tahun) </td>
                </tr>
                <tr>
                <td><b>Alamat Pasien</b></td>
                <td>{{$pasien->alamat}}
                <br>{{$pasien->nama_kelurahan}}, <span class="text-uppercase">{{$pasien->nama_kecamatan}}</span></td>
                </tr>
               
              
                
        </tbody>
       
    </table>
    </div>
    <td><b>Riwayat Sakit Pasien :</b> 
    <br></td>

@if(count($riwayat) > 0)
    @foreach($riwayat as $r)
    <td><div class="card" style="width: 18rem;">
  <div class="card-body">
  <a href="{{url('laporan/detail/'.$r->idlaporan)}}"><b>Laporan #{{$r->idlaporan}}</b></a>
  <br>
  @if($r->kd_icd == "A90")
  PENYAKIT DD
  @elseif($r->kd_icd == "A91")
 PENYAKIT DHF
                @endif
                {{$r->nama_puskesmas}} <br>
                {{date('d M Y', strtotime($r->created_at))}}
  </div>
</div></td>
 
    @endforeach
    @else
    Tidak ada laporan penyakit untuk pasien ini
    @endif
                        </div>

                        <div class="col-md-3">
                 <a href="{{url('pasien/edit/'.$pasien->idpasien)}}" class="btn btn-md btn-warning">Ubah Pasien</a>
                 <a href="{{url('pasien/delete/'.$pasien->idpasien)}}" class="btn btn-md btn-danger">Hapus Pasien</a>
                 
                        </div>
                        </div>
                    
                 <script>
                    $(document).ready(function(){
                    $('.btn-danger').on('click', function(e){
                        e.preventDefault(); //cancel default action
                
                        //Recuperate href value
                        var href = $(this).attr('href');
                        var message = $(this).data('confirm');
                        swal({
  title: "Ingin Hapus Pasien?",
  text: "Pasien yang dhapus tidak dapat dikembalikan, aksi ini akan tercatat. Hapus?",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    swal("Pasien Telah Dihapus", {
      icon: "success",
    });
    window.location.href = href;
  } else {
    swal("Hapus Pasien Dibatalkan", {
      icon: "error",
    });
  }
});
                    });
                });
                 </script>
                </div>
                
</div> <!-- card !-->
            
            </div>

        </div>
      </div>
    </div>
 
@endsection