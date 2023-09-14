const GooglePlaces = require('googleplaces');
const googlePlaces = new GooglePlaces(config.apiKey, config.outputFormat);


function initMap() {
  geocoder = new google.maps.Geocoder();
  var gummersbach = new google.maps.LatLng(51.02860, 7.56172)

  // New map
  var map = new google.maps.Map(document.getElementById('map'), {
    center: gummersbach,
    zoom: 13,
    mapTypeId: 'roadmap',
  });


  const input = document.getElementById("search_input");
  const searchBox = new google.maps.places.SearchBox(input);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);


  //Position an Map pushen
  map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());


  });

  

  var markers = [];

  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

 
    const bounds = new google.maps.LatLngBounds();
    
    places.forEach((place) => {
      console.log(place)
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }


   
    
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });

  
  

  
  // Add marker



  codeAddress("Bongardstr 6a, 42499 Hückeswagen, Deutschland","Metropole")

  // Add Marker function
  function addMarker(props) {
    var marker = new google.maps.Marker({
      position: props.coords,
      map: map
    });

    // Check content
    if (props.content) {
      var infoWindow = new google.maps.InfoWindow({
        content: props.content
      });

      marker.addListener('click', function () {
        infoWindow.open(map, marker);
      });
    }
  }


  function codeAddress(address, newContent) {
   
    geocoder.geocode({ 'address': address }, function (results, status) {
        console.log(results);
        var lat = results[0].geometry.location.lat ()
        var lng = results[0].geometry.location.lng ()
   
        if (status == 'OK') {
          var newPlace = addMarker({
            coords: {lat , lng },
            content: '<h3>'+newContent+'</h3>'
          });
  
     
            console.log (map);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
  }


  service = new google.maps.places.PlacesService(map);

}

window.initMap = initMap;

