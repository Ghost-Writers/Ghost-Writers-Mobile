import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login'
import { UserService } from '../../app/services/service'

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

  constructor(public navCtrl: NavController, private userService: UserService) {

  }

  user = {
    tagname: null,
    email: null,
    phone_number: null,
    password: null,
  }

  submitForm() {
    this.userService.postUser(this.user)
      .subscribe(
      data => alert('Thanks for signing up! You will be redirected to the LoginPage'),
      error => console.log('error'),
      () => this.navCtrl.setRoot(LoginPage)
      );
  }

  redirectToLogin = () => {
    this.navCtrl.pop(SignupPage)
  }

}
