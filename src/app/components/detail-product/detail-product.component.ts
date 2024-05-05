import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
  product?: Product;
  productId: number = 0;
  apiUrl: string = "http://localhost/api/v1";
  quantity: number = 1;
  constructor(
    private productService: ProductService, 
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    debugger
    //this.cartService.clearCart();
    // const idParam: number = 5;
    // if(idParam !== null){
    //   this.productId = idParam;
    // }
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
    });
    if(!isNaN(this.productId)){
      this.productService.getDetailProduct(this.productId).subscribe({
        next: (response: any) => {
          // if(response.url && response.url.length > 0){
          //   response.url = `${this.apiUrl}+"/products/images/"+${response.url}`;
          // }
          this.product = response;
          //this.showImage();
        },
        complete() {
          debugger
        },
        error: (err: any) => {
          debugger
          console.error("Error fetching detail: " + err);
        },
      });
    } else {
      console.error("Invalid productId: " + this.productId);
    }
  }
  addToCart():void {
    debugger
    if(this.product){
      this.cartService.addToCart(this.productId, this.quantity);
      alert("Thêm sản phẩm thành công!")
    } else {
      console.error("Cannot add product to cart, product_id is null");
    }
  }

  increaseQuantity():void {
    this.quantity++;
  }

  decreaseQuantity():void{
    if(this.quantity > 1){
      this.quantity--;
    }
  }
  buyNow(): void {
    this.cartService.addToCart(this.productId, this.quantity);
    this.router.navigate(['/orders'])
  }
  // showImage(): void{
  //   debugger
  //   if(this.product && this.product.url && this.product.url.length > 0){
      
  //   }
  // }

}
