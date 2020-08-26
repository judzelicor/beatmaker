class DrumKit {
  constructor() {
    this.playButton = document.getElementById('playButton')
    this.pads = document.querySelectorAll('.pad');
    this.kickAudio = document.querySelector('.kick-sound');
    this.clapAudio = document.querySelector('.clap-sound');
    this.crashAudio = document.querySelector('.crash-sound');
    this.hithatAudio = document.querySelector('.hithat-sound');
    this.snareAudio = document.querySelector('.snare-sound');
    this.tomAudio = document.querySelector('.tom-sound');
    this.index = 0;
    this.bpm = 150;
  }

  repeat() {
    let step = this.index % 6;
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
    console.log(step)
  }

  start() {
    const interval = (60 / this.bpm) * 1000;
    setInterval(() => {
      this.repeat();
    }, interval);
  }

  activePad() {
    if (this.classList.contains('pad--active')) {
      this.classList.remove('pad--active')
    } else {
      this.classList.add('pad--active')
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