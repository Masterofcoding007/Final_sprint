import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/usermodel';
import { UsersService } from 'src/app/services/user.service';
import { Role } from 'src/app/models/rolemodel';
import { RoleService } from 'src/app/services/role.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './signup.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  display = "none";
  title = 'users';
  signedUser:string='';
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
  roles : Role[]=[];
  role: Role={
    roleId: 1,
    roleName:''
  }

  selected = "----"
  userRoleId =1;
  
  update(e:any){
    this.userRoleId = e;
  }

  constructor(private signUpService : UsersService, private roleService: RoleService, 
    private formBuilder: FormBuilder, public router:Router){
  }

  ngOnInit() {
    this.getAllUsers();
    this.getAllRoles();
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      // validates date format yyyy-mm-dd
      rolemaster: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  getAllUsers() {
    this.signUpService.getAllUsers()
    .subscribe(
      response => { this.users = response}
    );
  }

  getAllRoles() {
    this.roleService.getAllRoles()
    .subscribe(
      response => { this.roles = response}
    );
  }

  onSaveSubmit(){

    this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

    if(this.user.userId === '0'){
      this.user.roleId = this.userRoleId;
      this.signUpService.addUser(this.user)
      .subscribe(
        response => {
          this.getAllUsers();
          this.signedUser=this.user.userName;
          let alertMessage ="Congratulations!!. Successfully signed with us.";
          localStorage.setItem('userName', this.signedUser);
          localStorage.setItem('alertFrom', alertMessage);
          this.display = "block";
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
          this.router.navigate(['/congractulations']); 
         
        }
        
      );
    }
    
  }
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
}
openModal() {
  
}

onCloseHandled() {
  this.display = "none";
}

}
  
