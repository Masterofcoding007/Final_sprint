import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  constructor(private service: BookService,public router:Router) {
   
  }

 
  isLoggedIn = false;
  UserName:string="Welcome";
 ModalTitle:string="";
 ActivateSignupComp :boolean=false;

 userLoggedIn :boolean =false;
 showSignInSignUp : boolean = true;

 display = "none";
 SignupModaldisplay ="none";
 openModal() {
   this.ModalTitle ="Sign Up";
   this.SignupModaldisplay = "block";
 }

 openSignInModal() {
   this.ModalTitle ="Sign In";
 }
 onCloseHandled() {
 }

 ngOnInit(): void {
   this.userLoggedIn = this.service.CheckUserLoggedInOrNot();
    this.isUserLoggedIn(this.userLoggedIn);
   this.isLoggedIn = this.userLoggedIn;
   this.getUserNameAndRole();
 }

 signOutClick() {
   // remove user from local storage to log user out
   localStorage.removeItem('token');
   localStorage.removeItem('user');
   this.isUserLoggedIn(false);
   this.UserName='';
   this.router.navigate(['/login']).then(() => {
    this.isLoggedIn=false;
   });          
 } 

 isUserLoggedIn(loggedIn:boolean){
   
  if(loggedIn){
    this.showSignInSignUp =false;
  }
  else{
    this.showSignInSignUp =true;
  }
   
 }

 getUserNameAndRole(){
  let user = JSON.parse(localStorage.getItem('user') || '');
  let role = localStorage.getItem('role');
  this.UserName = "Welcome "+user.userName;
  if(role!='undefined')
  {
    this.UserName = this.UserName+' '+role;
  }
 }

}
