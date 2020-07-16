import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlide, IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { Usuario } from '../../interfaces/interfaces';
import { UsuarioRegistrado } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  spinner: boolean=false;

  @ViewChild('slidePrincipal' , {static: false}) slides: IonSlides;

  loginUser: Usuario = {
    user_email: 'ivanarenasmorante@gmail.com',
    user_password: 'qwerty'
  }

  registerUser: Usuario = {
    user_display_name: 'Ivan Arenas',
    user_password: '123456',
    user_email: 'test@test.es',
    user_nicename: 'test'
  };

  validUser: Usuario = { };

  constructor( private usuarioService: UsuarioService,
              private navCtrl: NavController,
              private uiService: UiServiceService) { }

  ionViewDidEnter() {
    this.slides.lockSwipes(true);
    this.spinner= false;
  }

  ngOnInit() {}


  async login(fLogin: NgForm ){
    this.spinner= true;
    console.log("login")
    if( fLogin.invalid){return;}

    await this.obtenerToken(this.loginUser);
    this.validUser=this.loginUser;

    

  }

  async obtenerToken(usuario: Usuario ){
    const valido = await this.usuarioService.login(usuario.user_email, usuario.user_password);
    if( valido){
      // navegar al tabs
      
      await this.actualizarUsuario(usuario);
      
    } else {
      // mostar alerta de usuario y contraseña no correctos
      this.uiService.alertaInformativa('Usuario o contraseña incorrectos.');
      this.spinner= false;
    }
  }

  async actualizarUsuario(usuario: Usuario ){

    let usurioRegistrado: UsuarioRegistrado = {
      email: usuario.user_email,
      name: usuario.user_display_name
    }
    
    const valido = await this.usuarioService.actualizarUsuario(usurioRegistrado);
    if( valido){
      // navegar al tabs
      this.navCtrl.navigateRoot('/tabs/usuario', { animated: true});
      console.log("Usuario actualizado")
    } else {
      // mostar alerta de usuario y contraseña no correctos
      console.log("Usuario no actualizado")
      this.spinner= false;
    }
  }

  async registro(fRegistro: NgForm){
    this.spinner= true;
    if( fRegistro.invalid){return;}
    const nicename = this.registerUser.user_email.split("@");
    
    this.registerUser.user_nicename = nicename[0];
    const valido = await this.usuarioService.registro( this.registerUser);
    if( valido){
      // navegar al tabs
      await this.obtenerToken(this.registerUser);
    } else {
      // mostar alerta de usuario y contraseña no correctos
      this.uiService.alertaInformativa('El correo electronico ya existe.');
      this.spinner= false;
    }
  }

  mostrarRegistro(){
    this.slides.lockSwipes( false );
    this.slides.slideTo(0);
    this.slides.lockSwipes( true );
    this.spinner= false;
  }

  mostrarLogin(){
    this.slides.lockSwipes( false );
    this.slides.slideTo(1);
    this.slides.lockSwipes( true );
    this.spinner= false;
  }

}
