import { Injectable } from '@angular/core';
import { RestService } from '../rest.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public allCategoriesWithProducts: any = [];
  public allProductsBK: any = [];
  public allProducts: any = [];
  public allRecomendedProducts: any = [];
  public aditionals: any = [];
  public fotoBasePath = "http://138.68.47.221/images/";
  constructor(private restService: RestService) { }

  getAllProducts(){
    //console.log(this.user);
     this.restService.getAllProducts().subscribe(result => {
         console.log(result);
         var data:any = result;
 
         if(data.status == "200"){
           this.allCategoriesWithProducts = data.posts[0];
           this.allProductsBK = data.posts[1];
           this.aditionals = data.posts[2];
           this.allRecomendedProducts = data.posts[3];
           this.allProducts = this.allProductsBK;
           console.log(this.allProducts);
         }
 
     }, error => {
         console.log(error);
     });
   }
}
