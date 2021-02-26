import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderfollowPageRoutingModule } from './orderfollow-routing.module';

import { OrderfollowPage } from './orderfollow.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderfollowPageRoutingModule
  ],
  declarations: [OrderfollowPage]
})
export class OrderfollowPageModule {}
