import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-bookstatus',
  templateUrl: './bookstatus.component.html',
  styleUrls: ['./bookstatus.component.css']
})
export class BookstatusComponent implements OnInit {
  alertMessage: string = '';
  book: any;

  ModalTitle:string="";
  display:string="";
  constructor(private service: BookService, public router:Router) {
    this.openModal();
   }

  ngOnInit(): void {
    
  }
   
  

  openModal(){
    let bookStatus = localStorage.getItem("bookStatus")||'';
    this.alertMessage = "You have successfully "+ bookStatus+" book"; 
   
  }

  onCloseHandled() {
   localStorage.removeItem('bookStatus');
   
    this.router.navigate(['/author']); 
    
  }

}


