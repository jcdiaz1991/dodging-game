const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = document.getElementById('game').clientHeight;
const GAME_WIDTH = document.getElementById('game').clientWidth;
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')
const gameDes = document.getElementById('des')

var gameInterval = null

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */
window.onload = function dodgerStartPosition(){
  DODGER.style.left = `${(GAME_WIDTH/2)-20}px`;
  DODGER.style.display="";
}

 function checkCollision(rock) {
   const top = positionToInteger(rock.style.top)

   // rocks are 20px high
   // DODGER is 20px high
   // GAME_HEIGHT - 20 - 20 = 360px;
   if (top > (GAME_HEIGHT-40)) {
     const dodgerLeftEdge = positionToInteger(DODGER.style.left)
     const dodgerRightEdge = dodgerLeftEdge + 40;
     const rockLeftEdge = positionToInteger(rock.style.left)
     const rockRightEdge = rockLeftEdge + 20;

     return (
       (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
       (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
       (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)
     )
   }}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  // Hmmm, why would we have used `var` here?
  var top = 0;

  rock.style.top = top;

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
GAME.appendChild(rock);

  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    rock.style.top = `${top += 2}px`;
    // implement me!
    // (use the comments below to guide you!)
    /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     */
     if (checkCollision(rock) ) {
       return endGame();
     }

    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */
if (top < GAME_HEIGHT){
  window.requestAnimationFrame(moveRock);
}
else {
  rock.remove()
}}
    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */

  // We should kick of the animation of the rock around here
//window.requestAnimationFrame()
  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  window.requestAnimationFrame(moveRock);
  ROCKS.push(rock);

  // Finally, return the rock element you've created
  return rock;
}


/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
 function endGame() {
   clearInterval(gameInterval)

   ROCKS.forEach(function(rock) { rock.remove() })

   document.removeEventListener('keydown', moveDodger)

   START.innerHTML = 'Play again?'
   gameDes.innerHTML = '<p>You Lost!:(</p>'
   gameDes.style.display = 'inline'
   START.style.display = 'inline'
   return
 }

 function moveDodger(e) {
   if ([LEFT_ARROW, RIGHT_ARROW].indexOf(e.which) > -1) {
     e.preventDefault()
     e.stopPropagation()
  }

   if (e.which === LEFT_ARROW) {
     moveDodgerLeft()
   } else if (e.which === RIGHT_ARROW) {
     moveDodgerRight()
   }}

 function moveDodgerLeft() {
   window.requestAnimationFrame(function() {
     const left = positionToInteger(DODGER.style.left)

     if (left > 0) {
       DODGER.style.left = `${left - 20}px`;
     }})}

 function moveDodgerRight() {
   window.requestAnimationFrame(function() {
     const left = positionToInteger(DODGER.style.left)

     if (left < (GAME_WIDTH - 40)) {
       DODGER.style.left = `${left + 20}px`;
     }
   })
 }
/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'
  gameDes.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
//making the game touch operable.
let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

const gestureZone = document.getElementById('body');

gestureZone.addEventListener('touchstart', function(event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
}, false);

gestureZone.addEventListener('touchend', function(event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture();
}, false);

function handleGesture() {
    if (touchendX < touchstartX) {
        console.log('Swiped left');
        moveDodgerLeft();
    }
    if (touchendX > touchstartX) {
        console.log('Swiped right');
        moveDodgerRight();
    }
}
