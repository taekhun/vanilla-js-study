import Component from "../core/Component.js";

export default class MusicInfo extends Component {
  template() {
    return `
        <h4 id="title">${this.$props.title}</h4>
        <div class="progress-container" id="progress-container">
          <div class="progress" id="progress"></div>
        </div>
        `;
  }

  setEvent() {
    this.addEvent("click", "#progress-container", this.$props.moveAudio);
  }
}
