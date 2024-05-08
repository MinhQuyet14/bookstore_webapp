import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrderResponse } from 'src/app/responses/order/order.response';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product.admin.component.html',
  styleUrls: ['./product.admin.component.scss']
})
export class ProductAdminComponent implements OnInit {
    constructor(
        private orderService: OrderService,
        private productService: ProductService,
        private router: Router,
    ){}
    ngOnInit(): void {
       
    }
   
}