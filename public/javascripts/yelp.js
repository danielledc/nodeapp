 getParams = function( queryString ) {
    var yelpID,  temp;

    temp = queryString.split('=');
    yelpID=temp[1];
	
	return yelpID;
   
}


