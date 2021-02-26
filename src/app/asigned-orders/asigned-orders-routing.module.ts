import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsignedOrdersPage } from './asigned-orders.page';

const routes: Routes = [
  {
    path: '',
    component: AsignedOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsignedOrdersPageRoutingModule {}
