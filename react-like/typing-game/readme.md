# Typing-Game

## Trial and Errror

기존의 사용하던 boilerplate의 setState는 한 컴포넌트가 변경되어도, 모든 컴포넌트가
다 같이 렌더링 되는 현상<br>
-> input에 focusing이 계속 초기화됨

## Solution

init(), render(), setState()를 다른 방식으로 오버라이딩하여 사용

```js
//기존 방식
constructor($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.init();
    this.render();
    this.setEvent();
}
init() {}
template() {
    return "";
}
setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
}
render() {
    this.$target.innerHTML = this.template();
    this.mounted();
}

```

기존의 방식은 생성자에 의해 init->render->setEvent순으로 동작한다.<br>
render는 template의 내용을 해당 컴포넌트 innerHTML에 넣어준다.<br>
setState는 새로운 state로 교체하고, render를 해준다.<br>

이 방식은, setState에 의해 state가 변경될 때마다 render를 해준다.<br>
즉, state의 다른 멤버 변수를 같이 사용하기 때문에, <br>
관련 없는 멤버 변수가 변경되더라도 렌더링이 되는 것은 불가피하다.

```js
//App.js
setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.$Container.setState(newState);
}
```

기존의 setState에서 state를 변경한 뒤에 곧바로 render를 하는 것이 아니라,
각각의 컴포넌트(지금은 Container 한 개)에서 newState로 다시 setState를 해준다

```js
//Container.js
init() {
    this.$state = { ...this.$props.initState };

    this.$target.innerHTML = ` (중략)
        <h1 id="word">${word}</h1>
        <span id="time">${time}s</span>
        <span id="score">${score}</span>
    `;
  }

  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }

  render() {
    this.$state.word !== $("#word").innerHTML && ($("#word").innerHTML = this.$state.word);
    this.$state.time !== $("#time").innerHTML && ($("#time").innerHTML = this.$state.time);
    this.$state.score !== $("#score").innerHTML && ($("#score").innerHTML = this.$state.score);
  }
```

컴포넌트에서는, 기존에 template의 내용을 rendering하는 방식이 아닌, init에서 먼저 App에서 보낸 초기값(initState)으로 html을 그려준다.

이후 컴포넌트의 setState에서 다시 새로운 state로 render를 해준다.<br>
이 때, render()에서 불필요한 렌더링을 막기 위해, 기존 innerHTML과 비교를 하여,<br> 변경이 된 state 항목에 대해서만 렌더링을 해준다.
