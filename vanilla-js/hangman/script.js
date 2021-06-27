const body = document.querySelector("body");
const figure = document.querySelectorAll(".figure-part");
const notifiBox = document.querySelector("#notification-container");
const rightBox = document.querySelector("#word");
const wrongBox = document.querySelector("#wrong-letters");
const popupBox = document.querySelector("#popup-container");
const finalMessage = document.querySelector("#final-message");
const resetButton = document.querySelector("#play-button");
const MAX_COUNT = 5;
let answerCount = MAX_COUNT;
let selectedLetters = [];
let remainLetterCount;

function fetchWord() {
  const response = fetch("https://random-word-api.herokuapp.com/word");
  return response.then((res) => res.json()).then((json) => json[0]);
}

function whenKeyPressed(key, word) {
  //입력된 문자가 영어 소문자 아닌 경우 리턴
  if (key < "a" || key > "z") return;

  //끝났을 시
  if (!answerCount) {
    popupBox.style.display = "flex";
    finalMessage.innerHTML = `The answer was ${word}.`;
    document.removeEventListener("keydown", whenKeyPressed);

    return;
  }

  //입력 된 문자가 입력 됐을 시 팝업창
  if (selectedLetters.indexOf(key) !== -1) {
    notifiBox.classList = "notification-container show";
    setTimeout(() => {
      notifiBox.classList = "notification-container";
    }, 2000);
    return;
  }

  //입력된 키와 단어 비교
  compareWord(key, word);
}

function compareWord(key, word) {
  let indexArr = [],
    pos = word.indexOf(key);

  //틀렸을 시
  if (pos == -1) {
    selectedLetters.push(key);
    let span = document.createElement("span");
    span.innerHTML = key;
    wrongBox.append(span);
    figure[MAX_COUNT - answerCount].style.display = "inline";
    answerCount--;
    return;
  }

  //맞췄을 시
  while (pos !== -1) {
    indexArr.push(pos);
    pos = word.indexOf(key, pos + 1);
    remainLetterCount--;
  }

  //글자 표시
  for (index of indexArr) rightBox.childNodes[index].innerHTML = key;
  selectedLetters.push(key);

  //다 맞췄을 시
  if (!remainLetterCount) {
    popupBox.style.display = "flex";
    finalMessage.innerHTML = "You Win!";
    document.removeEventListener("keydown", whenKeyPressed);
  }
}

async function init() {
  const word = await fetchWord();
  console.log(word);
  remainLetterCount = word.length;

  for (_ of word) {
    let div = document.createElement("span");
    div.className = "letter";
    rightBox.append(div);
  }

  body.addEventListener("keydown", ({ key }) => whenKeyPressed(key, word));
  resetButton.addEventListener("click", () => window.location.reload());
}

init();
