// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

$(document).ready(function() {
  console.log("Let's get coding!");
  // CODE IN HERE!
  $.ajax({
    method:'GET',
    url:weekly_quakes_endpoint,
    success: onSuccess,
    error: onError,
  });



});

function onSuccess(json){

  for(i = 0; i < json.features.length; i++){
    console.log(json);
    $('#info').append(`<p>M: ${json.features[i].properties.mag} - ${json.features[i].properties.place}</p>
    `);
  }
  initMap();

        // json.features[i].geometry.coordinates[0]
        // json.features[i].geometry.coordinates[1]
        // json.features[i].geometry.coordinates[2]
}

function onError(xhr, status, errorThrown){
  console.log(xhr, status, errorThrown)
}

//maps api

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.78, lng: -122.44},
    zoom: 8
  });

  var marker = new google.maps.Marker({
    position: {lat: 37.78, lng: -122.44},
    map: map
  });

}
