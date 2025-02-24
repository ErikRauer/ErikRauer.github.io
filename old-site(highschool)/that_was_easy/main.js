function sayThatWasEasy() {
  var thatWasEasy = new Audio("that_was_easy.mp3");
  thatWasEasy.play();
}

$("#easy").on("click", sayThatWasEasy);

$(document).keyPressed(delegateKeyPress);
function delegateKeyPress(event){
    console.log(event.charCode);
}