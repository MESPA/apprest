import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(
    public router: Router,
    public menuCtrl: MenuController
  ) {
    this.menuCtrl.enable(false);
   }

  ngOnInit() {
  }

  gotologin(){
    this.router.navigate(["/login"]);
  }

}
