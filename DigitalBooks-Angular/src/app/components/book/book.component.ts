import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/bookmodel';
import { Category } from 'src/app/models/categorymodel';
import { User } from 'src/app/models/usermodel';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.services';
import { UsersService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  title = 'books';
  books:Book[] = [];
  book : Book = {
    bookId: '',
    bookName : '',
    categoryId : '0',
    price : 0,
    publisher :'',
    userId :'',
    publishedDate : '',
    content :'',
    active : true,
    createdDate : '',
    createdby : '',
    modifiedDate : '',
    modifiedby :''
  }
  users:User[] = [];
  user : User = {
    userId:'0',
    userName:'',
    emailId:'',
    password:'',
    roleId:1,
    active: true,
    firstName:'',
    lastName:''
  }

  CategoryList:any[] =[];
  category : Category = {
    categoryId:'0',
    categoryName:''
  }
  
  searchResult:any;  
  selectedBook = "----";
  selectedAuthor="";
  selectedPriceRange=0;
  selectedCategory="";

  SelectedBook(book:string){
    this.selectedBook = book;
  }


  SelectedAuthor(author:string){
    this.selectedAuthor = author;
  }

  SelectedPrice(price:number){
    this.selectedPriceRange=price;
    this.book.price = price;
  }

  onSelected(value:string): void {
		this.selectedCategory = value;
	}
  constructor(private bookService : BookService, private userService : UsersService,
    private categoryService : CategoryService, public router: Router, private formBuilder: FormBuilder){
  }

  ngOnInit(): void {
    this.getAllBooks();
    this.getAllUsers();
    this.loadCategoryList();
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      bookmaster: ['', Validators.required],
      authormaster: ['', Validators.required],
      categorymaster: ['', Validators.required],
      pricecontrol: ['', Validators.required]
  });
  }

  get f() { return this.registerForm.controls; }

  getAllUsers() {
    this.userService.getAllUsers()
    .subscribe(
      response => { this.users = response}
    );
  }

  loadCategoryList() {
    this.bookService.GetAllCategory()
    .subscribe(
      response => { this.CategoryList = response}
    );
  }

  getAllBooks() {
    this.bookService.GetBookList()
    .subscribe(
      response => { this.books = response}
    );
  }
  
searchBooks(){
  this.submitted = true;

  // stop here if form is invalid
  if (!this.registerForm.invalid) {
      return;
  }
  this.bookService.SearchBooks(this.selectedCategory,this.selectedAuthor,this.book.price).subscribe(
     response => {this.searchResult = response; console.log(this.searchResult);}
   );
  }
  deleteUser(id:string){
    this.bookService.deleteBook(id)
    .subscribe(
      response => {
        this.getAllBooks();
      }
    )
  }

  populateForm(book: Book){
    this.book = book;

  }
  
  updateUser(book: Book){
    this.bookService.updateBook(book)
    .subscribe(
      response => {
        this.getAllBooks();
      }
    )
  }

  getBookSerachList(bookName:string, authourName: string, publisher: string, publishedDate: Date ){

    return this.bookService.getBookSerachList(bookName, authourName, publisher, publishedDate );

}
onReset() {
  this.submitted = false;
  this.registerForm.reset();
}

}
