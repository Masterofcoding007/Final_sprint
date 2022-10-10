import { JsonPipe } from '@angular/common';
import { verifyHostBindings } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/usermodel';
import { BookService } from 'src/app/services/book.service';
import { UsersService } from 'src/app/services/user.service';
import { HeaderComponent } from '../header/header.component';
import { MustMatch } from '../signup/signup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  response :any;
  logUser:any;
  user = {
    userId:'0',
    userName:'',
    emailId:'',
    password:'',
    roleId:1,
 /*    active: true, */
    firstName:'',
    lastName:''
  }
  token : string="";
  usernameC:any;
  passwordC:any;
  constructor(private userService: UsersService, private service: BookService, public router:Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }


  
  login(){
    this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
    var val = {
      userName : this.usernameC,
      password : this.passwordC
    }
    this.service.Login(val).subscribe(
      response => {  this.response = response; 
        if(this.response.token != ""){
          console.log(this.response);
           // store jwt token in local storage to keep user logged in between page refreshes
           
           localStorage.setItem('token', this.response.token);
           localStorage.setItem('user', JSON.stringify(this.response.user));

          // this.nameEmitter.emit(true);  
          if (this.response.user.roleId == 1) //This is Author
          {

            localStorage.setItem('role', '- Author');

          this.router.navigate(['/author']).then(
            ()=>{window.location.reload()}

          )   
          }
          else{ 
            // This is Reader
            localStorage.setItem('role', '- Reader');
            this.router.navigate(['/reader']).then(
              ()=>{window.location.reload()}
            )  
          }
        } 
      }
    )    
  }
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
}


}
