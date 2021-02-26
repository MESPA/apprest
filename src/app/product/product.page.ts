import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  
  private productIndex: any = this.navParams.get('productIndex');
  private product: any;
  private aditionals: any;

  constructor(
    public cartService: CartService,
    public productService: ProductService,
    public modalController: ModalController,
    public navParams: NavParams
  ) { }

  ngOnInit() {
    this.product = this.productService.allProductsBK[this.productIndex];
    
    // Initials values
    this.product.subtotal = Number(this.product.precio);
    this.product.quantity = 1;
    this.product.comment = "";
    this.product.options = [];
    
    this.aditionals = this.productService.aditionals
      .filter(item => {
        //console.log(item);
        //self.appComponent.addToCart(item);
        if(String(item.productoID).toLowerCase().indexOf(String(this.product.id).toLowerCase()) >= 0){
          return item;
        }
      });
  }

  addOne(){
    this.product.quantity++;
    this.callSubtotal();
  }
  
  removeOne(){
    if(this.product.quantity > 1) this.product.quantity--;
    this.callSubtotal();
  }

  callSubtotal(){
    this.product.subtotal = Number(this.product.precio) * Number(this.product.quantity);
  }

  addtoCart(){
    let prod = Object.assign({}, this.product );
    this.cartService.addToCart(prod);
    this.dismiss();
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  
}
