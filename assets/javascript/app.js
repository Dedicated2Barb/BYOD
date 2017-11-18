//GLOBAL VARIABLES
//======================================================
//======================================================

var bdayContainer = $("#bday-container");


//START 
//======================================================
//======================================================

$("button").hide();
$(".container").hide();
$("#logoSM").hide();
$("#backarrow").hide();
$("#discoarrow").hide();
$("#playlistarrow").hide();
$("#discolady").hide();


//FUNCTION TO DISPLAY USER KEYPRESSES
//======================================================
$(document).on("keypress", function(event) {
    var number = String.fromCharCode(event.keyCode).toLowerCase();
     
    if (event.keyCode >= 48 && event.keyCode <= 57) {
      if (bdayContainer[0].innerText.length < 4) {
        bdayContainer.append(number);
      }
    }
    if (bdayContainer[0].innerText.length > 3) {
      $("button").show();
    }
    if (bdayContainer[0].innerText.length > 0) {
      $("#logo").hide();
      $("header").hide();
     }

     if (bdayContainer[0].innerText.length > 0) {
     	$("#logo").hide();
     	$("header").hide();
     }
});


//BUTTON CLICK - SONG LIST RESULTS
//======================================================
$("button").on("click", function(event) {
  $("#bday-container").hide();
  $(".container").show();
  $("button").hide();
  $("#logoSM").show();
  $("#backarrow").show();
  $("#discoarrow").show();
});

//BUTTON CLICK - RELOAD PAGE
//======================================================
$("#backarrow").on("click", function() {
 location.reload();
});

//BUTTON CLICK - RETURN TO PLAYLIST
//======================================================
$("#playlistarrow").on("click", function() {
 $("#discolady").hide();
 $(".container").show();
 $("#playlistarrow").hide();
 $("#backarrow").show();
});

//BUTTON CLICK - SHOW GIFS
//======================================================
$("#discoarrow").on("click", function() {
  $(".container").hide();
  $("#discolady").show();
  $("#backarrow").hide();
  $("#playlistarrow").show();
});

//BUTTON CLICK - PRODUCE PLAYLIST
//======================================================
$("button").on("click", function(){

  var year = bdayContainer.text();
  console.log("year: " + year);

  var queryURL = "https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=" + year + 
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
//TITLE CLICK - PRODUCE YOUTUBE VIDEO RESULTS
//======================================================
        $("tr").on("click", function(){
          

          var song = this.childNodes[0].innerHTML;
          var artist = this.childNodes[1].innerHTML;
          $.scrollTo(".results", 800);

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
        });
      });
});

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

var y = 0;

//index for: 
// current color top
// next color top
// current color bottom
// next color bottom
var positions = [0,1,2,3];

//transition speed
var gradientSpeed = 0.005;

function updateGradient() {
  
  if ( $===undefined ) return;
  
  var currTop = colors[positions[0]];
  var nexTop = colors[positions[1]];
  var currBottom = colors[positions[2]];
  var nextBottom = colors[positions[3]];

  var x = 1 - y;
  var r1 = Math.round(x * currTop[0] + y * nexTop[0]);
  var g1 = Math.round(x * currTop[1] + y * nexTop[1]);
  var b1 = Math.round(x * currTop[2] + y * nexTop[2]);
  var color1 = "rgb("+r1+","+g1+","+b1+")";

  var r2 = Math.round(x * currBottom[0] + y * nextBottom[0]);
  var g2 = Math.round(x * currBottom[1] + y * nextBottom[1]);
  var b2 = Math.round(x * currBottom[2] + y * nextBottom[2]);
  var color2 = "rgb("+r2+","+g2+","+b2+")";

 $('#gradient').css({
  background: "-webkit-gradient(linear, center bottom, center top, from("+color1+"), to("+color2+"))"});//.css({
    //background: "-moz-linear-gradient(top, "+color1+" 0%, "+color2+" 100%)"});
  
  y += gradientSpeed;
  if ( y >= 1 )
  {
    y %= 1;
    positions[0] = positions[1];
    positions[2] = positions[3];
    
    //pick two new target color indices
    //do not pick the same as the current one
    positions[1] = ( positions[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    positions[3] = ( positions[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length; 
  }
}

setInterval(updateGradient,10);