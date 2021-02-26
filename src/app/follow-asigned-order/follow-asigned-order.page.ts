import { Component, OnInit } from '@angular/core';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-follow-asigned-order',
  templateUrl: './follow-asigned-order.page.html',
  styleUrls: ['./follow-asigned-order.page.scss'],
})
export class FollowAsignedOrderPage implements OnInit {

  m1:any;
  m2:any;
  //latlng = {lat: 18.453437, lng: -69.857932};
  //products
  // custom swipe modal
  currentPosition;
  height;
  minimumThreshold;
  startPosition;

  constructor( 
    private mapService: MapService
  ) { }

  ngOnInit() {
    this.close();
    this.open();
  }
  
  ionViewDidEnter() { 
    this.mapService.leafletMap('mapId'); 
    this.mapService.orderAsignFollow(); // Firts data loading
    let self = this;
    setTimeout(function(){ self.getLocation(); }, 10000);
  }

  getLocation(){
    let self = this;
    setInterval(function(){ self.mapService.getMyLocation(); }, 10000);
  }

  /** Remove map when we have multiple map object */
  ngOnDestroy() {
    this.mapService.map.remove();
  }

  // custom swipe modal
  open(){
    (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.bottom = "0px";
    //(<HTMLStyleElement>document.querySelector(".bg")).style.display = "block";
  }

  close(){
    this.currentPosition = 0;
    this.startPosition = 0;

    (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.bottom = "-1000px";
    (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.transform = "translate3d(0px,"+(this.height - 120)+"px,0px)";
    //(<HTMLStyleElement>document.querySelector(".bg")).style.display = "none";
  }

  touchMove(evt: TouchEvent){
    //console.log("moving");
    if(this.startPosition == 0)
      this.startPosition = evt.touches[0].clientY;
    
    this.height = document.querySelector(".bottomSheet").clientHeight;
    var y = evt.touches[0].clientY;
    this.currentPosition = y - this.startPosition;
    if(this.currentPosition > 0 && this.startPosition > 0 && this.currentPosition < (this.height - 120))
      (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.transform = "translate3d(0px," + this.currentPosition + "px,0px)";
  }

  touchEnd(){
    this.minimumThreshold = this.height - 130;

    if(this.currentPosition < this.minimumThreshold){
      (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.transform = "translate3d(0px,0px,0px)";
    }else{
      //this.close();
    }
  }
}
