import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavParams } from '@ionic/angular';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';
import 'leaflet-routing-machine';
import { RestService } from '../rest.service';
import { AlertService } from './alert.service';
import { GeolocateService } from './geolocate.service';
import { UserService } from './user.service';

declare var L: any;

@Injectable({
  providedIn: 'root'
})
export class MapService {

  orderID: string = "2020101800303585"; // orderFollow purpose only
  followedOrder: any;
  order: any = {
    ciudad: "",
    cliente: "",
    direccion: "",
    facturaID: "",
    fechaOrden: "",
    id: 0,
    identificacion: "",
    impuesto: 0,
    mail: "",
    ordenid: "",
    pais: "",
    subtotal: 0,
    sucursalid: 0,
    telefono: "",
    total: 0
  };
  products: any = [];

  status:number = 0;
  statusText:string = "Preparando";
  direccion = "";
  map: Leaflet.Map;

  LeafIcon = Leaflet.Icon.extend({
    options: {
        shadowUrl: './assets/markers/leaf-shadow.png',
        iconSize:     [35, 40],
        //shadowSize:   [50, 64],
        iconAnchor:   [22, 40],
        shadowAnchor: [4, 62],
        popupAnchor:  [-3, -35]
    }
  });

  green = new this.LeafIcon({iconUrl: './assets/markers/leaf-green.png'});
  red = new this.LeafIcon({iconUrl: './assets/markers/leaf-red.png'});
  orangeIcon = new this.LeafIcon({iconUrl: './assets/markers/leaf-orange.png'});

  latlng1 = {lat: 0, lng: 0};
  latlng2 = {lat: 0, lng: 0};

  m1:any = undefined;
  m2:any = undefined;

  route: any;

  constructor( 
    public router: Router, 
    public alertService: AlertService,
    private restService: RestService,
    private userService: UserService,
    public geolocateService: GeolocateService
  ) { }

  leafletMap(mapId: string = 'map') {
    
    this.map = Leaflet.map(mapId).setView([18.507437, -69.957932], 13);
    // Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   attribution: 'edupala.com © Angular LeafLet',
    // }).addTo(this.map);
    Leaflet.tileLayer('https://{s}.tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
      attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      minZoom: 0,
      maxZoom: 22,
      //subdomains: 'abcd',
      accessToken: '3VCBDe8OezC3GG7I4H1LzSKR1A6MgdmCNKdCXYlIyYsFe87QqjATKhkZeZZ2hF05'
    }).addTo(this.map);

    //Leaflet.marker([18.507437, -69.957932], {icon: this.redUser}).addTo(this.map).bindPopup('<h2>Cliente</h2>');//.openPopup();
    //Leaflet.marker([18.488311, -69.964225], {icon: this.blueCar}).addTo(this.map).bindPopup('Motorizado');//.openPopup();
    //Leaflet.marker([18.489421, -69.980330], {icon: this.orangeIcon}).addTo(this.map).bindPopup('Restaurant');//.openPopup(); 
  }

  addMarker(lat,lng, ico, popUpMessage){
    return Leaflet.marker([Number(lat), Number(lng)], {icon: ico}).addTo(this.map).bindPopup(popUpMessage);//.openPopup();
  }

  addPath(latlng1,latlng2){
    antPath([[latlng1.lat, latlng1.lng], [latlng2.lat, latlng2.lng]],
      { color: '#FF0000', weight: 5, opacity: 0.6 })
      .addTo(this.map);
  }

  orderFollow(){
    this.restService.getOrderFollow(this.orderID).subscribe( result => {
      let data:any = result;
      console.log(data);
      console.log("orderID: ",this.orderID);
      if(data.status == "200"){
        this.followedOrder = data.posts[0];
        console.log(this.followedOrder);
        this.products = this.followedOrder.products;
        this.direccion = this.followedOrder.order[0].direccion;
        this.setStatus(this.followedOrder.orderStatus);
        
        // client
        if(this.followedOrder.clienteLocation != null)
          this.m1 = this.addMarker(this.followedOrder.clienteLocation[0].latitud,this.followedOrder.clienteLocation[0].longitud,this.green,"<h3>Mi ubicacion</h3>");
        // deliver
        if(this.followedOrder.deliveryLocation != null)
          this.m2 = this.addMarker(this.followedOrder.deliveryLocation[0].latitud,this.followedOrder.deliveryLocation[0].longitud,this.red,"ORDER<h3>"+this.followedOrder.deliveryLocation[0].pedidoID+"</h3> En camino");
    
        this.mapFitBounds();
      }
    },error=>{
      console.log("Se ha producido un error",error);
    });
  }
  
  orderAsignFollow(){
    this.restService.getOrderFollow(this.orderID).subscribe( result => {
      let data:any = result;
      console.log(data);
      console.log("orderID: ",this.orderID);
      if(data.status == "200"){
        this.followedOrder = data.posts[0];
        console.log(this.followedOrder);
        this.products = this.followedOrder.products;
        this.order = this.followedOrder.order[0];
        this.direccion = this.followedOrder.order[0].direccion;
        this.setStatus(this.followedOrder.orderStatus);
        
        // client
        if(this.followedOrder.clienteLocation != null)
          this.m1 = this.addMarker(this.followedOrder.clienteLocation[0].latitud,this.followedOrder.clienteLocation[0].longitud,this.green,"ORDER<h3>"+this.followedOrder.deliveryLocation[0].pedidoID+"</h3>");
        // deliver
        if(this.followedOrder.deliveryLocation != null)
          this.m2 = this.addMarker(this.followedOrder.deliveryLocation[0].latitud,this.followedOrder.deliveryLocation[0].longitud,this.red,"<h3>Mi ubicacion</h3>");
    
        this.mapFitBounds();
      }
    },error=>{
      console.log("Se ha producido un error",error);
    });
  }

  setStatus(orderStatus:any){
    this.status = orderStatus.status;
    this.statusText = orderStatus.statusText;
  }

  getDeliveryLocation(){
    this.restService.getDeliveryLocation(this.orderID).subscribe( result => {
      let data:any = result;
      //console.log(this.m2);
      if(data.status == "200"){
        this.followedOrder = data.posts[0];
        // Status
        this.setStatus(this.followedOrder.orderStatus);
        // client
        if(this.followedOrder.deliveryLocation != null){
            if(this.m2 != undefined){
              this.setMarkerLocation(this.m2, this.followedOrder.deliveryLocation[0].latitud,this.followedOrder.deliveryLocation[0].longitud);
            }else{
              this.m2 = this.addMarker(this.followedOrder.deliveryLocation[0].latitud,this.followedOrder.deliveryLocation[0].longitud,this.red,"ORDER<h3>"+this.followedOrder.deliveryLocation[0].pedidoID+"</h3> "+this.statusText);
            }
        }
      }
    },error=>{
      console.log("Se ha producido un error",error);
    });
  }

  getMyLocation(){
    var latitud = 0;
    var longitud = 0;
    // get current location
    this.geolocateService.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp)
      latitud = resp.coords.latitude;
      longitud = resp.coords.longitude;
      //this.geolocateService.getAddress(latitud, longitud);
      this.setMarkerLocation(this.m2, latitud, longitud);
      this.sendNewLocation(this.userService.userdata.id,latitud,longitud)
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  setMarkerLocation(marker, lat, lng){
    marker.setLatLng(new Leaflet.LatLng(lat,lng)).update();
    this.mapFitBounds();
  }

  sendNewLocation(userID,lat,lng){
    this.restService.setDeliveryLocation(userID,lat,lng).subscribe(result => {},error => {});
  }
  
  closeOrder(){
    this.restService.closeOrder(this.orderID).subscribe(result => {
      var data: any = result;
      if(data.status == 200){
        console.log("Order closed!!");
        this.alertService.simpleToast("Orden cerrada!!","success");
        this.router.navigate(["/asignedOrders"]);
      }else{
        console.log("Error while closing order!!");
      }
    }, error => {});
  }

  mapFitBounds(){
    // var locations = [];
    // locations.push = {this.m1.};

    // var bounds = new L.LatLngBounds(arrayOfLatLngs);

    var lat1 = this.m1.getLatLng().lat;
    var lng1 = this.m1.getLatLng().lng; 
    var lat2 = this.m2.getLatLng().lat; 
    var lng2 = this.m2.getLatLng().lng;
    //this.map.fitBounds([[lat1,lng1],[lat2,lng2]]);
    this.addRoute({lat:lat1,lng:lng1},{lat:lat2,lng:lng2});
  }

  addRoute(latlng1,latlng2){
    var server_uri = "http://206.81.11.238:5000/route/v1/driving/";
    this.latlng1 = latlng1;
    this.latlng2 = latlng2;

    this.route = L.Routing.control({
      router: new L.Routing.OSRMv1({
        serviceUrl: server_uri
      }),
      waypoints: [
        L.latLng(this.latlng1.lat, this.latlng1.lng),
        L.latLng(this.latlng2.lat, this.latlng2.lng)
      ]
    });

    this.route.addTo(this.map);
  }
  
 
}
