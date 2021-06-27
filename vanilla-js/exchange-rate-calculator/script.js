// Elements
const swapButton = document.querySelector("button");
let firstSelect = document.querySelector("#currency-one");
let secondSelect = document.querySelector("#currency-two");
let firstInput = document.querySelector("#amount-one");
let secondInput = document.querySelector("#amount-two");
let rateElem = document.querySelector("#rate");

// Exchage Rates Object (start -> x)
let expRates;

// Fetch API
const fetchAPI = (start) => {
  const response = fetch(`https://v6.exchangerate-api.com/v6/5609638279dd64e24c18fde5/latest/${start}`);
  return response.then((res) => res.json()).then((json) => json.conversion_rates);
};

// Swapping Start and Destination Currency
const handleSwap = async () => {
  [firstSelect.selectedIndex, secondSelect.selectedIndex] = [secondSelect.selectedIndex, firstSelect.selectedIndex];
  let [start, dest, amount] = getCurrValue();
  exRates = await fetchAPI(start);
  changeResult(exRates, start, dest, amount);
};

// When Start Currency Changed
const handleStartChange = async () => {
  let [start, dest, amount] = getCurrValue();
  exRates = await fetchAPI(start);
  changeResult(exRates, start, dest, amount);
};

// When Destination Currency Changed
const handleDestChange = () => {
  let [start, dest, amount] = getCurrValue();
  changeResult(exRates, start, dest, amount);
};

// When Amount Changed
const handleAmountChange = () => {
  let [start, dest, amount] = getCurrValue();
  changeResult(exRates, start, dest, amount);
};

// Apply the Result
const changeResult = (exRate, start, dest, amount) => {
  const result = exRate[`${dest}`];
  rateElem.innerText = `1 ${start} = ${result} ${dest}`;
  secondInput.value = (result * amount).toFixed(2);
};

// Load current values and return
const getCurrValue = () => {
  let start = firstSelect.options[firstSelect.selectedIndex].value;
  let dest = secondSelect.options[secondSelect.selectedIndex].value;
  let amount = firstInput.value;
  return [start, dest, amount];
};
//Main
async function main() {
  // Init
  let [start, dest, amount] = getCurrValue();
  exRates = await fetchAPI(start);
  changeResult(exRates, start, dest, amount);

  // Add Events
  swapButton.addEventListener("click", handleSwap);
  firstSelect.addEventListener("change", handleStartChange);
  secondSelect.addEventListener("change", handleDestChange);
  firstInput.addEventListener("change", handleAmountChange);
}

main();
