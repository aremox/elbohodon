import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines, post, Tag } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';
import { UsuarioService } from './usuario.service';


const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const bhdUrl = environment.bhdUrl;
const bhdCategoria =  environment.bhdCategoria;
const bhdPostPagina = environment.bhdPostPagina;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

const headersBHD = new HttpHeaders({
  'Cache-Control': 'no-cache',
  'Accept': '*/*',
  'Accept-Encoding': 'gzip, deflate, br',
  'Connection': 'keep-alive'
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;

  categoriaActual = '';
  categoriaPage = 0;

  tags: Tag[] = [];

  constructor(private http: HttpClient,
              private usuarioService: UsuarioService) { }

  private ejecutarQuery<T>( query: string) {
    query = apiUrl + query;
    return this.http.get<RespuestaTopHeadlines>(query , {headers});
  }

  private ejecutarQueryBHD<T>( query: string) {
    query = bhdUrl + query;
    return this.http.get<T>(query);
  }


  getTopHeadLines() {

    this.headlinesPage ++;

    return this.ejecutarQuery<RespuestaTopHeadlines>('/top-headlines?language=es&page='+this.headlinesPage);

    }
  

  getTopHeadLinesCategoria( categoria: string) {

    if (this.categoriaActual == categoria ){
      this.categoriaPage++;
    }else{
      this.categoriaPage=1;
      this.categoriaActual = categoria;
    }

    return this.ejecutarQuery<RespuestaTopHeadlines>('/top-headlines?language=es&category='+categoria+'&page='+this.categoriaPage);
  
    }

    getPostBHD(pull: boolean = false) {

      if( pull){
        this.headlinesPage=0;
      }

      this.headlinesPage ++;
  

      return this.ejecutarQueryBHD<post[]>('/wp/v2/posts?_embed&categories='+bhdCategoria+'&per_page='+bhdPostPagina+'&page='+this.headlinesPage);
   
  
      }

      getPostByTagsBHD(id) {

        if (this.categoriaActual == id ){
          this.categoriaPage++;
        }else{
          this.categoriaPage=1;
          this.categoriaActual = id;
        }
    
  
        return this.ejecutarQueryBHD<post[]>('/wp/v2/posts?_embed&categories='+bhdCategoria+'&per_page='+bhdPostPagina+'&page='+this.categoriaPage+'&tags='+id);
     
    
        }
      

      getTagsBHD(): Promise<Tag[]> {
      //  console.log("cargando tag")
          return new Promise( resolve => {
      
            this.ejecutarQueryBHD<Tag[]>(`/wp/v2/tags?_embed&_fields=id,name&per_page=100`)
            .subscribe( resp => {
              this.tags = resp;
              resolve(this.tags);
            });
      
          });    
      }

      getPostsTagsBHD() {
    
        return this.ejecutarQueryBHD<post[]>('/wp/v2/posts?categories='+bhdCategoria+'&per_page=100&page=1&_fields=tags');
      
    
        }

        getTagByIdBHD(id) {
    
          return this.ejecutarQueryBHD<Tag>('/wp/v2/tags/'+id+'?_fields=id,name');
        
      
          }
    async getCategorias(){
      if(this.tags.length < 1){
        await this.getTagsBHD();
      }
      return this.tags;
    }

    crearPost( post: any){
      const headers= new HttpHeaders({
        'Authorization': `Bearer ${this.usuarioService.token}`
      });

      return new Promise<boolean>( resolve=>{


      this.http.post(`${bhdUrl}/wp/v2/posts`,post,{headers})
      .subscribe( resp=>{
        resolve(true)
      },(error)=>{
        console.log(error)
        resolve(false)
      })
    });

    }

     
}
