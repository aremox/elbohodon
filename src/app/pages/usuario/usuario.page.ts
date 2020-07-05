import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioRegistrado } from 'src/app/interfaces/interfaces';
import { NgForm } from '@angular/forms';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

  @ViewChild('passwordEyeRegister', { read: ElementRef, static: true }) passwordEye: ElementRef;

  passwordTypeInput  =  'password';

  spinner: boolean=true;

  usuario: UsuarioRegistrado = {}

  constructor(private usuarioService: UsuarioService,
              private uiService: UiServiceService) { }

  async ngOnInit() {
    this.spinner=true;
    this.usuario = await this.usuarioService.usuario;
    console.log("USUARIO 1:",this.usuario)
    if(!this.usuario.id ){
      await this.usuarioService.actualizarUsuario();
      this.usuario = await this.usuarioService.usuario;
      this.spinner=false;
    }else{
      this.spinner=false;
    }
    
  }

  togglePasswordMode() {
    //cambiar tipo input
  this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
   //obtener el input
   const nativeEl = this.passwordEye.nativeElement.querySelector('input');
   //obtener el indice de la posición del texto actual en el input
   const inputSelection = nativeEl.selectionStart;
   //ejecuto el focus al input
   nativeEl.focus();
  //espero un milisegundo y actualizo la posición del indice del texto
   setTimeout(() => {
       nativeEl.setSelectionRange(inputSelection, inputSelection);
   }, 1);

}

async actualizar(fActualizar: NgForm){
  this.spinner= true;
  if( fActualizar.invalid){return;}
  let usuarioActualizar: UsuarioRegistrado = {
    name: this.usuario.name,
    email: this.usuario.email,
    description: this.usuario.description
  }
//  this.usuarioService.actualizarUsuario()
  const valido = await this.usuarioService.actualizarUsuario(usuarioActualizar );
    if( valido){
      // navegar al tabs
      this.usuario = await this.usuarioService.usuario;
      this.uiService.alertaInformativa('Usuario actualizado.');
      this.spinner= false;
    } else {
      // mostar alerta de usuario y contraseña no correctos
      this.uiService.alertaInformativa('No se ha podido actualizar.');
      this.spinner= false;
    }
}

}
