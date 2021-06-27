//Elements
const main = document.querySelector("#main");
const addBtn = document.querySelector("#add-user");
const doubleBtn = document.querySelector("#double");
const millionBtn = document.querySelector("#show-millionaires");
const sortBtn = document.querySelector("#sort");
const sumBtn = document.querySelector("#calculate-wealth");

let domArr = [];

//Functions
const fetchAPI = () => {
  const response = fetch("https://randomuser.me/api/");
  return response
    .then((res) => res.json())
    .then((json) => json.results[0].name.first + " " + json.results[0].name.last);
};

const updateDOM = () => {
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;
  domArr.map((user) => {
    let div = document.createElement("div");
    div.className = "person";
    div.innerHTML = `<strong>${user.name}</strong>$${user.wealth}`;
    main.appendChild(div);
  });
};

const addUsers = async (amount) => {
  for (let i = 0; i < amount; i++) {
    let name = await fetchAPI();
    let wealth = (Math.random() * 999999 + 10000).toFixed(0);
    domArr.push({ name, wealth });

    let div = document.createElement("div");
    div.className = "person";
    div.innerHTML = `<strong>${name}</strong>$${wealth}`;
    main.appendChild(div);
  }
};

const doubleUsers = () => {
  domArr.map((user) => {
    return (user.wealth *= 2);
  });
  updateDOM();
};

const showMilion = () => {
  domArr = domArr.filter((user) => {
    return user.wealth > 1000000;
  });
  updateDOM();
};

const sortWealth = () => {
  domArr.sort((tmp1, tmp2) => {
    return tmp2.wealth - tmp1.wealth;
  });
  updateDOM();
};

const sumWealth = () => {
  const sum = domArr.reduce((sum, { wealth }) => Number(sum) + Number(wealth), 0);
  let h3 = document.createElement("h3");
  h3.innerHTML = `Total Wealth:<strong>$${sum}</strong>`;
  main.appendChild(h3);
};

//Add Events
addBtn.addEventListener("click", () => addUsers(1));
doubleBtn.addEventListener("click", doubleUsers);
millionBtn.addEventListener("click", showMilion);
sortBtn.addEventListener("click", sortWealth);
sumBtn.addEventListener("click", sumWealth);

//Main
addUsers(3);
