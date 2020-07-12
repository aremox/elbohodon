import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Tag } from 'src/app/interfaces/interfaces';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-envio',
  templateUrl: './envio.component.html',
  styleUrls: ['./envio.component.scss'],
})
export class EnvioComponent implements OnInit {

  @Input() tipo:string;

  tempImages:any=[];

  post= {
    title:'',
    content:'',
    status:'publish',
    tags:61,
    categories:2,
    posicion:false
  }
  categorias: Tag[] = []

  constructor(private modalCtrl: ModalController,
              private noticiasService: NoticiasService,
              private uiService: UiServiceService) { }

  ngOnInit(){}

  async ionViewDidEnter() {
    this.categorias = await this.noticiasService.getCategorias();
    console.log(this.categorias)
  }

  async crearPost(){
    console.log(this.post)
    const enviadoOk = await this.noticiasService.crearPost(this.post);
    if (enviadoOk === true){
      this.dismiss();
    }else{
      this.uiService.mostrarToast('No se ha podido enviar.', 'danger');
    }
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
