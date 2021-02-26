import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddressPage } from '../address/address.page';
import { AddressService } from '../services/address.service';
import { CartService } from '../services/cart.service';
import { PaymentService } from '../services/payment.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {

  constructor(
    public modalController: ModalController,
    private productService: ProductService,
    private cartService: CartService,
    private addressService: AddressService,
    private paymentService: PaymentService
  ) { }

  ngOnInit() {
    if(this.addressService.addressSelected.fulladdress == " -- "){
     console.log("Address empty");
      this.presentAddressModal(); 
    }
  }

  async presentAddressModal(){
    const modal = await this.modalController.create({
      component: AddressPage,
      swipeToClose: true
    });
    return await modal.present();
  }
}
