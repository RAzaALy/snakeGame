// 🐍 Game Project:
//Varibles initialization:
let inputDir = { x: 0, y: 0 };
let speed = 10;
let lastPaintTime = 0;
let snakeArr = [
  {
    x: 12,
    y: 14,
  },
];

let food = { x: 6, y: 4 };
let score = 0;
const foodSound = new Audio("./assests/food.wav");
const gameOver = new Audio("./assests/over.wav");
const moveSound = new Audio("./assests/move.wav");
const musicSound = new Audio("./assests/background.mp3");
const board = document.getElementById("board");
const scoreBoard = document.getElementById("score");
const hiScore = document.getElementById("highScore");

scoreBoard.innerHTML = `Score : ${score}`;
hiScore.innerHTML = `High Score : 0`;

let highScore = localStorage.getItem("hiScore");
if (highScore === null) {
  let highScoreVal = 0;
  localStorage.setItem("hiScore", JSON.stringify(highScoreVal));
} else {
  highScoreVal = JSON.parse(highScore);
  hiScore.innerHTML = `High Score : ` + highScoreVal;
}

//Game Functions:
const main = (cTime) => {
  window.requestAnimationFrame(main);
  //   console.log(cTime);
  if ((cTime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = cTime;
  gameEngine();
};

const isCollide = (snake) => {
  //if 🐍 collide with his body:
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      gameOver.play();
      return true;
    }
  }
  //if 🐍 collide with wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    gameOver.play();
    return true;
  }
};
const gameEngine = () => {
  //1: 🐍 Update the snake array & food which is location of snake:
  if (isCollide(snakeArr)) {
    scoreBoard.innerHTML = `Score : 0`;
    musicSound.pause();
    gameOver.play();
    inputDir = { x: 0, y: 0 };
    alert("Game Over Please Press any key to play again!");
    snakeArr = [
      {
        x: 12,
        y: 14,
      },
    ];
    score = 0;
    // musicSound.play();
  }
  //if 🐍 has eaten the food then increment the  score and regenerate 🍎:
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 5;
    if (score > highScoreVal) {
      highScoreVal = score;
      localStorage.setItem("hiScore", JSON.stringify(highScoreVal));
      hiScore.innerHTML = `High Score : ` + highScoreVal;
    }
    scoreBoard.innerHTML = `Score : ${score}`;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //Moving the 🐍:
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  //2: Display or Render snake 🐍 and food 🍎:
  //Display Snake:
  board.innerHTML = ``;
  snakeArr.forEach((elem, index) => {
    const snake = document.createElement("div");
    if (index === 0) {
      snake.classList.add("head");
    } else {
      snake.classList.add("snake");
    }
    snake.style.gridRowStart = elem.y;
    snake.style.gridColumnStart = elem.x;
    board.appendChild(snake);
  });
  //Display Food 🍏:
  const foodEl = document.createElement("div");
  foodEl.style.gridRowStart = food.y;
  foodEl.style.gridColumnStart = food.x;
  foodEl.classList.add("food");
  board.appendChild(foodEl);
};
//Game Logic 💻:
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; //start the game;
  musicSound.play();
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      //   console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      //   console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowRight":
      //   console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    case "ArrowLeft":
      //   console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
//formoula to generat a random number b/w two numbers:
// a+b-a*Math.random();
