import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/responses/user/user.response';
import { OrderService } from 'src/app/services/order.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  userResponse?: UserResponse | null;
  adminComponent: string = 'orders';
  totalRevenue: number = 0;
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router,
    private orderService: OrderService,
  ){}
  ngOnInit(): void {
    this.userResponse = this.userService.getUserFromLocalStorage();
    this.total_revenue();
  }
  logout() {
      this.userService.removeUserFromLocalStorage();
      this.tokenService.removeToken();
      this.userResponse = this.userService.getUserFromLocalStorage();
      this.router.navigate(['/'])
  }
  showAdminComponent(componentName: string): void {
    this.adminComponent = componentName;
  }
  total_revenue() {
    this.orderService.getTotalRevenue().subscribe(
      (revenue: number) => {
        this.totalRevenue = revenue;
      },
      (error) => {
        console.error('Error fetching total revenue:', error);
      }
    );
  }
}
