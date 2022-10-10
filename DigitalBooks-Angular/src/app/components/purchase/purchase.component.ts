import { Component, Input, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Purchase } from 'src/app/models/purchasemodel';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  [x: string]: any;

  @Input() bookID:any;
  alertMessage="";
  bookHistoryList : any =[];
  purchasedBookHistory : any=[];
  display = "none";
  readBookdisplay='none';
  today = new Date();
  changedDate = '';
  pipe = new DatePipe('en-US');
  emailPlaceHolder=''
  emailId ='';

   purchaseObj={
    "purchaseId": 0,
    "emailId": "string",
    "bookId": 0,
    "paymentMode": "online"
  }

  objpurchase : Purchase={
    purchaseId: 0,
    emailId : '',
    bookId : 0,
    puchaseMode : ''
  }
  constructor(private services: BookService, public router:Router) { }

  ngOnInit(): void {
  }

  loadBookHistory(){
   this.display='block';
    this.services.GetBookHistory(this.objpurchase.emailId).subscribe(
      response => 
      {
        this.bookHistoryList = response;
        this.GetPurchasedBookList();
      }
    )
   
  }


  GetPurchasedBookList(){
    this.display='block';
    this.services.GetPurchasedBookList(this.objpurchase.emailId).subscribe(
      response => 
      {
        this.purchasedBookHistory =  response;
        
      }
    )
  }

  onSubmit(){
    this.purchaseObj.bookId=this.bookID;
    this.purchaseObj.emailId= this.objpurchase.emailId;
    this.services.PurchaseBook(this.purchaseObj).subscribe(
      response => { 
        this.alertMessage = "Your book has been purchased successfully!!";
        localStorage.setItem('alertFrom', this.alertMessage); 
        localStorage.setItem('userEmailD', this.purchaseObj.emailId);
        this.router.navigate(['/showpurchasedbooks']); 
       }

    )
   
    
  }
  onFocusOutEvent(event: any){
    this.loadBookHistory();
 }

 onCloseHandled() {
  this.display = "none";
  this.readBookdisplay ="none";
 }
}
