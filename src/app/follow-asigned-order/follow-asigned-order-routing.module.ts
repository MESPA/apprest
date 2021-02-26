import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FollowAsignedOrderPage } from './follow-asigned-order.page';

const routes: Routes = [
  {
    path: '',
    component: FollowAsignedOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FollowAsignedOrderPageRoutingModule {}
