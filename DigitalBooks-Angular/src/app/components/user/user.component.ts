import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/usermodel';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  title = 'users';
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

  constructor(private userService : UsersService){
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers()
    .subscribe(
      response => { this.users = response}
    );
  }

  onSaveSubmit(){
    if(this.user.userId === '0'){
      this.userService.addUser(this.user)
      .subscribe(
        response => {
          this.getAllUsers();
          this.user = {
            userId:'0',
            userName:'',
            emailId:'',
            password:'',
            roleId:1,
            active: true,
            firstName:'',
            lastName:''
          };
        }
      );
    }
    else{
      this.updateUser(this.user);
    }    
  }

  deleteUser(id:string){
    this.userService.deleteUser(id)
    .subscribe(
      response => {
        this.getAllUsers();
      }
    )
  }

  populateForm(user: User){
    this.user = user;

  }
  
  updateUser(user: User){
    this.userService.updateUser(user)
    .subscribe(
      response => {
        this.getAllUsers();
      }
    )
  }

}
