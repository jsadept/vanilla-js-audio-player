Video Chat Client
============
[![GitHub issues](https://img.shields.io/github/issues/jsadept/vanilla-js-audio-player)](https://github.com/jsadept/vanilla-js-audio-player/issues) 
[![Current Version](https://img.shields.io/badge/version-0.0.1-green.svg)](https://github.com/jsadept/vanilla-js-audio-player) 
[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://vanilla-js-audio-player.netlify.app/) 

It is a custom simple audio player with features: **pause/stop**, **next/previous song**, **mute/unmute**, **rewind on the timeline**, **display song time duration**

![Meet Page](https://i.imgur.com/X7buPfG.png)

---


## HF

I hope you're having fun exploring this project, learn something from the code or help us improve it.

Most good programmers do programming not because they expect to get paid or get adulation by the public, but because it is fun to program.


---

## Tech stack
- HTML
- CSS
- Vanilla JS


---

## Features
- Pause/Stop
- Next/Previous song
- Mute/Unmute
- Rewind on the timeline
- Display song time duration
- Responsive design

---

## Screenshots
Player

![Player](https://i.imgur.com/X7buPfG.png)



---

## Usage


### Past HTML Player Template to your project:

    <div class="audio__wrapper">
        <audio controls class="audio__default">
            <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
                    type="audio/mpeg">
            <source src="music/interlude.ogg" type="audio/mpeg">
        </audio>

        <div class="audio">
            <div class="audio__buttons">
                <button title="play" class="button button_play"></button>
                <button title="prev" class="button button_prev"></button>
                <button title="next" class="button button_next"></button>
                <button title="sound" class="button button_sound"></button>
            </div>
            <div class="timeline__wrapper">
                <div class="time time_current">00:00</div>
                <div class="timeline">
                    <div class="playhead"></div>
                </div>
                <div class="time time_duration">00:00</div>
            </div>
        </div>
    </div>

### Copy CSS to your project :

    /style.css


### Copy JS to your project :

    /js/player.js
---

## License

This project is licensed under the terms of the **MIT** license.