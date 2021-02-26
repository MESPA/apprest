import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PreloadAllModules, RouterModule, Routes, RouterLink, Router } from '@angular/router';
import { StorageService } from './storage.service';
import { RestService } from './rest.service';
import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';
import { AddressService } from './services/address.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  

  constructor(
    private platform: Platform,
    public router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private productService: ProductService,
    private userService: UserService,
    private addressService: AddressService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.userService.getUserLogged();
    this.productService.getAllProducts();
    this.addressService.getAllAddress();
  }
}
