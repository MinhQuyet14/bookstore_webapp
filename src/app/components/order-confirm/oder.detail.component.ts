import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { NgForm } from '@angular/forms';
import { OrderResponse } from 'src/app/responses/order/order.response';
import { OrderService } from 'src/app/services/order.service';
import { OrderDetail } from 'src/app/models/order.detail';
import { OrderDTO } from 'src/app/dtos/order/order.dto';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order.detail.component.html',
  styleUrls: ['./order.detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  orderResponse: OrderResponse ={
    id: 0,
    user_id: 0,
    fullname: '',
    phone_number: '',
    email: "",
    address: "",
    note: '',
    order_date: new Date(),
    status: '',
    total_money: 0,
    shipping_method: '',
    shipping_address: '',
    shipping_date: new Date(),
    payment_method: '',
    order_details: []
  }
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails():void {
    debugger
    const orderId = 1;
    this.orderService.getOrderById(orderId).subscribe({
      next: (response: any) => {
        
        this.orderResponse.id = response.id;
        this.orderResponse.user_id = response.user_id;
        this.orderResponse.fullname = response.fullname;
        this.orderResponse.email = response.email;
        this.orderResponse.phone_number = response.phone_number;
        this.orderResponse.address = response.address;
        this.orderResponse.note = response.note;
        this.orderResponse.order_date = new Date(
          response.order_date[0],
          response.order_date[1] - 1,
          response.order_date[2]
        );
        debugger;
        this.orderResponse.order_details = response.order_details
          .map((order_detail: OrderDetail) => {
            //set url for img
            debugger
            return order_detail;
          })
        this.orderResponse.payment_method = response.payment_method;
        this.orderResponse.shipping_method = response.shipping_method;
        this.orderResponse.status = response.status;
        this.orderResponse.total_money = response.total_money;
        this.orderResponse.shipping_date = new Date(
          response.shipping_date[0],
          response.shipping_date[1] - 1,
          response.shipping_date[2]
        );
      },
      complete: ()=>{
        debugger;
        this.orderResponse.total_money = this.caculateTotal();
        console.log(this.orderResponse);
      },
      error: (error:any)=>{
        debugger;
      }
    })
  }
  caculateTotal(): number {
    let total = 0
    debugger
    for(let i = 0; i < this.orderResponse.order_details.length; i++){
      total += this.orderResponse.order_details[i].total_money; // total_money = undefined ???
    }
    return total;
  }

}