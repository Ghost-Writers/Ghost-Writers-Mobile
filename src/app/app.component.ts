/// <reference path="WikitudePlugin.d.ts" />
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      /** Enter your Wikitude (trial) License Key here. You can register and download your free license key here: http://www.wikitude.com/developer/licenses */      
      WikitudePlugin._sdkKey = "yXJb1jRA+Dsca0RMYiruLoqnwLly2nMOhhobSkD1hPMF4kX1YK5x9NIB+sMCjV+NuvE2pcCDYKyOxk4R7uIqMqyK4BL4b9A91S2Chti90VoWcz1aIQWoj5gUpI9lRV9rOdyrKPazanZFPFFpDK4maRhA9UoRu/Q0fIMD9kTh3ZNTYWx0ZWRfX30W3XI3cRtt+Ek4V1bOncHD+U9OrxRVCg4COL8Nv+uWMDC5TTTcn4XKnznspguSqg1Lt1EXc4ceVmLYTIcr7BtPskFSMSK8jTPk+QoyWgfEKaJAdzZnMu0pHUGfs8WA2U1ygTea58sk3NkWSTpfLDS94GNMDpfxVT8ZH3hS6ghI2MzjAheIuEZbwtXdZikIIDUPUD59uMvUIt5DYoMbzZ7HtLIiLBagRdRQPW9j4GUQoUdK4LeC7ps7NSd21S8i3O/nWKuJNBNQcYaQFproFkCInF7qKc2jTMBrwY/EIhBLKXauN/fwaWx0/vtPKmi3emt8+m5BSgfPR3lAuwc9DhD/8Zlv/sjFrR/4pGFSfOlnFY1LU3SK0BUtuvnwibkpYKTIfoWy+QvUqYIHI0/Q6bC8eDCK7VK4+8nx3IV23q7aCB/wcDiNrfPSH2jWA+nFmE9XzlAH3ECi096KR9IW/JP+qAa/DduFiKepofO/1AYP6FANLAUPKlU=";

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
