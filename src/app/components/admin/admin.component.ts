import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/responses/user/user.response';
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
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router,
  ){}
  ngOnInit(): void {
    this.userResponse = this.userService.getUserFromLocalStorage();
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
}
