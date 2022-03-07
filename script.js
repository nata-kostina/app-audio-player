const state = { current: 0, isLoaded: false, isPlaying: false };
const music = [
    { id: 0, src: "./assets/audio/beyonce.mp3", title: "Don't Hurt Yourself", singer: "Beyonce" },
    { id: 1, src: "./assets/audio/dontstartnow.mp3", title: "Don't Start Now", singer: "Dua Lipa" }
];

const imgs = [
    { id: 0, src: "./assets/img/lemonade.png" },
    { id: 1, src: "./assets/img/dontstartnow.png" }
];

/*==============================================
Audio
================================================*/

const audio = new Audio();
audio.src = music.find(item => item.id === Number(state.current)).src;
state.isLoaded = true;

const startAudio = () => {
    if (state.isPlaying) {
        if (!state.isLoaded) {
            audio.src = music.find(item => item.id === Number(state.current)).src;
            state.isLoaded = true
        }
        audio.play();
    }
}

const stopAudio = () => {
    if (!state.isPlaying) {
        audio.pause();
    }
}

/*==============================================
Button Play
================================================*/

const btnPlay = document.querySelector('.button-play');

const toggleBtnPlay = () => {
    btnPlay.classList.toggle('pause');
}
const handleBtnPlay = () => {

    toggleBtnPlay();

    if (btnPlay.classList.contains('pause')) {
        state.isPlaying = true;
        startAudio();
    } else {
        state.isPlaying = false;
        stopAudio();
    }
}

btnPlay.addEventListener('click', handleBtnPlay);

/*==============================================
Background, image, song info
================================================*/

const changeSongInfo = () => {
    document.querySelector('.signer').innerHTML = `${music.find(item => item.id === Number(state.current)).singer}`;
    document.querySelector('.song').innerHTML = `${music.find(item => item.id === Number(state.current)).title}`;
}

const changeBgImage = () => {
    document.querySelector('.bg-image').style.background = `url('${imgs.find(item => item.id === Number(state.current)).src}') center center / cover no-repeat`;
}

const changePlayerImage = () => {
    document.querySelector('.player__img').style.background = `url('${imgs.find(item => item.id === Number(state.current)).src}') center center / cover no-repeat`;

}

/*==============================================
Button Next
================================================*/
const btnNext = document.querySelector('.button-next');

const handleBtnNext = () => {
    state.current = (state.current + 1) % music.length;
    changeSongInfo();
    changeBgImage();
    changePlayerImage();
    state.isPlaying = true;
    state.isLoaded = false;
    if (!btnPlay.classList.contains('pause')) {

        btnPlay.classList.add('pause');
    }
    startAudio();
}
btnNext.addEventListener('click', handleBtnNext);

/*==============================================
Button Previous
================================================*/

const btnPrevious = document.querySelector('.button-previous');

const handleBtnPrevious = () => {
    state.current = Math.abs((state.current - 1)) % music.length;
    changeSongInfo();
    changeBgImage();
    changePlayerImage();
    state.isPlaying = true;
    state.isLoaded = false;
    if (!btnPlay.classList.contains('pause')) {

        btnPlay.classList.add('pause');
    }
    startAudio();
}

btnPrevious.addEventListener('click', handleBtnPrevious);
/*==============================================
Progress bar Time
================================================*/

const setSongDuration = () => {
    if (audio.src) {
        document.querySelector(".duration").innerHTML = `${Math.floor(audio.duration / 60)}:${Math.round(audio.duration % 60).toString().padStart(2, '00')}`;
    }
}

const setCurrentTime = () => {
    if (audio.src) {
        document.querySelector(".current").innerHTML = `${Math.floor(audio.currentTime / 60)}:${Math.round(audio.currentTime % 60).toString().padStart(2, '00')}`;
    }
}
setInterval(() => {
    const progress = document.querySelector(".progress");
    progress.style.width = `${(audio.currentTime * 100) / audio.duration}%`;
    setSongDuration();
    setCurrentTime();
}, 1000);

const progressBar = document.querySelector('.progress-bar');

const moveProgress = (event) => {
    const progressBarWidth = progressBar.offsetWidth;
    const progress = document.querySelector(".progress");
    let progressWidth = (event.offsetX * 100) / progressBarWidth;
    progress.style.width = `${progressWidth}%`;

    if (state.isLoaded) {
        audio.currentTime = (progressWidth * audio.duration) / 100;
    }
}
progressBar.addEventListener("click", moveProgress);