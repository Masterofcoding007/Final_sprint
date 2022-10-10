import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/bookmodel';
import { User } from 'src/app/models/usermodel';
import { BookService } from 'src/app/services/book.service';
import { UsersService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {
  alertMessage:string='';
  registerForm!: FormGroup;
  submitted = false;
  signedUser:string='';
  display = "none";
  CategoryList:any[] =[];
  user: User={
    userId:'0',
    userName:'',
    emailId:'',
    password:'',
    roleId:1,
    active: true,
    firstName:'',
    lastName:''
  }
  books:Book[] = [];
  book : Book = {
    bookId: '0',
    bookName: '',
    categoryId: '',
    price: 0,
    publisher: '',
    userId: '',
    publishedDate: '',
    content: '',
    active: true,
    createdDate: '',
    createdby: '',
    modifiedDate: '',
    modifiedby: ''
  }
  searchResult:any;  
  selectedBook = "----";
  selectedAuthor="";
  selectedPublisher="";
  selectedCategory="";

  SelectedPublisher(publisher:string){
    this.selectedPublisher = publisher;
  }

  SelectedCategory(category:string){
    this.selectedCategory = category;
  }

  GetUserID(){
    let userValues =localStorage.getItem("user") ;
    if(userValues != 'undefined')
    {
    let values = JSON.parse(localStorage.getItem("user") || '');
    this.book.userId = values.userId;
    this.user=values;
    }
  }

  onSelected(value:string): void {
		this.book.categoryId = value;
	}

  constructor(private service: BookService, private userService: UsersService,public router:Router,
     private formBuilder: FormBuilder) { 
     }

  ngOnInit(): void {
    this.GetUserID();
    this.loadCategoryList();
    this.registerForm = this.formBuilder.group({
      bookname: ['', Validators.required],
      bookcnt: ['', Validators.required],
      authormaster: ['', Validators.required],
      publishername: ['', Validators.required],
      publisheddate: ['', Validators.required],
      bookmaster: ['', Validators.required],
      pricecontrol: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
  });

  this.signedUser= this.user.userName;;
  }

  get f() { return this.registerForm.controls; }

  loadCategoryList() {
    this.service.GetAllCategory()
    .subscribe(
      response => { this.CategoryList = response}
    );
  }

  onSubmitClick(){
    this.submitted = true;
    // stop here if form is invalid
    if (!this.registerForm.invalid) {
        return;
    }
    this.book.createdby=this.user.userId;
    this.book.modifiedby=this.user.userId;
    this.book.modifiedDate=this.book.publishedDate;
    this.book.createdDate=this.book.publishedDate;
    this.service.SaveBook(this.book).subscribe(
      response => { 

        this.alertMessage = "Congratulations you have succesfully added book";
        localStorage.setItem('alertFrom', this.alertMessage);
        localStorage.setItem('bookName', this.book.bookName);
        this.router.navigate(['/congractulations']); 
    }
    
    );
    
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  onCloseHandled() {
    this.display = "none";
  }

}
