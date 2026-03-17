let board = document.querySelector(".board");
const blockHeight = 30;
const blockWidth = 30;
const row = Math.floor(board.clientHeight/blockHeight);
const column = Math.floor(board.clientWidth/blockWidth);
let blocks = [];
let snake = [{x: Math.floor(Math.random()*row),y: Math.floor(Math.random()*column)}]
let direction = 'down';
let food = {x: Math.floor(Math.random()*row) , y: Math.floor(Math.random()*column)};
const startBtn = document.querySelector(".btn-start");
const restartBtn = document.querySelector(".btn-restart");
let modal = document.querySelector(".modal");
let inter = null;
let startGame = document.querySelector(".start-game");
let gameOver = document.querySelector(".game-over");
let highScore = document.querySelector("#high-score");
let score = document.querySelector("#score");
let timer = document.querySelector("#time");
let highscore = localStorage.getItem("highscore") ? localStorage.getItem("highscore") : 0;
highScore.innerText = highscore;

for(let i = 0 ; i < row ; i++){
    for(let j = 0 ; j < column ; j++){
        let block = document.createElement("div");
        block.classList.add('block');
        board.appendChild(block);
        
        blocks[`${i}-${j}`] = block;
    }
}


let value = 150;

function render(){
    
    let head = null;
    

    blocks[`${food.x}-${food.y}`].classList.add('food');

    if(direction=='left'){
        head = {x:snake[0].x,y:snake[0].y - 1}
    }

    else if(direction === 'right'){
         head = {x:snake[0].x,y:snake[0].y + 1}
    }

    else if(direction === 'up'){
         head = {x:snake[0].x-1,y:snake[0].y}
    }

    else if(direction === 'down'){
        head = {x:snake[0].x+1,y:snake[0].y}
    }

    if(head.x < 0 || head.x >= row || head.y < 0 || head.y >= column){
        modal.style.display = "flex";
        gameOver.style.display = "flex";
        startGame.style.display = "none";
        clearInterval(inter);
    }

    if(head.x === food.x && head.y === food.y){
        score.innerText = snake.length;
        if(snake.length > Number(highscore)){
            highScore.innerText = snake.length;
            highscore = snake.length;
            localStorage.setItem("highscore1", highscore.toString());
        }
        
        blocks[`${food.x}-${food.y}`].classList.remove('food');
        food = {x: Math.floor(Math.random()*row) , y: Math.floor(Math.random()*column)};
        blocks[`${food.x}-${food.y}`].classList.add('food');
        snake.unshift(head);
        render();
        return;
    }

    snake.forEach(seg=>{
        blocks[`${seg.x}-${seg.y}`].classList.remove('fill');
    })

    snake.unshift(head);
    snake.pop();
    snake.forEach(seg=>{
        blocks[`${seg.x}-${seg.y}`].classList.add('fill');
    })};


    restartBtn.addEventListener("click",()=>{
        blocks[`${food.x}-${food.y}`].classList.remove('food');
        // snake.forEach(seg=>{
        //     blocks[`${seg.x}-${seg.y}`].classList.remove('fill');
        // })
        score.innerText = 0;
        highScore.innerText = highscore;
        snake = [{x: Math.floor(Math.random()*row),y: Math.floor(Math.random()*column)}];
        food = {x: Math.floor(Math.random()*row) , y: Math.floor(Math.random()*column)};
        modal.style.display = "none";
        inter = setInterval(()=>{render()},value);
    });

startBtn.addEventListener("click",()=>{
    modal.style.display = "none";
    inter = setInterval(()=>{
        render();
},value)});

addEventListener("keydown",(e)=>{
    if(e.key==="ArrowUp"){
        direction = "up";
    }else if(e.key==="ArrowRight"){
        direction = "right";
    }else if(e.key==="ArrowLeft"){
        direction = "left";
    }else if(e.key==="ArrowDown"){
        direction = "down";
    }
})