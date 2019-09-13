@extends('layouts.app')
@section('css')

<link rel="stylesheet" href="{{asset('assets/plugins/jvectormap/jqvmap.min.css')}}" type="text/css" media="screen"/>
<script src="{{asset('assets/plugins/jvectormap/jquery.vmap.js')}}"></script>
<script src="{{asset('assets/plugins/jvectormap/bandung.js')}}"></script>
@endsection
@section('content')
<div class="row">

              <div class="col-md-8 col-lg-8">
                    <div id="vmap" style="width: 720px; height: 570px;"></div>
              </div>


              <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <div class="dimmer">
                            <div class="loader"></div>
                            <div class="dimmer-content">
                            <p>Pilih kecamatan di peta untuk informasi lengkap</p>
                            <table class="table card-table" id="infoside">
                            <thead>
                            <th>Nama Kelurahan</th>
                            <th>Jumlah Kasus</th> 
                            </thead>
                            <tbody id="info_kelurahan">
                    
                            <tbody></table>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
              
              <div class="col-md-12 mt-5">
               
              <div class="card">
                    <div class="card-body">
                        <div class="dimmer">
                            <div class="loader"></div>
                            <div class="dimmer-content">
                            <p>Kasus Terakhir Yang Dimasukan oleh Faskes</p>
                            <table class="table card-table" id="infobig">
                            <thead>
                            <th>Pasien</th>
                            <th>Domisili</th>
                            <th>Penyakit</th> 
                            <th>Faskes</th>
                            <th>Tanggal</th> 
                            </thead>
                            <tbody id="tabel_kelurahan">
                    
                            <tbody></table>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
             
 </div>

            <script>
$(document).ready(function() {
    $("#infoside").hide();
    $("#infobig").hide();
});
var sample2 = @php echo $dat; @endphp;
        jQuery('#vmap').vectorMap({
        
            map: 'bandung',
            backgroundColor: '#fff',
            color: '#eee',
            hoverOpacity: 0.5,
            selectedColor: '#666666',
            enableZoom: false,
            showTooltip: true,
            values: sample2,
            scaleColors: ['#ffb3b3','#ff8080','#ff4d4d','#ff1a1a','#e60000','#b30000', '#800000','#4d0000','#1a0000','#000000'],
            normalizeFunction: 'polynomial',
        
              onRegionClick: function(element, code, region){
        $.post({url : 'api/apiside',data: {kode_kec: code, _token : "{{csrf_token()}}"},
    beforeSend : function() {
        $(".dimmer").addClass('active');
        $(".data-samping").remove();},
    success : function(response) {
$(function() {
    for(var i=0;i<response.length;i++) {
        var td1="<tr class='data-samping'><td>"+response[i]["nama_kelurahan"]+"</td>";
        var td2 ="<td class='text-center'>"+response[i]["jumlah"]+"</td></tr>";
       $("#info_kelurahan").append(td1+td2); 
       $(".dimmer").removeClass('active');
       $("#infoside").show();}   
    });},
    error: function(XMLHttpRequest, textStatus, errorThrown) {
     alert("some error"); }
}); 


$.post({url : 'api/apitabel',data: {kode_kec: code, _token : "{{csrf_token()}}"},
    beforeSend : function() {
        $(".dimmer").addClass('active');
        $(".kelurahan").remove();},
    success : function(response) {
$(function() {
    for(var i=0;i<response.length;i++) {
        var td1="<tr class='kelurahan'><td><a href='/laporan/detail/"+response[i]["idlaporan"]+"'>"+response[i]["nama_pasien"]+"</a></td>";
        var td2 = "<td>"+response[i]["alamat"]+"</br>"+response[i]["nama_kecamatan"]+", "+response[i]["nama_kelurahan"]+"</td>";
        if(response[i]["kd_icd"] == "A90"){
            var nama_penyakit = "DD";
        }else if(response[i]["kd_icd"] == "A91"){
            var nama_penyakit = "DHF";
        }
        var td3 = "<td>"+nama_penyakit+"</td>";
        var td4 = "<td>"+response[i]["nama_puskesmas"]+"</td>";
        var td5 ="<td>"+response[i]["created_at"]+"</td></tr>";
       $("#tabel_kelurahan").append(td1+td2+td3+td4+td5); 
       $(".dimmer").removeClass('active');
       $("#infobig").show();}   
    });},
    error: function(XMLHttpRequest, textStatus, errorThrown) {
     console.log(XMLHttpRequest);
     console.log(textStatus);
     console.log(errorThrown); }
}); 
    }
          });
          </script>
@endsection