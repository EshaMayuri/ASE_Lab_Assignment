var request = require('request');
request('http://webhose.io/search?token=d0681dce-002c-4aad-82a2-b48d1a22d9ac&format=json&q=kansas city&sort=rating&ts=1490118814042&size=2', function (error, response, body) {
    //Check for error
    if(error){
        return console.log('Error:', error);
    }

    //Check for right status code
    if(response.statusCode !== 200){
        return console.log('Invalid Status Code Returned:', response.statusCode);
    }
//	console.log(body);
    //All is good. Print the body
    body = JSON.parse(body);
    var hotelName = body.posts[0].title;
    var hotelReview = body.posts[0].text;
    console.log(hotelName + '\n' + hotelReview);

});