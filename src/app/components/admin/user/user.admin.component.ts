import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDTO } from 'src/app/dtos/product/product.dto';
import { Category } from 'src/app/models/category';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { OrderResponse } from 'src/app/responses/order/order.response';
import { ProductResponse } from 'src/app/responses/product/product.response';
import { UserResponse } from 'src/app/responses/user/user.response';
import { CategoryService } from 'src/app/services/category.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user.admin.component.html',
  styleUrls: ['./user.admin.component.scss']
})
export class UserAdminComponent implements OnInit {
  users?: UserResponse[]
  constructor(
      private userService: UserService, 
      private productService: ProductService,
      private router: Router
  ){}
  ngOnInit(): void {
    this.getAllUsers();
  }
  getAllUsers(){
    this.userService.getAllUsers().subscribe({
        next: (response: any)=> {
            debugger
            this.users = response
        }
    })
  }
  
  
}
