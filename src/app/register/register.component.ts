import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerForm') registerForm!: NgForm;
  phone: string;
  password: string;
  retypePassword: string;
  fullName: string;
  address: string;
  constructor(private http: HttpClient, private router:Router) {
    this.phone = '';
    this.password = '';
    this.retypePassword = '';
    this.fullName = '';
    this.address = '';
    //inject http-router objects
  }
  
  ngOnInit(): void {
  }
  register(){
    const message = `phone: ${this.phone}` + 
                    `password: ${this.password}` +
                    `retypePassword: ${this.retypePassword}` + 
                    `fullName: ${this.fullName}` +
                    `address: ${this.address}`;

    //alert(message);
    const apiUrl = "http://localhost:8080/api/v1/users/register";
    const registerData = {
      "fullname": this.fullName,
      "phone_number": this.phone,
      "address": this.address,
      "password": this.password,
      "retype_password": this.retypePassword,
      "facebook_account_id": 0,
      "google_account_id": 0,
      "role_id": 1
    }
    const headers = new HttpHeaders({'Content-Type': 'application/json', });
    this.http.post(apiUrl, registerData, {headers}, )
      .subscribe({
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
    });
  }
  checkPasswordsMatch(){
    if(this.password !== this.retypePassword){
      this.registerForm.form.controls['retypePassword'].setErrors({'passwordMissmatch': true});
    }else {
      this.registerForm.form.controls['retypePassword'].setErrors(null);
    }
  }
  onPhoneChange(){
    console.log(`Phone typed:  ${this.phone}`)
   }

}
