import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController, IonSegment } from '@ionic/angular';
import { NewcarPage } from '../newcar/newcar.page'




@Component({
  selector: 'app-newcita',
  templateUrl: './newcita.page.html',
  styleUrls: ['./newcita.page.scss'],
})
export class NewcitaPage implements OnInit {


  // Current date (utc)
  date = new Date();
  // Las horas de diferencia del timezone segun dispositivo en milisegundos
  dateOffSet = (this.date.getTimezoneOffset() * 60 * 1000);
  // Min date for date picker (+ 2 days - dateOffSet)
  minDate = new Date(new Date().getTime()+(172800000) - this.dateOffSet).toISOString(); 
  // The current datetime
  currentDate = new Date(this.date.getTime() - this.dateOffSet).toISOString();
  
  @ViewChild('slides', {static: true}) slides: IonSlides;
  @ViewChild('segment', {static: true}) segment: IonSegment;
  slideOpts = {
    initialSlide: 0,
    speed: 1000,
    effect: 'flip',
    //autoplay:true
  };
  currentSlide: any = 0;

  horaSelected: string;

  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() {
    console.log("2 Days: ",this.minDate);
    console.log("This moment: ",this.currentDate);
  }

  segmentChanged(ev: any) {
    //console.log('Segment changed', ev);
    //console.log('Value', ev.detail.value);
    this.slideTo(ev.detail.value);
  }

  slideTo(i){
    this.slides.slideTo(i);
    this.segment.value = i;
  }

  slideChanged(ev: any) {
    ev.currentTarget.scrollTo = 0;
    this.segment.value = ev.currentTarget.swiper.activeIndex;
    //this.slides.el.scrollTop = 0;
    
  }

  async presentModalNewcarPage() {
    const modal = await this.modalController.create({
      component: NewcarPage,
      swipeToClose: true
    });
    return await modal.present();
  }

  selectHora(event:any,hora){
    this.horaSelected = hora;
    console.log("Hora selected:",this.horaSelected);
  }
}
