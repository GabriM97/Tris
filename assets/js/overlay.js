
// --- WINNER ---
function showWinner(){
  var winner_dom = '\
  <div id="winner-container" class="animated bounceIn">\
    <div class="player-info" id="'+ player_turn +'">\
      <div class="player-icon"></div>\
      <p class="player-name">'+ (player_turn=="player1" ? player1_name : player2_name) +'</p>\
      <span><strong>WON!</strong></span>\
    </div>\
    <button type="button" class="btn" name="play-again">Play Again</button>\
  </div>';

  if(player_turn=="player1")
    $("#player1 .player-points").text(++player1_score);
  else
    $("#player2 .player-points").text(++player2_score);

  setTimeout(() => {
                      $("#container").addClass("disable");
                      $("body").append(winner_dom);
                      addEventsOnButtons();
                      $(".btn[name='restart']").attr("disabled","disabled").css("cursor","default");
                      $(".grid-item").off("click");
                   }, 500);
  $(".grid-item").css("cursor","default");
}

// --- PLAY AGAIN ---
function playAgain(){
  var play_again_dom = '\
  <div id="winner-container" class="animated wobble">\
    <span>DRAW!</span>\
    <p>Nothing to do...<br>Play Again</p>\
    <button type="button" class="btn" name="play-again">Play Again</button>\
  </div>';

  setTimeout(() => {
                      $("#container").addClass("disable");
                      $("body").append(play_again_dom);
                      addEventsOnButtons();
                      $(".btn[name='restart']").attr("disabled","disabled").css("cursor","default");
                      $(".grid-item").off("click");
                   }, 500);
  $(".grid-item").css("cursor","default");
}
