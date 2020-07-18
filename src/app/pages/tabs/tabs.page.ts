import { Component, OnChanges, DoCheck, OnInit, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { ModalController } from '@ionic/angular';
import { EnvioComponent } from 'src/app/components/envio/envio.component';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage 
implements
OnChanges,
OnInit,
DoCheck,
AfterContentInit,
AfterContentChecked,
AfterViewInit,
AfterViewChecked,
OnDestroy {

  token:string = null;
  roles:string[] = [];
  administrador:boolean = false;

  constructor( private usuarioService: UsuarioService,
               public modalController: ModalController) {}

  async ngOnChanges(){
   // await this.usuarioService.cargarToken();
  //  this.token = this.usuarioService.token;
  //  console.log("ngOnChanges",this.token)
  }

  async ngOnInit(){
  //  await this.usuarioService.cargarToken();
  //  this.token = this.usuarioService.token;
  //  console.log("ngOnInit",this.token)
  }
  async ngDoCheck(){
  //  await this.usuarioService.cargarToken();
  //  this.token = this.usuarioService.token;
  //  console.log("ngDoCheck",this.token)
  }
  async ngAfterContentInit(){
    await this.usuarioService.cargarToken();
    this.token = this.usuarioService.token;
    this.ifAdministrador();
  //  console.log("ngAfterContentInit",this.token)
  }
  async ngAfterContentChecked(){
  //  await this.usuarioService.cargarToken();
    this.token = this.usuarioService.token;
    //this.ifAdministrador();
  //  console.log("ngAfterContentChecked",this.token)
  }
  async ngAfterViewInit(){
  //  await this.usuarioService.cargarToken();
  //  this.token = this.usuarioService.token;
  //  console.log("ngAfterViewInit",this.token)
  }
  async ngAfterViewChecked(){
  //  await this.usuarioService.cargarToken();
  //  this.token = this.usuarioService.token;
  //  console.log("ngAfterViewChecked",this.token)
  }
  async ngOnDestroy(){
  //  await this.usuarioService.cargarToken();
  //  this.token = this.usuarioService.token;
  //  console.log("ngOnDestroy",this.token)
  }

  async presentModal(tipo: string) {
    const modal = await this.modalController.create({
      component: EnvioComponent,
      swipeToClose: true,
      componentProps: {
        tipo 
      }
    });
    return await modal.present();
  }

  async ifAdministrador(){
    console.log("ifAdministrador")
    this.roles = await this.usuarioService.getRoles();
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
