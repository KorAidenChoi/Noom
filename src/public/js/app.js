const socket = io();

const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const camerasSelect = document.getElementById("cameras");

const myFace = document.getElementById("myFace");

let muted = false;
let cameraOff = false;

async function getCameras(){
    try{
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter(device => device.kind === "videoinput");
        cameras.forEach((camera => {
            const option = document.createElement("option");
            option.value = camera.deviceId;
            option.innerText = camera.label;
            camerasSelect.appendChild(option);
        }));
    } catch (e) {
        console.log(e);
    }
}

let myStream;

async function getMedia() {
    try {
        myStream = await navigator.mediaDevices.getUserMedia({
            audio: true, 
            video: true,
        });
        myFace.srcObject = myStream;
        await getCameras();
    } catch (e) {
        console.log(e);
    }
}

getMedia();

function handleCameraClick(){
    myStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
    });
    if (!cameraOff) {
        cameraBtn.innerText = "Camera Off";
        cameraOff = true;
    } else {
        cameraBtn.innerText = "Camera On";
        cameraOff = false;
    }
}

function handleMuteClick(){
    myStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
    });
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