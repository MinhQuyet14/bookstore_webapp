import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

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
  constructor() {
    this.phone = '';
    this.password = '';
    this.retypePassword = '';
    this.fullName = '';
    this.address = '';
   }

   onPhoneChange(){
    console.log(`Phone typed:  ${this.phone}`)
   }

  ngOnInit(): void {
  }
  register(){
    const message = `phone: ${this.phone}` + 
                    `password: ${this.password}` +
                    `retypePassword: ${this.retypePassword}` + 
                    `fullName: ${this.fullName}` +
                    `address: ${this.address}`;

    alert(message);
  }
  checkPasswordsMatch(){
    if(this.password !== this.retypePassword){
      this.registerForm.form.controls['retypePassword'].setErrors({'passwordMissmatch': true});
    }else {
      this.registerForm.form.controls['retypePassword'].setErrors(null);
    }
  }
}
