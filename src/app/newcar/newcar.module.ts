import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewcarPageRoutingModule } from './newcar-routing.module';

import { NewcarPage } from './newcar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewcarPageRoutingModule
  ],
  declarations: [NewcarPage]
})
export class NewcarPageModule {}
