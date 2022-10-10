import { HttpClient } from '@angular/common/http';
import { Injectable, ɵAPP_ID_RANDOM_PROVIDER } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/rolemodel';


@Injectable({
  providedIn: 'root'
})
export class RoleService {

  baseUrl = 'https://localhost:7280/api/RoleMasters';

  constructor(private http: HttpClient) { }

  //Get all Roles
  getAllRoles():Observable<Role[]>{
      return this.http.get<Role[]>(this.baseUrl);
  }

  //Add Role
  addRole(role: Role):Observable<Role> {
    return this.http.post<Role>(this.baseUrl, role);
  }

  //delete Role
  deleteRole(id:string):Observable<Role>{
    return this.http.delete<Role>(this.baseUrl +'/'+id);
  }

  GetRoleObject(id:string):Observable<Role>{
    return this.http.get<Role>(this.baseUrl +'/'+id);
  }

  //update Role
  updateRole(role: Role):Observable<Role>{
    return this.http.put<Role>(this.baseUrl +'/'+role.roleId, role);
  }

  
}
