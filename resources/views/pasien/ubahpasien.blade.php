@extends('layouts.app')
@section('css')

<link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css" rel="stylesheet" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js"></script>

<link href="{{asset('css/bootstrap-datepicker.css')}}" rel="stylesheet" />
<script src="{{asset('js/bootstrap-datepicker.min.js')}}"></script>

<style>
    .rqubtn {
    background: #f1f1f1;
    border: 1px solid #a8a8a8;
    display: inline-block;
    height: 100px;
    overflow: hidden;
    position: relative;
    width: 100px;
}
.rqubtn input {
    height: 100px;
    opacity: 0;
}

.rqubtn::before {
    background: #474747;
    content: "";
    height: 2px;
    left: 30px;
    position: absolute;
    top: 49px;
    width: 40px;
}

.rqubtn:after {
    background: #474747;
    content: "";
    height: 40px;
    left: 49px;
    position: absolute;
    top: 30px;
    width: 2px;
}
.gux {
    background: #ff637d;
    border-radius: 100%;
    color: #ffffff;
    cursor: pointer;
    display: inline-block;
    height: 30px;
    outline: none;
    padding: 3px 10px;
    position: absolute;
    right: 5px;
    top: 5px;
    width: 30px;
}

#wrapperx .m-img-wrapper a {
    background: #ff637d;
    border-radius: 100%;
    color: #ffffff;
    cursor: pointer;
    display: inline-block;
    height: 30px;
    outline: none;
    padding: 3px 10px;
    position: absolute;
    right: 5px;
    top: 5px;
    width: 30px;
}

#imgwrapperx .m-img-wrapper {
    display: inline-block;
    height: 100px;
    margin-right: 20px;
    overflow: hidden;
    position: relative;
    width: 100px;

    
}
#imgwrapperx .m-img-wrapper img {
    width: 100%;
}

</style>
@endsection
@section('content')

<div class="my-3 my-md-5">
          <div class="container">
            <div class="row">
              <div class="col-md-8 offset-md-2">
                <form action="{{url('laporan/update')}}" method="post" class="card">
                @csrf
                  <div class="card-header">
                    <h3 class="card-title">Laporan Baru</h3>
                  </div>
                  <div class="card-body">
                  <div class="form-group">
                  <input type="hidden" value="{{$edit->idpasien}}" name="idpasien">
                          <label class="form-label">NIK Pasien</label>
                          <input type="text" class="form-control" name="nik" value="{{$edit->nik}}" required>
                          <small>Nomor Induk Kependudukan yang tertera pada kartu tanda penduduk / kartu keluarga</small>
                        </div>
                        <div class="form-group">
                          <label class="form-label">Nama Pasien</label>
                          <input type="text" class="form-control" name="nama_pasien" value="{{$edit->nama_pasien}}" required>
                        </div>
                        <div class="form-group">
                          <label class="form-label">Alamat Pasien</label>
                         
                          <input type="text" class="form-control" name="alamat_pasien" value="{{$edit->alamat}}" required>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Umur Pasien</label>
                            
                          <input type="text" class="form-control" name="umur_pasien" value="{{$edit->tanggallahir}}" required>
                          </div>
                        <div class="form-group">
                          <label class="form-label">Kecamatan Pasien</label>
  <select class="kecamatan form-control" name="kecamatan" required>
  <option value="{{$edit->kd_kec}}" selected="">{{$edit->nama_kecamatan}}</option>
  </select>
<script>
  $('.kecamatan').select2({
    placeholder: {
    id: '{{$edit->kd_kec}}', // the value of the option
    text: '{{$edit->nama_kecamatan}}'},
    ajax: {
      url: '/api/getkec',
      dataType: 'json',
      delay: 250,
      processResults: function (data) {
        return {
          results:  $.map(data, function (item) {
            return {
              text: item.nama_kecamatan,
              id: item.kode_kecamatan
            }
          })
        };
      },
      cache: true
    }
  });

</script>
                        </div>
                        <div class="form-group">
                          <label class="form-label">Kelurahan Pasien</label>
                          <div class="form-group">
                        <select name="kelurahan" class="form-control" required="">
                        
  <option value="{{$edit->kd_kel}}" selected="">{{$edit->nama_kelurahan}}</option>
                        </select>
                   <script>
                   
  $(document).ready(function() {
    var kode_kecx = $('select[name="kecamatan"]').val();
   
   if(kode_kecx) {

       $.ajax({

           url: '/api/getkel/?kodekecamatan='+kode_kecx,

           type: "GET",

           dataType: "json",

           success:function(data) {

               $('select[name="kelurahan"]').empty();

               $.each(data, function(key, value) {

                   $('select[name="kelurahan"]').append('<option value="'+ key +'">'+ value +'</option>');

               });


           }

       });

   }else{

      console.log("KSONK");
   }
       $('select[name="kecamatan"]').on('change', function() {
   
           var kode_kec = $('select[name="kecamatan"]').val();
   
           if(kode_kec) {
   
               $.ajax({
   
                   url: '/api/getkel/?kodekecamatan='+kode_kec,
   
                   type: "GET",
   
                   dataType: "json",
   
                   success:function(data) {
   
                       $('select[name="kelurahan"]').empty();
   
                       $.each(data, function(key, value) {
   
                           $('select[name="kelurahan"]').append('<option value="'+ key +'">'+ value +'</option>');
   
                       });
   
   
                   }
   
               });
   
           }else{
   
              console.log("KSONK");
           }
   
       });
   
   });
   </script>
                      </div>
                        </div>
                 
                     

                         <!-- <div class="form-group">
                        <div class="form-label">Dokumen Hasil Lab (Jika Ada)</div>
                        <div class="custom-file">
                          <input type="file" class="custom-file-input" name="scan_lab">
                          <label class="custom-file-label">File Scan/Foto Hasil Lab</label>
                        </div>
                      </div>
                    
                </div> -->
                <div class="card-footer text-right">
                  <div class="d-flex">
                    <button type="submit" class="btn btn-primary ml-auto">Ubah Laporan</button>
                  </div>
                </div>
              </form>
            
            </div>

        </div>
      </div>
    </div>
 
 
@endsection