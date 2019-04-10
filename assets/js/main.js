$(document).ready(function(){

  //showTris("Player1","Player2");
  homePage();
  addEventsOnButtons();

});

//--- INIT PAGE ---
function homePage(){
  $("#container").empty();

  var content ='\
  <h1 id="main-title">Tris Game!</h1> \
  <div id="form-container"> \
      <p>Player 1</p> \
      <input type="text" id="player1-label" placeholder="Name P1"> \
      <p>Player 2</p> \
      <input type="text" id="player2-label" placeholder="Name P2"> \
      <button type="button" class="btn" name="start">Start</button> \
      <button type="reset" class="btn" name="reset">Reset</button> \
    </div>';

  $("#container").append(content);
  $("#container").removeClass("closed");
}

//--- BUTTONS START\RESET EVENT LISTENER ---
function addEventsOnButtons(){
  $(".btn").on("click", function(){
    if($(this).text() == "Start"){
      let player1 = $("#player1-label").val();
      let player2 = $("#player2-label").val();
      if(player1 == "" || player2 == ""){
        player1 = "Player1";
        player2 = "Player2";
      }
      $(this).addClass("fadeOut");
      showTris(player1, player2);
    }else if ($(this).text() == "Reset") {
      resetAll();
    }
  });
}

//--- RESET BUTTON ---
function resetAll(){
  $("#player1-label").val("");
  $("#player2-label").val("");
}

//--- SHOW TRIS \ START BUTTON ---
function showTris(p1_name, p2_name){
  $("#container").empty();
  $("#container").removeClass("fadeOut").removeClass("zoomInDown");
  $("#container").addClass("fadeIn");

  showTrisData(p1_name, p2_name);
  showTrisGrid();

  $("#container").removeClass("closed");
  handleTrisGame();
}

function showTrisData(p1_name, p2_name){
  $("#container").append('<div id="top-info-container"></div>');

  var player1_doms = '\
  <div class="player-info" id="player1">\
    <div class="player-icon"></div>\
    <p class="player-name">'+ p1_name +'</p>\
    <p class="player-points">0</p>\
  </div>';
  $("#top-info-container").append(player1_doms);

  var player2_doms = '\
  <div class="player-info" id="player2">\
    <div class="player-icon"></div>\
    <p class="player-name">'+ p2_name +'</p>\
    <p class="player-points">0</p>\
  </div>';
  $("#top-info-container").append(player2_doms);

  var player_turn_doms = '\
  <div id="turn-container">\
    <div class="player-info" id="player1">\
      <span>Turn of</span><p class="player-name">'+ p1_name +'</p>\
      <div class="player-icon"></div>\
    </div>\
  </div>';
  $("#top-info-container").append(player_turn_doms);
}

function showTrisGrid(){
  $("#container").append('<div id="tris-grid"></div>');

  for(var i=1; i<4; i++){
    $("#tris-grid").append('<div id="r'+i+'c1"></div>');
    $("#tris-grid").append('<div id="r'+i+'c2"></div>');
    $("#tris-grid").append('<div id="r'+i+'c3"></div>');
    $("#tris-grid:last-child::after").css("display","block");
  }
}

function handleTrisGame(){
  // console.log("tris");
}
