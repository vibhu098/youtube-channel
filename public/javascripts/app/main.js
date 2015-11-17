requirejs.config({
    "paths": {
      "app": "/javascripts/app",
      "jquery":"/javascripts/jquery",
      "jqueryui":"/javascripts/jquery-ui",
      "jade":"/javascripts/runtime"
    },
    "waitSeconds": 0
});

define(["jquery","jqueryui","app/templates/userinfo","app/templates/channelList","app/templates/videoList"],function($,ui,userinfo,channelList,videoList){
    var apiKey = 'AIzaSyDN_86MbgRDJuBOgaDWTeId6zvsQ3_Kx38';
    var client_id = "606083934359-akrqsl8jb46clsnvsbd0hrhtfm93925j";

    // To enter one or more authentication scopes, refer to the documentation for the API.
    var scopes = ['https://www.googleapis.com/auth/plus.me',"https://www.googleapis.com/auth/youtube"];

    var video_cont=$( "#video-play" );
    var iframe= video_cont.find('iframe');
    var playlistId;
    // Use a button to handle authentication the first time.
    (function handleClientLoad() {
      gapi.client.setApiKey(apiKey);
      window.setTimeout(checkAuth,1);
      $( "#video-play" ).dialog({
          autoOpen: false,
          height: 360,
          width: 640,
          modal: true,
          closeOnEscape:true,
          close: function() {
            iframe.attr({src: ""});
          }
      });
    })();

    function checkAuth() {
      gapi.auth.authorize({client_id: client_id,
       scope: scopes, immediate: true}, handleAuthResult);
    }

    function bindEvents(){
      $(".search").on('click',searchChannels);
      $(document).on("click",'.channel_detail',getChannelVideoList)
      $(document).on("click",'.video_link',playVideo)
      $(document).on("click",'#next-button',nextPage)
      $(document).on("click",'#prev-button',previousPage)
    }
    function playVideo(e){
      var $elm=$(e.currentTarget);
        var src = $(this).attr("href");
        var video_cont=$( "#video-play" );
        var iframe= video_cont.find('iframe');
        iframe.attr({
            width: 640,
            height: 360,
            src: src
        });
        e.preventDefault();
      $( "#video-play" )
          .dialog("open");
    }

    function handleAuthResult(authResult) {
      var authorizeButton = document.getElementById('authorize-button');
      if (authResult && !authResult.error) {
        authorizeButton.style.visibility = 'hidden';
         $(".login-alert").addClass("hidden");
        $(".content").removeClass("hidden");
        makeApiCall();
        bindEvents()
      } else {
        authorizeButton.style.visibility = '';
        authorizeButton.onclick = handleAuthClick;
      }
    }

    function handleAuthClick(event) {
      gapi.auth.authorize({client_id: client_id, scope: scopes, immediate: false}, handleAuthResult);
      return false;
    }

    function getChannelVideoList(e){
      var $elm = $(e.currentTarget);
      $('.channel_detail').removeClass("selected");
      $elm.addClass("selected");
      var channel_id = $elm.data("channelid");
      gapi.client.load('youtube', 'v3', function() {
        var request = gapi.client.youtube.channels.list({
          part:"contentDetails",
          id:channel_id
         });

        request.execute(function(response) {
            playlistId= response.result.items[0].contentDetails.relatedPlaylists.uploads;
            requestVideoPlaylist(playlistId)
        });
      });
    }
    // Retrieve the list of videos in the specified playlist.
function requestVideoPlaylist(playlistId, pageToken) {
  $('#video-container').html('');
  var requestOptions = {
    playlistId: playlistId,
    part: 'snippet',
    maxResults: 10
  };
  if (pageToken) {
    requestOptions.pageToken = pageToken;
  }
  var request = gapi.client.youtube.playlistItems.list(requestOptions);
  request.execute(function(response) {
    // Only show pagination buttons if there is a pagination token for the
    // next or previous page of results.
    nextPageToken = response.result.nextPageToken;
    var nextVis = nextPageToken ? 'visible' : 'hidden';
    $('#next-button').css('visibility', nextVis);
    prevPageToken = response.result.prevPageToken
    var prevVis = prevPageToken ? 'visible' : 'hidden';
    $('#prev-button').css('visibility', prevVis);

    var playlistItems = response.result;
    if (playlistItems) {
      displayResult(playlistItems);
    } else {
      $('#video-container').html('Sorry you have no uploaded videos');
    }
  });
}
// Create a listing for a video.
function displayResult(playlistItems) {
  $('#video-container').append(videoList(playlistItems));
  $(".button-container").toggleClass("hidden",playlistItems.items.length<10);
}


function nextPage() {
  requestVideoPlaylist(playlistId, nextPageToken);
}


function previousPage() {
  requestVideoPlaylist(playlistId, prevPageToken);
}
    function searchChannels(){
      gapi.client.load('youtube', 'v3', function() {
        var request = gapi.client.youtube.search.list({
          part:"snippet",
          type:"channel",
          q:$(".channel_name").val()
         });

        request.execute(function(response) {
            var str = JSON.stringify(response.result);
            $(".channel_list").html(channelList(response));
            $('.channel_detail:first').trigger('click');
        });
      });
    }
    // Load the API and make an API call.  Display the results on the screen.
    function makeApiCall() {
      gapi.client.load('plus', 'v1', function() {
        var request = gapi.client.plus.people.get({
          'userId': 'me'
        });
        request.execute(function(resp) {
          heading= userinfo(resp);

          $('#user-info').html(heading);
        });
      });
    }
});
