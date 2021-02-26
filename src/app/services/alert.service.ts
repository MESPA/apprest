import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  loader: any;

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController
  ) { }


  async OkAlert(message:string,header:string,btnOk:string){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      buttons: [
        {
          text: btnOk,
          handler: () => {
            return true
          }
        }
      ]
    });

    await alert.present();
  }

  async simpleToast(message:string,color:string="danger") {
    const toast = await this.toastController.create({
      message: message,
      color: color,
      duration: 2000
    });
    toast.present();
  }

  async presentLoading(message = "Por favor espere!") {
    this.loader = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: message,
      duration: 2000
    });
    await this.loader.present();

    //const { role, data } = await this.loader.onDidDismiss();
    //console.log('Loading dismissed!');
  }

  dismissLoading(){
    this.loader.dismiss();
  }

}
