import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/models/bookmodel';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {
  searchResult:any;

  book :any;
  bookID : any;
  display : string = 'none';
  ModalTitle="Purchase Book";
  readBookdisplay : string ="none";
  ModalReadBookTitle : string ="Read Book";
  bookContent : string ="";
  userEmailID : string ="";

  constructor(private services: BookService){}

  ngOnInit(): void {
    this.GetUserID();
    this.loadBookHistory();
  }
  purchaseClick(item:Book){
      this.book =item; 
      this.bookID= this.book.bookId;
      this.display= 'block';
  }
  onCloseHandled() {
      this.display = "none";
      this.readBookdisplay ="none";
    }

    GetUserID(){
      let values = JSON.parse(localStorage.getItem("user") || '');
      this.userEmailID = values.emailId;
      console.log(this.userEmailID);
    }

    loadBookHistory(){
  
      this.services.GetBookListReader(this.userEmailID).subscribe(
        response => {this.searchResult = response; }
      )
    }

    readBookClick(item:Book){
      this.book =item; 
      this.bookContent= this.book.bookContent;
      this.readBookdisplay= 'block';
    }
}
