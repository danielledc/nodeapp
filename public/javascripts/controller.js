
angular.module('organicStores', [])
    .controller('mainController', ['$scope','$http', function mainController($scope, $http) {
    $scope.clickedOn=false;
    $scope.clickedOnMap=false;
    $scope.showHome=true;
    $scope.zipCode="";
    $scope.lng=0;
    $scope.lat=0;
  

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
        $scope.getLatitude=function(){
        	geocoder = new google.maps.Geocoder();
		
    		geocoder.geocode( { 'address': $scope.zipCode}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
        		$scope.lat = results[0].geometry.location.lat();
         		 return $scope.lat;
                	
		
                } else {
                //alert("Geocode was not successful for the following reason: " + status);
		 }	
        
        }
        $scope.getLongitude=function(){
        	geocoder = new google.maps.Geocoder();
		
    		geocoder.geocode( { 'address': $scope.zipCode}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
        		$scope.lat = results[0].geometry.location.lat();
         		 $scope.lng = results[0].geometry.location.lng();
                	 return $scope.lng;
                	
		
                } else {
                //alert("Geocode was not successful for the following reason: " + status);
		 }	
        
        }
	$scope.listClosestStores=function(){
	      
              
		$http.get('/closeststores?longitude='+ $scope.getLongitude+'&latitude='+$scope.getLatitude)
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
		    var center =$scope.map.getCenter();
    			google.maps.event.trigger(map, 'resize');
			 $scope.map.setCenter(center); 
		
	
		 
	}
	$scope.initMap=function(){
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
	$scope.showMap=function(){
		
		$scope.clickedOn = false;
		$scope.clickedOnMap = true;
		$scope.showHome = false;
		 var mapOptions = {
		 zoom: 11,
		center: {lat: 40.799912, lng: -74.01}//new google.maps.LatLng(40.799912,-74.01)
    		}
    		
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
		geocoder = new google.maps.Geocoder();
		$http.get('/stores')
			.success(function(data) {
				$.each(data, function(key,value) {  
					$scope.plotPoints(data[key].loc.longitude, data[key].loc.latitude);
				})
					
			})
			.error(function(data) {
					console.log('Error: ' + data);
		});
	       	  
		$("#containerWrap").css("height","100%");
	
		
				
		
  }

   

    }]);

	
