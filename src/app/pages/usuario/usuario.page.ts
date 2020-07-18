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

  ngOnInit(){}

  async ionViewDidEnter() {
    this.spinner=true;
    this.usuario = await this.usuarioService.getUsuario();
    //console.log(this.usuario);
    this.spinner=false;

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
      this.usuario = await this.usuarioService.getUsuario();
      this.uiService.mostrarToast('Usuario actualizado.', 'success');
      this.spinner= false;
    } else {
      // mostar alerta de usuario y contraseña no correctos
      this.uiService.mostrarToast('No se ha podido actualizar.', 'danger');
      this.spinner= false;
    }
}

logout(){
 this.usuarioService.logout();
}

}
