import { Component, OnInit, Input } from '@angular/core';
import { Article, post, Tag } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, ToastController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  @Input() noticia: post={};
  @Input() indice: number;
  @Input() enFavoritos = false;

  iconoGuadado: string='star';
  imagen: string="";


  constructor(private iab: InAppBrowser,
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
    private dataLocalService: DataLocalService,
    public toastCtrl: ToastController,
    private plataforma: Platform
    ) { }

  ngOnInit() {
    console.log(this.noticia)
    //console.log("tags en noticias:", this.noticia._embedded['wp:term'][1][0].name)
    if ( this.noticia._embedded['wp:featuredmedia'] ) {
    this.imagen= this.noticia._embedded['wp:featuredmedia'][0].source_url;
    }else{
      this.imagen="https://elbohodon.aremox.com/wp-content/uploads/IMG-20200524-WA0002-2.jpg"
    }
    if ( this.enFavoritos ) {
      this.iconoGuadado='star';
    }else{
      this.iconoGuadado='star-outline';
    }
  }

  abrirNoticia(){
    const browser = this.iab.create(this.noticia.link, '_system');
    console.log("Noticia:",this.noticia.link);
  }

  async lanzarMenu(){

    let guardarBorrarBtn;

    if ( this.enFavoritos ) {
      
      guardarBorrarBtn = {
        text: 'Borrar Favorito',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrar de favorito');
          this.dataLocalService.borrarNoticias(this.noticia);
          this.mostarToast("Noticia Borrada");
        }
      };


    }else{

      guardarBorrarBtn = {
        text: 'Favorito',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorito');
          this.dataLocalService.guardarNoticias(this.noticia);
          this.mostarToast("Noticia añadida");
        }
      };


    }


    const actionSheet = await this.actionSheetCtrl.create({
      
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.compartirNoticia();
          
        }
      }, guardarBorrarBtn,  {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    
  }

  async mostarToast( mensaje ) {
      const toast = await this.toastCtrl.create({
        message: mensaje,
        duration: 2000,
        position: "bottom"
      });
      toast.present();
  }

  guardarNoticia(){
    if ( this.enFavoritos ) {
          console.log('Borrar de favorito');
          this.dataLocalService.borrarNoticias(this.noticia);
          this.mostarToast("Noticia Borrada");
          this.iconoGuadado='star-outline';
          this.enFavoritos=false;
    }else{
          console.log('Favorito');
          this.dataLocalService.guardarNoticias(this.noticia);
          this.mostarToast("Noticia añadida");
          this.iconoGuadado='star';
          this.enFavoritos=true;
    }
  }
  

  compartirNoticia() {
    if( this.plataforma.is("cordova")){
      this.socialSharing.share(
        this.noticia.title.rendered,
        'Noticias',
        '',
        this.noticia.link)
        .then((res) => {
      console.log(res);
        }).catch((error) => {
          console.error(error);
        });
    }
    if (navigator['share']) {
      navigator['share']({
        title: this.noticia.title.rendered,
        text: this.noticia.excerpt.rendered,
        url: this.noticia.link,
      })
        .then(() => console.log('Compartido correctamente'))
        .catch((error) => console.log('Error al compartir', error));
    }
    this.mostarToast('Navegador no soportado');
    console.log('Navegador no soportado: ',this.plataforma.platforms.name);
  }

}
