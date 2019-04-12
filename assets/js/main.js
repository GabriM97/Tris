var player1_name = "Pl-1";
var player2_name = "Pl-2";
var player_turn = "player1";
var player1_score = 0;
var player2_score = 0;
var turns_counter = 0;

$(document).ready(function(){
  homePage();
  // showTris();
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
      player1_name = player1;
      player2_name = player2;
      showTris();
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
function showTris(){
  $("#container").empty();
  $("#container").removeClass("fadeOut").removeClass("zoomInDown");
  $("#container").addClass("fadeIn");

  showTrisData();
  showTrisGrid();
  addEventsOnCells();
}

// --- TRIS - TOP INFO ---
function showTrisData(){
  $("#container").append('<div id="top-info-container"></div>');

  var player1_doms = '\
  <div class="player-info" id="player1">\
    <div class="player-icon"></div>\
    <p class="player-name">'+ player1_name +'</p>\
    <p class="player-points">'+ player1_score +'</p>\
  </div>';
  $("#top-info-container").append(player1_doms);

  var player2_doms = '\
  <div class="player-info" id="player2">\
    <div class="player-icon"></div>\
    <p class="player-name">'+ player2_name +'</p>\
    <p class="player-points">'+ player2_score +'</p>\
  </div>';
  $("#top-info-container").append(player2_doms);

  var player_turn_doms = '\
  <div id="turn-container">\
    <div class="player-info" id="'+ player_turn +'">\
      <span>Turn of</span><p class="player-name">'+ (player_turn=="player1" ? player1_name : player2_name) +'</p>\
      <div class="player-icon"></div>\
    </div>\
  </div>';
  $("#top-info-container").append(player_turn_doms);
}

// --- TRIS - SHOW GRID ---
function showTrisGrid(){
  $("#container").append('<div id="tris-grid-container"></div>');
  var row=-1;
  var col=0;
  for(var i=0; i<9; i++){
    col = i%3;
    row = col==0 ? (row+1) : row;
    $("#tris-grid-container").append('<div class="grid-item" row="'+row+'" col="'+col+'"></div>');
    fixGridBorders(row,col);
  }
}

// --- FIX GRID BORDERS ---
function fixGridBorders(row,col){
  var item = $(".grid-item").last();
  if(row == 0){  //first row
    item.css("border-top","0");
    if(col == 0)  item.css("border-left","0");
    else if(col == 2)  item.css("border-right","0");
  }else
  if(row == 1){ //second row
    if(col == 0)  item.css("border-left","0");
    else if(col == 2)  item.css("border-right","0");
  }else
  if(row == 2){ //third row
    item.css("border-bottom","0");
    if(col == 0)  item.css("border-left","0");
    else if(col == 2)  item.css("border-right","0");
  }
}

// --- CHECK WINS ---
function checkTrisWins(){
  if(turns_counter < 5)  return;
  console.log("Handle"+turns_counter);
  // alert("possible tris");

}

// --- CLICK EVENT ON TRIS GRID ---
function addEventsOnCells(){
  $(".grid-item").on("click", function(){
    // alert("click on " + $(this).attr("row") + "-" + $(this).attr("col"));
    if(player_turn == "player1"){
      $(this).css("background", "url('assets/img/x_icon.png')");
      $(this).css("background-size", "cover");
    }else{
      $(this).css("background", "url('assets/img/o_icon.png')");
      $(this).css("background-size", "cover");
    }
    turns_counter++;
    checkTrisWins();
    changeTurn();
    $(this).off("click");
  });
}

// --- CHANGE PLAYER TURN AFTER CLICK ---
function changeTurn(player_id){
  if(player_turn == "player1"){
    player_turn = "player2";
    $("#turn-container .player-info").attr("id",player_turn);
    $("#turn-container .player-name").text(player2_name);
  }else{
    player_turn = "player1";
    $("#turn-container .player-info").attr("id",player_turn);
    $("#turn-container .player-name").text(player1_name);
  }

}
