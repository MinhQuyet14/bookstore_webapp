import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/user/register.dto';
import { LoginDTO } from '../dtos/user/login.dto';
import { environment } from '../environments/environment';
import { UserResponse } from '../responses/user/user.response';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRegister = `${environment.apiBaseUrl}/users/register`;
  private apiLogin = `${environment.apiBaseUrl}/users/login`;
  private apiUserDetails = `${environment.apiBaseUrl}/users/details`;

  private apiConfig = {
    headers: this.createHeaders(),
  }
  constructor(private http: HttpClient) { }
  private createHeaders():HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  register(registerDTO: RegisterDTO):Observable<any> {
    return this.http.post(this.apiRegister, registerDTO, this.apiConfig);
  }

  login(loginDTO: LoginDTO) : Observable<any> {
    return this.http.post(this.apiLogin, loginDTO, this.apiConfig);
  }
  getUserDetails(token: string) {
    return this.http.post(this.apiUserDetails, {
      headers: new HttpHeaders({
        'Conten-Type': 'application/json',
        Authorization: `Bear ${token}`
      })
    })
  }
  saveUserToLocalStorage(userResponse: UserResponse){
    try {
      const userResponseJSON = JSON.stringify(userResponse);
      localStorage.setItem('user', userResponseJSON);
      console.log('user response saved to local storage.');
    } catch (error) {
      console.error('error saving to local storage', error);
    }
  }
  getUserFromLocalStorage(){
    try {
      const userResponseJSON = localStorage.getItem('user');
      if(userResponseJSON == null || userResponseJSON == undefined){
        return null;
      }
      const userResponse = JSON.parse(userResponseJSON!);

      console.log('User retrived from local storage')
      return userResponse;
    } catch (error) {
      console.error('error getting user from local storage');
      return null;
    }
  }
}
