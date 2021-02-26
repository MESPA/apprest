import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  HtmlInfoWindow,
  MarkerIcon
} from '@ionic-native/google-maps';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map: GoogleMap;
  constructor(
    private googleMaps: GoogleMaps
  ) { }

  // MARKER ICONS
  iconUser:MarkerIcon = {
    url: 'assets/markers/marker_red_user.png',
    size: {
      width: 22,
      height: 40
    }
  };
  iconCar:MarkerIcon = {
    url: 'assets/markers/marker_blue_car.png',
    size: {
      width: 22,
      height: 40
    }
  };
  iconTaller:MarkerIcon = {
    url: 'assets/markers/marker_green_taller.png',
    size: {
      width: 22,
      height: 40
    }
  };

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    console.log("Begin loading map");
    // This code is necessary for browser
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyBYwZtnARVPJfzj42BZ-SQvCHrniH5h8Mk',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyDew7XYtmglQdYPKMzkTUEsXdK2-uW_3fM'
    });

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
            lat: 18.488121,
            lng: -69.959670
         },
         zoom: 13,
         tilt: 30
       }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
    .then(() => {
      // Now you can use all methods safely.
      this.getPosition();
    })
    .catch(error =>{
      console.log(error);
    });

    let markerCar: Marker = this.map.addMarkerSync({
      title: 'Masda Demio',
      icon: this.iconCar,
      animation: 'DROP',
      position: {
        lat: 18.488121,
        lng: -69.959670
      }
    });
    let marker2: Marker = this.map.addMarkerSync({
      title: 'Taller',
      icon: this.iconTaller,//'../../assets/markers/marker_red_user.png',
      
      animation: 'DROP',
      position: {
        lat: 18.485827,
        lng: -69.960060
      }
    });
    markerCar.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      //alert('clicked');
    });

    
    
    // INFO WINDOWS
    let htmlInfoWindow = new HtmlInfoWindow();

    let frame: HTMLElement = document.createElement('div');
    frame.innerHTML = [
      '<img src="https://m.lapulga.com.do/f/6450492-3.jpg">',
      '<h3 style="margin:0px;">Masda Demio Azul</h3>',
      '<span style="display:block;">Chasis: ZWE6K5WEbA5E46H5E</span>',
      '<span style="display:block;">Contacto: Juan Perez (829-654-3210)</span>',

    ].join("");
    frame.getElementsByTagName("img")[0].addEventListener("click", () => {
      htmlInfoWindow.setBackgroundColor('red');
    });
    htmlInfoWindow.setContent(frame, {
      width: "280px",
      height: "330px"
    });

    htmlInfoWindow.open(markerCar);
    console.log("End loading map");
  }

  getPosition(): void{
    this.map.getMyLocation()
    .then(response => {
      this.map.moveCamera({
        target: response.latLng
      });
      this.map.addMarker({
        title: 'Mi ubicacion',
        icon: this.iconUser,
        animation: 'DROP',
        position: response.latLng
      });
    })
    .catch(error =>{
      console.log(error);
    });
  }
}
