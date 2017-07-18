import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login'
import { UserService } from '../../app/services/service'

declare var swal: any;

@Component({
  selector: 'page-signup',
  providers: [UserService],
  templateUrl: 'signup.html'
})
export class SignupPage {
  tagname: string;
  email: string;
  phone_number: number;
  password: string;
  confirmPassword: string;
  userPost: any;
  users: any;

  constructor(public navCtrl: NavController, private userService: UserService) {
  }

  ngOnInit() {
    this.getAllUsers()
  }

  user = {
    tagname: null,
    email: null,
    phone_number: null,
    password: null,
  }

  submitForm() {
    console.log(this.users)
    for (let i = 0; i < this.users.users.length; i++) {
      if (this.users.users[i].tagname === this.user.tagname) {
        return swal(
          "Oops..",
          "Username already taken",
          "error"
        )
      }
      if (this.users.users[i].email === this.user.email) {
        return swal(
          "Oops..",
          "Email is already taken",
          "error"
        )
      }
      if (
        this.user.tagname === null || this.user.tagname === "" ||
        this.user.email === null || this.user.email === "" ||
        this.user.phone_number === null || this.user.phone_number === "" ||
        this.user.password === null || this.user.tagname === ""
      ) {
        return swal(
          "Oops...",
          "Please fill out all fields",
          "error"
        )
      }
    }

    this.userService.postUser(this.user)
      .subscribe(
      data => swal('Sign up complete!', 'Redirecting to login', 'success'),
      error => console.log('error'),
      () => this.navCtrl.setRoot(LoginPage)
      );
  }
  
  getAllUsers() {
    this.userService.getUsers()
      .subscribe(
      users => this.users = users,
      error => console.log('error')
      );
  }
  redirectToLogin = () => {
    this.navCtrl.pop(SignupPage)
  }

}
