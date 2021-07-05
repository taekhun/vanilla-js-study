import Component from "../core/Component.js";

export default class Loader extends Component {
  setup() {}

  template() {
    const { isLoading } = this.$props;

    return `
      <div class="loader${isLoading ? ` show` : ``}" >
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
      </div>
    `;
  }

  mounted() {
    this.addIO();
  }

  addIO() {
    const { pageNext } = this.$props;
    const $loader = this.$target.querySelector(".loader");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          pageNext();
        }
      });
    });

    io.observe($loader);
  }
}
