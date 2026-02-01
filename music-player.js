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
            title: "Mr. Roboto by Styx",
            url: "assets/music/MrRoboto.mp3" 
        },
        {
            title: "Assassin by The Fearless Flyers",
            url: "assets/music/Assassin.mp3" 
        },
        {
            title: "Black by Pearl Jam",
            url: "assets/music/Black.mp3" 
        },
        {
            title: "Sofrito by Mongo Santamaria",
            url: "assets/music/Sofrito.mp3" 
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
            title: "One Last Breath by Creed",
            url: "assets/music/OneLastBreath.mp3"
        },
        {
            title: "Forever Night Castle of Love by Këkht Aräkh",
            url: "assets/music/ForeverNightCastleofLove.mp3"
        },
        {
            title: "Plowed by Sponge",
            url: "assets/music/Plowed.mp3"
        },
        {
            title: "Caravan by John Wasson",
            url: "assets/music/Caravan.mp3"
        },
    ];

    let currentSongIndex = 0;

    // Mostrar el reproductor al cargar la página
    musicPlayer.style.display = 'block';

    // Agregar funcionalidad al botón de cerrar (X)
    const windowTitle = musicPlayer.querySelector('.window-title');
    
    // Crear un botón de cerrar clickeable
    windowTitle.style.cursor = 'default';
    windowTitle.addEventListener('click', function(e) {
        // Verificar si el clic fue cerca del lado derecho (donde está la X)
        const rect = windowTitle.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const titleWidth = rect.width;
        
        // Si el clic está en los últimos 35px (donde está la X)
        if (clickX > titleWidth - 35) {
            musicPlayer.style.display = 'none';
            // Pausar la música al cerrar
            if (!audio.paused) {
                audio.pause();
                playPauseBtn.textContent = '▶';
            }
        }
    });

    function loadCurrentSong() {
        audio.src = songs[currentSongIndex].url;
    }

    function updateCurrentSong() {
        currentSongElement.textContent = songs[currentSongIndex].title;
    }

    // Cargar la primera canción y actualizar el título
    loadCurrentSong();
    updateCurrentSong();

    // Establecer el volumen inicial
    audio.volume = volumeSlider.value;

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

    // Termina la canción, pasar a la siguiente
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
});