import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';
import { AlertService } from './alert.service';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  efectivo: any = {
    monto: 0,
    devuelta: 0,
    type: "efectivo",
    isSelected: true
  }
  payment: any = {
    name: "",
    cardNumber: "",
    cardNumberPresentation: "",
    type: "tarjeta",
    monto: 0,
    isSelected: true
  }

  payments: any = [];
  paymentSelected: any = {};

  constructor(
    private cartService: CartService,
    private storageService: StorageService,
    private alertService: AlertService
  ) { }

  savePayment(){
    this.addPayment(this.payment);
    this.payment = {
      name: "",
      cardNumber: "",
      cardNumberPresentation: "",
      type: "tarjeta",
      monto: 0,
      isSelected: true
    }
  }

  applyPayment(){
    this.cartService.applyPayment(this.paymentSelected);
  }

  addPayment(payment:any){
    this.nonSelectPayment();
    this.payments.push(payment);
    this.storageService.setObject("payments",this.payments);
  }

  selectPayment(paymentIndex){
    this.nonSelectPayment();
    this.payments[paymentIndex].isSelected = true;
    this.storageService.setObject("payments",this.payments);
    // Set selected and apply
    this.paymentSelected =this.payments[paymentIndex];
    this.applyPayment();
  }
  
  selectPaymentEfectivo(){
    this.nonSelectPayment();
    //this.payments[paymentIndex].isSelected = true;
    this.storageService.setObject("payments",this.payments);
    // Set selected and apply
    this.paymentSelected =this.efectivo;
    this.applyPayment();
  }

  nonSelectPayment(){
    for(let payment of this.payments){
      payment.isSelected = false;
    }
  }

  async removeFromPayments(paymentIndex){
    if(this.payments[paymentIndex].isSelected){
      await this.alertService.OkAlert("No es posible eleminar, debe seleccionar otra y luego reintentarlo.","Eliminar","Ok");
      return;
    }
    this.payments.splice(paymentIndex,1);
    this.storageService.setObject("payments",this.payments);
  }

  getAllPayments(){
    this.storageService.getObject('payments').then(result => {
      if (result != null) {
        this.payments = result;
        for(let payment of this.payments){
          if(payment.isSelected){
            this.paymentSelected = payment;
            break;
          }
        }
      }
    }).catch(e => {
      console.log('error: ', e);
    });
  }
}
