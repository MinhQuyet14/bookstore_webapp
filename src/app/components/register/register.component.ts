import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RegisterDTO } from '../../dtos/user/register.dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm!: NgForm;
  phoneNumber: string;
  password: string;
  retypePassword: string;
  fullName: string;
  address: string;
  constructor(private router:Router, private userService: UserService) {
    this.phoneNumber = '';
    this.password = '';
    this.retypePassword = '';
    this.fullName = '';
    this.address = '';
    //inject http-router objects
  }
  // ngOnInit(): void {
  // }
  register(){
    const message = `phone: ${this.phoneNumber}` + 
                    `password: ${this.password}` +
                    `retypePassword: ${this.retypePassword}` + 
                    `fullName: ${this.fullName}` +
                    `address: ${this.address}`;

    //alert(message);
    debugger

    const registerDTO:RegisterDTO= {
      "fullname": this.fullName,
      "phone_number": this.phoneNumber,
      "address": this.address,
      "password": this.password,
      "retype_password": this.retypePassword,
      "facebook_account_id": 0,
      "google_account_id": 0,
      "role_id": 1
    }
    this.userService.register(registerDTO).subscribe({
      next: (response: any) => {
        debugger
        this.router.navigate(['/login']);
      },
      complete: ()=>{
        debugger
      },
      error: (error: any) => {
        alert("cannot register: "+error);
        debugger
      }
    })
    //const headers = new HttpHeaders({'Content-Type': 'application/json', });
    // this.http.post(apiUrl, registerData, {headers}, )
    //   .subscribe();
  }
  checkPasswordsMatch(){
    if(this.password !== this.retypePassword){
      this.registerForm.form.controls['retypePassword'].setErrors({'passwordMissmatch': true});
    }else {
      this.registerForm.form.controls['retypePassword'].setErrors(null);
    }
  }
  onPhoneNumberChange(){
    console.log(`Phone typed:  ${this.phoneNumber}`)
   }

}
