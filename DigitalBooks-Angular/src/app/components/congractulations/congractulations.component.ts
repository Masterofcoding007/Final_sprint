import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-congractulations',
  templateUrl: './congractulations.component.html',
  styleUrls: ['./congractulations.component.css']
})
export class CongractulationsComponent implements OnInit {
  alertMessage: string = '';
  ModalTitle:string="";
  userName :string="";
  bookName: string="";
  purchesedBook: string="";
  purchasedBookMessage: string="";
  userMessage :string="";
  newBookMessage :string="";
  display:string="";
  constructor(public router:Router) { }

  ngOnInit(): void {
    this.openModal();
  }
   
  openModal() {
    this.alertMessage = localStorage.getItem('alertFrom')||'';
    this.userName = localStorage.getItem('userName')||'';
    this.bookName = localStorage.getItem('bookName')||'';
    this.purchesedBook = localStorage.getItem('purchesedBook')||'';
    this.purchasedBookMessage = localStorage.getItem('purchasedBookMessage')||'';
    if(this.userName!='')
    {
      this.userMessage= "Your User Name: ";
      this.bookName="";
      this.purchesedBook="";
      this.purchasedBookMessage="";
    }
    else if(this.bookName!='')
    {
      this.newBookMessage= "Your Book Name: ";
      this.userName="";
      this.purchesedBook="";
      this.purchasedBookMessage="";
    }
    else if(this.purchesedBook!=''){
      this.newBookMessage= "";
      this.userName="";
      this.userMessage= "";
      this.bookName="";
    }
    this.ModalTitle ="Success";
    this.display = "block";
  }

  onCloseHandled() {
   localStorage.removeItem('alertFrom');
   localStorage.removeItem('userName');
   localStorage.removeItem('bookName');
   localStorage.removeItem('purchasedBookMessage');
   localStorage.removeItem('purchesedBook');
   this.userMessage="";
   this.newBookMessage="";
   this.userName="";
   this.bookName="";
   if(this.purchasedBookMessage.includes("buyed"))
   {
   this.router.navigate(['/reader']); 
   }
   else if(this.alertMessage.includes("purchase"))
   {
   this.router.navigate(['/book']); 
   }
   else if(this.alertMessage.includes("book"))
    {
    this.router.navigate(['/author']); 
    }
    else
    this.router.navigate(['/login']);
  }

}


