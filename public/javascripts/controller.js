var organicStores = angular.module("organicStores", [
  "ngRoute",
  "angularSpinner",
  "angular-toArrayFilter"
]);

organicStores.config(function($routeProvider) {
  $routeProvider
    .when("/about", {
      templateUrl: "/about.html",
      controller: "aboutController"
    })
    .otherwise({
      templateUrl: "/main.html",
      controller: "mainController"
    });
});

organicStores.controller("mainController", function($scope, $http) {
  $scope.loading = false;
  $scope.clickedOnMap = false;
  $scope.clickedOnAbout = false;
  $scope.clickedOnList = false;
  $scope.showHome = true;
  $scope.showToggle = false;
  $scope.zipCode = "";
  $scope.showBoroughs = {
    Brooklyn: true,
    Bronx: true,
    Manhattan: true,
    Queens: true,
    "Staten Island": true
  };

  $scope.validateZip = function() {
    var isValid = /^[0-9]{5}$/.test($scope.zipCode);
    if (!isValid) {
      $("#error").html("Please enter a valid zip code");
    } else {
      $("#error").html("");
      $scope.listClosestStores();
    }
  };

  $scope.getRatings = function(data) {
    $scope.stores = data;
    $scope.ratingImg = "";
    $scope.rating = "";
    $("#containerWrap").css("height", "auto");

    $scope.loading = true;

    $.each(data, function(key, value) {
      console.log(value.yelpID);
      $http
        .get("/api/ratings?yelpID=" + value.yelpID)
        .then(function(response) {
          $scope.stores[key].rating =
            "Yelp Rating: " + response.data.jsonBody.rating + " Stars";
        })
        .catch(function(response) {
          console.log("Error: " + response.data);
        })
        .finally(function() {
          $scope.loading = false;
        });
    });
  };

  $scope.listStores = function() {
    $scope.showToggle = true;

    $scope.clickedOnMap = false;
    $scope.showHome = false;
    if ($scope.clickedOnList == false) {
      $scope.clickedOnList = true;
      $http
        .get("/api/stores")
        .then(function(response) {
          return $scope.getRatings(response.data);
        })
        .catch(function(response) {
          console.log("Error: " + response.data);
        });
      //.finally(function () {
      // $scope.loading = false;
      //});
    }
  };

  $scope.listClosestStores = function() {
    $scope.showToggle = true;
    $scope.showHome = false;
    $scope.loading = true;
    $scope.clickedOnList = true;
    $scope.clickedOnMap = false;
    $http
      .get("/api/closeststores?zipCode=" + $scope.zipCode)
      .then(function(response) {
        return $scope.getRatings(response.data);
      })
      .catch(function(response) {
        console.log("Error: " + response.data);
      });
    //.finally(function () {
    //	 $scope.loading = false;
    //});
  };
  $scope.plotPoints = function(longitude, latitude, storeName, address) {
    var contentString =
      '<div id="content">' +
      '<h5 id="firstHeading" class="firstHeading">' +
      storeName +
      "</h5>" +
      '<div id="bodyContent">' +
      "<p>" +
      address +
      "</p>" +
      "</div>" +
      "</div>";

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    var marker = new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      icon: "../images/Shiny-Red-Apple-32x32.png",
      map: $scope.map
    });
    marker.addListener("click", function() {
      infowindow.open(map, marker);
    });

    var center = $scope.map.getCenter();
    google.maps.event.trigger(map, "resize");
    $scope.map.setCenter(center);
  };

  $scope.showMap = function() {
    $scope.showToggle = true;
    $scope.showHome = false;
    $scope.clickedOnList = false;
    if ($scope.clickedOnMap == false) {
      $scope.clickedOnMap = true;
      $scope.loading = true;

      var mapOptions = {
        zoom: 11,
        center: { lat: 40.78, lng: -74.03 } //new google.maps.LatLng(40.799912,-74.01)
      };

      $scope.map = new google.maps.Map(
        document.getElementById("map"),
        mapOptions
      );
      geocoder = new google.maps.Geocoder();
      $http
        .get("/api/stores")
        .then(function(response) {
          $.each(response.data, function(key, value) {
            return $scope.plotPoints(
              response.data[key].loc[0],
              response.data[key].loc[1],
              response.data[key].storeName,
              response.data[key].address
            );
          });
        })
        .catch(function(response) {
          console.log("Error: " + response.data);
        })

        .finally(function() {
          $scope.loading = false;
        });
    }
    $("#containerWrap").css("height", "900px");
  };

  //filter
  $scope.filterBoroughs = function(store) {
    return $scope.showBoroughs[store.borough];
  };
});
