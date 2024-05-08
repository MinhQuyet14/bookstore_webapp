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
        shipping_method: '',
        shipping_address: '',
        shipping_date: new Date(),
        payment_method: '',
        order_details: []
    };
    orderId: number = 0;
    orderDTO?: OrderDTO;
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
        debugger
        this.orderService.getOrderById(this.orderId).subscribe({
            next:(response:OrderResponse)=> {
                debugger
                this.orderResponse.id = response.id
                this.orderResponse.user_id = response.user_id
                this.orderResponse.fullname = response.fullname
                this.orderResponse.email = response.email;
                this.orderResponse.phone_number = response.phone_number;
                this.orderResponse.address = response.address;
                this.orderResponse.note = response.note
                this.orderResponse.status = response.status;
                this.orderResponse.shipping_method = response.shipping_method;
                this.orderResponse.order_details = response.order_details
                    .map((order_detail:any)=> {
                        return order_detail
                    });
                this.orderResponse.total_money = response.total_money;
                this.orderResponse.payment_method = response.payment_method;
                debugger
                if (response.shipping_date) {
                    const year = response.shipping_date.getFullYear();
                    const month = response.shipping_date.getMonth() + 1;
                    const day = response.shipping_date.getDate();
                    this.orderResponse.shipping_date = new Date(year, month - 1, day);
                } else {
                    // Nếu shipping_date là null, sử dụng ngày tháng năm hiện tại
                    const currentDate = new Date();
                    const year = currentDate.getFullYear();
                    const month = currentDate.getMonth() + 1;
                    const day = currentDate.getDate();
                    this.orderResponse.shipping_date = new Date(year, month - 1, day);
                }
                // if(response.shipping_date) {
                //     this.orderResponse.shipping_date = new Date(
                //         response.shipping_date[0],
                //         response.shipping_date[1]-1,
                //         response.shipping_date[2]
                //     );
                // }
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
        this.orderDTO = {
            user_id: this.orderResponse.user_id,
            email: this.orderResponse.email,
            fullname: this.orderResponse.fullname,
            phone_number: this.orderResponse.phone_number,
            address: this.orderResponse.address,
            note: this.orderResponse.note,
            total_money: this.orderResponse.total_money,
            payment_method: this.orderResponse.payment_method,
            shipping_method: this.orderResponse.shipping_method,
            shipping_date: this.orderResponse.shipping_date,
            status: this.orderResponse.status,
            cart_items: this.orderResponse.order_details.map((order_detail:any) => ({
                product_id: order_detail.product.id,
                quantity: order_detail.number_of_products
            }))
        }
        debugger
        this.orderService.updateOrder(this.orderId, this.orderDTO).subscribe({
            next: (response:any)=> {
                debugger
                alert('Cập nhật đơn hàng thành công !!!');
                this.router.navigate(['admin'])//, {relativeTo: this.route});
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