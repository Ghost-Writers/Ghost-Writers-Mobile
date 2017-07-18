/// <reference path="../../app/WikitudePlugin.d.ts" />
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AR } from '../../assets/ade.js';

// import { ArPage } from '../assets/image-recognition/js/htmldrawable';
/*
  Generated class for the ARView page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ar-view',
  templateUrl: 'ar-view.html'
})
export class ARView {
  loaded: Boolean;
  AR: any;


  constructor(public navCtrl: NavController) {
    this.loaded = false;
    // this.AR = window.plugins.WikitudePlugin;
    this.AR = AR;

  }

  ionViewDidLoad() {
    console.log('Hello ARView Page');
    // alert('AR View has loaded!!!')

  }

  ionViewDidEnter() {
    let context = this;

    var startupConfiguration: any = { "camera_position": "back" };
    // WikitudePlugin.isDeviceSupported(function(success){
    //   alert('success res' + success)
    // }, function(err){
    //   alert('err res' + err)
    // }, [''])
    WikitudePlugin.loadARchitectWorld(

      function (success) {
        // context.createOverlays()
        console.log("ARchitect World loaded successfully.");
        // alert('success loaded architect world')
      },
      function (fail) {
        // context.createOverlays()
        console.log("Failed to load ARchitect World!");
        alert('failure to load architect world')
        // alert(fail)
      },
      //          "www/assets/3_3dModels_1_3dModelOnTarget/index.html", // (1) if you have a IR (Image Recognition) World, use this
      //          ["ir"], // (1) if you have a IR (Image Recognition) World, use this
      "www/assets/image-recognition/index.html",  // (2) if you have a GeoLocation World, use this
      ["geo"],  // (2) if you have a GeoLocation World, use this
      // you find other samples or Wikitude worlds in Wikitude Cordova Plugin
      // which can be downloaded from here: https://github.com/Wikitude/wikitude-cordova-plugin/archive/v5.3.1-3.3.2.zip
      <JSON>startupConfiguration
    );
  }

  /////////



  // ngAfterViewInit() {
  // 	alert('in ng on init...')
  // 	this.createOverlays();
  // }


  // createWwwButton(url, size, options) {
  // 	options.onClick = function () {
  // 		AR.context.openInBrowser(url);
  // 	};
  // 	return new AR.ImageDrawable(this.imgButton, size, options);
  // }

  worldLoaded() {
    var cssDivInstructions = " style='display: table-cell;vertical-align: middle; text-align: right; width: 50%; padding-right: 15px;'";
    var cssDivSurfer = " style='display: table-cell;vertical-align: middle; text-align: left; padding-right: 15px; width: 38px'";
    var cssDivBiker = " style='display: table-cell;vertical-align: middle; text-align: left; padding-right: 15px;'";
    document.getElementById('loadingMessage').innerHTML =
      "<div" + cssDivInstructions + ">Scan Target &#35;1 (surfer) or &#35;2 (biker):</div>" +
      "<div" + cssDivSurfer + "><img src='assets/surfer.png'></img></div>";

    // Remove Scan target message after 10 sec.
    setTimeout(function () {
      var e = document.getElementById('loadingMessage');
      e.parentElement.removeChild(e);
    }, 10000);
  }

  createOverlays() {
    alert('in create overlay....')
    AR.logger.activateDebugMode();
    AR.logger.debug('logger activated...');

    let targetCollectionResource = new AR.TargetCollectionResource("assets/final_test.wtc", {});
    // this.targetCollectionResource = new AR.TargetCollectionResource("assets/final_test.wtc", {});

    let tracker = new AR.ImageTracker(targetCollectionResource, {
      onTargetsLoaded: this.worldLoaded
    });
    // this.tracker = new AR.ImageTracker(this.targetCollectionResource, {
    // 	onTargetsLoaded: this.worldLoaded
    // });


    // this.cloudRecognitionService = new AR.CloudRecognitionService("162f925e3bc546141ebbdfae63ff97f1", "595edc6053f64031675c2b92", {
    // 	onLoaded: this.worldLoaded
    // });
    // this.tracker = new AR.ImageTracker(cloudRecognitionService);

    // this.imgButton = new AR.ImageResource("assets/wwwButton.jpg");

    var imgOne = new AR.ImageResource("../assets/street_art.jpg");
    var overlayOne = new AR.ImageDrawable(imgOne, 0.5, {
      translate: {
        x: -0.15
      }
    });
    var imgA = new AR.ImageResource("../assets/street_art_2.jpg");
    var overlayA = new AR.ImageDrawable(imgA, 0.5, {
      translate: {
        x: -0.15
      }
    });
    var imgB = new AR.ImageResource("../assets/street_art_3.jpg");
    var overlayB = new AR.ImageDrawable(imgB, 0.5, {
      translate: {
        x: -0.15
      }
    });
    var imgC = new AR.ImageResource("../assets/street_art_4.jpg");
    var overlayC = new AR.ImageDrawable(imgC, 0.5, {
      translate: {
        x: -0.15
      }
    });




    var artList = new AR.HtmlDrawable({
      uri: "../assets/art_list.html"
    }, 1, {
        viewportWidth: 1000,
        viewportHeight: 800,
        translate: { x: 0.36, y: 0.5 },
        horizontalAnchor: AR.CONST.HORIZONTAL_ANCHOR.RIGHT,
        verticalAnchor: AR.CONST.VERTICAL_ANCHOR.TOP,
        clickThroughEnabled: true,
        allowDocumentLocationChanges: false,
        onDocumentLocationChanged: function onDocumentLocationChangedFn(uri) {
          // AR.context.openInBrowser(uri);
        },
        onDragBegan: function (evt) {
          AR.logger.debug(evt);
          this.translate.y += evt;
        }
      });


    var pageOne = new AR.ImageTrackable(tracker, "bus", {
      drawables: {
        cam: [artList]
      }
    });


      var startupConfiguration: any = {"camera_position": "back"};

      WikitudePlugin.loadARchitectWorld(
          function(success) {
            console.log("ARchitect World loaded successfully.");
          },
          function(fail) {
            console.log("Failed to load ARchitect World!");
          },          
//          "www/assets/3_3dModels_1_3dModelOnTarget/index.html", // (1) if you have a IR (Image Recognition) World, use this
//          ["ir"], // (1) if you have a IR (Image Recognition) World, use this
          "www/assets/image-recognition/index.html",  // (2) if you have a GeoLocation World, use this
          ["geo"],  // (2) if you have a GeoLocation World, use this
// you find other samples or Wikitude worlds in Wikitude Cordova Plugin
// which can be downloaded from here: https://github.com/Wikitude/wikitude-cordova-plugin/archive/v5.3.1-3.3.2.zip
          <JSON>startupConfiguration
      );
  }




  ////////////

}
