import Component from "./core/Component.js";
import FilterContainer from "./components/FilterContainer.js";
import PostContainer from "./components/PostContainer.js";
import LoaderContainer from "./components/LoaderContainer.js";
import { getPosts } from "../api/postsAPI.js";

export default class App extends Component {
  setup() {
    this.setState({ limit: 5, page: 1, isLoading: false });
    this.fetchPosts();
  }

  template() {
    return `
      <h1>@tech-hoon's Blog</h1>
      <div class="filter-container"></div>
      <div class="post-container"></div>
      <div class="loader-container"></div>
  `;
  }

  mounted() {
    const $filterContainer = this.$target.querySelector(".filter-container");
    const $postContainer = this.$target.querySelector(".post-container");
    const $loaderContainer = this.$target.querySelector(".loader-container");

    new FilterContainer($filterContainer, { filterPosts: this.filterPosts.bind(this) });
    new PostContainer($postContainer, {
      posts: this.$state.posts,
      pageNext: this.pageNext.bind(this),
    });
    new LoaderContainer($loaderContainer, { isLoading: this.$state.isLoading, pageNext: this.pageNext.bind(this) });
  }

  setEvent() {
    window.addEventListener("scroll", () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        this.pageNext();
      }
    });
  }

  //prop methods
  async fetchPosts() {
    const { limit, page } = this.$state;

    const posts = await getPosts(limit, page);
    this.setState({ posts });
  }

  async appendPosts() {
    const { limit, page } = this.$state;

    this.setState({ isLoading: true });
    const posts = await getPosts(limit, page);
    this.setState({ isLoading: false });
    this.setState({ posts: [...this.$state.posts, ...posts] });
  }

  pageNext() {
    const { limit, page } = this.$state;

    if (limit * page >= 100) return;
    this.setState({ page: page + 1 });
    this.appendPosts();
  }

  filterPosts({ target: { value } }) {
    this.$target.querySelectorAll(".post").forEach((post) => {
      const title = post.querySelector(".post-title").innerHTML;
      const body = post.querySelector(".post-body").innerHTML;

      title.indexOf(value) > -1 || body.indexOf(value) > -1
        ? (post.style.display = "flex")
        : (post.style.display = "none");
    });
  }
}
