import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { CartService } from '../services/cart.service';
import { MapService } from '../services/map.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-asigned-orders',
  templateUrl: './asigned-orders.page.html',
  styleUrls: ['./asigned-orders.page.scss'],
})
export class AsignedOrdersPage implements OnInit {

  constructor(
    public router: Router,
    private menuCtrl: MenuController,
    private orderService: OrderService,
    private cartService: CartService,
    private mapService: MapService
    ) { 
      this.menuCtrl.enable(true);
    }

  ngOnInit() {
    let self = this;
    this.orderService.getAsignOrders();
    setTimeout(function(){ self.getOrders(); }, 30000);
  }

  getOrders(){
    let self = this;
    setInterval(function(){ self.orderService.getAsignOrders(); }, 30000);
  }

  orderFollow(ordenid){
    // Go tu order follow
    this.mapService.orderID = ordenid;
    this.cartService.goToAsignOrderFollow();
  }

}
