const startButton = document.getElementById("startButton");
const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");
const starSound = new Audio("sounds/star.mp3.mp3");
const hitSound = new Audio("sounds/hit.mp3.mp3");
const gameOverSound = new Audio("sounds/gameover.mp3.mp3");
const winSound = new Audio("sounds/win.mp3");
starSound.volume = 0.25;
hitSound.volume = 0.45;
gameOverSound.volume = 0.6;
winSound.volume = 0.6;

let player;
let playerX = 375;
let score = 0;
let lives = 3;
let starInterval;
let asteroidInterval;
const livesDisplay = document.getElementById("lives");

startButton.addEventListener("click", startGame);

function startGame() {
    startButton.style.display = "none";

    gameArea.innerHTML = `
        <div id="player"></div>
    `;

    player = document.getElementById("player");

    document.addEventListener("keydown", movePlayer);

   starInterval = setInterval(createStar, 1500);
asteroidInterval = setInterval(createAsteroid, 2200);
}

function movePlayer(event) {

    if (event.key === "ArrowLeft") {
        playerX -= 20;
    }

    if (event.key === "ArrowRight") {
        playerX += 20;
    }

    if (playerX < 0) playerX = 0;
    if (playerX > 750) playerX = 750;

    player.style.left = playerX + "px";
}

function createStar() {

    const star = document.createElement("div");

    star.classList.add("star");

    star.style.left = Math.random() * 775 + "px";
    star.style.top = "0px";

    gameArea.appendChild(star);

    let starY = 0;

    const fall = setInterval(() => {

        starY += 5;

        star.style.top = starY + "px";

       // Check if the player collects the star
const playerRect = player.getBoundingClientRect();
const starRect = star.getBoundingClientRect();

if (
    playerRect.left < starRect.right &&
    playerRect.right > starRect.left &&
    playerRect.top < starRect.bottom &&
    playerRect.bottom > starRect.top
) {
    score++;

starSound.currentTime = 0;
starSound.play();

scoreDisplay.textContent = score;

if (score >= 50) {

    winSound.currentTime = 0;
    winSound.play();

    clearInterval(starInterval);
clearInterval(asteroidInterval);

    gameArea.innerHTML = `
        <h1>MISSION COMPLETE!</h1>
        <h2>Final Score: ${score}</h2>
        <button id="restartButton">Play Again</button>
    `;

    document.getElementById("restartButton").addEventListener("click", restartGame);

    return;
}

    clearInterval(fall);
    star.remove();
    return;
}

if (starY > 500) {
    clearInterval(fall);
    star.remove();
}

    }, 30);

}

function createAsteroid() {

    const asteroid = document.createElement("div");

    asteroid.classList.add("asteroid");

    asteroid.style.left = Math.random() * 765 + "px";
    asteroid.style.top = "0px";

    gameArea.appendChild(asteroid);

    let asteroidY = 0;

    const fall = setInterval(() => {

        asteroidY += 3;

        asteroid.style.top = asteroidY + "px";

        const playerRect = player.getBoundingClientRect();
        const asteroidRect = asteroid.getBoundingClientRect();

        if (
            playerRect.left < asteroidRect.right &&
            playerRect.right > asteroidRect.left &&
            playerRect.top < asteroidRect.bottom &&
            playerRect.bottom > asteroidRect.top
        ) {

            console.log("Asteroid hit!");

            lives--;

hitSound.currentTime = 0;
hitSound.play();

player.classList.add("hit");

setTimeout(() => {
    player.classList.remove("hit");
}, 300);

livesDisplay.textContent = lives;

            clearInterval(fall);
            asteroid.remove();

            if (lives <= 0) {

                gameOverSound.play();

                clearInterval(starInterval);
                clearInterval(asteroidInterval);

                gameArea.innerHTML = `
    <h1>GAME OVER</h1>
    <h2>Final Score: ${score}</h2>
    <button id="restartButton">Play Again</button>
`;

document.getElementById("restartButton").addEventListener("click", restartGame);

                return;
            }
        }

        if (asteroidY > 500) {

            clearInterval(fall);

            asteroid.remove();

        }

    }, 30);

}

function restartGame()  {

    score = 0;
    lives = 3;
    playerX = 375;

    scoreDisplay.textContent = score;
    livesDisplay.textContent = lives;

    gameArea.innerHTML = `
        <div id="player"></div>
    `;

    player = document.getElementById("player");

     starInterval = setInterval(createStar, 1500);
asteroidInterval = setInterval(createAsteroid, 2200);
}