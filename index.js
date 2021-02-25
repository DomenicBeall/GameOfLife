const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const life = new Life(64, 64);

renderCanvas();

canvas.addEventListener("mousedown", (e) => {
    let rect = canvas.getBoundingClientRect();
    let x = Math.floor((e.clientX - rect.left) / 10);
    let y = Math.floor((e.clientY - rect.top) / 10);

    updateCell(y, x);
});

function updateCell(y, x) {
    let cell = life.board[y][x];

    if (cell == 1)
        life.board[y][x] = 0;
    else
        life.board[y][x] = 1;

    renderCanvas();
}

// Render the board to the HTML canvas
function renderCanvas() {
    ctx.beginPath();

    // Make whole canvas black
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height); 

    // Fill in squares that have life
    for (let y = 0; y < life.board.length; y++) {
        const row = life.board[y];
        
        for (let x = 0; x < row.length; x++) {       
            ctx.fillStyle = "white";
     
            if (life.board[y][x])
                ctx.fillRect(x * 10, y * 10, 10, 10);
        }
    }

    ctx.stroke();

}

const btnPlay = document.getElementById("btnPlay");
var paused = true;
var interval;

const playIcon = "fas fa-play";
const pauseIcon = "fas fa-pause";

btnPlay.addEventListener("click", (e) => {

    paused = !paused;

    if (paused) {
        btnPlay.className = playIcon;
        
        if (interval)
            clearInterval(interval);
    } else {
        btnPlay.className = pauseIcon;
        interval = setInterval(() => {
            life.Simulate();

            renderCanvas();
        }, 100);
    }
});

document.getElementById("btnStep").addEventListener("click", (e) => {

    paused = true;

    btnPlay.className = playIcon;
        
    if (interval)
        clearInterval(interval);

    life.Simulate();
    renderCanvas();

});