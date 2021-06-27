// Elements
const $ = (_) => document.querySelector(_);
const $balanceContainer = $("#balance");
const $incomeContainer = $("#money-plus");
const $expenseContainer = $("#money-minus");
const $list = $("#list");
const $deleteBtn = $(".delete-btn");
const $text = $("#text");
const $amount = $("#amount");
const $form = $("#form");

//Functions
const lsData = JSON.parse(localStorage.getItem("data"));
console.log(lsData);

function initData() {}

function addList({ id, text, amount }) {
  const li = document.createElement("li");
  amount > 0 ? (li.classList = "plus") : (li.classList = "minus");
  li.innerHTML = `${text}<span>${amount}</span><button class="delete-btn" onclick="removeList(${id})">x</button>`;
  list.appendChild(li);
}

function removeList(id) {}

function setData(e) {
  e.preventDefault();

  const data = {
    id: Math.floor(Math.random() * 100000000),
    text: $text.value,
    amount: $amount.value,
  };
  lsData.push(data);

  localStorage.setItem("data", JSON.stringify(lsData));
  addList(data);
}

//Add Events
$form.addEventListener("submit", setData);
