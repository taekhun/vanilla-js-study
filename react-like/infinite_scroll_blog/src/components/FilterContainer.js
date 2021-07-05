import Component from "../core/Component.js";

export default class FilterContainer extends Component {
  template() {
    return `
        <input type="text" id="filter" class="filter" placeholder="Filter posts..." />
        `;
  }

  setEvent() {
    this.addEvent("input", "input", this.$props.filterPosts);
  }
}
