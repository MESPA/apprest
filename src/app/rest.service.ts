import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CartService } from './services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  
  baseUrl:string = "http://138.68.47.221/api/v1/client/";
  // baseUrl:string = "/api/v1/client/";
  header = new HttpHeaders({
    "Content-Type": "application/json"
  });
  options = { headers : this.header };
  
  constructor(
    private http: HttpClient
  ) { }


  getAllProducts(){
    return this.http.get(this.baseUrl+"allProducts");
  }
  
  getOrders(userID){
    return this.http.get(this.baseUrl+"orders/"+userID);
  }
  
  getOrderFollow(orderID){
    return this.http.get(this.baseUrl+"order/follow/"+orderID);
  }
  
  getAsignOrders(userID){
    console.log("Rest UserID: ", userID);
    return this.http.get(this.baseUrl+"orders/asign/"+userID);
  }

  getDeliveryLocation(orderID){
    return this.http.get(this.baseUrl+"order/location/"+orderID);
  }
  
  setDeliveryLocation(userID, latitud, longitud){
    return this.http.post(
      this.baseUrl+"order/setlocation"+
      "?userID="+userID
      +"&latitud="+latitud
      +"&longitud="+longitud
      ,"",
      this.options
    );
  }
  
  closeOrder(orderID){
    return this.http.post(
      this.baseUrl+"order/close"+
      "?orderID="+orderID
      ,"",
      this.options
    );
  }

  submitOrder(order){
      return this.http.post(
        this.baseUrl+"order/save",order,
        this.options
      );
  }
  
  updateAccount(id:string,telefono:string,nombreUsuario:string,password:string){
      let pass = "";
      if(password != undefined) pass = password;

      return this.http.post(
        this.baseUrl+"updateAccount"+
        "?id="+id
        +"&telefono="+telefono
        +"&nombreUsuario="+nombreUsuario
        +"&password="+pass,"",
        this.options
      );
  }
  
  createAccount(nombreUsuario:string,telefono:string,username:string,password:string){
      let pass = "";
      if(password != undefined) pass = password;

      return this.http.post(
        this.baseUrl+"register"+
        "?nombreUsuario="+nombreUsuario
        +"&telefono="+telefono
        +"&userID="+username
        +"&password="+pass,
        
        "",
        this.options
      );
  }

  doLogin(username:string,password:string){
      return this.http.post(
        this.baseUrl+"login"+
        "?username="+username+"&password="+password,"",
        this.options
      );
  }
}
