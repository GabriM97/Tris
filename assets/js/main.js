$(document).ready(function(){

  homePage();


});

function homePage(){
  $("#container").empty();
  $("#container").addClass("slider").addClass("closed")

  var content =
  '<h1 id="main-title">Tris Game!</h1> \
  <div id="form-container"> \
      <p>Player 1</p> \
      <input type="text" id="player1-label" placeholder="Name P1"> \
      <p>Player 2</p> \
      <input type="text" id="player2-label" placeholder="Name P2"> \
      <button type="button" name="start">Start</button> \
      <button type="reset" name="reset">Reset</button> \
    </div>';

  $("#container").append(content);
  $("#container").removeClass("closed");
}
