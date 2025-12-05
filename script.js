document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('mainVideo');
    const playOverlay = document.getElementById('playOverlay');
    const playBtn = document.getElementById('playBtn');
    const iconPlay = playBtn.querySelector('.icon-play');
    const iconPause = playBtn.querySelector('.icon-pause');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');

    // Toggle Play/Pause
    function togglePlay() {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }

    // Update UI based on play state
    function updatePlayState() {
        if (video.paused) {
            playOverlay.classList.remove('hidden');
            iconPlay.classList.remove('hidden');
            iconPause.classList.add('hidden');
        } else {
            playOverlay.classList.add('hidden');
            iconPlay.classList.add('hidden');
            iconPause.classList.remove('hidden');
        }
    }

    // Format time (mm:ss)
    function formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    }

    // Update Progress Bar & Time
    function updateProgress() {
        const percent = (video.currentTime / video.duration) * 100;
        progressBar.style.width = `${percent}%`;
        currentTimeEl.textContent = formatTime(video.currentTime);
        // Ensure duration is available
        if (!isNaN(video.duration)) {
            durationEl.textContent = formatTime(video.duration);
        }
    }

    // Seek Video
    function setProgress(e) {
        const width = progressContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = video.duration;
        video.currentTime = (clickX / width) * duration;
    }

    // Event Listeners
    playBtn.addEventListener('click', togglePlay);
    playOverlay.addEventListener('click', togglePlay);
    video.addEventListener('click', togglePlay);

    video.addEventListener('play', updatePlayState);
    video.addEventListener('pause', updatePlayState);
    video.addEventListener('timeupdate', updateProgress);

    progressContainer.addEventListener('click', setProgress);

    // Initial Duration Load
    video.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(video.duration);
    });
});
