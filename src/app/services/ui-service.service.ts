import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(private alertController: AlertController,
              private toastController: ToastController) { }

  async alertaInformativa(message: string) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async mostrarToast(message: string,  color: string) {
    const toast = await this.toastController.create({
      message,
      color,
   //   position: 'middle',
      duration: 2000
    });
    toast.present();
  }
}
