
//GLOBAL VARIABLES
//======================================================
//======================================================

var bdayContainer = $("#bday-container");


//PROCESSES
//======================================================
//======================================================

$("button").hide();
$(".container").hide();
$("#logoSM").hide();

//FUNCTION TO DISPLAY USER KEYPRESSES
//======================================================
$(document).on("keypress", function(event) {
    var number = String.fromCharCode(event.keyCode).toLowerCase();
   //   console.log("#: " + number);
     
    if (event.keyCode >= 48 && event.keyCode <= 57) {
      if (bdayContainer[0].innerText.length < 4) {
        bdayContainer.append(number);
      }
    }
    if (bdayContainer[0].innerText.length > 3) {
      $("header").hide();
      $("button").show();
    }
    if (bdayContainer[0].innerText.length > 0) {
      $("#logo").hide();
      $("header").hide();
     }

});

$("button").on("click", function(event) {
  $("#bday-container").hide();
  $(".container").show();
  $("button").hide();
  $("#logoSM").show();

 // displayVideos();
});


//CLICK BUTTON TO PRODUCE PLAYLIST
//======================================================
$("button").on("click", function(){

  var year = bdayContainer.text();
  console.log("year: " + year);

  var queryURL = "http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=" + year + 
    "&api_key=319dee413845315791220a4cdf2ea8db&format=json&limit=99";
    console.log("queryURL", queryURL);

  $.ajax({
      url: queryURL,
      method:"GET"
    }).done(function(response){
      console.log(response)

      var trackResults = response.tracks.track;
      var artists = {};
      var counter = 0;

      while (counter <= 10) {
        var randNumber = Math.floor(Math.random() * trackResults.length);
        
        var trackName = trackResults[randNumber].name;
       
        var artistName = trackResults[randNumber].artist.name;
        var tName = trackResults.name;

        if (artists[artistName]) {
          continue;
        } else {
          artists[artistName] = true;
          counter++;

          $("#trackTable > tbody").append("<tr><td>" 
            + trackName + "</td><td>" + artistName + "</td></tr>");

        }
      }
//CLICK TITLE TO PRODUCE YOUTUBE VIDEO RESULTS
//======================================================
        $("tr").on("click", function(){
          

          var song = this.childNodes[0].innerHTML;
          var artist = this.childNodes[1].innerHTML;
          $.scrollTo(".results", 800);
          //function displayVideos(){

              var key = "AIzaSyCiwWWtLUbg2ByHGw8md5m4nl3guLFq6Xc";
              $.ajax({
                  method: 'GET',    
                  url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + 
                  song + "-" + artist + "&key=" + key,
                  data: {
                      format: "json"
                  },
                  dataType: 'json',  
              }).done(function(response){
                  var results = response.items;
                  console.log(results);
                  $(".results").empty();
                  for (var i = 0; i < 3; i++){
                      var video = $("<iframe>");
                      video.addClass("video w100").attr("width","400").attr("height","300").css("padding","10px").css("border","1px").attr("src","https://www.youtube.com/embed/"+response.items[i].id.videoId).attr("frameborder","0").attr("allowfullscreen");
                      $(".results").append(video);
                  };
              });
        //  }
         // displayVideos();
        });
      });
});


//$('.prev-section').click(function(e){
  //  e.preventDefault();
   // var $this = $(this),
      //  $prev = $this.parent().prev();

  //  $prev.scrollTo(400, 'linear');
//});

//GRADIENT CODE
//======================================================
//======================================================

var colors = new Array(
  [0,140,255],
  [60,255,60],
  [255,35,98],
  [71,200,255],
  [255,0,255],
  [255,251,33]);

var step = 0;
//color table indices for: 
// current color top
// next color top
// current color bottom
// next color bottom
var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.005;

function updateGradient() {
  
  if ( $===undefined ) return;
  
  var c0_0 = colors[colorIndices[0]];
  var c0_1 = colors[colorIndices[1]];
  var c1_0 = colors[colorIndices[2]];
  var c1_1 = colors[colorIndices[3]];

  var istep = 1 - step;
  var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
  var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
  var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
  var color1 = "rgb("+r1+","+g1+","+b1+")";

  var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
  var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
  var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
  var color2 = "rgb("+r2+","+g2+","+b2+")";

 $('#gradient').css({
  background: "-webkit-gradient(linear, center bottom, center top, from("+color1+"), to("+color2+"))"});//.css({
    //background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
  
  step += gradientSpeed;
  if ( step >= 1 )
  {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];
    
    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    
  }
}

setInterval(updateGradient,10);