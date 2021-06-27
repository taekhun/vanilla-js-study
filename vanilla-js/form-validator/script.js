const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");
const button = document.querySelector("button");

const usernameValid = () => {
  const errmsg = username.parentNode.querySelector("small");
  // id 정규식 : 숫자로 시작 X/영어대소문,-_만 가능/총 3글자 이상
  const idRegex = /^[a-zA-Z]{1}[a-zA-Z0-9_]{2,}$/;

  if (username.value.match(idRegex)) {
    username.style = "border-color:#2ecc71";
    errmsg.style.visibility = "hidden";
  } else {
    username.style = "border-color:red";
    errmsg.style.visibility = "visible";
    errmsg.style.color = "red";
    errmsg.innerHTML = "Username must be at least 3 characters";
    username.value.length >= 3 && (errmsg.innerHTML = "Inappropriate Username");
  }
};

const emailValid = () => {
  const errmsg = email.parentNode.querySelector("small");
  // email 정규식 : 숫자,영대소문으로만 시작/-_.은 문자중간에만/@뒤 숫자,영대소문자로만시작/-_.은 문자중간에만/.뒤에 2~3문자만
  const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  if (email.value.match(emailRegex) != null) {
    email.style = "border-color:#2ecc71";
    errmsg.style.visibility = "hidden";
  } else {
    email.style = "border-color:red";
    errmsg.style.visibility = "visible";
    errmsg.style.color = "red";
    errmsg.innerHTML = "Email is not valid";
  }
};

const passwordValid = () => {
  const errmsg = password.parentNode.querySelector("small");
  if (password.value.length >= 6) {
    password.style = "border-color:#2ecc71";
    errmsg.style.visibility = "hidden";
  } else {
    password.style = "border-color:red";
    errmsg.style.visibility = "visible";
    errmsg.style.color = "red";
    errmsg.innerHTML = "Password must be at least 6 characters";
  }
};

const password2Valid = () => {
  const errmsg = password2.parentNode.querySelector("small");
  if (password.value == password2.value && password2.value) {
    password2.style = "border-color:#2ecc71";
    errmsg.style.visibility = "hidden";
  } else {
    password2.style = "border-color:red";
    errmsg.style.visibility = "visible";
    errmsg.style.color = "red";
    errmsg.innerHTML = "Passwords do not match";
    !password2.value && (errmsg.innerHTML = "Password2 is required");
  }
};

button.addEventListener("click", (e) => {
  e.preventDefault();

  usernameValid();
  emailValid();
  passwordValid();
  password2Valid();
});
