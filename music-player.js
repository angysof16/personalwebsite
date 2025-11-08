document.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('background-music');
    const musicPlayer = document.getElementById('music-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const muteBtn = document.getElementById('mute-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const currentSongElement = document.getElementById('current-song');

    const songs = [
        {
            title: "Another Space Song by Failure",
            url: "assets/music/AnotherSpaceSong.mp3" 
        },
        {
            title: "No Problem by Local H",
            url: "assets/music/NoProblem.mp3"
        },
        {
            title: "Epiphany by Staind",
            url: "assets/music/Epiphany.mp3"
        },
        {
            title: "Forever Night Castle of Love by Këkht Aräkh",
            url: "assets/music/ForeverNightCastleofLove.mp3"
        },
        {
            title: "Tears Don't Fall by Bullet For My Valentine",
            url: "assets/music/TearsDontFall.mp3"
        },
        {
            title: "Plowed by Sponge",
            url: "assets/music/Plowed.mp3"
        },
        
    ];

    let currentSongIndex = 0;
    let userInteracted = false;

    function startMusic() {
        if (!userInteracted) {
            userInteracted = true;
            loadCurrentSong();
            audio.volume = volumeSlider.value;

            audio.play().then(() => {
                console.log("Música iniciada automáticamente");
                musicPlayer.style.display = 'block';
            }).catch(e => {
                console.log("Error al reproducir automáticamente:", e);
                musicPlayer.style.display = 'block';
            });

            updateCurrentSong();
        }
    }

    function loadCurrentSong() {
        audio.src = songs[currentSongIndex].url;
    }

    function updateCurrentSong() {
        currentSongElement.textContent = songs[currentSongIndex].title;
    }

    const interactionEvents = ['click', 'scroll', 'keydown', 'touchstart'];
    interactionEvents.forEach(event => {
        document.addEventListener(event, startMusic, { once: true });
    });

    playPauseBtn.addEventListener('click', function () {
        if (audio.paused) {
            audio.play();
            playPauseBtn.textContent = '⏸';
        } else {
            audio.pause();
            playPauseBtn.textContent = '▶';
        }
    });

    prevBtn.addEventListener('click', function () {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadCurrentSong();
        audio.play();
        updateCurrentSong();
        playPauseBtn.textContent = '⏸';
    });

    nextBtn.addEventListener('click', function () {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadCurrentSong();
        audio.play();
        updateCurrentSong();
        playPauseBtn.textContent = '⏸';
    });

    muteBtn.addEventListener('click', function () {
        audio.muted = !audio.muted;
        muteBtn.textContent = audio.muted ? '🔇' : '🔊';
    });

    volumeSlider.addEventListener('input', function () {
        audio.volume = volumeSlider.value;
    });

    // Termina La canción, pasar a la siguiente
    audio.addEventListener('ended', function () {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadCurrentSong();
        audio.play();
        updateCurrentSong();
    });

    audio.addEventListener('error', function () {
        console.error("Error cargando la canción:", songs[currentSongIndex].url);
        setTimeout(() => {
            nextBtn.click();
        }, 1000);
    });

    loadCurrentSong();
});