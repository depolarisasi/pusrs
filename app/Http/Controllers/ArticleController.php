<?php

namespace App\Http\Controllers;

use App\article;
use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image as Image;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $article = article::join('users','users.id', '=','articles.penulis')
            ->select('articles.*','users.name','users.kode_faskes')->get();

            return view('article.semuaarticle',compact('article'));
    }


    public function new(){
        return view('article.articlebaru');

    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {

        $requestz = collect($request);
        $requestz->put('penulis', Auth::user()->id);
        $requestz->put('tanggal', date('Y-m-d'));
        $requestz->put('slug', Str::slug(substr($request['blogjudul'], 0, 50).'-'.substr(md5(microtime()), rand(0, 26), 5)));

        if ($request->file('thumb') == '') {
            $requestz->put('foto', 'img/blogimg.png');
            $requestz->put('thumbnailFoto', 'img/blog-thumb.png');
        } else {
            $file = $request->file('thumb');
            $fileArray = ['image' => $file];
            $rules = ['image' => 'mimes:jpeg,jpg,png,gif|required|max:1000000'];
            $validator = Validator::make($fileArray, $rules);
            if ($validator->fails()) {
                // Redirect or return json to frontend with a helpful message to inform the user
                // that the provided file was not an adequate type
                $err = '<strong>File yang di upload bukanlah gambar, atau ukuran gambar kamu melebihi batas upload</strong>';

                notify()->warning('Oh No ! File yang di upload bukanlah gambar, atau ukuran gambar anda melebihi batas upload';

                return redirect()->back();
            } else {
                // Store the File Now
                // read image from temporary file
                $fileName1 = time().'.'.$file->getClientOriginalName();
                $fileName2 = time().'.thumb.'.$file->getClientOriginalName();
                Image::make($file)->save('img/'.$fileName1);
                Image::make($file)->fit(800, 350)->save('img/'.$fileName2);
                $requestz->put('foto', 'img/'.$fileName1);
                $requestz->put('thumbnailFoto', 'img/'.$fileName2);
            }
        }

        $requestData = $requestz->all();

        try {
            article::create($requestData);
        } catch (\Illuminate\Database\QueryException $e) {
            return $e;
        }

        notify()->success('Berhasil! Post sudah diterbitkan!');

        return redirect('artikel');


    }


    /**
     * Display the specified resource.
     *
     * @param  \App\article  $article
     * @return \Illuminate\Http\Response
     */
    public function show(int $id)
    {
        $detail = article::find($id);
        return view('article.detailarticle')->with(compact('detail'));

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\article  $article
     * @return \Illuminate\Http\Response
     */
    public function edit(int $id)
    {
        $detail = article::find($id);
        return view('article.ubaharticle')->with(compact('detail'));

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\article  $article
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)

    {
        $edit = article::find($request->id);
        $requestz = collect($request);
        $requestz->put('slug', Str::slug(substr($request['blogjudul'], 0, 50).'-'.substr(md5(microtime()), rand(0, 26), 5)));

        if ($request->file('thumb') == '') {
            $requestz->put('foto', 'img/blogimg.png');
            $requestz->put('thumbnailFoto', 'img/blog-thumb.png');
        } else {
            $file = $request->file('thumb');
            $fileArray = ['image' => $file];
            $rules = ['image' => 'mimes:jpeg,jpg,png,gif|required|max:1000000'];
            $validator = Validator::make($fileArray, $rules);
            if ($validator->fails()) {
                // Redirect or return json to frontend with a helpful message to inform the user
                // that the provided file was not an adequate type
                $err = '<strong>File yang di upload bukanlah gambar, atau ukuran gambar kamu melebihi batas upload</strong>';

                notify()->warning('Oh No ! File yang di upload bukanlah gambar, atau ukuran gambar anda melebihi batas upload', 'warning');

                return redirect()->back();
            } else {
                // Store the File Now
                // read image from temporary file
                $fileName1 = time().'.'.$file->getClientOriginalName();
                $fileName2 = time().'.thumb.'.$file->getClientOriginalName();
                Image::make($file)->save('img/'.$fileName1);
                Image::make($file)->fit(800, 350)->save('img/'.$fileName2);
                $requestz->put('foto', 'img/'.$fileName1);
                $requestz->put('thumbnailFoto', 'img/'.$fileName2);
            }
        }

        $requestData = $requestz->all();

        try {
           $edit->update($requestData);
        } catch (\Illuminate\Database\QueryException $e) {
            return $e;
        }

        notify()->success('Berhasil! Post sudah diubah!');

        return redirect('artikel');


    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\article  $article
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id)
    {
        $article = article::find($id);

        try{
            $article->delete();
        }catch(QE $e){  return $e; } //show db error message

        notify()->success('Berhasil ! Article berhasil dihapus');
            return redirect('artikel');
    }
}
