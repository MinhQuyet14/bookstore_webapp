import { Component, OnInit } from '@angular/core';

import { UserResponse } from 'src/app/responses/user/user.response';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  userResponse?: UserResponse | null;
  isPopoverOpen: boolean = false;
  constructor(private userService: UserService, private tokenService: TokenService ) { }

  ngOnInit(): void {
    debugger
    this.userResponse =  this.userService.getUserFromLocalStorage();
  }
 togglePopover(event: Event): void {
  event.preventDefault();
  this.isPopoverOpen = !this.isPopoverOpen;
 }
 handleItemClick(index: number):void {
  if(index === 2) {
    this.userService.removeUserFromLocalStorage();
    this.tokenService.removeToken();
    this.userResponse = this.userService.getUserFromLocalStorage();
  }
  this.isPopoverOpen = false;
 }


}
