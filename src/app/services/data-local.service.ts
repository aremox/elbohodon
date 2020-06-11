import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { post } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: post[] = [];

  constructor(private storage: Storage) {
    this.cargarFavoritos();
   }

  guardarNoticias( noticia: post){

    const existe = this.noticias.find( noti => noti.title.rendered === noticia.title.rendered);

   // console.log('noticia', noticia)
   // console.log('existe', existe)

    if( !existe ){
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
    }
 
    

  }

  async cargarFavoritos() {
      const favoritos = await this.storage.get('favoritos');

    //  console.log('async await', favoritos);

      if(favoritos){
        this.noticias = favoritos;
      }

      
      
  }

  borrarNoticias( noticia:post){

    this.noticias = this.noticias.filter( noti => noti.title !== noticia.title );

    this.storage.set('favoritos', this.noticias );

  }

}
