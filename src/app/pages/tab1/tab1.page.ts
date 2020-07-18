import { Component, OnInit, ViewChild } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article, post, Tag } from '../../interfaces/interfaces';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];
  posts: post[] = [];
  tags: Tag[] = [];
  postTags: any[] = [];
  habilitado=true;

  slideOptions = {
    allowSlidePrev:false,
    allowSlideNext:false
  }

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(){
    this.cargarPost();
    this.noticiasService.nuevoPost
    .subscribe(post =>{
      this.posts.unshift(post);
    });
    
  }

  loadData( event){
    this.cargarPost(event);
  }


  recargar(event){
    this.posts = [];
    this.habilitado = true;
    this.cargarPost(event, true);

  }

  private cargarPost(event?, pull:boolean = false){

    this.noticiasService.getPostBHD( pull )
    .subscribe(
      (respPost) =>{
     //   console.log(respPost);
         if( event ){
           console.log("event");
           event.target.complete();
         
           if (respPost.length < environment.bhdPostPagina){
            //event.target.disabled = true;
            event.target.complete();
           }

          }
          
        this.posts.push(...respPost); 

      },
      (error ) => {
        console.log(error);
        event.target.complete();
        this.habilitado = false;
      } );
  }

}
