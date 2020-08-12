const cardsContainer = document.getElementById('cardsContainer');
const logo = document.getElementById('logo');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultEl = document.getElementById('result');
const messageEl = document.getElementById('message');

searchInput.focus();

let query;

let ingredientsKey = [];
let measureKey = [];
for (i = 1; i <= 20; i++) {
  ingredientsKey.push(`strIngredient${i}`);
  measureKey.push(`strMeasure${i}`);
}

async function searchMeals() {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const meals = await response.json();
    return meals;
  } catch (error) {
    console.log(error);
    showMessage('Error encountered. Try again.');
  }
}

function showMeals() {
  const promise = searchMeals();
  promise.then((data) => {
    if (data.meals === null) {
      showMessage('No Results Found');
      cardsContainer.innerHTML = '';
      resultEl.innerHTML = '';
    } else {
      showMessage(`Results for "${query}"`);
      const card = data.meals
        .map((meal) => {
          return `
        <div class="cards" onClick = "showResults(${data.meals.indexOf(meal)})">
          <img src = "${meal.strMealThumb}" class = "cover">
          <div class = "info" >
          <h3>${meal.strMeal}</h3>
          <div class = "cardTags">
            <span class = "tags">${meal.strArea}</span>
            <span class = "tags">${meal.strCategory}</span>
          </div>
          </div>
        </div>
        `;
        })
        .join('');
      cardsContainer.innerHTML = card;
    }
  });
}

function showMessage(message) {
  messageEl.textContent = message;
}

function showResults(mealIndex) {
  resultEl.innerHTML = '';
  const promise = searchMeals(query);
  promise.then((data) => {
    const meal = data.meals[mealIndex];
    const result = `
    <div></div>
    <img class = "meal" src = "${meal.strMealThumb}">
    <div class = "resultInfo">
      <h1>${meal.strMeal}</h1>
      <div class = "tags">
          <span>${meal.strArea}</span><span>${meal.strCategory}</span>
          ${
            meal.strTags != null
              ? meal.strTags
                  .split(',')
                  .map((tag) => `<span>${tag}</span>`)
                  .join('')
              : ''
          }
      </div>

      <ul class= "ingredients">
      <h3>Ingredients</h3>
        ${ingredientsKey
          .map((key, index) =>
            meal[key] != '' && meal[key] != null
              ? `<li><strong>${meal[key]}</strong>${
                  meal[measureKey[index]] != ''
                    ? ` : ${meal[measureKey[index]]}`
                    : ''
                }</li>`
              : ''
          )
          .join('')}
      </ul>
  </div>
  </div>
  <div class = "detail">
      <h3>Procedure</h3>
      <p>${meal.strInstructions}</p>
      <div class = "links">
      ${
        (meal.strSource != null) & (meal.strSource != '')
          ? `<a class = 'button' href = "${meal.strSource}" target = "_blank">Read More</a>`
          : ''
      }
      ${
        (meal.strYoutube != null) & (meal.strYoutube != '')
          ? `<a class = 'button' href = "${meal.strYoutube}" target = "_blank">Watch Tutorial</a>`
          : ''
      }
      </div>
  </div>
    `;

    resultEl.innerHTML = result;
    resultEl.scrollIntoView();
  });
}

// search button event listener
searchBtn.addEventListener('click', () => {
  if (searchInput.value != '') {
    query = searchInput.value;
    showMeals();
    resultEl.innerHTML = '';
  }
});

logo.addEventListener('click', () => {
  cardsContainer.innerHTML = '';
  resultEl.innerHTML = '';
  showMessage('');
  searchInput.value = '';
  searchInput.focus();
});
