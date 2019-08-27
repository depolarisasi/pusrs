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
                    <h3 class="card-title">Detail Laporan</h3>
                   
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
                <td>{{$detail->nik}}</td>
                </tr>
                <tr>
                <tr>
                <td><b>Nama Pasien, umur</b></td>
                <td>{{$detail->nama_pasien}} ({{$detail->umur}} tahun) </td>
                </tr>
                <tr>
                <td><b>Alamat Pasien</b></td>
                <td>{{$detail->alamat}}
                <br>{{$detail->nama_kelurahan}}, <span class="text-uppercase">{{$detail->nama_kecamatan}}</span></td>
                </tr>
                <tr>
                <td><b>Status Penyakit</b></td>
                <td><span class="badge badge-warning">@if($detail->kd_icd == "A90")
                Demam Dengue
                @elseif($detail->kd_icd == "A91")
                Dengue Hemorrhagic Fever
                @endif</span></td>
                <tr>
                <td><b>Faskes yang Melayani</b></td>
                
                <td>{{$detail->nama_puskesmas}}</td>
                </tr>
                <tr>
                <td><b>Bukti Pemeriksaan Laboratorium</b></td>
                <td>@if($detail->ns1 != NULL || $detail->ns1 == 1)
                <p>NS1 dengan hasil Positif</p>
                @elseif($detail->ns1 == NULL)
                Pemeriksaan Darah, Hemoglobin = {{$detail->hemoglobin}}, Leukosit = {{$detail->leukosit}}, Hematokrit = {{$detail->hematokrit}}%
                <br>Trombosit = {{$detail->trombosit}}
                @endif
                </td>
        </tbody>
       
    </table>
    </div>
    <td>@if($detail->scan_lab != NULL)
                @php
                $serial = unserialize($detail->scan_lab);
                @endphp
<p><b>Hasil Lab</b></p>
@foreach($serial as $un)
<!-- thumbnail image wrapped in a link -->
<a href="#{{$un}}">
  <img src="{{asset('hasillab/'.$un)}}" class="thumbnail">
</a>

<!-- lightbox container hidden with CSS -->
<a href="#_" class="lightbox" id="{{$un}}">
  <img src="{{asset('hasillab/'.$un)}}">
</a>
@endforeach
@else

<p><b>Hasil Lab tidak diupload oleh faskes {{$detail->nama_puskesmas}}</b></p>
@endif</td>
                        </div>

                        <div class="col-md-3">
                 <a href="{{url('laporan/edit/'.$detail->idpasien)}}" class="btn btn-md btn-warning">Ubah Laporan</a>
                 <a href="{{url('laporan/delete/'.$detail->idpasien)}}" class="btn btn-md btn-danger">Hapus Laporan</a>
                 
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
  title: "Ingin Hapus Laporan?",
  text: "Laporan yang dhapus tidak dapat dikembalikan, aksi ini akan tercatat. Hapus?",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    swal("Laporan Telah Dihapus", {
      icon: "success",
    });
    window.location.href = href;
  } else {
    swal("Hapus Laporan Dibatalkan", {
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