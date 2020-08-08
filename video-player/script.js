const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// Play and pause the video
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  updatePlayIcon();
}

// update Play/Pause icon
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x">';
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x">';
  }
}

// Update progress and timestamp
function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;

  // get minutes
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = '0' + String(mins);
  }

  // get seconds
  let sec = Math.floor(video.currentTime % 60);
  if (sec < 10) {
    sec = '0' + String(sec);
  }

  timestamp.textContent = `${mins}:${sec}`;
}

// Stop video
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

// set video progress / change time
function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

// Event Listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);
progress.addEventListener('change', setVideoProgress);