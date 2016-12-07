var config = {
    apiKey: "AIzaSyAOj_N5MdZl3gZrkP_7qcUEjlVH-rFLBdE",
    authDomain: "collaborative-sketch-cbf3a.firebaseapp.com",
    databaseURL: "https://collaborative-sketch-cbf3a.firebaseio.com",
    storageBucket: "collaborative-sketch-cbf3a.appspot.com",
    messagingSenderId: "651330825401"
};
firebase.initializeApp(config);

var pointsData = firebase.database().ref();
var points = [];

function setup(){
    var canvas = createCanvas(400, 400);
    background(255);
    fill(0);
    
    pointsData.on("child_added", function (point){
        points.push(point.val());
    });
    pointsData.on("child_removed", function () {
        points = [];
    });
    
    canvas.mousePressed(drawPoint);
    canvas.mouseMoved(drawPointIfMousePressed);
}

function draw(){
    for  (var i = 0; i < points.length; i++){
        var point = points[i];
        ellipse(point.x, point.y, 5, 5);
    }
}

function drawPoint(){
    pointsData.push({x: mouseX, y: mouseY});
}

function drawPointIfMousePressed(){
    if (mouseIsPressed) {
        drawPoint();
    }
}

$("#saveDrawing").on("click", saveDrawing);

function saveDrawing(){
    saveCanvas();
}

$("#clearDrawing").on("click", clearDrawing);

function clearDrawing(){
    pointsData.remove();
    points = [];
    location.reload();
}