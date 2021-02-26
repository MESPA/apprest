import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewcitaPage } from './newcita.page';

const routes: Routes = [
  {
    path: '',
    component: NewcitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewcitaPageRoutingModule {}
