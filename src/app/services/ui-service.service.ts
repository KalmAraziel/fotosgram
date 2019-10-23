import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(
    public alertController: AlertController,
    public toastController: ToastController
  ) { }

  async alertaInformativa(mensaje: string) {
    const alert = await this.alertController.create({
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast( message: string) {
    const toast = await this.toastController.create({
      message,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
}
