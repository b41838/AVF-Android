// JavaScript Document

// native variables
var getAccel,
	getGeo,
	pictureSource,
	destinationType;

document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
function onDeviceReady() {
	console.log("Lets do this");
	
	pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
	$('#device').on('pageinit', getDevice);
	$('#geo').on('pageinit', getGeo);
	$('#accel').on('pageinit', getAccel);
}

$('#instagramFeed').on('pageinit', function() {

	// Instagram API
});

// Instagram API
	
// get variable from textbox
function getVar() {
	$("#instagram").on("click", "#instaButton", function() {
			console.log("hi");
			var tag = $("#hashtag").val();
			console.log(tag);
			
	var url = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?callback=?&amp;client_id=9a4423b4dfdd4111a73d4bd39082f519&amp;count=12";
	
	$.getJSON(url, getFeed);
	
	});
}

var getFeed = function(info) {

	console.log(info);
	console.log(info.data.length);

	$("#instagramStatus").html("<h2>Instagram Results:</h2>");
	
	$.each(info.data, function(index, photo) {  // index is position in array of info.data
		var pic = "<li><img src='" + photo.images.thumbnail.url + "' alt='" + photo.user.id + "' /><h4>" + photo.user.full_name + 			", <em>(" + photo.user.name +")</em></h4></li>";
		$("#pullFeed").append(pic);
	}); // end each
	
	$("li:nth-child(3n+1)").addClass("ui-block-a");
	$("li:nth-child(3n+2)").addClass("ui-block-b");
	$("li:nth-child(3n+3)").addClass("ui-block-c");
}; // end screenOutput

// Google Map with GeoLocation
function geoSuccess(position) {
	alert("mapping it.");
	var myMap = document.createElement('section');
	myMap.id = 'geoMap';
	myMap.style.height = '400px';
	myMap.style.width = '600px';
	
	document.querySelector('article').appendChild(myMap);
	
	var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	
	var options = {
		zoom: 15,
		center: coords,
		mapTypeControl: false,
		navigationControlOptions: {
			style: google.maps.NavigationControlStyle.SMALL
		},
	
	mapTypeId: google.maps.MapTypeId.ROADMAP
	
	};
	
	var map = new google.maps.Map(document.getElementById("geoMap"), options);
	
	var marker = new google.maps.Marker({
		position: coords,
		map: map,
		title:"You are here!"
	});
};

function geoFail() {
	alert("Geolocation is not supported");
};

var getGeo = function() {
	alert("Gettering Coords");
	navigator.geolocation.getCurrentPosition(geoSuccess, geoFail);
};

// Basic Geolocation
// if successful get latitude and longitude for users current location
//function geoWin(position) {
//	alert("WINNING!");
//	var element = document.getElementById('geolocation');
//	element.innerHTML = 'Latitude: '           + position.coords.latitude           + '<br />' +
//						'Longitude: '          + position.coords.longitude			+ '<br />';
//						//'Timestamp: '          + position.timestamp                 + '<br />'
//}
//
//// if fail throw error
//function geoFail(error) {
//	alert('code: '    + error.code    + '\n' +
//		  'message: ' + error.message + '\n' +
//		  'this is: ' + "WHAAAAAACK" + '\n');
//};
//
//var getGeo = function() {
//	alert("Getting Geolocation...");
//	navigator.geolocation.getCurrentPosition(geoWin, geoFail);
//};



// Accelerometer
function accelSuccess(acceleration) {
	alert("hello");
    alert('Acceleration X: ' + acceleration.x + '\n' +
          'Acceleration Y: ' + acceleration.y + '\n' +
          'Acceleration Z: ' + acceleration.z + '\n' +
          'Timestamp: '      + acceleration.timestamp + '\n');
};

function accelError() {
	alert("Uh :x!");
};
	
var getAccel = function() {
	navigator.accelerometer.getCurrentAcceleration(accelSuccess, accelError);
};

// Camera
function onPhotoDataSuccess(imageData) {
      alert(imageData);

      // Get image handle
      var smallImage = document.getElementById('smallImage');

      // Unhide image elements
      smallImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      smallImage.src = "data:image/jpeg;base64," + imageData;
};

// Called when a photo is successfully retrieved
function onPhotoURISuccess(imageURI) {
	
	alert(imageURI);

	// Get image handle
	var largeImage = document.getElementById('largeImage');

	// Unhide image elements
	largeImage.style.display = 'block';

	// Show the captured photo
	// The inline CSS rules are used to resize the image
	largeImage.src = imageURI;
};

// A button will call this function
function capturePhoto() {
	// Take picture using device camera and retrieve image as base64-encoded string
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
		quality: 50, destinationType: destinationType.DATA_URL });
};

// A button will call this function
function capturePhotoEdit() {
	// Take picture using device camera, allow edit, and retrieve image as base64-encoded string
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
		quality: 20, allowEdit: true, destinationType: destinationType.DATA_URL
	});
};

// A button will call this function
function getPhoto(source) {
	// Retrieve image file location from specified source
	navigator.camera.getPicture(onPhotoURISuccess, onFail, {
		quality: 50, destinationType: destinationType.FILE_URI, sourceType: source 
	});
};

// Called if something bad happens.
function onFail(message) {
	alert('Failed because: ' + message);
};

var getDevice = function() {
		alert("Device Name: " + device.name);
//		var element = document.getElementById('deviceProperties');
//        element.innerHTML = 'Device Name: '     + device.name     + '<br />' +
//                            'Device Cordova: '  + device.cordova  + '<br />' +
//                            'Device Platform: ' + device.platform + '<br />' +
//                            'Device UUID: '     + device.uuid     + '<br />' +
//                            'Device Model: '    + device.model    + '<br />' +
//                            'Device Version: '  + device.version  + '<br />';
};