import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewcitaPageRoutingModule } from './newcita-routing.module';

import { NewcitaPage } from './newcita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewcitaPageRoutingModule
  ],
  declarations: [NewcitaPage]
})
export class NewcitaPageModule {}
