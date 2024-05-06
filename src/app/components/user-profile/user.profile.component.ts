import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { TokenService } from 'src/app/services/token.service';
import { UserResponse } from 'src/app/responses/user/user.response';
import { ValidationError } from 'class-validator';
import { UpdateUserDTO } from 'src/app/dtos/user/update.user.dto';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user.profile.component.html',
  styleUrls: ['./user.profile.component.scss']
})
export class UserProfileComponent implements OnInit{
  userProfileForm: FormGroup;
  userResponse?: UserResponse;
  token: string = '';
    constructor(
      private formBuilder: FormBuilder,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private userService: UserService,
      private tokenService: TokenService,
    ){
      this.userProfileForm = this.formBuilder.group({
        fullname: [''],
        phone_number: [''],
        password: [''],
        retype_password: [''],
        address: [''],
        note: ['']
      })
    }
    ngOnInit(): void {
        debugger
        this.token = this.tokenService.getToken() ?? '';
        this.userService.getUserDetails(this.token).subscribe({
          next: (response: any) => {
            debugger
            this.userResponse = {
              ...response
            };
            this.userProfileForm.patchValue({
              fullname: this.userResponse?.fullname,
              address: this.userResponse?.address
            })
            if(this.userResponse != undefined) {
              this.userService.saveUserToLocalStorage(this.userResponse);
            }
          },
          complete: ()=> {
            debugger;
          },
          error: (error: any) => {
            debugger;
            alert(`Cập nhật không thành công: ${error.error.message}`);
          }
        })
    }
    passwordMatchValidator(): ValidatorFn {
      return (formGroup: AbstractControl): ValidationErrors | null => {
        const password = formGroup.get('password')?.value;
        const retypePassword = formGroup.get('retype_password')?.value;
        if(password !== retypePassword) {
          return { passwordMissMatch: true};
        }
        return null;
      }
    }
    save(): void {
      debugger
      if(this.userProfileForm.valid) {
        const updateUserDTO: UpdateUserDTO = {
          fullname: this.userProfileForm.get('fullname')?.value,
          address: this.userProfileForm.get('address')?.value,
          password: this.userProfileForm.get('password')?.value,
          retype_password: this.userProfileForm.get('retype_password')?.value,
        };
        this.userService.updateUserDetail(this.token, updateUserDTO)
          .subscribe({
            next: (response: any) => {
              this.userService.removeUserFromLocalStorage();
              this.tokenService.removeToken();
              this.router.navigate(['/login']);
            },
            error: (error: any)=> {
              alert("Không thể cập nhật, vui lòng kiểm tra lại:" + error)
            }
          })
      } else {
        if(this.userProfileForm.hasError('passwordMissMatch')) {
          alert('Mật khẩu và xác nhận mật khẩu không trùng khớp');
        }
      }
    }

}
