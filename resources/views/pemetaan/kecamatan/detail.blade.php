@extends('layouts.app')
@section('css')
<script type="text/javascript" src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js" charset="utf-8"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/c3/0.6.13/c3.min.css" />
<link href="https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css" rel="stylesheet" />
<script type="text/javascript" src="https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap4.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js" charset="utf-8"></script>
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
                   <div id="chart-wrapper" class="c3" style="height: 16rem"></div>
          <script>
                  	$(document).ready(function(){
                  		var chart = c3.generate({
                  			bindto: '#chart-wrapper', // id of chart wrapper
                  			data: {
                  				columns: [
                  				    // each columns data
                  					['data1', 2, 8, 6, 7, 14, 11,22],
                  					['data2', 5, 15, 11, 15, 21, 25,0,0,0],
                  					['data3', 17, 18, 21, 20, 30, 29]
                  				],
                  				type: 'line', // default type of chart
                  				
                  				names: {
                  				    // name of each serie
                  					'data1': 'Development',
                  					'data2': 'Marketing',
                  					'data3': 'Sales'
                  				}
                  			},
                  			axis: {
                  				x: {
                  					type: 'category',
                  					// name of each category
                  					categories: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni','Juli','Agustus','September','Oktober','November','Desember']
                  				},
                  			},
                  			legend: {
                                  show: false, //hide legend
                  			},
                  			padding: {
                  				bottom: 50,
                  				top: 0
                  			},
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