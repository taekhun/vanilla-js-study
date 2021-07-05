import Component from "../core/Component.js";

export default class PostContainer extends Component {
  setup() {}

  template() {
    const posts = this.$props.posts || [];

    return posts
      .map(({ id, title, body }) => {
        return `
          <div class="post">
            <div class="number">${id}</div>
            <div class="post-info">
              <h2 class="post-title">${title}</h2>
              <p class="post-body">${body}</p>
            </div>
          </div>`;
      })
      .join(" ");
  }

  setEvent() {
    this.addEvent("click", ".post", this.$props.pageNext);
  }
}
