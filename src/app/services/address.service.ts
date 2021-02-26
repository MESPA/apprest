import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';
import { AlertService } from './alert.service';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  public addresses = [];
  public addressSelected = {
    fulladdress: " -- ",
    street: " -- ",
    number: " -- ",
    city: " -- ",
    country: "Republica Dominicana",
    isSelected: true
  }; 
  public address = {
    fulladdress: "",
    street: "",
    number: "",
    city: "",
    country: "Republica Dominicana",
    isSelected: true
  }; 

  constructor(
    private storageService: StorageService,
    private cartService: CartService,
    private alertService: AlertService
  ) { }

  saveAddress(){
    this.address.fulladdress = this.address.street + " " + this.address.number + ", " + this.address.city + " " + this.address.country
    this.addressSelected = this.address;
    this.addAddress(this.address);
    this.address = {
      fulladdress: "",
      street: "",
      number: "",
      city: "",
      country: "Republica Dominicana",
      isSelected: true
    }
  }

  selectAddress(addressIndex){
    this.nonSelectAddress();
    this.addresses[addressIndex].isSelected = true;
    this.storageService.setObject("addresses",this.addresses);
    this.addressSelected = this.addresses[addressIndex];
    this.applyAddress();
  }

  applyAddress(){
    this.cartService.applyAddress(this.addressSelected);
  }

  nonSelectAddress(){
    for(let address of this.addresses){
      address.isSelected = false;
    }
  }

  addAddress(address:any){
    this.nonSelectAddress();
    this.addresses.push(address);
    this.storageService.setObject("addresses",this.addresses);
    this.addressSelected = address;
    this.applyAddress();
  }

  async removeFromAddresses(addressIndex){
    if(this.addresses[addressIndex].isSelected){
      await this.alertService.OkAlert("No es posible eleminar la dirección, debe seleccionar otra y luego reintentarlo.","Eliminar","Ok");
      return;
    }
    this.addresses.splice(addressIndex,1);
    this.storageService.setObject("addresses",this.addresses);
  }

  getAllAddress(){
    this.storageService.getObject('addresses').then(result => {
      if (result != null) {
        this.addresses = result;
        for(let address of this.addresses){
          if(address.isSelected){
            this.addressSelected = address;
            this.applyAddress();
            break;
          }
        }
      }
    }).catch(e => {
      console.log('error: ', e);
    });
  }
}
