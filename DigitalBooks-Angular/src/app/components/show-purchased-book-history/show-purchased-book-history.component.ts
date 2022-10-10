import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-show-purchased-book-history',
  templateUrl: './show-purchased-book-history.component.html',
  styleUrls: ['./show-purchased-book-history.component.css']
})
export class ShowPurchasedBookHistoryComponent implements OnInit {
  @Input() purchasedBookHistory : any=  [];
  emailId:string='';
  constructor( private services: BookService, public router:Router) {
    this.emailId=localStorage.getItem('userEmailD')||'';
    this.GetPurchasedBookList();
   }

  ngOnInit(): void {

  }

  onCloseHandled() {
    localStorage.removeItem('purchaseBookList');
    this.router.navigate(['/book']);
    localStorage.removeItem('readerEmailId');
    localStorage.removeItem('userEmailD');
    
  }
  GetPurchasedBookList(){
    this.services.GetPurchasedBookList(this.emailId).subscribe(
      response => 
      {
        this.purchasedBookHistory =  response;
        
      }
    )
  }

}
