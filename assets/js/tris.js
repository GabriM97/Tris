var player_turn = "";
var player1_score = 0;
var player2_score = 0;
var turns_counter = 0;


//--- SHOW TRIS \ START BUTTON ---
function showTris(turn_id){
  if($("#winner-container"))  $("#winner-container").remove();
  $("#container").removeClass("disable");
  $("#container").empty();
  $("#container").append('<div id="content" class="animated '+ ((turns_counter==0) ? "fadeIn" : "") +'"></div>');

  turns_counter = 0;
  player_turn = turn_id;
  showTrisData();
  showTrisGrid();
  $("#tris-grid-container").after('<button type="button" class="btn" name="restart">Restart Game</button>');
  $("#content .btn").after("<p id='restart-warning'>(You will lose all your points)</p>");
  addEventsOnCells();
  addEventsOnButtons();
}


// --- TRIS - TOP INFO ---
function showTrisData(){
  $("#content").append('<div id="top-info-container"></div>');

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
  $("#content").append('<div id="tris-grid-container"></div>');
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


// --- CLICK EVENT ON TRIS GRID ---
function addEventsOnCells(){
  $(".grid-item").on("click", function(){
    if(player_turn == "player1"){
      $(this).css("background", "url('assets/img/x_icon.png')");
      $(this).attr("symb","X");
    }else{
      $(this).css("background", "url('assets/img/o_icon.png')");
      $(this).attr("symb","O");
    }
    turns_counter++;
    if(checkTrisWins($(this))){
      $(".grid-item").off("click");
      showWinner();
    }else{
      $(this).off("click");
      if(turns_counter == 9)
        playAgain();
      else
        changeTurn();
    }
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


// --- CHECK WINS ---
function checkTrisWins(cell){
  if(turns_counter < 5)  return;

  var row = cell.attr("row");
  var col = cell.attr("col");
  var symb = cell.attr("symb");

  if(checkTrisOnRow(row,col,symb))  return true;
  if(checkTrisOnCol(row,col,symb))  return true;
  if(checkTrisOnDiag(row,col,symb)) return true;

  return false;
}


// --- CHECK TRIS ON ROWS
function checkTrisOnRow(row, col, symb){
  var itemsOnRow = [];
  for(var i=0;i<3;i++)
    itemsOnRow[i] = $($(".grid-item[row='"+row+"']")[i]).attr("symb");

  if((itemsOnRow[0] === itemsOnRow[1]) && (itemsOnRow[0] === itemsOnRow[2]))
    return true;

  return false;
}


// --- CHECK TRIS ON COLUMNS
function checkTrisOnCol(row, col, symb){
  var itemsOnCol = [];
  for(var i=0;i<3;i++)
    itemsOnCol[i] = $($(".grid-item[col='"+col+"']")[i]).attr("symb");

  if((itemsOnCol[0] === itemsOnCol[1]) && (itemsOnCol[0] === itemsOnCol[2]))
    return true;

  return false;
}


// --- CHECK TRIS ON DIAGONALS
function checkTrisOnDiag(row, col, symb){
  //primary diagonal    row=col
  //secondary diagonal   row+col=n-1

  var grid_len = 3;
  var itemsOnFirstDiag = [];
  var itemsOnSecondDiag = [];
  for(var i=0;i<grid_len;i++){
    itemsOnFirstDiag[i] = $(".grid-item[row='"+i+"'][col='"+i+"']").attr("symb");
    itemsOnSecondDiag[i] = $(".grid-item[row='"+(grid_len-i-1)+"'][col='"+i+"']").attr("symb");
  }

  if(row==1 && col==1){  //element on center  --  check on first and second diag
    if(((itemsOnFirstDiag[0] === itemsOnFirstDiag[1]) && (itemsOnFirstDiag[0] === itemsOnFirstDiag[2])) ||
      ((itemsOnSecondDiag[0] === itemsOnSecondDiag[1]) && (itemsOnSecondDiag[0] === itemsOnSecondDiag[2])))
        return true;
  }else{
    if(row==col){  //first diagonal
      if(itemsOnFirstDiag[0] && ((itemsOnFirstDiag[0] === itemsOnFirstDiag[1]) && (itemsOnFirstDiag[0] === itemsOnFirstDiag[2])))
        return true;
    }else{    //second diagonal
      if(itemsOnSecondDiag[0] && ((itemsOnSecondDiag[0] === itemsOnSecondDiag[1]) && (itemsOnSecondDiag[0] === itemsOnSecondDiag[2])))
        return true;
    }
  }
  return false;
}
