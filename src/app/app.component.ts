/// <reference path="WikitudePlugin.d.ts" />
import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../pages/tabs/tabs';


@Component({
  template: `<ion-nav #myNav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  @ViewChild('myNav') nav: NavController;
  public rootPage: any = LoginPage;
  

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      /** Enter your Wikitude (trial) License Key here. You can register and download your free license key here: http://www.wikitude.com/developer/licenses */      
      WikitudePlugin._sdkKey = "0lOJBJYh2TFKJ5pH7L2ehmTrdwDQ6ITD1IbN9HFYgNJRa6YtP2X9dm3TzVB0cFEz72VluOnIu85lLGyiA2KTPxFA0VpUKiG8ydk8VeHZDo1urhG474jwttY1AjFkosPbAb7K+29SMu8NL3Yz6N60l+DKOcIMFzQ1wjcztxmuJVhTYWx0ZWRfXyxv6FAkEHxlPFNSMNuqoXUcfj3cNpUKmVl+Pai7Pib6Px/glzMKT5rv7e/QxbqsKJ7GEYU9clPTRp/+dgt4RCpWnqbOVKR7gJ1/py8qbk4YCqxrTY4H6nOj4cHB82HTamIUkdRjf7E3yi/ptZGyERfyG7fmRu9seCgpI8V9H0YoSOQsKH1HMsnhzJcCWWAeQnI4/BbwhXYQc5xStSrgYc7zw/Bkk6TQm66XgBdm/J17R+B7U1tBTIVWrE+MnLlXccIyn/qPHyDehvX3KpTlRV7UzaGKhm/lQJy2zrTez5hEiKcy05kdpahnclqeKyqaYBu3mb/Itkr6hsya4+MtmjnAVXc5EIKX1xljzfsYzqHwPnWDQo/+aUTgJ1XIZtBKPAfdeScC3D6tMk+dJNMW7xb9RPe81RObLIrqGyuzuWTtjZhcLI2LAxTx9a+iaL/PHDBm/2FXdUaOqIdY95IRDV7uTvXcx2FJLjqftVJWPWmS5wjkF6ZJk7k=";

      /** Check if your device supports AR */
      WikitudePlugin.isDeviceSupported(
          function(success) {
            console.log("Your platform supports AR/Wikitude. Have fun developing!!");
          },
          function(fail) {
            console.log("Your platform failed to run AR/Wikitude: "+fail);
          },
          [WikitudePlugin.FeatureGeo] // or WikitudePlugin.Feature2DTracking 
      );                  

      /** The Wikitude AR View creates it's own context. Communication between the main Ionic App and Wikitude SDK works 
       * through the function below for the direction Ionic2 app --> Wikitude SDK 
       * For calls from Wikitude SDK --> Ionic2 app see the captureScreen example in 
       * WikitudeIonic2StarterApp/www/assets/3_3dModels_6_3dModelAtGeoLocation/js/3dmodelatgeolocation.js*/
      // set the function to be called, when a "communication" is indicated from the AR View  
      WikitudePlugin.setOnUrlInvokeCallback(function(url) {

        // this an example of how to receive a call from a function in the Wikitude SDK (Wikitude SDK --> Ionic2)
        if (url.indexOf('captureScreen') > -1) {
            WikitudePlugin.captureScreen(
                (absoluteFilePath) => {
                    console.log("snapshot stored at:\n" + absoluteFilePath);

                    // this an example of how to call a function in the Wikitude SDK (Ionic2 app --> Wikitude SDK)
                    WikitudePlugin.callJavaScript("World.testFunction('Screenshot saved at: " + absoluteFilePath +"');");
                },
                (errorMessage) => {
                    console.log(errorMessage);
                },
                true, null
            );
        } else {
            alert(url + "not handled");
        }
      });

      /**
       * Define the generic ok callback
       */
      WikitudePlugin.onWikitudeOK = function() {
          console.log("Things went ok.");
      }
      
      /**
       * Define the generic failure callback
       */
      WikitudePlugin.onWikitudeError = function() {
          console.log("Something went wrong");
      }

      // Just as an example: set the location within the Wikitude SDK, if you need this (You can get the geo coordinates by using ionic native 
      // GeoLocation plugin: http://ionicframework.com/docs/v2/native/geolocation/
      //WikitudePlugin.setLocation(47, 13, 450, 1);

      /* for Android only
      WikitudePlugin.setBackButtonCallback(
          () => {
              console.log("Back button has been pressed...");
          }
      );                  
      */

    });
  }
}
