import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines, post, Tag } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';
import { UsuarioService } from './usuario.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';


declare var window: any;

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const bhdUrl = environment.bhdUrl;
const host = environment.host;
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
              private usuarioService: UsuarioService,
              private fileTransfer: FileTransfer,
              private webview: WebView,
              private file: File,
              private filePath: FilePath,
              private fileChooser: FileChooser) { }

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

    async subirImagenes( img: string ){
      const fichero = await this.getFileInfo(img);
      const fileEntry = await this.getFileEntry(img)
      const formData = await this.getFormData(fileEntry)
      const options: FileUploadOptions = {
        fileKey: 'file',
      //  fileName: fileEntry.name,
      //  httpMethod: "POST",
      //  mimeType: 'image/jpeg',
        chunkedMode: false,
        headers: {
          //'Content-Type': 'multipart/form-data',
          //'Content-Disposition': 'form-data;',
          //'cache-control': 'no-cache',
          //'Content-Type': 'application/x-www-form-urlencoded',
          //'Content-Length': fichero.size,
          //'Host': host,
          //'Content-Type': 'image/jpeg',
          //'content-disposition': 'attachment; name="file"; filename=' + fileEntry.name,
          'Authorization': `Bearer ${this.usuarioService.token}`
        }
      };
      console.log("FileUploadOptions",fileEntry.nativeURL);
        const fileTransfer: FileTransferObject = this.fileTransfer.create();

         fileTransfer.upload( fileEntry.nativeURL, `${bhdUrl}/wp/v2/media`, options)
         .then( data => {
           console.log(data);
         }).catch(err => {
           console.log('error en carga', err);
         });


        // this.http.post(`${bhdUrl}/wp/v2/media`,formData,{headers})
        // .subscribe( resp=>{
        //  console.log(resp)
        // },(error)=>{
        //   console.log(error)
        // })

    }

     getFileInfo(imageData):Promise<any>{
      console.log("getFileInfo",imageData)
      return new Promise<any>( async resolve=>{
        const fileEntry = await this.getFileEntry(imageData)
         
          fileEntry.getMetadata((metadata) => {
              console.log("metadata",metadata);//metadata.size is the size in bytes
              resolve(metadata)
          });
      
      });
       
  }

  

getFileEntry(imgUri):Promise<any>{
  return new Promise<any>( resolve=>{
    this.file.resolveLocalFilesystemUrl(imgUri).then(fileEntry => {
      console.log(fileEntry);
      resolve(fileEntry)
    })
  })
}

getFormData (file: any) {
  return new Promise<any>( resolve=>{
    file.file(blob =>{


      
        const reader = new FileReader();
        reader.readAsArrayBuffer(blob);
        console.log("file",blob);
        reader.onload = () => {
            const formData = new FormData();
            const imgBlob = new Blob([reader.result], {
                type: file.type
            });
            console.log("Blob",Blob);
            formData.append('file', imgBlob, blob.name);
            resolve(formData);
        };
        reader.onerror = (error) => {
    
          console.log("error en Blob: ", error)
      
        };
      })





    })
  
  
  
}
  
}
