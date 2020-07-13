import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Tag } from 'src/app/interfaces/interfaces';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


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

  post= {
    title:'',
    content:'',
    status:'publish',
    tags:61,
    categories:2,
    posicion:false,
    coords: ''
  }
  categorias: Tag[] = []

  constructor(private modalCtrl: ModalController,
              private noticiasService: NoticiasService,
              private uiService: UiServiceService,
              private geolocation: Geolocation,
              private camera: Camera) { }

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
      this.noticiasService.subirImagenes(imageData);
 
      this.tempImages.push(img);
     }, (err) => {
      // Handle error
     });
  }

  

  changeListener(event){
    console.log(event.target.files[0]);
    const file = event.target.files[0];

  const reader = new FileReader();

  reader.readAsArrayBuffer(file);
  console.log(file);
  reader.onload = () => {

    // get the blob of the image:
    let blob: Blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))]);
    console.log(Blob);
    // create blobURL, such that we could use it in an image element:
    let blobURL: string = URL.createObjectURL(blob);
    console.log(blobURL);
    

     this.tempImages.push(blobURL);
  };

  reader.onerror = (error) => {

    //handle errors

  };
  }
}
