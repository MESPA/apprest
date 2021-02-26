import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from '../rest.service';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user = {
    nombreUsuario: "",
    telefonoUsuario: "",
    username: "",
    password: ""
  };

  constructor(
    public modalController: ModalController,
    private restService: RestService,
    private alertService: AlertService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  createAccount(){
    this.restService.createAccount(
      this.user.nombreUsuario,
      this.user.telefonoUsuario,
      this.user.username,
      this.user.password,
    ).subscribe(result => {
      console.log(result);
      var data:any = result;

      if(data.status == "200"){
        this.alertService.simpleToast("Registro exitoso!","success");
        
        this.userService.user.username = this.user.username;
        this.userService.user.password = this.user.password;
        this.userService.doLogin();

        this.dismiss();
      }else{
        this.alertService.simpleToast("Ha ocurrido un error de nuestra parte. Vuelva a intentarlo.","warning");
      }
    },error => {

    });
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
