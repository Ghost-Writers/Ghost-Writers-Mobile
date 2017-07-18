var World = {
	loaded: false,
	rotating: false,
	initialized: false,

	init: function initFn() {
		this.createModelAtLocation();
		World.initialized =  true;
	},

	createModelAtLocation: function createModelAtLocationFn() {
		
		AR.logger.activateDebugMode();
		AR.logger.info("createModelAtLocation called ...");
		
		/*
			First a location where the model should be displayed will be defined. This location will be relativ to the user.	
		*/
		var location = new AR.RelativeLocation(null, 5, 0, 2);

		/*
			Next the model object is loaded.
		*/
		var modelEarth = new AR.Model("assets/earth.wt3", {
			onLoaded: this.worldLoaded,
			scale: {
				x: 1,
				y: 1,
				z: 1
			}
		});

        var indicatorImage = new AR.ImageResource("assets/indi.png");

        var indicatorDrawable = new AR.ImageDrawable(indicatorImage, 0.1, {
            verticalAnchor: AR.CONST.VERTICAL_ANCHOR.TOP
        });

		/*
			Putting it all together the location and 3D model is added to an AR.GeoObject.
		*/
		var obj = new AR.GeoObject(location, {
            drawables: {
               cam: [modelEarth],
               indicator: [indicatorDrawable]
            }
        });
	},

	/*
		This sample shows you how to use the function captureScreen to share a snapshot with your friends. C
		oncept of interaction between JavaScript and native code is same as in the POI Detail page sample but the urlListener now handles picture sharing instead. 
		The "Snapshot"-button is on top right in the title bar. 
		Once clicked the current screen is captured and user is prompted to share it (Handling of picture sharing is done in native code and cannot be done in JavaScript)
	*/
	captureScreen: function captureScreenFn() {
		AR.logger.info("captureScreen called ...");

		if (World.initialized) {
			document.location = "architectsdk://button?action=captureScreen";
		}
	},

	/**
	 * This is an example of a function called by IONIC --> WikitudePlugin
	 */
	testFunction: function testFunctionFn(message) {
		alert("testFunction called: "+message);
	},

	worldLoaded: function worldLoadedFn() {
		World.loaded = true;
		var e = document.getElementById('loadingMessage');
		e.parentElement.removeChild(e);
	},

  showCreate: function showCreateFn() {
    var x = document.getElementById('create')
    if (x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  },

  picChange: function picChangeFn(data) {
    var fileInput = data.target.files;
    if(fileInput.length>0) {
      alert(JSON.stringify(fileInput[0]))
    }
  }
  
};

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
var path_get_target  = '/cloudrecognition/targetcollection' + TC_ID + 'targets' + target_Id;
var path_generate_TC = '/cloudrecognition/targetcollection' + TC_ID + '/generation/cloudarchive';

let getAllTargets = function () {
	let path = baseUrl + path_add_target
	$.ajax({
		type: 'GET',
		url: path,
		headers: headers,
		success: function(markers) {
		  allMarkers = markers;
		  alert('success getting all markers' + allMarkers);
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

World.init();
