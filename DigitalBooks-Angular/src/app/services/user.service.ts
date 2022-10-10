import { HttpClient } from '@angular/common/http';
import { Injectable, ɵAPP_ID_RANDOM_PROVIDER } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/usermodel';
import { UserValidationRequestModel } from '../models/userValidationRequestmodel';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl = 'https://localhost:7280/api/Users';

  constructor(private http: HttpClient) { }

  //Get all Users
  getAllUsers():Observable<User[]>{
      return this.http.get<User[]>(this.baseUrl);
  }

  //Add User
  addUser(user: User):Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }

  //delete user
  deleteUser(id:string):Observable<User>{
    return this.http.delete<User>(this.baseUrl +'/'+id);
  }

  //update user
  updateUser(user: User):Observable<User>{
    return this.http.put<User>(this.baseUrl +'/'+user.userId, user);
  }

  GetUserByCredentials(val:any):Observable<User>{
    console.log("GetCredentialsUrl"+this.baseUrl +'/GetUserByUsingCredentials');
    return this.http.post<any>(this.baseUrl +'/GetUserByUsingCredentials',val);
}
}
