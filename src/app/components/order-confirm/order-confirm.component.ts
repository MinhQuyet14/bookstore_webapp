import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.scss']
})
export class OrderConfirmComponent implements OnInit {
  cartItems: {product: Product, quantity: number}[] = [];
  totalAmount: number = 0;
  constructor(private cartService: CartService, private productService: ProductService) { }

  ngOnInit(): void {
    debugger
    const cart = this.cartService.getCart();
    const productIds = Array.from(cart.keys());

    debugger
    this.productService.getProductsByIds(productIds).subscribe({
      next: (products: Product[]) => {
        debugger
        this.cartItems = productIds.map((productId) =>{
          debugger
          const product = products.find((p) => p.id === productId);
          if(product) {
            //product.url = "http://localhost:8080/api/v1/products/images/" + product.url;
          }
          const quantity = cart.get(productId);
          return {
            product: product!,
            quantity: quantity !== undefined ? quantity : 0
          };
        });
        console.log();
      },
      complete: () => {
        debugger;
        this.caculateTotal();
      },
      error: (error:any) => {
        debugger;
        console.error("ERROR", error);
      }
    })
  }

  caculateTotal(): void {
    this.totalAmount = this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

}
