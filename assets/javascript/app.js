



//GLOBAL VARIABLES
//======================================================
//======================================================

//API KEY FOR YOUTUBE AIzaSyCiwWWtLUbg2ByHGw8md5m4nl3guLFq6Xc

var bdayContainer = $("#bday-container");


//FUNCTIONS
//======================================================
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
        console.log(randNumber)
        var trackName = trackResults[randNumber].name;
        console.log("test" + trackName)
        var artistName = trackResults[randNumber].artist.name;

        if (artists[artistName]) {
          continue;
        } else {
          artists[artistName] = true;
          counter++;

          $("#trackTable > tbody").append("<tr><td>" 
            + trackName + "</td><td>" + artistName + "</td></tr>");

        }




      }
    //   console.log(trackResults);
    //   for (i = 0; i < 11; i++) {


    //   for (var i = 0; i < trackResults.length; i++){
    //     var trackName = trackResults[i].name;
    //     console.log("track " + trackName);

    //     var trackArtist = trackResults[i].artist.name;
    //       $("#trackTable > tbody").append("<tr><td>" 
    //         + trackName + "</td><td>" + trackArtist + "</td></tr>");
    //   }

    // }
  });

});

 // var search = $(this).attr("data-name");

  //var queryURL = "https://www.googleapis.com/youtube/v3/search?q=" + search + "&key=AIzaSyCiwWWtLUbg2ByHGw8md5m4nl3guLFq6Xc";

  //$.ajax({
   // url: queryURL,
  //  method: "GET"
  // }).done(function(response){
  //     console.log(response);
  //     var results = response.items;
  //     console.log(results);

  //     for (var i = 0; i < response.items; i++){
  //       var ytDiv = $("<div class='ytVideos'>");
  //       var ytVideos = $("<iframe>");

  //       ytVideos.attr("src", results[i].id.url);

  //       ytDiv.append(ytVideos);

  //       $(".videos").prepend(ytDiv);
  //     }
      
  // });





//MAIN PROCESSES
//======================================================
//======================================================

$("button").hide();
$(".container").hide();


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

});

$("button").on("click", function(event) {
  $("#bday-container").hide();
  $(".container").show();
  $("button").hide();

 // displayVideos();
});




 
     



//CODE TO BE DISSECTED/MADE ORIGINAL
//======================================================
//======================================================

var colors = new Array(
  [0,140,255],
  [60,255,60],
  [255,35,98],
  [71,200,255],
  [255,0,255],
  [255,251,33]);

  //[62,35,255],
  //[60,255,60],
  //[255,35,98],
  //[45,175,230],
  //[255,0,255],
  //[255,128,0]);

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