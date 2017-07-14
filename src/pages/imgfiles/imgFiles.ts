import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-imgFiles',
  templateUrl: 'imgFiles.html'
})
export class FilesPage {

  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {
    this.getImages()
  }

  imgArray = [];

  getImages() {
    for (var key in localStorage) {
      if (key.slice(0, 5) === "Photo") {
        this.imgArray.push(localStorage[key])
      }
    }
  }

}
