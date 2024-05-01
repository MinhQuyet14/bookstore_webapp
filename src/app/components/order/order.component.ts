import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { OrderDTO } from 'src/app/dtos/order/order.dto';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup;
  cartItems:{product: Product, quantity: number}[]=[];
  totalAmount: number = 0;
  orderData: OrderDTO = {
    user_id: 3,
    fullname: '',
    email: '',
    phone_number: '',
    address: '',
    note: '',
    total_money: 0,
    payment_method: 'cod',
    shipping_method: 'express',
    cart_items: []
  };
  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private orderService: OrderService,
    private fb: FormBuilder
  ) {
    this.orderForm = this.fb.group({});
   }

  ngOnInit(): void {
    debugger
    const cart = this.cartService.getCart();
    const productIds = Array.from(cart.keys());

    debugger
    this.productService.getProductsByIds(productIds).subscribe({
      next: (products) => {
        debugger
        this.cartItems = productIds.map((productId) =>{
          debugger
          const product = products.find((p) => p.id === productId);
          let quantity = cart.get(productId) as number;
          
          return {product: product!, quantity: quantity}
        })
      },
      complete: ()=>{
        debugger;
        this.caculateTotal();
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching detail: ' + error);
      }
    })
  }
  placeOrder() {
    debugger
    if(this.orderForm.valid){
      this.orderData = {
        ...this.orderData,
        ...this.orderForm.value
      };
      this.orderData.cart_items = this.cartItems.map(cartItem => ({
        product_id: cartItem.product.id,
        quantity: cartItem.quantity
      }));
      this.orderService.placeOrder(this.orderData).subscribe({
        next: (response:any)=>{
          debugger
          console.log('Đặt hàng thành công')
        },
        complete: ()=>{
          debugger
          this.caculateTotal()
        },
        error: (error: any) => {
          debugger
          console.log('Lỗi khi đặt hàng')
        }
      });
    } else {
      alert("Dữ liệu không hợp lệ, vui lòng kiểm tra lại...");
    }
  }
  caculateTotal(): void {
    this.totalAmount = this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

}
