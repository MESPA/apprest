import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, IonSlides, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { AppComponent } from '../app.component';
import { ProductPage } from '../product/product.page';
import { CartService } from '../services/cart.service';
import { UserService } from '../services/user.service';
import { AddressService } from '../services/address.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('slideRecomendedProducts', {static: true}) slideRecomendedProducts: IonSlides;

  slideOpts = {
    initialSlide: 0,
    speed: 1000,
    effect: 'flip',
    autoplay:true
  };
  
  slideOpts_RecomendedProducts = {
    initialSlide: 0,
    speed: 1500,
    effect: 'flip',
    autoplay:true
  };

  constructor(
    public router: Router,
    public storageService: StorageService,
    public menuCtrl: MenuController,
    public modalController: ModalController,
    private appComponent: AppComponent,
    private cartService: CartService,
    private userService: UserService,
    private productService: ProductService,
    private addressService: AddressService
  ) {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {

  }

  goToMap(){
    this.router.navigate(["/map"]);
  }
  
  goToCart(){
    this.router.navigate(["/cart"]);
  }

  async presentProductModalById(productId){
    let i = 0;
    for(let product of this.productService.allProductsBK){
      if(product.id == productId) break;
      i++;
    }

    const modal = await this.modalController.create({
      component: ProductPage,
      swipeToClose: true,
      componentProps: {
        productIndex: i
      }
    });
    return await modal.present();
  }

}
