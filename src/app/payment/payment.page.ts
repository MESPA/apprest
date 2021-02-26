import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  

  constructor(
    private router: Router,
    private cartService: CartService,
    private paymentService: PaymentService
    ) { }

  ngOnInit() {
    //this.paymentService.efectivo.monto = this.cartService.order.total;
  }

  savePayment(){
    this.paymentService.savePayment();
  }

  selectPayment(paymentIndex){
    this.paymentService.selectPayment(paymentIndex);
    this.paymentService.applyPayment();
  }

  continuar(){
    this.router.navigate(["/verification"]);
  }

}
