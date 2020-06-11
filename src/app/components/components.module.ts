import { NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NoticiaComponent } from './noticia/noticia.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [
    NoticiaComponent, 
    NoticiasComponent,
    PostComponent,
    PostsComponent
  ],
  exports: [
    NoticiasComponent,
    PostsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }
