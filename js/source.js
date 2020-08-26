class DrumKit {
  constructor() {
    this.playButton = document.getElementById('playButton')
    this.pads = document.querySelectorAll('.pad');
    this.kickAudio = document.querySelector('.kick-sound');
    this.currentKickAudio = './sounds/kick-808.wav';
    this.clapAudio = document.querySelector('.clap-sound');
    this.currentClapAudio = './sounds/clap-808.wav';
    this.crashAudio = document.querySelector('.crash-sound');
    this.currentCrashAudio = './sounds/crash-808.wav';
    this.hithatAudio = document.querySelector('.hithat-sound');
    this.currentHithatAudio = './sounds/hihat-808.wav';
    this.snareAudio = document.querySelector('.snare-sound');
    this.currentSnareAudio = './sounds/snare-808.wav';
    this.tomAudio = document.querySelector('.tom-sound');
    this.currentTomAudio = './sounds/tom-808.wav';
    this.selectElement = document.querySelectorAll('select');
    this.tempoSlider = document.getElementById('tempoSlider');
    this.muteButton = document.querySelectorAll('.mute-button');
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
  }

  repeat() {
    let step = this.index % 8;
    this.index ++
    const activePads = document.querySelectorAll(`.beat${step}`)
    // loop through pads
    activePads.forEach(pad => {
      pad.style.animation = `playTrack 300ms alternate ease-in-out 1`;
      if (pad.classList.contains('pad--active')) {
        // check sound
        if (pad.classList.contains('kick-pad')) {
          this.kickAudio.play();
          this.kickAudio.currentTime = 0;
        }
        if (pad.classList.contains('clap-pad')) {
          this.clapAudio.play();
          this.clapAudio.currentTime = 0;
        }
        if (pad.classList.contains('crash-pad')) {
          this.crashAudio.play();
          this.crashAudio.currentTime = 0;
        }
        if (pad.classList.contains('hithat-pad')) {
          this.hithatAudio.play();
          this.hithatAudio.currentTime = 0;
        }
        if (pad.classList.contains('snare-pad')) {
          this.snareAudio.play();
          this.snareAudio.currentTime = 0;
        }
        if (pad.classList.contains('tom-pad')) {
          this.tomAudio.play();
          this.tomAudio.currentTime = 0;
        }
      }
    })
  }

  start() {
    const interval = (60 / this.bpm) * 1000;
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }

    if (!this.isPlaying) {
      this.playButton.textContent = 'Play'
    } else {
      this.playButton.textContent = 'Pause'
    }
  }

  changeSound(event) {
    const selectedOption = event.target.name;
    const optionValue = event.target.value;

    switch(selectedOption) {
      case 'kick-select':
        this.kickAudio.src = optionValue;
        break;
      case 'clap-select':
        this.clapAudio.src = optionValue;
        break;
      case 'crash-select':
        this.crashAudio.src = optionValue;
        break;
      case 'hithat-select':
        this.hithatAudio.src = optionValue;
        break;
      case 'snare-select':
        this.snareAudio.src = optionValue;
        break;
      case 'tom-select':
        this.tomAudio.src = optionValue;
        break;
    }
  }

  activePad() {
    if (this.classList.contains('pad--active')) {
      this.classList.remove('pad--active')
    } else {
      this.classList.add('pad--active')
    }
  }

  displayTempoText(event) {
    const currentTempoText = document.getElementById('currentTempo');
    this.bpm = event.target.value;
    currentTempoText.textContent = event.target.value;
  } 

  updateTempo() {
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    if (this.playButton.textContent === 'Pause') {
      this.start();
    }
  }

  muteSound(button) {
    switch (button.classList[1]) {
      case 'kick-volume-button':
        this.kickAudio.volume = 0;
        break;
      case 'clap-volume-button':
        this.clapAudio.volume = 0;
        break;
      case 'crash-volume-button':
        this.crashAudio.volume = 0;
        break;
      case 'hithat-volume-button':
        this.hithatAudio.volume = 0;
         break;
      case 'snare-volume-button':
        this.snareAudio.volume = 0;
      case 'tom-volume-button':
        this.tomAudio.volume = 0;
        break;
    }
  }

  unmuteSound(button) {
    switch (button.classList[1]) {
      case 'kick-volume-button':
        this.kickAudio.volume = 1;
        break;
      case 'clap-volume-button':
        this.clapAudio.volume = 1;
        break;
      case 'crash-volume-button':
        this.crashAudio.volume = 1;
        break;
      case 'hithat-volume-button':
        this.hithatAudio.volume = 1;
         break;
      case 'snare-volume-button':
        this.snareAudio.volume = 1;
      case 'tom-volume-button':
        this.tomAudio.volume = 1;
        break;
    }
  }
}



const drumkit = new DrumKit();

drumkit.pads.forEach(pad => {
  pad.addEventListener('click', drumkit.activePad);
  pad.addEventListener('animationend', function () {
    this.style.animation = 'none';
  })
}) 

drumkit.playButton.addEventListener('click', function () {
  drumkit.start();
})

drumkit.selectElement.forEach(select => {
  select.addEventListener('change', function () {
    drumkit.changeSound(event);
  })
})

drumkit.tempoSlider.addEventListener('input', function (event) {
  drumkit.displayTempoText(event);
})

drumkit.tempoSlider.addEventListener('change', function (event) {
  drumkit.updateTempo(event);
})

drumkit.muteButton.forEach(button => {
  button.addEventListener('click', function (event) {
    if (!button.classList.contains('muted')) {

      button.classList.add('muted');
      drumkit.muteSound(button);
    } else {

      button.classList.remove('muted');
      drumkit.unmuteSound(button);
    }
  })
})