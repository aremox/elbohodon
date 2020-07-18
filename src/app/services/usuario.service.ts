import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { Usuario, UsuarioRegistrado } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';


const URL = environment.bhdUrl;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public token: string = null;

  private usuario: UsuarioRegistrado = {}



  constructor(private http: HttpClient,
              private storage: Storage,
              private navCtrl: NavController) { }


  login( username: string, password: string ){
    const data = { username, password };

    return new Promise( resolve => {
      this.http.post(`${URL}/jwt-auth/v1/token`,data)
      .subscribe( async resp => {
        //console.log(resp);
  
        if( resp['token']){
          await this.guardarToken( resp['token'])
          console.log("Login OK");
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          console.log("Ususrio o contraseña incorrectos");
          resolve(false);
        }
  
      },
      (error ) => {
        this.token = null;
        this.storage.clear();
        console.log("Usuario o contraseña incorrectos");
        resolve(false);
      });
    });    
  }

  registro( usuario: Usuario){

    const data={
        "username": usuario.user_nicename,
        "email": usuario.user_email,
        "password": usuario.user_password
    }

    return new Promise( resolve => {
      this.http.post(`${URL}/wp/v2/users/register`,data)
      .subscribe( async resp => {
          await this.login(usuario.user_nicename, usuario.user_password)
          console.log(resp['message']);
          resolve(true);
      },
      (error ) => {
        console.log(error.error.message);
        resolve(false);
      });

    });
  }

  async guardarToken( token: string){
      this.token = token;
      await this.storage.set('token', token);

      await this.validaToken();
  }

  async actualizarUsuario( usuario?: UsuarioRegistrado): Promise<boolean>{
    console.log("actualiza usuario")
    await this.cargarToken();
    if(!this.token){ 
      this.navCtrl.navigateRoot('/tabs/login');
      return Promise.resolve(false)
    }

    if(!usuario){usuario={}}

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
    return new Promise<boolean>( resolve=>{
     this.http.post(`${URL}/wp/v2/users/me`,usuario,{headers})
    .subscribe( resp=>{
      if(resp['id']){
        this.usuario = resp;
        //console.log(this.usuario)
        //this.administrador();
        resolve(true);
      }else{
        resolve(false);
      }

    },(error)=>{
      this.navCtrl.navigateRoot('/tabs/login');
      console.log(error);
      resolve(false);
    });
  });
  
  }

  async validaToken():Promise<boolean>{
    console.log("valida token")
    const data = {}

    await this.cargarToken();
    if(!this.token){ 
      this.navCtrl.navigateRoot('/tabs/login');
      return Promise.resolve(false)
    }
    

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
    return new Promise<boolean>( resolve=>{

      this.http.post(`${URL}/jwt-auth/v1/token/validate`,data,{headers})
      .subscribe( resp=>{
        resolve(true)
      },(error)=>{
        this.navCtrl.navigateRoot('/tabs/login');
        resolve(false)
      })

    });
  }

  async cargarToken(){
    this.token = await this.storage.get('token') || null;
    
  }

  async getUsuario(){
    console.log("GetUsuario")
    //console.log(this.usuario)
    if( !this.usuario.id){
      await this.actualizarUsuario();
    }
    
    return {...this.usuario}
  }

  logout(){
    this.token = null;
    this.usuario = {};
    this.storage.clear();
    this.navCtrl.navigateRoot('/tabs/login', {animated: true});
  }

  async getRoles():Promise<string[]>{
    await this.cargarToken();
    const roles = [];
    
    if(this.usuario.roles){
      if(this.usuario.roles.length < 1){ 
        this.navCtrl.navigateRoot('/tabs/login');
        return Promise.resolve(roles)
      }
      if(this.usuario.roles.length > 0){
        return Promise.resolve(this.usuario.roles)     
      }else{
        return Promise.resolve(roles)  
      }
    }
    

  }


}
