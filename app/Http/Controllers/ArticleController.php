<?php

namespace App\Http\Controllers;

use App\article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return article::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
       

        if($request->image_upload != '' && $request->image_upload1){

      
                $article = new article();
                $article->judul=$request->judul;
                $article->slug=$request->slug;
                $article->penulis= $request->penulis;
                $article->isi = $request->isi;
                $article->thumbnailFoto= $request ->image_upload1->getClientOriginalName().".".$request->image_upload1->getClientOriginalExtension();
                $article->tanggal = new Date("Y-m-d h:i:sa");
                $article->foto = $request ->image_upload->getClientOriginalName().".".$request->image_upload->getClientOriginalExtension();
                File::copy('temporary/'.$request->image_upload, 'article/'.$request->image_upload); //copy ke article folder
                if (File::exists('temporary/'.$request->image_upload)) { //jika ada di temporary
                    File::delete('temporary/'.$request->image_upload); //delete saja
                }
                 File::copy('temporary/'.$request->image_upload1, 'article/'.$request->image_upload1); //copy ke article folder
                if (File::exists('temporary/'.$request->image_upload1)) { //jika ada di temporary
                    File::delete('temporary/'.$request->image_upload1); //delete saja
                }
if ($article->save()){

    return true;
}    
}

    }


    /**
     * Display the specified resource.
     *
     * @param  \App\article  $article
     * @return \Illuminate\Http\Response
     */
    public function show(int $id)
    {
        return article::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\article  $article
     * @return \Illuminate\Http\Response
     */
    public function edit(int $id, Request $request)
    { $article =article::find($id);
        $article->judul = $request->judul;
        $article->slug=$request->slug;
        $article->penulis= $request->penulis;
        $article->isi = $request->isi;
        if ($article->save() )
        {
            return true;
        }
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\article  $article
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id)
    {
        $article =article::find($id);
        if($article->delete()){
            return true;
        }
    }
}
