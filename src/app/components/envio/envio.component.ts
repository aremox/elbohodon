import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Tag, Tiket } from 'src/app/interfaces/interfaces';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UsuarioService } from 'src/app/services/usuario.service';
import { IncidenciasService } from 'src/app/services/incidencias.service';


declare var window: any;

@Component({
  selector: 'app-envio',
  templateUrl: './envio.component.html',
  styleUrls: ['./envio.component.scss'],
})
export class EnvioComponent implements OnInit {

  @Input() tipo:string;

  tempImages:any=[];

  cargandoGeo= false;
  spinner: boolean=false;
  enviando=false;

  post= {
    title:'',
    content:'',
    status:'publish',
    tags:61,
    categories:2,
    posicion:false,
    coords: '',
    img: '',
    tipo:'incidencia',
    telefono:''
  }

  tipos = [{
    id:1,
    slug: 'incidencia',
    nombre:'Nueva incidencia'
  },{
    id:2,
    slug: 'consulta',
    nombre:'Realizar consulta'
  },{
    id:3,
    slug: 'propuesta',
    nombre:'Enviar propuesta'
  }]

  categorias: Tag[] = [];
  roles:string[] = [];
  administrador:boolean = false;

  constructor(private modalCtrl: ModalController,
              private noticiasService: NoticiasService,
              private uiService: UiServiceService,
              private geolocation: Geolocation,
              private camera: Camera,
              private usuarioService: UsuarioService,
              private incidenciasService:IncidenciasService ) { }

  ngOnInit(){
    this.getRoles();
  }

  async ionViewDidEnter() {
    this.categorias = await this.noticiasService.getCategorias();
    console.log(this.categorias)
  }

  async crear(){
    console.log(this.post)
    this.spinner= true;
    this.enviando= true;
    if(this.roles.find(x => x ==='administrator')==='administrator'){
      this.crearPost();
    }
    if(this.post.tags){
      this.crearIncidencua();
    }
  }

  async crearIncidencua(){
    let tiket:Tiket = {
      title: this.post.title,
      content: 'Teléfono: '+this.post.telefono+'<br>'+this.post.content,
      status: this.post.status,
      ticket_channel: 'standard-ticket-form',
      ticket_type: this.post.tipo
    } 
    const enviadoOk = await this.incidenciasService.enviarTiket(tiket);
    if (enviadoOk === true){
      this.spinner= false;
      this.dismiss();
    }else{
      this.spinner= false;
      this.uiService.mostrarToast('No se ha podido enviar.', 'danger');
    }
  }

  async crearPost(){
    console.log(this.post)
    this.spinner= true;
    this.enviando= true;
    const enviadoOk = await this.noticiasService.crearPost(this.post);
    if (enviadoOk === true){
      this.spinner= false;
      this.dismiss();
    }else{
      this.spinner= false;
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

  getGeo(){

    if( !this.post.posicion){
      this.post.coords=null;
      console.log("cancelar geo")
      return;
    }
    this.cargandoGeo=true;
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.cargandoGeo=false;
      const coods = `${resp.coords.latitude},${resp.coords.longitude}`;
      console.log("coodenadas",coods);
      this.post.coords = coods;
     }).catch((error) => {
      this.cargandoGeo=false;
       console.log('Error getting location', error);
     });
  }

  camara(){
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    }
    this.procesarImg(options);
  }

  galeria(){
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.procesarImg(options);
  }

  procesarImg(options:CameraOptions){
    this.camera.getPicture(options).then((imageData) => {
      const img = window.Ionic.WebView.convertFileSrc(imageData);
     // this.noticiasService.subirImagenes(imageData);
      this.post.img= imageData;
      this.tempImages.push(img);
     }, (err) => {
      // Handle error
     });
  }

  async getRoles(){
    console.log("getRoles")
    this.roles = await this.usuarioService.getRoles();
    console.log("roles: ",this.roles)
    if(this.roles){
      console.log(this.administrador)
      if(this.roles.find(x => x ==='administrator')==='administrator'){
        this.administrador = true;
        console.log(this.administrador)
      }else{
        this.administrador = false;
        console.log(this.administrador)
      }
    }
    
  }

}
