import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { ActionSheetController, Platform } from '@ionic/angular';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos = false;

  constructor(private iab: InAppBrowser,
              private actionSheetCtrl: ActionSheetController,
              private socialSharing: SocialSharing,
              private dataLocalService: DataLocalService,
              public toastCtrl: ToastController,
              private plataforma: Platform
              ) { }

  ngOnInit() {}


  abrirNoticia(){
    const browser = this.iab.create(this.noticia.url, '_system');
    console.log("Noticia:",this.noticia.url);
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
         // this.dataLocalService.borrarNoticias(this.noticia);
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
       //   this.dataLocalService.guardarNoticias(this.noticia);
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
        position: "top"
      });
      toast.present();
  }
  

  compartirNoticia() {
    if( this.plataforma.is("cordova")){
      this.socialSharing.share(
        this.noticia.title,
        this.noticia.source.name,
        '',
        this.noticia.url)
        .then((res) => {
      console.log(res);
        }).catch((error) => {
          console.error(error);
        });
    }
    if (navigator['share']) {
      navigator['share']({
        title: this.noticia.title,
        text: this.noticia.description,
        url: this.noticia.url,
      })
        .then(() => console.log('Compartido correctamente'))
        .catch((error) => console.log('Error al compartir', error));
    }
    console.log('Navegador no soportado');
  }

}
