import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { StorageService } from '../storage.service';
import { RestService } from '../rest.service';
import { RegisterPage } from '../register/register.page'
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { UserService } from '../services/user.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = "";
  password: string = "";
  rememberme: Boolean = false;
  user: any = {};

  constructor(
    public router: Router,
    public menuCtrl: MenuController,
    public storageService: StorageService,
    public restService: RestService,
    public modalController: ModalController,
    public appComponent: AppComponent,
    private userService: UserService,
    private alertService: AlertService
  ) {
    this.menuCtrl.enable(false);
   }

  ngOnInit() {
    this.user.username = "";
    this.user.password = "";
    this.user.rememberme = false;
    this.getUserLogged();
  }

  doLogin(){
   //console.log(this.user);
    this.userService.doLogin();
  }

  getUserLogged(){
   this.storageService.getObject('user').then(result => {
    if (result != null) {
      console.log('User: '+ result);
      if(result.rememberme) this.userService.user = result;
    }
    }).catch(e => {
      console.log('error: ', e);
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: RegisterPage,
      swipeToClose: true
    });
    return await modal.present();
  }

  remembermeChange(event){
    this.userService.user.rememberme = !this.userService.user.rememberme;
  }
}
