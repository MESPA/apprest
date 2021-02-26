import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  constructor(
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    console.log(this.cartService.order);
  }

  scontinuar(){
    if(this.cartService.cartCount > 0){
      alert("Quieres continuar y proceder con el metodo de pago?");
      this.goToPayment();
    }
  }

  async continuar(){
    if(this.cartService.cartCount > 0){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Confirmar!',
        message: '<strong>Quieres continuar y proceder con el metodo de pago?</strong>',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              //console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Si, continuar',
            handler: () => {
              this.goToPayment();
            }
          }
        ]
      });
  
      await alert.present();
    }
  }

  goToPayment(){
    this.router.navigate(["/payment"]);
  }

}
