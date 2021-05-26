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
                <form action="{{url('pasien/new')}}" method="post" class="card">
                @csrf
                  <div class="card-header">
                    <h3 class="card-title">Pasien Baru</h3>
                  </div>
                  <div class="card-body">
                  <div class="form-group">
                          <label class="form-label">NIK Pasien</label>
                          <input type="text" class="form-control" name="nik" placeholder="NOMOR INDUK KEPENDUDUKAN" required>
                          <small>Nomor Induk Kependudukan yang tertera pada kartu tanda penduduk / kartu keluarga</small>
                        </div>
                        <div class="form-group">
                          <label class="form-label">Nama Pasien</label>
                          <input type="text" class="form-control" name="nama_pasien" placeholder="Nama Pasien" required>
                        </div>
                        <div class="form-group">
                          <label class="form-label">Alamat Pasien</label>

                          <input type="text" class="form-control" name="alamat" placeholder="Alamat Pasien" required>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Umur Pasien</label>
                            <div class="input-group date">
      <input type="text" id="inputtanggal" class="form-control" name="tanggallahir" required ><span class="input-group-addon"><i class="glyphicon glyphicon-th"></i></span>
    </div>

                          </div>
                        <div class="form-group">
                          <label class="form-label">Kecamatan Pasien</label>
  <select class="kecamatan form-control" name="kd_kec" required></select>
<script>
  $('.kecamatan').select2({
    placeholder: 'Cari...',
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
                        <select name="kd_kel" class="form-control" required="">
                        </select>
                   <script>

  $(document).ready(function() {

       $('select[name="kd_kec"]').on('change', function() {

           var kode_kec = $('select[name="kd_kec"]').val();

           if(kode_kec) {

               $.ajax({

                   url: '/api/getkel/?kodekecamatan='+kode_kec,

                   type: "GET",

                   dataType: "json",

                   success:function(data) {

                       $('select[name="kd_kel"]').empty();

                       $.each(data, function(key, value) {

                           $('select[name="kd_kel"]').append('<option value="'+ key +'">'+ value +'</option>');

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
                    <a href="{{url('pasien/')}}" class="btn btn-link">Cancel</a>
                    <button type="submit" class="btn btn-primary ml-auto">Tambah pasien</button>
                  </div>
                </div>
              </form>

            </div>

        </div>
      </div>
    </div>
   <script>
    $('#inputtanggal').datepicker({
        format: "yyyy-mm-dd"
    });
   </script>

@endsection
