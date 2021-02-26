import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsignedOrdersPageRoutingModule } from './asigned-orders-routing.module';

import { AsignedOrdersPage } from './asigned-orders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsignedOrdersPageRoutingModule
  ],
  declarations: [AsignedOrdersPage]
})
export class AsignedOrdersPageModule {}
