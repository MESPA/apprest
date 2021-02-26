import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddressPage } from '../address/address.page';
import { RestService } from '../rest.service';
import { AddressService } from '../services/address.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(
    public modalController: ModalController,
    private userService: UserService,
    private addressService: AddressService,
    private restService: RestService
  ) { }

  ngOnInit() {
  }

  saveAccount(){
    this.restService.updateAccount(
      this.userService.userdata.id,
      this.userService.userdata.telefonoUsuario,
      this.userService.userdata.nombreUsuario,
      this.userService.userdata.password
    ).subscribe(result => {
      console.log(result);
    });
  }

  async presentAddressModal(){
    const modal = await this.modalController.create({
      component: AddressPage,
      swipeToClose: true
    });
    return await modal.present();
  }
}
