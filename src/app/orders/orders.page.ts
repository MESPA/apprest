import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { MapService } from '../services/map.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  constructor(
    public router: Router,
    private orderService: OrderService,
    private cartService: CartService,
    private mapService: MapService
    ) { }

  ngOnInit() {
    this.orderService.getOrders();
  }

  orderFollow(ordenid){
    // Go tu order follow
    this.mapService.orderID = ordenid;
    this.cartService.goToOrderFollow();
  }

}
