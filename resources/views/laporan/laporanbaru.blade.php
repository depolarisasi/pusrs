@extends('layouts.app')
@section('css')
<link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css" rel="stylesheet" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js"></script>
<script src="{{asset('assets/js/up.js')}}"></script>

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
                <form action="{{url('laporan/new')}}" method="post" class="card">
                @csrf
                  <div class="card-header">
                    <h3 class="card-title">Laporan Baru</h3>
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

                          <input type="text" class="form-control" name="alamat_pasien" placeholder="Alamat Pasien" required>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Tanggal Lahir Pasien</label>


                            <input type="text" id="tgllahir" class="form-control" name="tanggal_lahir" placeholder="Tanggal Lahir Pasien" required>
                          <script>
                          $('#tgllahir').datepicker({
        format: "yyyy-mm-dd",
        maxViewMode: 3,
        todayHighlight: true
    });</script>
                          </div>
                        <div class="form-group">
                          <label class="form-label">Kecamatan Pasien</label>
  <select class="kecamatan form-control" name="kecamatan" required></select>
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
                        <select name="kelurahan" class="form-control" required="">
                        </select>
                   <script>

  $(document).ready(function() {

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
                        <div class="form-group">
                        <label class="form-label">Hasil Pemeriksaan Lab yang Tersedia</label>
                        <div class="selectgroup w-100">
                          <label class="selectgroup-item">
                            <input type="radio" id="ns1" name="pilihanlab" value="ns1" class="selectgroup-input" required>
                            <span class="selectgroup-button">NS1</span>
                          </label>
                          <label class="selectgroup-item">
                            <input type="radio" id="labdarah" name="pilihanlab" value="labdarah" class="selectgroup-input" required>
                            <span class="selectgroup-button">Pemeriksaan Lab Darah</span>
                          </label>

                        </div>



                      </div>

                      <div class="form-group" id="pilihns1">
                       <div class="selectgroup w-100">
                          <label class="selectgroup-item">
                            <input type="radio" name="hasilns1" value="true" class="selectgroup-input hasilns1">
                            <span class="selectgroup-button">Positif</span>
                          </label>
                          <label class="selectgroup-item">
                            <input type="radio" name="hasilns1" value="false" class="selectgroup-input hasilns1">
                            <span class="selectgroup-button">Negatif</span>
                          </label>

                        </div>

                      </div>
                      <div class="form-group" id="pilihlabdarah">

                      <label class="form-label">Jumlah Hemoglobin</label>
                      <input type="text" class="form-control" id="hb" name="hemoglobin" placeholder="Jumlah Hemoglobin">

                      <label class="form-label">Jumlah Leukosit</label>
                      <input type="text" class="form-control" id="leukosit" name="leukosit" placeholder="Jumlah Leukosit">

                      <label class="form-label">Jumlah Hematokrit</label>
                      <input type="text" class="form-control" id="hematokrit" name="hematokrit" placeholder="Jumlah Hematokrit tanpa persen">

                      <label class="form-label">Jumlah Trombosit</label>
                      <input type="text" class="form-control" id="trombosit" name="trombosit" placeholder="Jumlah Trombosit">
                      </div>


                      <script>
                      var ns1 = $('#ns1').prop('checked');
                      var labdarah =  $('#labdarah').prop('checked');
                            if(ns1 == true){
                            $("#pilihns1").show();
                            $("#pilihlabdarah").hide();
                            }else if(labdarah == true) {
                              $("#pilihlabdarah").show  ();
                            $("#pilihns1").hide();
                            }else {
                              $("#pilihns1").hide();
                            $("#pilihlabdarah").hide();
                            }

                            var pilihanlab = $('input[name="pilihanlab"]');

pilihanlab.change(function() {
 var checked = pilihanlab.filter(function() {
return $(this).prop('checked');
});
// Output the value of the checked radio
if(checked.val() == "ns1"){
$("#pilihlabdarah").hide();
$("#pilihns1").show();
$('.hasilns1').prop('required',true);

$('#hb').prop('required',false);
$('#leukosit').prop('required',false);
$('#hematokrit').prop('required',false);
$('#trombosit').prop('required',false);

}else if(checked.val() == "labdarah"){
$('.hasilns1').prop('checked',false);
$("#pilihlabdarah").show();
$('.hasilns1').prop('required',false);
$('#hb').prop('required',true);
$('#leukosit').prop('required',true);
$('#hematokrit').prop('required',true);
$('#trombosit').prop('required',true);
$("#pilihns1").hide();

}else {
$("#pilihlabdarah").hide();
$("#pilihns1").hide();
}
});
                          </script>


<div class="form-group" id="imgwrapperx" style="display:inline-block">
<label class="form-label">Upload Scan / Foto Hasil Pemeriksaan Disini : </label>
           <div class="rqubtn">
<img src="{{asset('img/loading.gif')}}" style="display:none; width: 100px; height: 100px;" id="loading_upload">
<input class="btn btn-default" name="image_file" id="image_file" style="display:inline-block; margin-right:10px" accept="image/*" type="file">
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
                    <a href="{{url('laporan/puskesmas')}}" class="btn btn-link">Cancel</a>
                    <button type="submit" class="btn btn-primary ml-auto">Tambah Laporan</button>
                  </div>
                </div>
              </form>

            </div>

        </div>
      </div>
    </div>


@endsection
