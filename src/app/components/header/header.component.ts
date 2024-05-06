import { Component, OnInit } from '@angular/core';

import { UserResponse } from 'src/app/responses/user/user.response';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  userResponse?: UserResponse | null;
  isPopoverOpen: boolean = false;
  activeNavItem: number = 0;
  constructor(private userService: UserService, private tokenService: TokenService, private router: Router ) { }

  ngOnInit(): void {
    debugger
    this.userResponse =  this.userService.getUserFromLocalStorage();
  }
 togglePopover(event: Event): void {
  event.preventDefault();
  this.isPopoverOpen = !this.isPopoverOpen;
 }
 handleItemClick(index: number):void {
  if(index == 0) {
    this.router.navigate(['/user-profile'])
  } else if (index === 2) {
    this.userService.removeUserFromLocalStorage();
    this.tokenService.removeToken();
    this.userResponse = this.userService.getUserFromLocalStorage();
    this.router.navigate(['/'])
  }
  this.isPopoverOpen = false;
 }

 setActiveNavItem(index: number) {
  this.activeNavItem = index
 }

}
