// import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import { Error } from './config.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookMarksView from './views/bookMarksView.js';
import addRecipeView from './views/addRecipeView.js';
if (module.hot) {
  module.hot.accept();
}
// const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
//f12a0518-2e41-42ea-9f8f-23a731e97922
// const renderSpinner = function (parentEl) {
//   const markup = `
//   <div class="spinner">
//           <svg>
//             <use href="${icons}#icon-loader"></use>
//           </svg>
//         </div>`;
//   parentEl.innerHTML = '';
//   parentEl.insertAdjacentHTML('afterbegin', markup);
// };
const controlRecipes = async function (e) {
  try {
    resultsView.renderSpinner();
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    resultsView.render(model.getSearchResultPage());

    // const res = await fetch(
    //   `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    // );
    // // const res = await fetch(
    // //   'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bce0d'
    // // );
    // const data = await res.json();
    // let recipe = data.data.recipe;
    // console.log(recipe);
    // recipe = {
    //   id: recipe.id,
    //   title: recipe.title,
    //   publisher: recipe.publisher,
    //   sourceUrl: recipe.source_url,
    //   image: recipe.image_url,
    //   servings: recipe.servings,
    //   cookingTime: recipe.cooking_time,
    //   ingredients: recipe.ingredients,
    // };
    // console.log(recipe);

    // if (!res.ok) {
    //   throw new Error(`${data.message} `);
    // }

    recipeView.render(model.state.recipe);
    //     const markup = `
    //      <div class="spinner">

    //   <figure class="recipe__fig">
    //     <img src="${recipe.image}" alt="Tomato" class="recipe__img" />
    //     <h1 class="recipe__title">
    //       <span>${recipe.title}</span>
    //     </h1>
    //   </figure>

    //   <div class="recipe__details">
    //     <div class="recipe__info">
    //       <svg class="recipe__info-icon">
    //         <use href="${icons}#icon-clock"></use>
    //       </svg>
    //       <span class="recipe__info-data recipe__info-data--minutes">${
    //         recipe.cookingTime
    //       }</span>
    //       <span class="recipe__info-text">minutes</span>
    //     </div>
    //     <div class="recipe__info">
    //       <svg class="recipe__info-icon">
    //         <use href="${icons}#icon-users"></use>
    //       </svg>
    //       <span class="recipe__info-data recipe__info-data--people">${
    //         recipe.servings
    //       }</span>
    //       <span class="recipe__info-text">servings</span>

    //       <div class="recipe__info-buttons">
    //         <button class="btn--tiny btn--increase-servings">
    //           <svg>
    //             <use href="${icons}#icon-minus-circle"></use>
    //           </svg>
    //         </button>
    //         <button class="btn--tiny btn--increase-servings">
    //           <svg>
    //             <use href="${icons}#icon-plus-circle"></use>
    //           </svg>
    //         </button>
    //       </div>
    //     </div>

    //     <div class="recipe__user-generated">
    //       <svg>
    //         <use href="${icons}#icon-user"></use>
    //       </svg>
    //     </div>
    //     <button class="btn--round">
    //       <svg class="">
    //         <use href="${icons}#icon-bookmark-fill"></use>
    //       </svg>
    //     </button>
    //   </div>

    //   <div class="recipe__ingredients">
    //     <h2 class="heading--2">Recipe ingredients</h2>
    //     <ul class="recipe__ingredient-list">
    //     ${recipe.ingredients
    //       .map(ing => {
    //         return `
    //           <li class="recipe__ingredient">
    //             <svg class="recipe__icon">
    //               <use href="${icons}#icon-check"></use>
    //             </svg>
    //             <div class="recipe__quantity">${ing.quantity}</div>
    //             <div class="recipe__description">
    //               <span class="recipe__unit">${ing.unit}</span>
    //               ${ing.description}
    //             </div>
    //           </li>
    //       `;
    //       })
    //       .join('')}

    //       <li class="recipe__ingredient">
    //         <svg class="recipe__icon">
    //           <use href="${icons}#icon-check"></use>
    //         </svg>
    //         <div class="recipe__quantity">0.5</div>
    //         <div class="recipe__description">
    //           <span class="recipe__unit">cup</span>
    //           ricotta cheese
    //         </div>
    //       </li>
    //     </ul>
    //   </div>

    //   <div class="recipe__directions">
    //     <h2 class="heading--2">How to cook it</h2>
    //     <p class="recipe__directions-text">
    //       This recipe was carefully designed and tested by
    //       <span class="recipe__publisher">${
    //         recipe.publisher
    //       }</span>. Please check out
    //       directions at their website.
    //     </p>
    //     <a
    //       class="btn--small recipe__btn"
    //       href="${recipe.sourceUrl}"
    //       target="_blank"
    //     >
    //       <span>Directions</span>
    //       <svg class="search__icon">
    //         <use href="${icons}#icon-arrow-right"></use>
    //       </svg>
    //     </a>
    //   </div>

    // `;
    //     recipeContainer.innerHTML = '';
    //     recipeContainer.insertAdjacentHTML('afterbegin', markup);
    // rendering recipe
  } catch (err) {
    // console.error(err);
    recipeView.renderError(`${Error}I💥`);
  }
};
const controlSearchResult = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);
    // console.log(model.state.search.result);
    // resultsView.render(model.state.search.result);
    resultsView.render(model.getSearchResultPage(3));
    paginationView.render(model.state.search);
    searchView.clear();
  } catch (err) {
    console.error(err);
  }
};
const controlPagination = function (pg) {
  resultsView.render(model.getSearchResultPage(pg));
  paginationView.render(model.state.search);
};
controlSearchResult();
const controlServinings = function (newS) {
  // update the recipe servings (in state)
  model.updateServings(newS);
  recipeView.render(model.state.recipe);

  // update the recipe view
};

const controlAddBoomkmark = function () {
  // add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookemark(model.state.recipe.id);
  // update
  recipeView.render(model.state.recipe);
  // render bookmarks
  bookMarksView.render(model.state.bookmarks);
};
const bookMarkShow = function () {
  console.log('yi');
  bookMarksView.render(model.state.bookmarks);
};
const controlAddRecipe = async function (newRecipe) {
  try {
    // console.log(newRecipe);
    await model.uploadRecipe(newRecipe);
  } catch (err) {
    console.error(`😀`, err);
    addRecipeView.renderError(err.message);
  }
};
const init = function () {
  bookMarksView.addHandlerRender(bookMarkShow);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServinings);
  recipeView.addHandlerBookmark(controlAddBoomkmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();

// ['hashchange', 'load'].forEach(ev =>
//   window.addEventListener(ev, controlRecipes)
// );
// window.addEventListener('hashchange', showReicpe);
// window.addEventListener('load', showReicpe);
