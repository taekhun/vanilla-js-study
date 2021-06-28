import Component from "./core/Component.js";
import MusicInfo from "./components/MusicInfo.js";
import Navigation from "./components/Navigation.js";

export default class App extends Component {
  setup() {
    this.musicList = ["ukulele", "hey", "summer"];
    this.$state = {
      isPlaying: false,
      index: 0,
    };
  }

  template() {
    const { index, isPlaying } = this.$state;

    return ` 
      <h1>Music Player</h1>
      <div class="music-container${isPlaying ? ` play` : ``}" id="music-container">
        <div class="music-info"></div>
        <audio src="music/${this.musicList[index]}.mp3" id="audio" ${this.$state.isPlaying && `autoplay`}></audio>
        <div class="img-container">
          <img src="images/${this.musicList[index]}.jpg" alt="music-cover" id="cover" />
        </div>
        <div class="navigation"></div>
      </div>
    `;
  }

  mounted() {
    const { playToggle, nextMusic, prevMusic, moveAudio } = this;
    const $musicInfo = this.$target.querySelector(".music-info");
    const $navigation = this.$target.querySelector(".navigation");

    new MusicInfo($musicInfo, {
      title: this.musicList[this.$state.index],
      moveAudio: moveAudio.bind(this),
    });
    new Navigation($navigation, {
      isPlaying: this.$state.isPlaying,
      playToggle: playToggle.bind(this),
      nextMusic: nextMusic.bind(this),
      prevMusic: prevMusic.bind(this),
    });

    this.addAudioEvent();
  }

  //audio event handler
  addAudioEvent() {
    const $audio = this.$target.querySelector("#audio");
    const $progress = this.$target.querySelector("#progress");
    $audio.addEventListener("timeupdate", () => {
      $progress.style.width = `${($audio.currentTime * 100) / $audio.duration}%`;
      $audio.ended && this.nextMusic();
    });
  }

  //Props
  playToggle() {
    this.setState({ isPlaying: !this.$state.isPlaying });
  }

  nextMusic() {
    this.setState({ index: (this.$state.index + 1) % 3 });
  }

  prevMusic() {
    this.setState({ index: (((this.$state.index - 1) % 3) + 3) % 3 });
    //나머지 연산, 음수는 안되나...?
  }

  moveAudio({ offsetX }) {
    const $progress = this.$target.querySelector("#progress");
    const $progressCont = this.$target.querySelector("#progress-container");
    const $audio = this.$target.querySelector("#audio");
    const width = $progressCont.getBoundingClientRect().width;
    $audio.currentTime = ($audio.duration * offsetX) / width;
    $progress.style.width = `${(offsetX * 100) / width}%`;
  }
}
