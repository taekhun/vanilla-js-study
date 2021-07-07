import Component from "../core/Component.js";

export default class Loader extends Component {
  setup() {}

  template() {
    return `
      <div class="loader${this.$props.isLoading ? ` show` : ``}" >
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
      </div>
    `;
  }

  mounted() {}

  setEvent() {}

  // addIO() {
  //   const { pageNext } = this.$props;
  //   const $loader = this.$target.querySelector(".loader");
  //   const ioOption = {
  //     rootMargin: "0px",
  //   };

  //   const io = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.intersectionRatio > 0.5) {
  //         pageNext();
  //       }
  //     });
  //   }, ioOption);
  //   io.observe($loader);
  // }
}
