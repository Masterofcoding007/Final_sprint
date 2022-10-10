import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/bookmodel';
import { Category } from 'src/app/models/categorymodel';
import { User } from 'src/app/models/usermodel';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.services';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-show-books',
  templateUrl: './show-books.component.html',
  styleUrls: ['./show-books.component.css']
})
export class ShowBooksComponent implements OnInit {
  @Input() searchResult:any;

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

  categories:Category[] = [];
  category : Category = {
    categoryId:'0',
    categoryName:''
  }
  
  
  selectedBook = "----";
  selectedAuthor="";
  selectedPublisher="";
  selectedCategory="";

  bookID : any;
  display : string = 'none';
  ModalTitle="Purchase Book";

  SelectedBook(bookName:string){
    this.selectedBook = bookName;
  }


  SelectedAuthor(author:string){
    this.selectedAuthor = author;
  }

  SelectedPublisher(publisher:string){
    this.selectedPublisher = publisher;
  }

  SelectedCategory(category:string){
    this.selectedCategory = category;
  }
  constructor(private bookService : BookService, private userService : UsersService,
    private categoryService : CategoryService, public router: Router){
  }

  ngOnInit(): void {
    this.getAllBooks();
    this.getAllUsers();
    this.getAllCategories();
  }

  getAllUsers() {
    this.userService.getAllUsers()
    .subscribe(
      response => { this.users = response}
    );
  }
  getAllCategories() {
    this.categoryService.getAllCategories()
    .subscribe(
      response => { this.categories = response}
    );
  }

  getAllBooks() {
    this.bookService.GetBookList()
    .subscribe(
      response => { this.books = response}
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
  
  purchaseClick(item:Book, bookName: string){
      this.book =item; 
      this.book.bookName = bookName;
      this.bookID= this.book.bookId;
      this.display= 'block';

      // localStorage.setItem('searchBookBookId', this.book.bookId);
  }
  onCloseHandled() {
      this.display = "none";
    }

    searchBooks(){
      this.bookService.SearchBooks(this.selectedCategory,this.selectedAuthor,this.book.price).subscribe(
         response => {this.searchResult = response; console.log(this.searchResult);}
       );
      
      }
      

}
