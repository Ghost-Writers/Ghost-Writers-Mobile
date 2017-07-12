var World = {
	loaded: false,

	init: function initFn() {
		this.createOverlays();
	},

	createOverlays: function createOverlaysFn() {

		AR.logger.activateDebugMode();
		AR.logger.debug('logger activated...');

		this.targetCollectionResource = new AR.TargetCollectionResource("assets/final_test.wtc", {
		});

		this.tracker = new AR.ImageTracker(this.targetCollectionResource, {
			onTargetsLoaded: this.worldLoaded
		});


		// this.cloudRecognitionService = new AR.CloudRecognitionService("162f925e3bc546141ebbdfae63ff97f1", "595edc6053f64031675c2b92", {
		// 	onLoaded: this.worldLoaded
		// });
		// this.tracker = new AR.ImageTracker(cloudRecognitionService);

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
				clickThroughEnabled: true,
				allowDocumentLocationChanges: false,
				onDocumentLocationChanged: function onDocumentLocationChangedFn(uri) {
					// AR.context.openInBrowser(uri);
				},
				onDragBegan: function(evt) {
					AR.logger.debug(evt);
					this.translate.y += evt;
				}
			});

		

		// var testDiv = new AR.HtmlDrawable({ html: "<div>My div</div>" }, 1, {
		// 	onClick: function () {
		// 		htmlDrawable.html += "<div>Another div</div>";
		// 	},
		// 	horizontalAnchor: AR.CONST.HORIZONTAL_ANCHOR.LEFT,
		// 	opacity: 0.9
		// });

		var pageOne = new AR.ImageTrackable(this.tracker, "*", {
			drawables: {
				cam: [artList]
			}
		});

	},

	worldLoaded: function worldLoadedFn() {
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

var headers = {
	'Content-Type': 'application/json',
	'X-Token': '',
	'X-Version': ''
}

var allMarkers = [];
var newMarker;

var TC_ID = '5963b498f67e6315b7658a2a';
var target_Id = null;
var baseUrl = 'https://api/wikitude.com';
var path_add_target  = '/cloudrecognition/targetcollection' + TC_ID + 'target';
var path_add_tagets  = '/cloudrecognition/targetcollection' + TC_ID + 'targets';
var path_get_target  = '/cloudrecognition/targetcollection' + TC_ID + 'targets' + target_Id;
var path_generate_TC = '/cloudrecognition/targetcollection' + TC_ID + '/generation/cloudarchive';

/////// AJAX request to wikitude API ////////////////
let getAllTargets = function () {
	let path = baseUrl + path_add_target
	$.ajax({
		type: 'GET',
		url: path,
		headers: headers,
		success: function(markers) {
		  allMarkers = markers;
		  alert('success getting all markers');
		},
		error: function(err) {
			alert('failure getting all markers');
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

let deleteTarget = function ()
$.ajax({
		type: 'GET',
		url: path,
		data: '',
		headers: {},
		success: '',
		error: ''
	})


