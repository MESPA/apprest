import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';
import { StorageService } from '../storage.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: any = {};
  public userdata: any = {};
  public rolID:any = 8;

  constructor(
    private router: Router,
    private restService: RestService,
    private storageService: StorageService,
    private alertService: AlertService
  ) { }

  doLogin(){
    this.restService.doLogin(this.user.username,this.user.password).subscribe(result => {
      console.log(result);
      var data:any = result;

      if(data.status == "200"){
        this.user.isLogged = true;
        if(!this.user.rememberme){
          this.user.username = "";
          this.user.password = "";
        }
        this.storageService.setObject('user', this.user);
        this.userdata = data.posts[0];
        this.storageService.setObject('userdata', this.userdata);
        console.log("User data:",this.userdata);
        //this.getUserLogged();

        if(this.userdata.rolID == 8){
          console.log("Client logged");
          this.router.navigate(["/home"]);
        }else if(this.userdata.rolID == 2){
          console.log("delivery logged");
          this.router.navigate(["/asignedOrders"]);
        }
      }else{
        this.alertService.simpleToast("Datos incorrectos!");
      }
    }, error => {
        console.log(error);
    });
  }

  doLogOut(){
    this.user.isLogged = false;
    console.log("Doing logout!");
    this.storageService.setObject('user',this.user);
    //this.getUserLogged();

    this.router.navigate(["/home"]);
  }

  getUserLogged() {
    //this.user.isLogged = false;
    this.storageService.getObject('user').then(result => {
      if (result != null) this.user = result;
    }).catch(e => {
      console.log('error: ', e);
    });
    this.storageService.getObject('userdata').then(result => {
      if (result != null) this.userdata = result;
      //console.log("Usuario Guardado: ",this.userdata);
    }).catch(e => {
      console.log('error: ', e);
    });
  }
}
