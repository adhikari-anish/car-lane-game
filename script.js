var canvas = document.getElementById('canvas');
const WIDTH = 500;
const HEIGHT = 600;
const IMG_PLAYER = new Image();
IMG_PLAYER.src = "./images/mycar.png";

const IMG_ENEMY = new Image();
IMG_ENEMY.src = "./images/enemyCar.png";


canvas.width = WIDTH;
canvas.height = HEIGHT;
var score = 0;


function lane(num) {
    if(num == 1) {
        return 58.33 ;
    } else if (num == 2) {
        return 225;
    } else if (num == 3) {
        return 391.67;
    }
}

var enemyCar_Array = [];

var motion = setInterval(function() {
    var enemyCar = new Car(false);
    enemyCar_Array.push(enemyCar);
}, 3000);

var myCar = new Car(true);


var ctx = canvas.getContext('2d');

// start screen
ctx.beginPath();
ctx.fillStyle = "black";
ctx.fillRect(0,0, WIDTH, HEIGHT);
ctx.fill();
ctx.closePath();
ctx.fillStyle = "red";
ctx.font = "20px Arial";
ctx.fillText("WANNA PLAY? PRESS SPACE!",90,50);
document.addEventListener('keydown', (e) => {
    if(e.keyCode == "32") {
        draw();
    }
})




function draw() {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, WIDTH, HEIGHT);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.strokeStyle = "lightblue";
    ctx.setLineDash([30, 30]);
    ctx.lineWidth = 2;
    ctx.moveTo(WIDTH/3, 0);
    ctx.lineTo(WIDTH/3, HEIGHT);
    ctx.moveTo(WIDTH*2/3, 0);
    ctx.lineTo(WIDTH*2/3, HEIGHT);
    ctx.lineDashOffset -= 5;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "white";
    myCar.drawCar();
    ctx.fill();
    ctx.closePath();

    for(var i=0; i<enemyCar_Array.length; i++) {
        ctx.beginPath();
        // ctx.fillStyle = "yellow"; 
        enemyCar_Array[i].drawCar();
        enemyCar_Array[i].move();
        ctx.fill();
        ctx.closePath();
    }


    
    //removing object and updating score
    enemyCar_Array.forEach(function(item, index) {
        if(item.y > HEIGHT) {
            score += 1;
            console.log(score);
            enemyCar_Array.splice(index,1);
        }
    });

    var animate = requestAnimationFrame(draw);

    
    // stopping game after collision
    enemyCar_Array.forEach(function(value) {
        if((value.carLane == myCar.carLane) && (value.y+value.height >= HEIGHT - myCar.height)) {
            console.log('Collision detected');
            
            window.cancelAnimationFrame(animate);
            
        }
    })

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(score, 10,40);

}

// draw();

function keypress() {
    document.addEventListener("keydown", e => {
        if(e.keyCode == 37 && myCar.carLane != 1) {
            myCar.carLane--;
        } else if(e.keyCode == 39 && myCar.carLane != 3) {
            myCar.carLane++;
        }
    });
}

keypress();






