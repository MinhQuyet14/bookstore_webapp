import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrderResponse } from 'src/app/responses/order/order.response';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category-admin',
  templateUrl: './category.admin.component.html',
  styleUrls: ['./category.admin.component.scss']
})
export class CategoryAdminComponent implements OnInit {
    constructor(
        private orderService: OrderService,
        private productService: ProductService,
        private router: Router,
    ){}
    ngOnInit(): void {
       
    }
   
}