const trackSource = [
    'https://static.bandlab.com/soundbanks/previews/synth-organ.ogg',
    'https://static.bandlab.com/soundbanks/previews/new-wave-kit.ogg'
];

const audio = document.getElementById('audio-wrapper');
track = document.getElementById('track');

playerContainer = document.getElementById('main-player-container');
songNameContainer = document.getElementById('song-name-container');
trackNumberContainer = document.getElementById('track-number');
timingContainer = document.getElementById('timing-container');

let trackNumber = 0;

const updateTrackTime = (track) => {
    const duration = track.duration.toFixed(0)
    const currentTime = (track.currentTime).toFixed(0)
    isNaN(duration)
     ? timingContainer.innerHTML = `loading...`
     : timingContainer.innerHTML = `${currentTime} / ${duration} seconds`
}

const playPauseSong = () => {
    if(!track.src) {
        // default
        track.src = trackSource[trackNumber];
        trackNumberContainer.innerHTML = `${trackNumber+1} / ${trackSource.length}`
        songNameContainer.innerHTML = 'Current Song: ' + track.src.split('/').pop();
        audio.load()
    } 
    const playPauseBtn = document.getElementById('play-pause-btn');
    if (audio.paused) {
        audio.play();
        playPauseBtn.innerHTML = 'Pause';
    } else {
        audio.pause();
        playPauseBtn.innerHTML = 'Play';
    }
}

const resetSong = () => {
    const playPauseBtn = document.getElementById('play-pause-btn');
    playPauseBtn.innerHTML = 'Play';
    audio.pause()
    audio.currentTime = 0;
}


const nextSong = () => {
    trackNumber ++;
    if(trackSource[trackNumber]) {
        track.src = trackSource[trackNumber];
        trackNumberContainer.innerHTML = `${trackNumber+1} / ${trackSource.length}`
        songNameContainer.innerHTML = 'Current Song: ' + track.src.split('/').pop();
        audio.load()
        audio.play();
    } else {
        trackNumber = 0;
        track.src = trackSource[trackNumber];
        trackNumberContainer.innerHTML = `${trackNumber+1} / ${trackSource.length}`
        songNameContainer.innerHTML = 'Current Song: ' + track.src.split('/').pop();
        audio.load()
        audio.play();
    }
}

