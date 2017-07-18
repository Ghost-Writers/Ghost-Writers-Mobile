import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  constructor(public navCtrl: NavController) {

  }
//need to fix this button to get out of nested view
  redirectToLogin() {
    this.navCtrl.push(LoginPage);  
  }

}
