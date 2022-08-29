const meals = document.getElementById('meals');
const searchTerm = document.getElementById('search-term');
const search = document.getElementById('search');
const mealPopUp = document.getElementById('meal-popup');
const popupCloseBtn = document.getElementById('close-popup');
const mealRecipeEl = document.getElementById('meal-info');

getRandomRecipe();
fetchFavMeals();

async function getRandomRecipe(){
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const responseData = await resp.json();
    const randMeal = responseData.meals[0];
    loadRandomMeal(randMeal, true);
};


async function getMealById(id){
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);

    const respData = await resp.json();

    const meal = respData.meals[0];

    return meal;
};


async function getMealBySearch(name){
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + name);

    const respData = await resp.json();

    const meals = await respData.meals;

    return meals;
};


function loadRandomMeal(mealData, random = false){
    const meal = document.createElement('div');
    meal.classList.add('meal');
    meal.innerHTML = `
    <div class="meal-header">
        ${random ? '<span class="random">Random recipe</span>' : ''}
        <img src=${mealData.strMealThumb} 
        alt="${mealData.strMeal}">
    </div>
    <div class="meal-body">
        <h4>${mealData.strMeal}</h4>
        <button class="fav-btn">
            <i class="fa-solid fa-heart"></i>
        </button>
    </div>`;

    const btn = meal.querySelector(".meal-body .fav-btn");


    btn.addEventListener("click", () => {
        if(btn.classList.contains("active")){
            removeMealFromLS(mealData.idMeal);
            btn.classList.remove('active');
        } else{
            addMealToLS(mealData.idMeal);
            btn.classList.add('active');
        }
        
        fetchFavMeals();
    });


    meal.addEventListener('click', () =>{
        showMealInfo(mealData);
    });

    meals.appendChild(meal);
};

function addMeal(m){
    const meal = document.createElement('div');
    meal.classList.add('meal');
    meal.innerHTML = `
    <div class="meal-header">
        <img src=${m.strMealThumb} 
        alt="${m.strMeal}">
    </div>
    <div class="meal-body">
        <h4>${m.strMeal}</h4>
        <button class="fav-btn">
            <i class="fa-solid fa-heart"></i>
        </button>
    </div>`;
    meals.appendChild(meal);
}

function addMealToLS(mealId){
    const mealsIds = getMealFromLS();
    localStorage.setItem('mealsIds', JSON.stringify([...mealsIds, mealId]));
};

function removeMealFromLS(mealId){
    const mealsIds = getMealFromLS();
    localStorage.setItem('mealsIds', JSON.stringify(mealsIds.filter(id => id !== mealId)));
};

function getMealFromLS(){
    const mealsIds = JSON.parse(localStorage.getItem('mealsIds'));
    return mealsIds === null ? [] : mealsIds;
};

async function fetchFavMeals(){
    //clean the container
    const favoriteContainer = document.getElementById('fav-meals');
    favoriteContainer.innerHTML = '';

    const mealIds = getMealFromLS();

    for(let i = 0; i < mealIds.length; i++){
        const mealId = mealIds[i];
        let meal = await getMealById(mealId);
        addMealToFav(meal);
    };
};

function addMealToFav(mealData){
    const favoriteContainer = document.getElementById('fav-meals');
    const favMeal = document.createElement('li');
    favMeal.innerHTML = `
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        <span>${mealData.strMeal}</span>
        <button class="clear"><i class="fa-solid fa-xmark"></i></button>
    `;

    const btn = favMeal.querySelector(".clear");
    btn.addEventListener("click", () =>{
        removeMealFromLS(mealData.idMeal);
        fetchFavMeals();
    });

    favMeal.addEventListener("click" , () => {
        showMealInfo(mealData);
    })

    favoriteContainer.appendChild(favMeal);
};


function showMealInfo(mealData){
    mealRecipeEl.innerHTML = '';

    const mealInfo = document.createElement('div');

    const ingredients = []
    for(let i=1; i<=20; i++){
        if(mealData['strIngredient'+i]){
            ingredients.push(`${mealData['strIngredient'+i]} - ${mealData['strMeasure'+i]}`)
        } else{
            break;
        }
    };

    mealInfo.innerHTML = `
        <h1>${mealData.strMeal}</h1>
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        <p>
            ${mealData.strInstructions}
        </p>
        <h3>Ingredients:</h3>
        <ul>
            ${ingredients.map(
                (ing) => `<li>${ing}</li>`)
            .join('')}
        </ul>
    `;
    mealRecipeEl.appendChild(mealInfo);
    mealPopUp.classList.remove('hidden');
};


search.addEventListener('click', async () =>{
    //clear the container
    meals.innerHTML = "";

    const search =  searchTerm.value;
    getMealBySearch(search);    
    const meal = await getMealBySearch(search);
    if(meal){
        meal.forEach((m) => {
        addMeal(m)
        });
    }    
});

popupCloseBtn.addEventListener('click', () => {
    mealPopUp.classList.add('hidden');
});

