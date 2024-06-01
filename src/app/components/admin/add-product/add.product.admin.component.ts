import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { OrderDTO } from 'src/app/dtos/order/order.dto';
import { ProductDTO } from 'src/app/dtos/product/product.dto';
import { Order } from 'src/app/models/order';
import { OrderResponse } from 'src/app/responses/order/order.response';
import { ProductResponse } from 'src/app/responses/product/product.response';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product-admin',
  templateUrl: './add.product.admin.component.html',
  styleUrls: ['./add.product.admin.component.scss']
})
export class AddProductAdminComponent implements OnInit {
    
    productId: number = 0;
    productDTO?: ProductDTO;
    constructor(
        private productService: ProductService,
        private orderService: OrderService,
        private route: ActivatedRoute,
        private router: Router,
    ){}
    ngOnInit(): void {
    }
    addProduct(){
      this.router.navigate(['admin'])
    }
}