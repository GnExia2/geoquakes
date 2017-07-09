console.log("sanity check");

// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

$(document).ready(function() {
  $.ajax({
    method:'GET',
    url:weekly_quakes_endpoint,
    success: onSuccess,
    error: onError,
  });
});


function onSuccess(json){

  var currentTime = new Date();
  var coordinates = [];

  for(i = 0; i < json.features.length; i++){

    var quakeTime = new Date (json.features[i].properties.time);
    var timeElapsed = currentTime - quakeTime;

    timeElapsed = Math.round(10*timeElapsed/1000/60/60)/10;
    $('#info').append(`<p>M: ${json.features[i].properties.mag} - ${json.features[i].properties.place} / ${timeElapsed} hours ago</p>`);
    coordinates.push([json.features[i].geometry.coordinates[0], json.features[i].geometry.coordinates[1]]);
    initMap(coordinates);
  }
}

function onError (xhr, status, errorThrown){
  console.log(xhr, status, errorThrown)
}

//accessing Google Maps API
function initMap (coordinates) {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 34.0479, lng: 100.6197},
    zoom: 4
  });

  var markerImage = {
    url: 'images/earthquake.png',
    scaledSize: new google.maps.Size(20, 20),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 0)
  };

  var markers = [];

  for(i = 0; i < coordinates.length; i++){
    markers[i] = new google.maps.Marker({
      position: {lat: coordinates[i][1], lng: coordinates[i][0]},
      map: map,
      icon: markerImage
    });
  }
}
