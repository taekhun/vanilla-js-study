let playButton = document.querySelector("#play i");
const stopButton = document.querySelector("#stop i");
const video = document.querySelector("video");
const videoPoster = video.poster;
const timeStamp = document.querySelector("#timestamp");
const progressBar = document.querySelector(".progress");
let currTime;
let timer;

const playHandler = () => {
  //Play
  if (playButton.className == "fa fa-play fa-2x") {
    playButton.className = "fa fa-pause fa-2x";
    video.play();
    setTimer();
  }
  //Pause
  else {
    playButton.className = "fa fa-play fa-2x";
    currTime = video.currentTime;
    video.pause();
  }
};

const stopHandler = () => {
  playButton.className = "fa fa-play fa-2x";
  video.currentTime = 0;
  progressBar.value = 0;
  video.pause();
};

const setTimer = () => {
  timer = setInterval(() => {
    //비디오 종료시 playButton 모양만 바꿈
    if (video.currentTime == video.duration) {
      playButton.className = "fa fa-play fa-2x";
    }
    //1의 자리 -> 00:09 // 10의 자리 -> 00:59
    let ct = Math.floor(video.currentTime);
    timeStamp.textContent = ct < 10 ? `00:0${ct}` : `00:${ct}`;
    progressBar.value = (video.currentTime * 100) / video.duration;
  });
};

// 진행바, 마우스 누르는 동안 비디오, 타이머 정지
const progressBarDown = () => {
  video.pause();
  clearInterval(timer);
};

// 진행바, 마우스 떼면 비디오 재생, 타이머 시작
const progressBarUp = () => {
  video.currentTime = (video.duration * progressBar.value) / 100;
  video.play();
  setTimer();
};

//Spacbar(재생/멈춤), Left Arrow(3초전), Right Arrow(3초후), Enter, F(전체화면)
const commandHandler = (e) => {
  switch (e.keyCode) {
    case 32:
      playHandler();
      break;

    case 37:
      video.currentTime = (video.duration * progressBar.value) / 100 - 3;
      break;

    case 39:
      video.currentTime = (video.duration * progressBar.value) / 100 + 3;
      break;

    case 13:
    case 70:
      video.requestFullscreen();
      break;
  }
};

//Event 등록
const init = () => {
  playButton.addEventListener("click", playHandler);
  video.addEventListener("click", playHandler);
  stopButton.addEventListener("click", stopHandler);
  progressBar.addEventListener("mousedown", progressBarDown); // 진행바, 마우스 누름
  progressBar.addEventListener("mouseup", progressBarUp); // 진행바, 마우스 뗌
  document.addEventListener("keydown", (e) => commandHandler(e));
};

init();
