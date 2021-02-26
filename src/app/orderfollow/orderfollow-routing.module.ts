import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderfollowPage } from './orderfollow.page';

const routes: Routes = [
  {
    path: '',
    component: OrderfollowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderfollowPageRoutingModule {}
