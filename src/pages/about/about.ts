import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import filestack from 'filestack-js';
// import { Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
// declare var InAppBrowser: any;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage implements OnInit {
  client: any;
  iab: any;
  constructor(public navCtrl: NavController, iab: InAppBrowser) {
    this.client = filestack.init('AxGm6Nb8rTPyGLzI0VcuEz')
    this.iab = iab
    // this.platform = platform;
  }

  ngOnInit() {
    // this.client.pick({
    //   maxFiles: 20,
    //   fromSources: ['local_file_system', 'facebook'],
    // }).then(res => console.log(res));
    // alert('in ng on init in about...')
    // this.client.pick()
  }

  launchSite() {
      // alert('in launch site')
      let iabRef = this.iab.create('https://createpage.herokuapp.com/')
      iabRef.on('loadstop', () => {
        alert('finished loading webpage')
        iabRef.executeScript({code: 'alert("in browser test")'})
      })
        
      
  }
}
