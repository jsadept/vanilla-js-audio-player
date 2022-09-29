document.addEventListener("DOMContentLoaded", function (event) {


    let currentTrackIndex = null;

    const audioList = [...document.querySelectorAll('.audio__wrapper')];

    let audioListAll = [];
    let onPlayhead = false;

    const setListData = () => {

        audioList.forEach((audio, index) => {
            const audioElement = audio.querySelector('.audio__default'); // audio element
            const duration = Math.floor(audioElement.duration).toString();

            const playButton = audio.querySelector('.button_play'); // play button
            const nextButton = audio.querySelector('.button_next'); // next button
            const prevButton = audio.querySelector('.button_prev'); // prev button
            const playhead = audio.querySelector('.playhead'); // playhead
            const timeline = audio.querySelector('.timeline'); // timeline
            const soundButton = audio.querySelector('.button_sound'); // mute

            const currentTimeDiv = audio.querySelector('.time_current'); // time
            const durationDiv = audio.querySelector('.time_duration'); // time


            const timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

            const audioTitleDiv = audio.parentElement.querySelector('.music__title');

            audioListAll.push({
                id: index,
                wrapper: audio,
                element: audioElement,
                duration,
                playButton,
                nextButton,
                prevButton,
                soundButton,
                playhead,
                timeline,
                timelineWidth,
                currentTimeDiv,
                durationDiv,
                audioTitleDiv
            })
        });


    }


    const setEventListeners = () => {


        audioListAll.forEach((current) => {


            // play button event listener
            current.playButton.addEventListener("click", () => play(current));

            // next / prev buttons event listener
            current.nextButton.addEventListener("click", () => nextTrack(current.id));
            current.prevButton.addEventListener("click", () => prevTrack(current.id));

            // sound button event listener
            current.soundButton.addEventListener("click", () => muteTrack(current));


            // timeupdate event listener
            current.element.addEventListener("timeupdate", () => timeUpdate(current), false);

            current.element.addEventListener("canplaythrough", function () {
                current.duration = current.element.duration;
            }, false);

            current.timeline.addEventListener("click", (event) => {
                movePlayhead(event, current);
                current.element.currentTime = current.duration * clickPercent(event, current);
            }, false);

            current.element.onplay = () => {
                console.log(current.audioTitleDiv)
                current.playButton.classList.add('active');
                current.audioTitleDiv.classList.add('active');
            }
            current.element.onpause = () => {
                console.log(current.audioTitleDiv)
                current.playButton.classList.remove('active');
                current.audioTitleDiv.classList.remove('active');
            }
        })


    }


    //Play and Pause
    const play = (item) => {
        console.log(item.element)
        // start music
        if (item.element.paused) {
            item.element.play();
            item.playButton.classList.add('active');
        } else {
            // pause music
            item.element.pause();
            item.playButton.classList.remove('active');
        }
    }


    //change
    const nextTrack = (id) => {
        if ((id + 1) >= audioListAll.length) return false;
        audioListAll[id].element.pause();
        //suspends and restores all audio element
        audioListAll[id + 1].element.load();
        audioListAll[id + 1].element.play();
    }

    const prevTrack = (id) => {
        if ((id - 1) < 0) return false;
        audioListAll[id].element.pause();
        //suspends and restores all audio element
        audioListAll[id - 1].element.load();
        audioListAll[id - 1].element.play();
    }

    // mute
    const muteTrack = (item) => {
        if (item.element.volume > 0) {
            item.element.volume = 0;
            item.soundButton.classList.add('active');
        } else {
            item.element.volume = 1;
            item.soundButton.classList.remove('active');
        }
    }

    // Moves playhead as user drags
    const movePlayhead = (event, item) => {
        let newWidth = event.clientX - getPosition(item.timeline);

        if (newWidth >= 0 && newWidth <= item.timelineWidth) {
            item.playhead.style.width = newWidth + "px";
        }
        if (newWidth < 0) {
            item.playhead.style.width = "0px";
        }
        if (newWidth > item.timelineWidth) {
            item.playhead.style.width = item.timelineWidth + "px";
        }
    }


    const updateTrackTime = (item) => {
        const currTimeDiv = item.currentTimeDiv;
        const durationDiv = item.durationDiv;

        const currTime = Math.floor(item.element.currentTime).toString();
        const duration = Math.floor(item.element.duration).toString();


        currTimeDiv.innerHTML = formatSecondsAsTime(currTime);

        if (isNaN(item.duration)) {
            durationDiv.innerHTML = '00:00';
        } else {
            durationDiv.innerHTML = formatSecondsAsTime(duration);
        }
    }


    function timeUpdate(item) {
        updateTrackTime(item);
        let playPercent = item.timelineWidth * (item.element.currentTime / item.duration);
        item.playhead.style.width = playPercent + "px";
        if (item.element.currentTime === item.duration) {
            item.playButton.classList.add('active');
        }
    }


    // utils

    const clickPercent = (event, item) => {
        return (event.clientX - getPosition(item.timeline)) / item.timelineWidth;

    }

    const getPosition = (el) => {
        return el.getBoundingClientRect().left;
    }

    const formatSecondsAsTime = (secs) => {
        let hr = Math.floor(secs / 3600);
        let min = Math.floor((secs - (hr * 3600)) / 60);
        let sec = Math.floor(secs - (hr * 3600) - (min * 60));

        if (min < 10) {
            min = "0" + min;
        }
        if (sec < 10) {
            sec = "0" + sec;
        }

        return min + ':' + sec;
    }


    setListData();
    setEventListeners();
});