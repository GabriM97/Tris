$(document).ready(function(){

  homePage();
  addEvents();

});

function homePage(){
  $("#container").empty();
  $("#container").addClass("slider").addClass("closed");

  var content =
  '<h1 id="main-title">Tris Game!</h1> \
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

function addEvents(){
  $(".btn").on("click", function(){
    
  });
}
