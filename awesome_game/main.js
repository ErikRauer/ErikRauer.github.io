var config = {
    apiKey: "AIzaSyBbGkIRufjkTy4JxkkfN50cv_JotaBbjao",
    authDomain: "game-highscore-board.firebaseapp.com",
    databaseURL: "https://game-highscore-board.firebaseio.com",
    storageBucket: "game-highscore-board.appspot.com"
};
firebase.initializeApp(config);
var highscoreData = firebase.database().ref();
var highscores = [];
var highscoreHolders = [];

var initialBallXPos = 0;
var initialBallYPos = 0;
var rVal = Math.random() * (255 - 1) + 1;
var gVal = Math.random() * (255 - 1) + 1;
var bVal = Math.random() * (255 - 1) + 1;
var maxSpeed = 5;
var minSpeed = 1;
var timer = 0;
var timerLap = 200;
var playerBallX;
var playerBallY;
var gameOver = false;
var scoreSave = false;
var hSInput, submitButton;
var hSHolder1, hSHolder2, hSHolder3, hSHolder4, hSHolder5;
var holders = [];
var scores = [];
var score;

class ball{
    
    constructor(x, y){
        this.xPos = x;
        this.yPos = y;
        this.ballXSpeed;
        this.ballYSpeed;
        this.rVal = Math.random() * (255 - 1) + 1;
        this.gVal = Math.random() * (255 - 1) + 1;
        this.bVal = Math.random() * (255 - 1) + 1;
    }
    
    initialize(){
        //Set initial ball speed
        this.ballXSpeed = 1;
        this.ballYSpeed = 1;
    }
    
    move(){
        //Function that changes the Color of the ball
        function changeColor(){
            rVal = Math.random() * (255 - 1) + 1;
            gVal = Math.random() * (255 - 1) + 1;
            bVal = Math.random() * (255 - 1) + 1;
        }
        
        
        //Makes the balls move
        this.xPos += this.ballXSpeed;
        this.yPos += this.ballYSpeed;
        
        //Makes the balls max and min speed increase after certain amounts of time
        if (timer > timerLap){
            maxSpeed += 1;
            minSpeed += 1;
            timerLap += 200;
        }
        
        //Makes the balls bounce off edges
        if (this.yPos >= height){
            this.ballYSpeed = (Math.random() * (maxSpeed - minSpeed) + minSpeed) * -1;
            changeColor();
        }
        if (this.yPos <= 0){
            this.ballYSpeed = (Math.random() * (maxSpeed - minSpeed) + minSpeed);
            changeColor();
        }
        if (this.xPos >= width){
            this.ballXSpeed = (Math.random() * (maxSpeed - minSpeed) + minSpeed) * -1;
            changeColor();
        }
        if (this.xPos <= 0){
            this.ballXSpeed = (Math.random() * (maxSpeed - minSpeed) + minSpeed);
            changeColor();
        }
        
        //If ball collides with player, stop game
        if (this.xPos - 40 <= playerBallX && this.xPos + 40 >= playerBallX && this.yPos - 40 <= playerBallY  && this.yPos + 40 >= playerBallY){
            gameOver = true;
            scoreSave = true;
        }
    }
    
    setPos(x, y){
        this.xPos = x;
        this.yPos = y;
    }
}

class hsHolder{
    constructor(rank){
        this.rank = rank;
        this.pos = 'highscore' + this.rank;
        this.holder = "Error";
        this.holderdata = firebase.database().ref(this.pos + "/holder/");
        this.scoredata = firebase.database().ref(this.pos + "/score/");
    }
    
    // determine(){
    //     //  function setValues(name, amount){
    //     //      this.holder = name;
    //     //      this.score = amount;
    //     //  }
        
    //     this.holderdata.on('value', function(snapshot) {
    //          this.holder = snapshot.val();
    //     });
        
    //     // this.holderdata.on('value', function(snapshot) {
    //     //      this.holder = snapshot.val();
    //     // });
    // }
}

function setup(){
    //Setup Canvas and balls
    createCanvas(1080, 640);
    ball1 = new ball(100, 100);
    ball2 = new ball(400, 300);
    ball3 = new ball(-100, -100);
    ball1.initialize();
    ball2.initialize();
    
    hSHolder1 = new hsHolder(1);
    hSHolder2 = new hsHolder(2);
    hSHolder3 = new hsHolder(3);
    hSHolder4 = new hsHolder(4);
    hSHolder5 = new hsHolder(5);
    
    hSInput = createInput();
    hSInput.position(-100, -100);
}

function draw(){
    
    //Start timer
    timer += 1;
    
    //Make player follow mouse
    playerBallX = mouseX;
    playerBallY = mouseY;
    
    //Prevent mouse from exiting Canvas
    if (mouseX > 1105 || mouseX < -50){
        playerBallX = 1080;
    }
    if (mouseY > 665 || mouseY < -50){
        playerBallY = 640;
    }
    
    background(255, 255, 255);
    
    if (gameOver == true){
        //Save score
        if (scoreSave == true){
            score = timer;
            scoreSave = false;
        }
        
        //Write Text
        textSize(100);
        fill(0, 0, 0);
        text("Game Over", 50, 100);
        text("Score: " + score, 50, 200);
        textSize(20);
        text("What's your name?", 50, 240);
        
        hSInput.position(50, 260);
        
        //Submit button
        submitButton = createButton('Submit');
        submitButton.position(181, 260)
        submitButton.mousePressed(submitStuff);
        
        getData();
        
        //Display Highscores
        text("Highscores:", 50, 300);
        text("1. " + holders[1] + ": " + scores[1], 50, 325);
        text("2. " + holders[2] + ": " + scores[2], 50, 350);
        text("3. " + holders[3] + ": " + scores[3], 50, 375);
        text("4. " + holders[4] + ": " + scores[4], 50, 400);
        text("5. " + holders[5] + ": " + scores[5], 50, 425);
        
        //Set balls to edge
        ball1.xPos = 0;
        ball1.yPos = 0;
        ball2.xPos = 0;
        ball2.yPos = 0;
        ball3.xPos = 0;
        ball3.yPos = 0;
        playerBallX = 0;
        playerBallY = 640;
    }
    
    if (timer == 1000){
        ball3.setPos(1000, 600);
        ball3.initialize();
    }
    
    fill(255, 0 ,0);
    ellipse(playerBallX, playerBallY, 50, 50);
    fill(rVal, gVal, bVal);
    ellipse(ball1.xPos, ball1.yPos, 50, 50);
    ellipse(ball2.xPos, ball2.yPos, 50, 50);
    ellipse(ball3.xPos, ball3.yPos, 50, 50);
    
    ball1.move();
    ball2.move();
    ball3.move();
    
    // fill(rVal, gVal, bVal);
    // ellipse(ball1XPos, ball1YPos, 50, 50);
    // ball1XPos += ballXSpeed;
    // ball1YPos += ballYSpeed;
    
    // if (ball1YPos >= 480){
    //     ballYSpeed = (Math.random() * (maxSpeed - minSpeed) + minSpeed) * -1;
    // }
    // if (ball1YPos <= 0){
    //     ballYSpeed = (Math.random() * (maxSpeed - minSpeed) + minSpeed);
    // }
    // if (ball1XPos >= 640){
    //     ballXSpeed = (Math.random() * (maxSpeed - minSpeed) + minSpeed) * -1;
    // }
    // if (ball1XPos <= 0){
    //     ballXSpeed = (Math.random() * (maxSpeed - minSpeed) + minSpeed);
    // }
}

function submitStuff(){
    var hSHolder = hSInput.value();
    
    for (var i = 1; i < 6; i++){
        if (score > scores[i]){
            var counter = 4;
            for (var j = 5; j > i; j--){
                firebase.database().ref('highscore' + j).set({
                    holder: holders[counter],
                    score: scores[counter]
                });
                counter -= 1;
            }
            writeData(i, hSHolder);
            // for (var j = i + 1; j < 6; j++){
            //     firebase.database().ref('highscore' + j).set({
            //         holder: holders[i],
            //         score: scores[i]
            //     });
            // }
            break;
        }
    }
    
    location.reload();
}

function getData(){
    //Gets highscore data from Firebase
    hSHolder1.holderdata.on('value', function(snapshot) {
             holders[1] = snapshot.val();
    });
    hSHolder1.scoredata.on('value', function(snapshot) {
             scores[1] = snapshot.val();
    });
    
    hSHolder2.holderdata.on('value', function(snapshot) {
             holders[2] = snapshot.val();
    });
    hSHolder2.scoredata.on('value', function(snapshot) {
             scores[2] = snapshot.val();
    });
    
    hSHolder3.holderdata.on('value', function(snapshot) {
             holders[3] = snapshot.val();
    });
    hSHolder3.scoredata.on('value', function(snapshot) {
             scores[3] = snapshot.val();
    });
    
    hSHolder4.holderdata.on('value', function(snapshot) {
             holders[4] = snapshot.val();
    });
    hSHolder4.scoredata.on('value', function(snapshot) {
             scores[4] = snapshot.val();
    });
    
    hSHolder5.holderdata.on('value', function(snapshot) {
             holders[5] = snapshot.val();
    });
    hSHolder5.scoredata.on('value', function(snapshot) {
             scores[5] = snapshot.val();
    });
    
    
}

function writeData(pos, newholder) {
    firebase.database().ref('highscore' + pos).set({
        holder: newholder,
        score: score
    });
}