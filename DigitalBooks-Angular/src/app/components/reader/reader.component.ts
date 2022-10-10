import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/bookmodel';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {
  /* @Input() searchResult:any; */
  searchResult:any;

    book :any;
    bookID : any;
    display : string = 'none';
    ModalTitle="Purchase Book";
    readBookdisplay : string ="none";
    ModalReadBookTitle : string ="Read Book";
    bookContent : string ="";
    userEmailID : string ="";
    purchaseObj={
      "purchaseId": 0,
      "emailId": "string",
      "bookId": 0,
      "paymentMode": "online"
    }
    bookHistoryList : any =[];

    constructor(private services: BookService, public router:Router){}

    ngOnInit(): void {
      
      this.GetUserID();
      this.loadBookHistory();
      this.GetPurchasedBookList();
      this.display= 'block';
    }
    purchaseClick(item:Book){
        this.book =item; 
        this.bookID= this.book.bookId;
        this.purchaseObj.bookId=this.bookID;
        this.purchaseObj.emailId= this.userEmailID;
        this.services.PurchaseBook(this.purchaseObj).subscribe(
      response => { 
        localStorage.setItem('purchasedBookMessage', "Your book has been purchased successfully!!");
        localStorage.setItem('purchesedBook', this.book.title);
        this.router.navigate(['/congractulations']); 
       }
    )
    
    }

    GetPurchasedBookList(){
      this.purchaseObj.bookId=this.bookID;
        this.purchaseObj.emailId= this.userEmailID;
      this.services.GetPurchasedBookList(this.purchaseObj.emailId).subscribe(
        response => 
        {
          this.bookHistoryList =  response;
          
        }
      )
    }

    onCloseHandled() {
        this.display = "none";
        this.readBookdisplay ="none";
      }

      GetUserID(){
        let values = JSON.parse(localStorage.getItem("user") || '');
        this.userEmailID = values.emailId;
        localStorage.setItem('readerEmailId',this.userEmailID);
      }

      loadBookHistory(){
        
        this.services.GetBookListReader(this.userEmailID).subscribe(
          response => {this.searchResult = response; }
        )
      }

      loadAllBooks(){
    
        this.services.LoadAllBooks().subscribe(
          response => {this.searchResult = response; }
        )
      }

      readBookClick(item:Book){
        this.book =item; 
        console.log("item =" +JSON.stringify(item));
        if(item.active)
        {
        this.bookContent= this.book.bookContent;
        this.readBookdisplay= 'block';
        }
        else{
          alert('The book has blocked by author.');
        }
      }
}
