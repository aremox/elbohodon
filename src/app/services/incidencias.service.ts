import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tiket } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from './usuario.service';


const URL = environment.bhdUrl;

@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {

  constructor(private http: HttpClient,
              private usuarioService: UsuarioService,
              private navCtrl: NavController) { }


  async enviarTiket(tiket:Tiket){
    console.log("valida token")

    await this.usuarioService.cargarToken();
    if(!this.usuarioService.token){ 
      this.navCtrl.navigateRoot('/tabs/login');
      return Promise.resolve(false)
    }
    

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.usuarioService.token}`
    })
    return new Promise<boolean>( resolve=>{

      this.http.post(`${URL}/wpas-api/v1/tickets`,tiket,{headers})
      .subscribe( resp=>{
        console.log(resp)
        resolve(true)
      },(error)=>{
        this.navCtrl.navigateRoot('/tabs/login');
        console.log("error:",error.error)
        resolve(false)
      })

    });
  }

}

