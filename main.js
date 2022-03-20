var song1 = "";
var song2 = "";
var leftWristX = 0;
var leftWristY = 0;
var rightWristX = 0;
var rightWristY = 0;
var scoreLeftWrist = 0;
var scoreRightWrist = 0;

function preload() {
  song1 = loadSound("music.mp3");
  song2 = loadSound("music2.mp3");
}

function setup() {
  video = createCapture(VIDEO);
  video.parent("videoparent");
  video.size(400, 350);

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
}

function modelLoaded() {
  console.log("Pose Net is loaded");
}

function gotPoses(results) {
  if (results.length > 0) {
    console.log(results);
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    scoreRightWrist = results[0].pose.keypoints[10].score;
    console.log(`ScoreLeftWrist ${scoreLeftWrist}`);
    console.log(`ScoreRightWrist ${scoreRightWrist}`);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log(`LeftWristX = ${leftWristX}, LeftWristY = ${leftWristY}`);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log(`RightWristX = ${rightWristX}, RightWristY = ${rightWristY}`);
  }
}

function draw() {
  song1Status = song1.isPlaying();
  song2Status = song2.isPlaying();

  fill("#FF0000");
  stroke("#FF0000");

  if (scoreRightWrist > 0.2) {
    circle(rightWristX, rightWristY, 20);

    song2.stop();

    if (song1Status == false) {
      song1.play();
      document.getElementById("song").innerHTML =
        "Playing - Harry Potter Theme Song";
    }
  }

  if (scoreLeftWrist > 0.2) {
    circle(leftWristX, leftWristY, 20);

    song1.stop();

    if (song2Status == false) {
      song2.play();
      document.getElementById("song").innerHTML = "Playing - Peter Pan Song";
    }
  }
}
