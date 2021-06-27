// Elements
const $ = (_) => document.querySelector(_);
const $input = $("#search");
const $searchBtn = $(".search-btn");
const $randomBtn = $(".random-btn");
const $resultHeading = $("#result-heading");
const $meals = $(".meals");
const $singleMeal = $("#single-meal");

// Methods
const fetchAPI = (keyword) => {
  const response =
    keyword === "random"
      ? fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
      : fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`);
  return response.then((res) => res.json()).then((json) => json.meals);
};

const searchHandler = async (e) => {
  e.preventDefault();
  $meals.innerHTML = "";

  const meals = await fetchAPI($input.value);
  if (meals === null) {
    $resultHeading.textContent = `No Results`;
    return;
  }

  $resultHeading.textContent = `Search : ${$input.value}`;
  displayMeals(meals);
};

const randomHandler = async () => {
  $meals.innerHTML = "";

  const meal = await fetchAPI("random");
  displaySingleMeal(meal[0]);
};

const displayMeals = (meals) => {
  meals &&
    meals.forEach((meal) => {
      const $meal = document.createElement("div");
      $meal.className = "meal";
      $meal.innerHTML = `
        <img src=${meal.strMealThumb}>
        <div class="meal-info">${meal.strMeal}</div>`;
      $meal.addEventListener("click", () => displaySingleMeal(meal));
      $meals.append($meal);
    });
};

const displaySingleMeal = (meal) => {
  $singleMeal.innerHTML = "";
  const $meal = document.createElement("div");
  $meal.className = "single-meal";

  let ingredients = [];
  for (let i = 0; i <= 20; i++) {
    meal[`strIngredient${i}`] && ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
  }

  $meal.innerHTML = `
    <h1>${meal.strMeal}</h1>
    <img src=${meal.strMealThumb}>
    <div class="single-meal-info">
      <p>${meal.strCategory}</p>
      <p>${meal.strArea}</p>
    </div>
    <div class="main">
      <p>${meal.strInstructions}</p>
      <h2>Ingredients</h2>
      <ul>
          ${ingredients.map((item) => `<li>${item} </li>`)}
      </ul>
    </div>`;
  $singleMeal.append($meal);
};

// Event Listener
$searchBtn.addEventListener("click", searchHandler);
$randomBtn.addEventListener("click", randomHandler);
