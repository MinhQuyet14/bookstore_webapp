import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginDTO } from '../../dtos/user/login.dto';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../../responses/user/login.response'
import { TokenService } from '../../services/token.service';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role';
import { HttpHeaders } from '@angular/common/http';
import { UserResponse } from 'src/app/responses/user/user.response';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  @ViewChild('loginForm') loginForm!: NgForm;
  phoneNumber: string = '';
  password: string = '';

  roles: Role[] = [];
  rememberMe: boolean = true;
  selectedRole: Role | undefined;
  userResponse?: UserResponse 
  constructor(
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService,
    private roleService: RoleService,
  ) {

  }
  ngOnInit(){
    debugger
    this.roleService.getRoles().subscribe({
      next: (roles: Role[]) => {
        debugger
        this.roles = roles;
        this.selectedRole = roles.length > 0 ? roles[0] : undefined;
      },
      error: (error: any) => {
        debugger
        console.error("Error getting roles: ", error);
      }
    });
  }
  onPhoneNumberChange() {
    console.log(`Phone typed:  ${this.phoneNumber}`)
  }
  login() {
    const message = `phone: ${this.phoneNumber}` +
      `password: ${this.password}`;

    //alert(message);
    debugger

    const loginDTO: LoginDTO = {
      phone_number: this.phoneNumber,
      password: this.password,
      role_id: this.selectedRole?.id ?? 1

    }
    this.userService.login(loginDTO).subscribe({
      next: (response: LoginResponse) => {
        debugger
        const { token } = response// distructering: trích xuất đối tượng token từ response
        this.tokenService.setToken(token);
        this.userService.getUserDetails(token).subscribe({
          next: (response: any) => {
            debugger
            this.userResponse = {
              id: response.id,
              fullname: response.fullname,
              phone_number: response.phone_number,
              address: response.address,
              is_active: response.is_active,
              facebook_account_id: response.facebook_account_id,
              google_account_id: response.google_account_id,
              role: response.role,
              email: response.email
            }
            this.userService.saveUserToLocalStorage(this.userResponse);
            if(this.userResponse?.role.name == 'ADMIN'){
              //alert('Xin chào quản trị viên')
              this.router.navigate(['/admin'])
            } else if(this.userResponse?.role.name == 'USER') {
              this.router.navigate(['/']);
            }
          },
          complete: ()=>{debugger},
          error: (error: any) => {
            debugger
            alert(error)
          }
        })
      },
      complete: () => {
        debugger
      },
      error: (error: any) => {
        alert("cannot login, error: " + error);
        debugger
      }
    })
    // const headers = new HttpHeaders({'Content-Type': 'application/json', });
    // this.http.post(apiUrl, registerData, {headers}, )
    //   .subscribe();
  }
}
