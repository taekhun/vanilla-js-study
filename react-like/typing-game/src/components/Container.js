import Component from "../core/Component.js";

export default class Container extends Component {
  init() {
    this.$state = { ...this.$props.initState };
    const { word, time, score, gameEnd } = this.$state;

    this.$target.innerHTML = `
        <h2>👩‍💻 Speed Typer 👨‍💻</h2>
        <small>Type the following:</small>
        <h1 id="word">${word}</h1>
        <input type="text" id="text" autocomplete="off" placeholder="Type the word here..." autofocus />
        <p class="time-container">
            Time left: <span id="time">${time}s</span>
        </p>
        <p class="score-container">
            Score: <span id="score">${score}</span>
        </p>

        <div id="end-game-container" class="end-game-container" style="display: none;">
            <h1>Time ran out</h1>
            <p></p>
            <button onclick="location.reload()">Reload</button>
        </div>
    `;
  }

  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }

  render() {
    const $ = (_) => this.$target.querySelector(_);

    this.$state.word !== $("#word").innerHTML && ($("#word").innerHTML = this.$state.word);
    this.$state.time !== $("#time").innerHTML && ($("#time").innerHTML = this.$state.time);
    this.$state.score !== $("#score").innerHTML && ($("#score").innerHTML = this.$state.score);

    this.$state.gameEnd && ($("#end-game-container").style = "display: flex");
    $("#end-game-container p").innerHTML = `Your final score is ${this.$state.score}`;

    this.mounted();
  }

  setEvent() {
    this.addEvent("input", "input", ({ target: { value } }) => {
      if (this.$state.word === value) {
        this.$props.whenAnswerCorrect();
      }
    });
  }
}
