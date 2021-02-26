import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FollowAsignedOrderPageRoutingModule } from './follow-asigned-order-routing.module';

import { FollowAsignedOrderPage } from './follow-asigned-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FollowAsignedOrderPageRoutingModule
  ],
  declarations: [FollowAsignedOrderPage]
})
export class FollowAsignedOrderPageModule {}
