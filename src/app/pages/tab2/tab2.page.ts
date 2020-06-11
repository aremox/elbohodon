import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article, post, Tag } from '../../interfaces/interfaces';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment, {static: true}) sergment: IonSegment;

  categorias = [ 'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias: Article[] = [];
  tags: Tag[] = [];
  posts: post[] = [];
  tagsAux: Tag[] = [];


  existe: Boolean = false;

  slideOptions = {
    allowSlidePrev:false,
    allowSlideNext:false
  }

  constructor( private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.cargarCategorias();
  //  this.cargarNoticias(61);
    this.sergment.value = '61';

   // this.cargarNoticias( this.categorias[0]);
  }

   cambioCategoria( event){
      this.posts= [];
      this.cargarNoticias( event.detail.value );
   }
 
  async cargarNoticias( categoria, event?){

   await this.noticiasService.getPostByTagsBHD( categoria)
    .subscribe(
      (respPost) =>{
       // console.log("Etiqueta2",respPost);

         if( event ){
          console.log("event");
          event.target.complete();
         }
          
        this.posts.push(...respPost); 

      },
      (error ) => {
        console.log(error);
        event.target.complete();
      } );
  }
  

   loadData( event) {
     this.cargarNoticias( this.sergment.value, event );

   }

  async cargarCategorias(event?){
  await  this.noticiasService.getPostsTagsBHD()
    .subscribe(
      (respPost) =>{    
        this.buscarTagsById(respPost);

        
        //  this.buscarTagById(respPost);
       // this.posts.push(...respPost); 
       
      },
      (error ) => {
        console.log(error);
      } );
  }

  async buscarTagsById(lista){
    for (let index = 0; index < lista.length; index++) {
      for (let index2 = 0; index2 < lista[index].tags.length; index2++) {
      const element = lista[index].tags[index2];
    this.noticiasService.getTagByIdBHD(element)
    .subscribe(
      (respPost: Tag) =>{
        let id = Number(respPost.id);
        const etiqueta = this.tagsAux.find( tag => tag.id === id);
       if (! etiqueta){
        this.tagsAux.unshift(respPost);
        this.tags = this.tagsAux.sort(this.compare);
      //  console.log(this.tags);
       }
      },
      (error ) => {
        console.log(error);
      } );
  }}
  await this.cargarNoticias(61);
}


private compare(a: Tag, b:Tag){
  if (a.id > b.id) {
    return 1;
  }
  if (a.id < b.id) {
    return -1;
  }
  // a must be equal to b
  return 0;
}




  
  


}
