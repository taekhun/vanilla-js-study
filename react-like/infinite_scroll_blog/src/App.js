import Component from "./core/Component.js";
import FilterContainer from "./components/FilterContainer.js";
import PostContainer from "./components/PostContainer.js";
import LoaderContainer from "./components/LoaderContainer.js";
import { getPosts } from "../api/postsAPI.js";

export default class App extends Component {
  setup() {
    this.setState({ limit: 5, page: 1, isLoading: false });
    this.fetchPosts(this.$state.limit, this.$state.page);
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

  //prop methods
  async fetchPosts(limit, page) {
    const posts = await getPosts(limit, page);
    this.setState({ posts });
  }

  async appendPosts(limit, page) {
    this.setState({ isLoading: true });
    const posts = await getPosts(limit, page);
    this.setState({ isLoading: false });

    this.setState({ posts: [...this.$state.posts, ...posts] });
  }

  pageNext() {
    //Todo: 초반에 5개만 나오게 수정

    if (this.$state.page >= 20) return;
    this.setState({ page: this.$state.page + 1 });
    this.appendPosts(this.$state.limit, this.$state.page);
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
