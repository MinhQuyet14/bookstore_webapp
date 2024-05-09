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
  selector: 'app-detail-product-admin',
  templateUrl: './detail.product.admin.component.html',
  styleUrls: ['./detail.product.admin.component.scss']
})
export class DetailProductAdminComponent implements OnInit {
    productResponse: ProductResponse = {
        id: 0,
        name: '',
        price: 0,
        url: '',
        description: '',
        category_id: 0,
        author: ''
        };
    productId: number = 0;
    productDTO?: ProductDTO;
    constructor(
        private productService: ProductService,
        private orderService: OrderService,
        private route: ActivatedRoute,
        private router: Router,
    ){}
    ngOnInit(): void {
        this.getProductDetail();
    }
    getProductDetail():void {
        this.productId = Number(this.route.snapshot.paramMap.get('id'));
        debugger
        this.productService.getDetailProduct(this.productId).subscribe({
            next: (response: ProductResponse) => {
                debugger
                this.productResponse.id = response.id
                this.productResponse.name = response.name
                this.productResponse.url = response.url
                this.productResponse.description = response.description
                this.productResponse.price = response.price
                this.productResponse.category_id = response.category_id
                this.productResponse.author = response.author
            },
            complete: ()=>{
                debugger
            },
            error: (error: any) => {
                debugger
                console.log('Cannot fetching data: ', error);
            }
        })
    }
    saveOrder():void {
        debugger
        this.productDTO = {
            name: this.productResponse.name,
            url: this.productResponse.url,
            price: this.productResponse.price,
            description: this.productResponse.description,
            author: this.productResponse.author
        }
        debugger
        this.productService.updateProduct(this.productId, this.productDTO).subscribe({
            next: (response:any)=> {
                debugger
                alert('Cập nhật sản phẩm thành công !!!');
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