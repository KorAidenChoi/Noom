const socket = io();

const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");

const myFace = document.getElementById("myFace");

let muted = false;
let cameraOff = false;


let myStream;

async function getMedia() {
    try {
        myStream = await navigator.mediaDevices.getUserMedia({
            audio: true, 
            video: true,
        });
        myFace.srcObject = myStream;
    } catch (e) {
        console.log(e);
    }
}

getMedia();

function handleCameraClick(){
    if (!cameraOff) {
        cameraBtn.innerText = "Camera Off";
        cameraOff = true;
    } else {
        cameraBtn.innerText = "Camera On";
        cameraOff = false;
    }
}

function handleMuteClick(){
    if (!muted) {
        muteBtn.innerText = "Mute";
        muted = true;
    } else {
        muteBtn.innerText = "Unmute";
        muted = false;
    }
}

muteBtn.addEventListener("click", handleMuteClick);

cameraBtn.addEventListener("click", handleCameraClick);