import Component from "./core/Component.js";
import Container from "./components/Container.js";

const words = ["girrafe", "elephant", "kindergarten", "grandfather"];

export default class App extends Component {
  init() {
    this.$state = {
      word: words[Math.floor(Math.random() * words.length)],
      time: 10,
      score: 0,
      difficulty: "easy",
      settingOpened: false,
      gameEnd: false,
    };

    this.timer = setInterval(() => {
      this.setState({ time: this.$state.time - 1 });
      if (this.$state.time === 0) {
        clearInterval(this.timer);
        this.setState({ gameEnd: true });
      }
    }, 1000);
  }

  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.$Container.setState(newState);
  }

  template() {
    return `
      <button id="settings-btn" class="settings-btn">
        <i class="fas fa-cog"></i>
      </button>

      <div id="settings" class="settings">
        <form id="settings-form">
        <div>
          <label for="difficulty">Difficulty</label>
          <select id="difficulty">
            <option value="easy" selected>Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
    </form>  
      </div>
    
      <div class="container"></div>
    `;
  }

  whenAnswerCorrect() {
    const { score, time, difficulty } = this.$state;
    const $ = (_) => document.querySelector(_);

    this.setState({ score: score + 1 });
    this.setState({ word: words[Math.floor(Math.random() * words.length)] });

    $("input").value = "";
    const addedTime = (difficulty === "easy" && 4) || (difficulty === "medium" && 2) || (difficulty === "hard" && 1);

    this.setState({ time: time + addedTime });
  }

  mounted() {
    const $ = (_) => this.$target.querySelector(_);

    this.$Container = new Container($(".container"), {
      initState: this.$state,
      whenAnswerCorrect: () => this.whenAnswerCorrect(),
    });
  }

  setEvent() {
    this.addEvent("change", "select", ({ target }) => {
      this.setState({ difficulty: target[target.options.selectedIndex].value });
    });

    this.addEvent("click", "button", () => {
      this.$target.querySelector("#settings").classList.toggle("hide");
    });
  }
}
