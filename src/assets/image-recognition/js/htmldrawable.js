var World = {
	loaded: false,

	init: function initFn() {
		this.createOverlays();
	},

	createOverlays: function createOverlaysFn() {

		AR.logger.activateDebugMode();
		AR.logger.debug('logger activated...');

		// this.targetCollectionResource = new AR.TargetCollectionResource("assets/final_test.wtc", {
		// });

		// this.tracker = new AR.ImageTracker(this.targetCollectionResource, {
		// 	onTargetsLoaded: this.worldLoaded
		// });


		// this.cloudRecognitionService = new AR.CloudRecognitionService("dca0e79374ebe373d002d984495e729b", "5963b498f67e6315b7658a2a", {
		// 	onInitialized: this.worldLoaded,
		// 	onError: function (err) { alert('error happended' + err) }
		// });
		// this.tracker = new AR.ImageTracker(this.cloudRecognitionService);

		var cloudRecognitionService = new AR.CloudRecognitionService("dca0e79374ebe373d002d984495e729b", "5963b498f67e6315b7658a2a", {
			onInitialized: function () {
				// enable UI elements to start recognition calls
				// alert('in on initialized...');
			}
		});
		var tracker = new AR.ImageTracker(cloudRecognitionService, {
			onTargetsLoaded: function () {
				// alert('all targets loaded')

			}
		});


			cloudRecognitionService.startContinuousRecognition(500, function onInterruptionCallback(suggestedInterval) {
					alert('error' + suggestedInterval);
				}, function onRecognizedCallback(recognized, responseData) {
					if (recognized) {
						// A target image was found in the processed camera frame.
						// The name of the recognized target can be retrieved from the responseData object.
						// alert('recognized target image: ' + responseData.targetInfo.name);
					}
					else {
						// No target image could be found in the processed camera frame.
					}
				}, function onErrorCallback(code, errorObject) {
					alert(code + ' ' + errorObject + '<< error');
				})

		// ... additional code...

		// to start a single recognition process, call the cloud recognition service's recognize function.
		// cloudRecognitionService.recognize(function (recognized, responseData) {
		// 	if (recognized) {
		// 		// A target image was found in the processed camera frame.
		// 		// The name of the recognized target can be retrieved from the responseData object.
		// 		alert('recognized target image: ' + responseData.targetInfo.name);
		// 	}
		// 	else {
		// 		// No target image could be found in the processed camera frame.
		// 	}
		// });




		// var imgOne = new AR.ImageResource("assets/street_art.jpg");
		// var overlayOne = new AR.ImageDrawable(imgOne, 0.5, {
		// 	translate: {
		// 		x: -0.15
		// 	}
		// });
		// var imgA = new AR.ImageResource("assets/street_art_2.jpg");
		// var overlayA = new AR.ImageDrawable(imgA, 0.5, {
		// 	translate: {
		// 		x: -0.15
		// 	}
		// });
		// var imgB = new AR.ImageResource("assets/street_art_3.jpg");
		// var overlayB = new AR.ImageDrawable(imgB, 0.5, {
		// 	translate: {
		// 		x: -0.15
		// 	}
		// });
		// var imgC = new AR.ImageResource("assets/street_art_4.jpg");
		// var overlayC = new AR.ImageDrawable(imgC, 0.5, {
		// 	translate: {
		// 		x: -0.15
		// 	}
		// });




		var artList = new AR.HtmlDrawable({
			uri: "assets/art_list.html"
		}, 1, {
				viewportWidth: 1000,
				viewportHeight: 800,
				clickThroughEnabled: true,
				allowDocumentLocationChanges: false,
				onDocumentLocationChanged: function onDocumentLocationChangedFn(uri) {
					// AR.context.openInBrowser(uri);
				},
				onDragBegan: function (evt) {
					AR.logger.debug(evt);
					// this.translate.y += evt;
				}
			});



		// var testDiv = new AR.HtmlDrawable({ html: "<div>My div</div>" }, 1, {
		// 	onClick: function () {
		// 		htmlDrawable.html += "<div>Another div</div>";
		// 	},
		// 	horizontalAnchor: AR.CONST.HORIZONTAL_ANCHOR.LEFT,
		// 	opacity: 0.9
		// });

		// get all targets
		// loop through targets and make trackable for each target
		// add drawable for each one

		var pageOne = new AR.ImageTrackable(tracker, "*", {
			drawables: {
				cam: [artList]
			}
		});

		// this.cloudRecognitionService.recognize(function (recognized, responseData) {
		// 	if (recognized) {
		// 		// A target image was found in the processed camera frame.
		// 		// The name of the recognized target can be retrieved from the responseData object.
		// 		alert('recognized target image: ' + responseData.targetInfo.name);

		// 	}
		// 	else {
		// 		// No target image could be found in the processed camera frame.
		// 		alert('no target image found')
		// 	}
		// });



	},

	openPicker: function openPicker() {
		alert('in art')
      var client = filestack.init("AQqITGUBVQ6mumB5gvo95z");
        client.pick();
	},

	captureScreen: function captureScreenFn() {
		getAllTargets();
		// AR.logger.info("captureScreen called ...");

		// if (World.initialized) {
		// 	document.location = "architectsdk://button?action=captureScreen";
		// }
	},

	worldLoaded: function worldLoadedFn() {
		alert(this.tracker + '<< tracker')
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
};

World.init();

//////// filestack picker ///////////////////////////



/////// AJAX request to wikitude API ////////////////
var headers = {
	'Content-Type': 'application/json',
	'X-Token': 'fe087579ece1518a3a67dae3021888c7',
	'X-Version': 3
}

var allMarkers = [];
var newMarker;

var TC_ID = '5963b498f67e6315b7658a2a';
var target_Id = null;
var baseUrl = 'https://api.wikitude.com';
var path_add_target  = '/cloudRecognition/targetCollection/' + TC_ID + '/target/';
var path_get_target  = '/cloudRecognition/targetCollection/' + TC_ID + '/target/' + target_Id;
var path_generate_TC = '/cloudRecognition/targetCollection/' + TC_ID + '/generation/cloudarchive';

let getAllTargets = function () {
	let path = baseUrl + path_add_target
	alert('path is ' + path)
	$.ajax({
		type: 'GET',
		url: path,
		headers: headers,
		success: function(markers) {
		  allMarkers = markers;
		  alert('success getting all markers' + allMarkers);
		},
		error: function(err) {
			document.getElementById('loadingMessage').innerHTML =
			// "<div> error is " + err + "</div>"
			alert(JSON.stringify(err));
		}
	})
}

let addTarget = function(targetName, photoUrl) {
	let target = {
		name: targetName,
		imageUrl: photoUrl
	}
	let path = baseUrl + path_add_target;
	$.ajax({
		type: 'POST',
		url: path,
		data: target,
		headers: headers,
		success: function(marker) {
		  newMarker = marker;
		  target_Id = marker.id;
		  alert('success making new marker');
		},
		error: function(err) {
			alert('failure making new marker');
		}
	})
}

let deleteTarget = function (){
	let path = baseUrl + path_get_target;
	$.ajax({
		type: 'DELETE',
		url: path,
		headers: headers,
		success: function() {
		  alert('success deleting marker');
		},
		error: function(err) {
			alert('failure deleting marker');
		}
	})
}

let generateTargetCollection = function () {
	let path = baseUrl + path_generate_TC;
	$.ajax({
		type: 'POST',
		url: path,
		headers: headers,
		success: function(collection) {
		  newMarker = marker;
		  alert('success generating collection');
		},
		error: function(err) {
			alert('failure generating collection');
		}
	})
}

