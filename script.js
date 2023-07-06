const video = document.querySelector('.video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('playBtn');
const volumeIcon = document.getElementById('volumeIcon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');
const speed = document.querySelector('.player-speed');

// play & pause

function showPlayIcon() {
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
};

function togglePlay() {
  if (video.paused) {
    video.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
  } else {
    video.pause();
    showPlayIcon();
  }
};

// on video end - show play button
video.addEventListener('ended', showPlayIcon);

// progress bar

function displayTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
}

function updateProgress() {
  progressBar.style.width = `${(video.currentTime / video.duration) *100}%`;
  currentTime.textContent = `${displayTime(video.currentTime)} /`;
  duration.textContent = displayTime(video.duration);
}

function setProgress(e) {
  const newTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
}

// volume bar
let lastVolume = 1;
let lastIcon = 'fa-volume-up';

function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth;
  if (volume < 0.1) volume = 0;
  if (volume > 0.9) volume = 1;
  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;
  volumeIcon.classList = '';
  if (volume > 0.7) {
    volumeIcon.classList.add('fa-solid', 'fa-volume-up');
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add('fa-solid', 'fa-volume-down');
  } else if (volume === 0) {
    volumeIcon.classList.add('fa-solid', 'fa-volume-off');
  }
  lastVolume = volume;
}

function toggleMute() {
  if (video.volume) {
    lastIcon = volumeIcon.classList[1];
    volumeIcon.classList = '';
    lastVolume = video.volume;
    video.volume = 0;
    volumeBar.style.width = 0;
    volumeIcon.classList.add('fa-solid', 'fa-volume-mute');
    volumeIcon.setAttribute('title', 'Unmute');
  } else {
    volumeIcon.classList = '';
    video.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;
    volumeIcon.classList.add('fa-solid', lastIcon);
    volumeIcon.setAttribute('title', 'Mute');
  }
}

// change playback speed

function changeSpeed() {
  video.playbackRate = speed.value;
}

// event listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);