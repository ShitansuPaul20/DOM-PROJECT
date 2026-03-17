let newhit = 0;
let newscore = 0;
let highest = localStorage.getItem("highscore") || 0;


document.querySelector(".score").innerHTML = newscore;


function changeBubble() {
    let clutter = "";
    for (let i = 1; i <= 136; i++) {
        clutter += `<div class="bubble">${Math.floor(Math.random() * 10)}</div>`;
    }
    document.querySelector(".pannelbottom").innerHTML = clutter;
}


function changeHit() {
    newhit = Math.floor(Math.random() * 10);
    document.querySelector(".hit").innerHTML = newhit;
}


function changeScore() {
    newscore++;
    if (newscore > highest) {
        highest = newscore;
        localStorage.setItem("highscore", highest);
    }
    document.querySelector(".score").innerHTML = newscore;
}


function changeTimer() {
    let timer = 60;
    let interval = setInterval(function () {
        timer--;
        if (timer >= 0) {
            document.querySelector(".timer").innerHTML = timer;
        } else {
            clearInterval(interval);
            document.querySelector(".pannelbottom").innerHTML = `
                <div class="gameover">
                    <h2>GAME OVER !!</h2>
                    <div>
                        <h3>High Score: ${highest}</h3>
                        <h3>Your Score: ${newscore}</h3>
                    </div>
                    <button class="lol">Play Again</button>
                </div>
            `;


            document.querySelector(".lol").addEventListener("click", function () {
                window.location.reload();
            });
        }
    }, 1000);
}


document.querySelector(".pannelbottom").addEventListener("click", function (e) {
    if (e.target.classList.contains("bubble")) {
        let value = Number(e.target.innerText);

        if (value === newhit) {
            changeScore();
            changeHit();
            changeBubble(); 
        } else {
            changeHit(); 
        }
    }
});


changeBubble();
changeHit();
changeTimer();
