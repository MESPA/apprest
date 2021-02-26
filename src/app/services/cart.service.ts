import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';
import { AddressService } from './address.service';
import { AlertService } from './alert.service';
import { MapService } from './map.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public order_template: any = {
    cart : [],
    total: 0,
    subtotal: 0,
    itbis: 0,
    service: 0,
    date: "",
    userID: undefined,
    payment: {},
    address: {},
    user: {},
    indications: ""
  };
  public order = Object.assign({}, this.order_template );
  public itbis_percent = 0.18;
  public service_percent = 0.10;
  public cartCount = 0;

  constructor(
    public router: Router,
    private userService: UserService,
    public alertService: AlertService,
    private restService: RestService,
    private mapService: MapService,
    //public addressService: AddressService
  ) { }

  submitOrder(){
    if(this.orderValidation() != 0) return;

    let message = "Procesando su orden<br> Por favor espere...";
    this.alertService.presentLoading(message);

    this.applyUser();
    this.applyDate();

    this.restService.submitOrder(this.order).subscribe(result => {
      var data:any = result;
      if(data.status == "200"){
        this.alertService.dismissLoading();
        this.alertService.simpleToast("Su orden ha sido tomada!","success");
        this.emptyOrder();
        // Go to order follow
        this.mapService.orderID = data.posts.order.ordenid;
        this.emptyOrder(); // clear cart
        this.goToOrderFollow();
      }else{
        this.alertService.dismissLoading();
        this.alertService.simpleToast("Ha ocurrido un error","danger");
      }
    });
  }

  orderValidation(){
    let status = 0; // status OK
    if(this.order.address.fulladdress == undefined){
      status = 1;
      this.alertService.simpleToast("Ingrese una dirección!","danger");
    }
    if(this.cartCount == 0){
       status = 2;
       this.alertService.simpleToast("Agregue algun producto al carrito!","danger");
    }

    return status;
  }

   async addToCart(product:any){
      let foundIndex = -1;
      let i = 0;
      
      foundIndex = await this.findInCart(product);
      if(foundIndex == undefined) { 
        this.order.cart.push(product);}else{
        this.order.cart[foundIndex].quantity += Number(product.quantity);
        this.order.cart[foundIndex].subtotal += Number(product.subtotal);
        
      }

      this.getCartTotals();
      console.log(this.order);
   }

   async findInCart(product:any){
    let i = 0;
    for (const item of this.order.cart) {
      let prodSBK = Object.assign({}, item );
      let prodBK = Object.assign({}, product );

      prodSBK.quantity = 0;
      prodBK.quantity = 0;

      prodSBK.subtotal = 0;
      prodBK.subtotal = 0;

      let areEqueal = await this.campareObjects(prodSBK,prodBK);
      if(areEqueal){
        return i;
      }

      i++;
    }
    return undefined;
   }

   async campareObjects(obj1,obj2){
    return (JSON.stringify(obj1) == JSON.stringify(obj2));
   }

   removeFromCart(index){
    this.order.cart.splice(index,1);
    this.getCartTotals();
   }

   sumProductQuantity(index){
     this.order.cart[index].quantity += 1;
     this.getCartTotals();
   }
   
   reduceProductQuantity(index){
     if(this.order.cart[index].quantity > 1) 
          this.order.cart[index].quantity -= 1;

      this.getCartTotals();
   }

   getCartTotals (){
    var sumAllPrices = 0;
    var sumAllQuantity = 0;
    this.order.cart.forEach(element => {
      sumAllPrices += Number(element.precio) * Number(element.quantity);
      sumAllQuantity += Number(element.quantity);
    });

    this.order.subtotal = this.twoDecimalNumber(sumAllPrices);
    this.order.itbis = this.twoDecimalNumber(this.order.subtotal * this.itbis_percent);
    this.order.service = this.twoDecimalNumber(this.order.subtotal * this.service_percent);
    this.order.total = this.twoDecimalNumber(this.order.subtotal + this.order.itbis + this.order.service);
    this.cartCount = sumAllQuantity;
   }

   twoDecimalNumber(val){
     return Number(val.toFixed(2));
   }

   public addDecimalCeroString(num){
    const dec = String(num).split('.')[1]
    const len = dec && dec.length > 2 ? dec.length : 2
    return Number(num).toFixed(len)
   }

   applyPayment(payment){
      this.order.payment = payment;
   }

   applyAddress(address){
      this.order.address = address;
   }

   applyUser(){
      this.order.user = this.userService.userdata;
   }
   
   applyDate(){
      this.order.date = this.getFullDateTime();
   }

   getDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    var now = yyyy + '-' + mm + '-' + dd;
    return now;
   }
   
   getFullDateTime(){
    return new Date().toJSON().replace('T',' ').slice(0,19);
    // return new Date().toLocaleString();
   }

   emptyOrder (){
    this.order.cart = [];
    this.getCartTotals();
    this.order.date = "";
    this.order.indications = "";
    this.cartCount = 0;
   }

   goToOrderFollow(){
      this.router.navigate(["/orderfollow"]);
   }
   
   goToAsignOrderFollow(){
      this.router.navigate(["/followAsignedOrder"]);
   }
}
