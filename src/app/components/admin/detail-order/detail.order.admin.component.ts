import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { OrderDTO } from 'src/app/dtos/order/order.dto';
import { Order } from 'src/app/models/order';
import { OrderResponse } from 'src/app/responses/order/order.response';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-detail-order-admin',
  templateUrl: './detail.order.admin.component.html',
  styleUrls: ['./detail.order.admin.component.scss']
})
export class DetailOrderAdminComponent implements OnInit {
    orderResponse: OrderResponse = {
        id:0,
        user_id:0,
        fullname:'',
        phone_number:'',
        email:'',
        address:'',
        note:'',
        order_date: new Date(),
        status: '',
        total_money: 0,
        shipping_method: 'normal',
        shipping_address: '',
        shipping_date: new Date(),
        payment_method: 'other',
        order_details: []
    };
    orderId: number = 0;
    constructor(
        private orderService: OrderService,
        private route: ActivatedRoute,
        private router: Router,
    ){}
    ngOnInit(): void {
        this.getOrderDetail();
    }
    getOrderDetail():void {
        this.orderId = Number(this.route.snapshot.paramMap.get('id'));
        this.orderService.getOrderById(this.orderId).subscribe({
            next:(response:any)=> {
                debugger
                this.orderResponse.id = response.id
                this.orderResponse.user_id = response.user_id
                this.orderResponse.fullname = response.fullname
                this.orderResponse.email = response.email;
                this.orderResponse.phone_number = response.phone_number;
                this.orderResponse.address = response.address;
                this.orderResponse.note = response.note
                this.orderResponse.order_date = new Date (
                    response.order_date[0],
                    response.order_date[1] -1,
                    response.order_date[2]
                );
                this.orderResponse.order_details = response.order_details
                    .map((order_detail:any)=> {
                        return order_detail
                    });
                this.orderResponse.payment_method = response.payment_method;
                if(response.shipping_date) {
                    this.orderResponse.shipping_date = new Date(
                        response.shipping_date[0],
                        response.shipping_date[1]-1,
                        response.shipping_date[2]
                    );
                }
                this.orderResponse.shipping_method = response.shipping_method;
                this.orderResponse.status = response.status;
            },
            complete: ()=> {
                debugger
            },
            error: (error: any) => {
                debugger
            }
        })
    }
    saveOrder():void {
        debugger
        this.orderService.updateOrder(this.orderId, new OrderDTO(this.orderResponse)).subscribe({
            next: (response:any)=> {
                debugger
                alert('Cập nhật đơn hàng thành công !!!');
                this.router.navigate(['../'], {relativeTo: this.route});
            },
            complete: ()=> {
                debugger
            },
            error: (error:any)=> {
                debugger
                alert("Cập nhật không thành công, vui lòng kiểm tra lại ...");
            }
        })
    }
}