import Component from "../core/Component.js";

export default class Player extends Component {
  template() {
    const { isPlaying } = this.$props;

    return `
      <button id="prev" class="action-btn">
        <i class="fas fa-backward"></i>
      </button>
      <button id="play" class="action-btn action-btn-big">
        <i class="fas fa-${isPlaying ? "pause" : "play"}"></i>
      </button>
      <button button id="next" class="action-btn">
        <i class="fas fa-forward"></i>
      </button>
    `;
  }

  setEvent() {
    const { playToggle, nextMusic, prevMusic } = this.$props;
    this.addEvent("click", "#play", playToggle);
    this.addEvent("click", "#next", nextMusic);
    this.addEvent("click", "#prev", prevMusic);
  }
}
