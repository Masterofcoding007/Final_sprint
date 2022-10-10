import { HttpClient } from '@angular/common/http';
import { Injectable, ɵAPP_ID_RANDOM_PROVIDER } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/categorymodel';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl = 'https://localhost:7280/api/Categories';

  constructor(private http: HttpClient) { }

  //Get all Roles
  getAllCategories():Observable<Category[]>{
      return this.http.get<Category[]>(this.baseUrl);
  }

  //Add Role
  addCategory(category: Category):Observable<Category> {
    return this.http.post<Category>(this.baseUrl, category);
  }

  //delete Role
  deleteRole(id:string):Observable<Category>{
    return this.http.delete<Category>(this.baseUrl +'/'+id);
  }

  GetCategoryObject(id:string):Observable<Category>{
    return this.http.get<Category>(this.baseUrl +'/'+id);
  }

  //update Role
  updateRole(category: Category):Observable<Category>{
    return this.http.put<Category>(this.baseUrl +'/'+category.categoryId, category);
  }

  
}
