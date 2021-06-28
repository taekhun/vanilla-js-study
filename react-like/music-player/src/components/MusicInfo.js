import Component from "../core/Component.js";

export default class MusicInfo extends Component {
  template() {
    const { title } = this.$props;

    return `
        <h4 id="title">${title}</h4>
        <div class="progress-container" id="progress-container">
          <div class="progress" id="progress"></div>
        </div>
        `;
  }

  setEvent() {
    const { moveAudio } = this.$props;
    this.addEvent("click", "#progress-container", moveAudio);
  }
}
