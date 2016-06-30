
angular.module('organicStores', [])
    .controller('mainController', ['$scope','$http', function mainController($scope, $http) {
    $scope.clickedOn=false;
    $scope.clickedOnMap=false;
    $scope.showHome=true;
    $scope.zipCode="";
    var mapOptions = {
		 zoom: 11,
		center:new google.maps.LatLng(40.799912,-74.01)
    		}
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
		geocoder = new google.maps.Geocoder();
    // when landing on the page, get all todos and show them
	$scope.listStores=function(){
		$http.get('/stores')
			.success(function(data) {
				$scope.stores = data;
				$scope.ratingImg="";
				$scope.rating="";
    				$scope.clickedOn = true;
				$scope.showHome = false;
				$("#containerWrap").css("height","auto");
				$scope.clickedOnMap = false;
		
				$.each(data, function(key,value) {    
					$http.get('/ratings?yelpID='+value.yelpID)
						.success(function(data){
							$scope.stores[key].rating= data.rating;
							$scope.stores[key].ratingImg= data.rating_img_url;
						})
						.error(function(data) {
							console.log('Error: ' + data);
						});		
				});    
				
				//console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	}
	$scope.convertToCoords=function(){
		var lat = '';
    		var lng = '';
               // var address = {zipcode} or {city and state};
    		geocoder.geocode( { 'address': $scope.zipCode}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
        		 lat = results[0].geometry.location.lat();
         		 lng = results[0].geometry.location.lng();
                	 console.log(lat,lng);
		
                } else {
                //alert("Geocode was not successful for the following reason: " + status);
		 }
		});
    				
	}
	$scope.listClosestStores=function(){
	
		$http.get('/closeststores?')
			.success(function(data) {
				$scope.stores = data;
				$scope.clickedOn = true;
				$scope.showHome = false;
				$("#containerWrap").css("height","auto");
				$scope.clickedOnMap = false;
		
				$.each(data, function(key,value) {    
					$http.get('/ratings?yelpID='+value.yelpID)
						.success(function(data){
								console.log(data.rating_img_url);
								$scope.ratingImg=data.rating_img_url;
							    $scope.plotPoints(data.location.coordinate.longitude, data.location.coordinate.latitude);
						})
						.error(function(data) {
							console.log('Error: ' + data);
						});		
				});    
				
				//console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	}
	$scope.plotPoints=function(longitude, latitude){
			var marker = new google.maps.Marker({
			position: {lat: latitude, lng: longitude},
			map: $scope.map,
			title: 'Hello World!'
	});
	}
	$scope.initMap=function(){
			
	
	}
	$scope.showMap=function(){
		$scope.clickedOn = false;
		$scope.clickedOnMap = true;
		$scope.showHome = false;
			
		$("#containerWrap").css("height","100%");
		$http.get('/stores')
			.success(function(data) {
				$.each(data, function(key,value) {  
					$scope.plotPoints(data[key].loc.longitude, data[key].loc.latitude);
				})
					
			})
			.error(function(data) {
					console.log('Error: ' + data);
			});
		
				
		
  }

   

    }]);

	
