import { Injectable } from '@angular/core';
import { RestService } from '../rest.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orders: any = [];
  asignOrders: any = [];

  constructor(
    private restService: RestService,
    private userService: UserService
    ) { }

    getOrders(){
      this.restService.getOrders(this.userService.userdata.id).subscribe(result => {
        var data:any = result;
        if(data.status == "200"){
          this.orders = data.posts[0].orders;
        }else{
          console.log("Ha ocurrido un error en el servidor!");
        }
      },error =>{
        console.log(error);
      });
    }
    
    
    getAsignOrders(){
      let userID = this.userService.userdata.id;
      this.restService.getAsignOrders(userID).subscribe(result => {
        var data:any = result;
        console.log(this.userService.userdata.id);
        console.log(data);
        if(data.status == "200"){
          this.asignOrders = data.posts[0].orders;
        }else{
          console.log("Ha ocurrido un error en el servidor!");
        }
      },error =>{
        console.log(error);
      });
    }
}
