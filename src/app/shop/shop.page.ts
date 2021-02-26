import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from '../app.component';
import { IonSlides, ModalController, IonSegment } from '@ionic/angular';
import { ProductPage } from '../product/product.page';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {

  @ViewChild('slides', {static: true}) slides: IonSlides;
  @ViewChild('segment', {static: true}) segment: IonSegment;
  slideOpts = {
    initialSlide: 0,
    speed: 1000,
    effect: 'flip',
    //autoplay:true
  };
  currentSlide: any = 0;

  constructor(
    private appComponent: AppComponent,
    private productService: ProductService,
    public modalController: ModalController,
    private cartService:CartService
  ) {}

  ngOnInit() {
    this.productService.allProducts = this.productService.allProductsBK;
  }

  segmentChanged(ev: any) {this.slideTo(ev.detail.value)}
  slideTo(i){this.slides.slideTo(i);this.segment.value = i;}
  slideChanged(ev: any) {ev.currentTarget.scrollTo = 0;
    this.segment.value = ev.currentTarget.swiper.activeIndex;
    // Center selected tab
    document.getElementById(this.segment.value).scrollIntoView({ 
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    });
  }

  onSearchInput(event){
    this.slideTo(0);
    const searcher = event.srcElement.value;

    if (!searcher || searcher == "") {
      this.productService.allProducts = this.productService.allProductsBK;
      return;
    }

    this.productService.allProducts = this.productService.allProductsBK
      .filter(item => {
        if(item.nombre.toLowerCase().indexOf(searcher.toLowerCase()) >= 0){
          return item;
        }
      });
  }

  onSearchCancel(event){ // No tiene uso por el momento
    //this.appComponent.allProducts = this.appComponent.allProductsBK;
  }

  async presentProductModal(productIndex){
    const modal = await this.modalController.create({
      component: ProductPage,
      swipeToClose: true,
      componentProps: {
        productIndex: productIndex
      }
    });
    return await modal.present();
  }
  
  async presentProductModalById(productId){
    let i = 0;
    for(let product of this.productService.allProductsBK){
      if(product.id == productId) break;
      i++;
    }

    const modal = await this.modalController.create({
      component: ProductPage,
      swipeToClose: true,
      componentProps: {
        productIndex: i
      }
    });
    return await modal.present();
  }

}
