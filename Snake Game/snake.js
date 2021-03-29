const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d'); 
class SnakePart{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}
let speed=7;
let headx=12;
let heady=12;
let fruitx=7;
let fruity=7;
let tileCount=25;
let tilesize=canvas.width/tileCount-2;
let xvelo=0;
let yvelo=0;
const snakeParts=[];
var score=0;
let taillen=0;
var max_score=0;
var tmp=score;

// main game function
function game(){
    snakepos();
    let gameover= isGameOver();
    if(gameover){
        return;
    }
    clearScr();
    eats();
    fruit();
    snake();
    displayscore();
    displaymaxscore();

    if(score-tmp >= 30 && score<=140){
        speed=speed+2;
        tmp=score;
    }
  
    setTimeout(game,1000/speed);
}
//If game ended
function isGameOver(){
    let gameover=false;
    if(headx<0||headx==tileCount||heady<0||heady==tileCount){
        gameover=true;
    }
    for(let i=0;i<snakeParts.length;i++){
        if(headx==snakeParts[i].x&&heady==snakeParts[i].y){
            gameover=true;
            break;
        }
    }
    if (gameover) {
        ctx.fillStyle = "white";
        ctx.font = "60px Verdana";
        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", " magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
        // Fill with gradient
        ctx.fillStyle = gradient;
        ctx.fillText("Game Over!", canvas.width / 4.25, canvas.height / 2);
    }
    return gameover;
}
//displays max score
function displaymaxscore(){
    max_score=localStorage.getItem("max_score");
    ctx.fillStyle='white';
    ctx.font="15px Trebuchet MS";
    ctx.fillText("Max Score: "+max_score,canvas.width-618,14);
}
//displays score
function displayscore(){
    ctx.fillStyle='white';
    ctx.font="15px Trebuchet MS";
    ctx.fillText("Score: "+score,canvas.width-65,14);
}
//clear screen
function clearScr(){
    ctx.fillStyle='#4e4e4e';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}
//for updating snake position
function snakepos(){
    headx=headx+xvelo;
    heady=heady+yvelo;
}
//for snake image
function snake(){
    ctx.fillStyle='green';
    ctx.fillRect(headx*tileCount,heady*tileCount,tilesize,tilesize);

    ctx.fillStyle='gold';
    for(let i=0;i<snakeParts.length;i++){
        let part=snakeParts[i];
        ctx.fillRect(part.x*tileCount,part.y*tileCount,tilesize,tilesize);
    }
    snakeParts.push(new SnakePart(headx,heady));
    while(snakeParts.length>taillen){
        snakeParts.shift();
    }
}
//for fruit image
function fruit(){
    ctx.fillStyle='red';
    ctx.fillRect(fruitx*tileCount,fruity*tileCount,tilesize,tilesize);
}
//after sanke eats fruit
function eats(){
    if(headx==fruitx&&heady==fruity){
        fruitx=Math.floor(Math.random()*tileCount);
        fruity=Math.floor(Math.random()*tileCount);
        taillen++;
        score+=10;
        localStorage.setItem("max_score",Math.max(max_score,score));
    }
}
//key press listener
document.body.addEventListener('keydown',keypress);
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
function keypress(event){
    //move Up
    if(event.keyCode==38){
        if(yvelo==1){
            return;
        }
        yvelo=-1;
        xvelo=0;
    }
    //move Down
    if(event.keyCode==40){
        if(yvelo==-1){
            return;
        }
        yvelo=1;
        xvelo=0;
    }
    //move left
    if(event.keyCode==37){
        if(xvelo==1){
            return;
        }
        yvelo=0;
        xvelo=-1;
    }
    //move right
    if(event.keyCode==39){
        if(xvelo==-1){
            return;
        }
        yvelo=0;
        xvelo=1;
    }
}
game();