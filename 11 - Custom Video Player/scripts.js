const video = document.querySelector('video');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const playButton = document.querySelector('.player__button');
const skipButtons = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('.player__slider')
const fs = document.querySelector('.full__screen')

function playVideo(e) {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    playButton.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(e) {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function makeFullScreen() {
    if (video.requestFullScreen) {
        video.requestFullScreen();
    } else if (video.webkitRequestFullScreen) {
        video.webkitRequestFullScreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    }

}

video.addEventListener('click', playVideo);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
video.addEventListener('dblclick', makeFullScreen);

playButton.addEventListener('click', playVideo);

skipButtons.forEach(button => button.addEventListener('click', skip));

fs.addEventListener('click', makeFullScreen);

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mouseDown = false
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);