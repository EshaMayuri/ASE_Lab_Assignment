(function(exports) {

    var cache = new WordCache();

    var g_name = '';
    var g_tracks = '';

    function setStatus(text) {
        if (text != '') {
            $('#status').html(
                '<div class="progress progress-striped active">' +
                '<div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">' +
                text +
                '</div>' +
                '</div>'
            );
        } else {
            $('#status').html('');
        }
    }

    var Playlist = function() {
    }

    var splitText = function(inputtext) {
        var words = inputtext
            .split(/[ \n\r\t]/)
            .map(function(w) { return w.toLowerCase().trim().replace(/^[.,-]+/,'').replace(/[.,-]+$/g,''); })
            .filter(function(w) { return (w.length > 0); });
        words = words.slice(0, 100);
        return words;
    }

    var refreshText = function() {
        setStatus('Updating text...');

        g_name = $('#alltext').val().trim();
        var words = splitText(g_name);
        console.log('text changed.', g_name, words);
        cache.lookupWords(words, function(worddata) {

            setStatus('');

            console.log('wordcache callback', worddata);
            // $('#debug').text(JSON.stringify(worddata, null, 2));

            var txt = '';
            g_tracks = [];
            worddata.forEach(function(data) {
                console.log('word', data.word);

                data.tracks.sort(function(a,b) {
                    return Math.random() - 0.5;
                })

                var names = data.tracks.map(function(track) {
                    return track.name;
                });

                console.log('names', names);

                var f = new FuzzySet(names);
                var fr = f.get(data.word);
                console.log('fr', fr);

                var found = null;
                var title = '';

                if (!found) {
                    data.tracks.forEach(function(track) {
                        if (track.name.toLowerCase().trim() === data.word.toLowerCase().trim()) {
                            found = track;
                        }
                    });
                }

                if (!found) {
                    if (fr && fr.length > 0) {
                        data.tracks.forEach(function(track) {
                            if (track.name === fr[0][1]) {
                                found = track;
                            }
                        });
                    }
                }

                if (!found) {
                    if (data.tracks.length > 0) {
                        found = data.tracks[0];
                    }
                }

                console.log('found', found);
                if (found) {
                    g_tracks.push(found.uri);
                    txt += '<div class="media">' +
                        '<a class="pull-left" href="#"><img class="media-object" src="' + found.cover_url + '" /></a>' +
                        '<div class="media-body">' +
                        '<h4 class="media-heading"><a href="' + found.uri + '">' + found.name + '</a></h4>' +
                        'Album: <a href="' + found.album_uri + '">' + found.album +
                        '</a><br/>Artist: <a href="' + found.artist_uri + '">' + found.artist+'</a>' +
                        '</div>' +
                        '</div>\n';
                } else {
                    txt += '<div class="media">No match found for the word "' + data.word+ '"</div>\n'
                }
            });

            $('#debug').html(txt);
        });
    }

    $scope.getSentiment = function (review) {
        $.ajax({
            url: "https://api.uclassify.com/v1/uClassify/Sentiment/classify/?readKey=nkCGo8tlGH2c&text=" + review,
            dataType: 'json',
            success: function (data) {
                $('#review').html(data);
            }

        });
    }
    var getHotel = function(){

        var search = document.getElementById("newsSearch").value;
        var searchParams = search.split(" ");
        var searchString = "";

        for (var i = 0; i < searchParams.length; i++){
            if(i != searchParams.length - 1){
                searchString += searchParams[i] + "^";
            }
            else{
                searchString += searchParams[i];
            }
        }

        console.log("searchstring", searchString);
        $.ajax({
                 url: "http://webhose.io/search?token=d0681dce-002c-4aad-82a2-b48d1a22d9ac&format=json&q=" +
                 searchString + "&sort=rating&ts=1490118814042&size=2",
            dataType: 'json',
            success: function(data){
                var retText = "";

                retText = data.posts[0].title.toString();
                retText +='\n' + data.posts[0].text.toString();
                getSentiment(data.posts[0].text.toString());
                var retTextFinal = retText;

                console.log("retText",retTextFinal);
                $("#alltext").text(retTextFinal);

            }
        });
    }

    exports.startApp = function() {
        setStatus('');
        $("#getHotel").click(function(){
            getHotel();
            queueRefreshText();
        })
        //$('#alltext').text('hello world');
        refreshText();
        resolveOneWord();
    }

})(window);