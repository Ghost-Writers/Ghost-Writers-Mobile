/// <reference path="../../app/WikitudePlugin.d.ts" />
import { Component } from '@angular/core';
import { AR } from './ade.js';
// import { AR } from '../../app/WikitudePugin.d.ts';
// import { NavController } from 'ionic-angular';

@Component({
	selector: 'ar-page',
	templateUrl: 'ar-world.html'
})
export class ArPage {
	loaded: Boolean;

	AR: any;
	constructor() {
		this.loaded = false;
		// this.AR = window.plugins.WikitudePlugin;
		this.AR = AR;
	}



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
		AR.logger.activateDebugMode();
		AR.logger.debug('logger activated...');

		let targetCollectionResource =  new AR.TargetCollectionResource("assets/final_test.wtc", {});
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

		var imgOne = new AR.ImageResource("assets/street_art.jpg");
		var overlayOne = new AR.ImageDrawable(imgOne, 0.5, {
			translate: {
				x: -0.15
			}
		});
		var imgA = new AR.ImageResource("assets/street_art_2.jpg");
		var overlayA = new AR.ImageDrawable(imgA, 0.5, {
			translate: {
				x: -0.15
			}
		});
		var imgB = new AR.ImageResource("assets/street_art_3.jpg");
		var overlayB = new AR.ImageDrawable(imgB, 0.5, {
			translate: {
				x: -0.15
			}
		});
		var imgC = new AR.ImageResource("assets/street_art_4.jpg");
		var overlayC = new AR.ImageDrawable(imgC, 0.5, {
			translate: {
				x: -0.15
			}
		});




		var artList = new AR.HtmlDrawable({
			uri: "assets/art_list.html"
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

	}

	ngOnInit() {
		this.createOverlays();
	}
}
