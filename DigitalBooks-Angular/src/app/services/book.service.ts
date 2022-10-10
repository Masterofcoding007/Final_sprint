import { HttpClient } from '@angular/common/http';
import { Injectable, ɵAPP_ID_RANDOM_PROVIDER } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from '../models/bookmodel';
import { Purchase } from '../models/purchasemodel';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseUrl = 'https://localhost:7280/api/';

  constructor(private https: HttpClient,public router:Router) {}

  GetBookList():Observable<any[]>{
    return this.https.get<any>(this.baseUrl+'Books');
}
    //Get All Categories
    GetAllCategory():Observable<any[]>{
        return this.https.get<any>(this.baseUrl+"Categories");
    }

    //Get All Author List
    GetAllAuthors():Observable<any[]>{
        return this.https.get<any>(this.baseUrl + "Users/AuthorList");
    }

    //Get All Role List
    GetAllRoles():Observable<any[]>{
        return this.https.get<any>(this.baseUrl + "RoleMasters");
    }

    // Save / Add new User
    AddUser(val:any):Observable<any[]>{
        return this.https.post<any>(this.baseUrl + "Users",val);
    }

    // Login WebAPI
    Login(val:any):Observable<any[]>{
        return this.https.post<any>('https://localhost:7280/validate',val)
    }

    // Search books
    SearchBooks(c:string, aID:string, p: number ):Observable<any[]>{
      var url='Books/SearchBooks/'+ c+"/"+aID+"/"+p;
        return this.https.get<any>(this.baseUrl+url);
    }

    //Check User Logged in or not
    CheckUserLoggedInOrNot():boolean{
      if (localStorage.getItem('token')) {
          // logged in so return true
          return true;
      }

      // not logged in so redirect to sign page with the return url
       this.router.navigate(['/book']);     
      return false;
  }
    // Save book
    SaveBook(book : Book):Observable<Book>{
        return this.https.post<Book>(this.baseUrl + "Books",book);
    }

    

    //Book History
    GetBookHistory(emailId :string):Observable<any>{
        return this.https.get<any>(this.baseUrl +"Purchases/BookHistory/"+emailId);
    }

    GetPurchasedBookList(emailId :string):Observable<any>{
      return this.https.get<any>(this.baseUrl +"Purchases/GetPurchasedBookHistory?EmailId="+emailId);
  }


    //Get Book List For Reader
    GetBookListReader(emailId :string):Observable<any>{
        return this.https.get<any>(this.baseUrl +"Purchases/GetBooksWithStatus?EmailId="+emailId);
    }

    LoadAllBooks():Observable<any>{
      return this.https.get<any>(this.baseUrl +"Books/GetALllBooks");
  }

  getBookSerachList(bookName:string, authourName: string, publisher: string, publishedDate: Date ):Observable<Book>{
    var id = 'bookName='+bookName+'&authorName='+authourName+'&publisher='+publisher+'&publishedDate='+publishedDate;
    return this.https.get<Book>(this.baseUrl+'/'+id)
  }

  addBook(book: Book):Observable<Book> {
    return this.https.post<Book>(this.baseUrl, book);
  }

  //delete user
  deleteBook(id:string):Observable<Book>{
    return this.https.delete<Book>(this.baseUrl +'/'+id);
  }

  //update user
  updateBook(book: Book):Observable<Book>{
    return this.https.put<Book>(this.baseUrl +'/'+book.bookId, book);
  }

   //To Update the book Status
   UpdateBookStatus(bookID:string,userID:string,status:boolean):Observable<any>{
    return this.https.get<any>(this.baseUrl +"Books/UpdateBookStatus/"+bookID+"/"+userID+"/"+status);
}
PurchaseBook(purchases : any):Observable<Purchase>{
    return this.https.post<Purchase>(this.baseUrl+'Purchases',purchases);
  //
}
    
}
