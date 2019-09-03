@extends('layouts.app')
@section('css')
<script src="{{asset('js/tinymce/jquery.tinymce.min.js')}}"></script>
<script src="{{asset('js/tinymce/tinymce.min.js')}}"></script>
 
@include('mceImageUpload::upload_form')
<script>
  tinymce.init({
    selector: '#tiny',
    plugins: [
           'advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
           'searchreplace wordcount visualblocks visualchars fullscreen insertdatetime media nonbreaking',
           'save table contextmenu directionality paste textcolor eqneditor image imagetools'
         ],image_class_list: [
    {title: 'Auto Resize', value: 'img-fluid'},
],image_description: false,image_dimensions: false,
         toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist | link | preview fullpage | image',
         relative_urls: false,
             file_browser_callback: function(field_name, url, type, win) {
                 // trigger file upload form
                 if (type == 'image') $('#formUpload input').click();
             }
  });
  </script>

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
                <form action="{{url('artikel/new')}}" method="post" class="card" enctype="multipart/form-data">
                @csrf
                  <div class="card-header">
                    <h3 class="card-title">Artikel Baru</h3>
                  </div>
                  <div class="card-body">
                  <div class="form-group">
                          <label class="form-label">Judul Artikel</label>
                          <input type="text" class="form-control" name="judul" placeholder="Judul artikel" required>
                        </div>
                    
                        <div class="form-group">
                          <label class="form-label">Isi Artikel</label>
                          <textarea id="tiny" name="isi" cols="40" rows="20" class="form-control"></textarea>
                        </div>
                        <div class="form-group">
                          <label class="control-label col-md-2" for="profile">Gambar Thumbnail </label>
                          <div class="col-md-10">
                          <img src="" id="blah" style="max-width:700px;max-height:300px;" />
                          
                          <input type="file" id="inputprofilepic" name="thumb" class="validate" >
                          </div>
                          </div>

                <div class="card-footer text-right">
                  <div class="d-flex">
                 
                    <button type="submit" class="btn btn-primary ml-auto">Terbitkan</button>
                  </div>
                </div>
              </form>
            
            </div>

        </div>
      </div>
    </div>
  

<script type="text/javascript">

  function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
  
        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
        }
  
        reader.readAsDataURL(input.files[0]);
    }
  }
  
  $("#inputprofilepic").change(function () {
    readURL(this);
  });
  
  </script>
          
@endsection