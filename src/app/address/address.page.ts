import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddressService } from '../services/address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private addressService: AddressService
  ) { }

  ngOnInit() {
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  saveAddress(){
    this.addressService.saveAddress();
  }

  selectAddress(addressIndex){
    this.addressService.selectAddress(addressIndex);
    this.dismiss();
  }
}
