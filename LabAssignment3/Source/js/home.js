/**
 * Created by Esha Mayuri on 2/6/2017.
 */

angular.module('myApp', [])


    .controller('View1Ctrl', function ($scope, $http) {
        $scope.movieList = new Array();
        $scope.getMovies = function () {
            var movieName = document.getElementById("txt_movieName").value;
            //var searchQuery = document.getElementById("txt_searchFilter").value;
            if (movieName != null && movieName != "")//&& searchQuery != null && searchQuery != "")
            {
                //document.getElementById('div_ReviewList').style.display = 'none';
                //This is the API that gives the list of venues based on the place and search query.
                var handler = $http.get("https://api.themoviedb.org/3/search/movie?query=" +
                    movieName + "&api_key=cefdee46a223603265c8a1ef40bd20d6&limit=5");
                handler.success(function (data) {
                    if (data != null && data.results != null) {// && data.response.venues != undefined && data.response.venues != null) {

                        for (var i = 0; i < data.results.length; i++) {
                            $scope.movieList[i] = {
                                "name": data.results[i].original_title,
                                "id": data.results[i].id,
                                "overview": data.results[i].overview,
                                "releaseDate": data.results[i].release_date,
                                "rating": data.results[i].vote_average,
                                "genere": data.results[i].genre_ids
                            };
                            document.getElementById('div_movieList').style.display = 'block';
                        }
                    }

                })
                handler.error(function (data) {
                    alert("There was some error processing your request. Please try after some time.");
                });
            }
        }
        $scope.getOverviews = function (movieSelected) {
            if (movieSelected != null)
            {
                //This is the API call being made to get the reviews(tips) for the selected place or venue.
                var handler = $http.get("http://api.themoviedb.org/3/movie/"
                +movieSelected.id +"/reviews?api_key=cefdee46a223603265c8a1ef40bd20d6");
                handler.success(function (data1) {
                    if (data1 != null && data1.results != null) //&& data1.response.tips != null &&
                        //data1.response.tips.items != null)
                    {
                        $scope.movieSelected = movieSelected.name;
                        $scope.movieOverview = movieSelected.overview;
                        $scope.movieReleaseDate = movieSelected.releaseDate;
                        if(movieSelected.rating != 0)
                        {
                            $scope.movieRating = movieSelected.rating;
                        }
                        else
                        {
                            $scope.movieRating = "No ratings";
                        }


                        var movieGenere = movieSelected.genere;
                        var handler1 = $http.get("https://api.themoviedb.org/3/genre/movie/"
                        +"list?language=en-US&api_key=cefdee46a223603265c8a1ef40bd20d6");
                        handler1.success(function (data2) {
                            if(data2 !=null && data2.genres != null)
                            {
                                for (var i = 0; i < data2.genres.length; i++)
                                {
                                    for(var j = 0; j < movieGenere.length; j++)
                                    {
                                        if (data2.genres[i].id === movieGenere[j])
                                        {
                                            $scope.movieGenere = data2.genres[i].name;
                                        }
                                    }
                                }
                            }
                        })

                        if (data1.results.length > 0)
                        {
                            $scope.reviewAuthor = data1.results[0].author;
                            $scope.reviewContent = data1.results[0].content;
                            //This is the Alchemy API for getting the sentiment of the most recent review for a place.
                            var callback = $http.get("http://gateway-a.watsonplatform.net/calls/text/TextGetEmotion?apikey=d0e7bf68cdda677938e6c186eaf2b755ef737cd8"
                            +"&outputMode=json&text=" + $scope.reviewContent);
                            callback.success(function (data3) {
                                if (data3 != null && data3.docEmotions != null)
                                {
                                    $scope.ReviewWithSentiment = {
                                        "reviewText": $scope.reviewContent,
                                        "joy": data3.docEmotions.joy,
                                        "sadness": data3.docEmotions.sadness
                                    };


                                }
                            })
                            var callback1 = $http.get("http://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment" +
                                "?apikey=d0e7bf68cdda677938e6c186eaf2b755ef737cd8" +
                                "&outputMode=json&text=" + $scope.reviewContent);
                            callback1.success(function (data3) {
                                if(data3!=null && data3.docSentiment!=null)
                                {
                                    $scope.ReviewWithSentiment1 = {
                                        "sentiment":data3.docSentiment.type,
                                        "score":data3.docSentiment.score  };
                                }
                            })
                            document.getElementById('div_ReviewList').style.display = 'block';
                        }
                        else
                        {
                            alert("No reviews for the movie");
                        }

                    }
                    document.getElementById('div_movieDetails').style.display = 'block';
                })
                handler.error(function (result) {
                    alert("There was some error processing your request. Please try after some time.")
                })
            }

        }
    });
