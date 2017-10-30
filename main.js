// Variables //

const search = document.querySelector('input');
const allColumns = document.querySelectorAll('.column');
let button = document.querySelector('.button');

const key = config.key;
const mashH = mashHeaders;

button.addEventListener('click', getPromise);

// Promise and Headers //
function getPromise(){
  let userSearch = search.value;
  var myInit = {
    method: 'GET',
    headers: mashH,
  }
 const recipePromise = fetch("https://community-food2fork.p.mashape.com/search?key=" + key + "&q=" + userSearch, myInit);

 recipePromise
  .then(function(response){
    response.json()
    .then(function(response){
      let recipes = response.recipes
      console.log(recipes);
      if(recipes.length > 0){
        for(let i = 1; i < allColumns.length; i++){
          allColumns[i].innerHTML = `
            <h3>${recipes[i-1].title}</h3>
            <figure class="image is-square">
              <img src="${recipes[i-1].image_url}" alt="Recipe Results">
            </figure>
          `
          allColumns[0].style.visibility = "hidden";
        }
      } else {
        allColumns[0].style.visibility = "visible";
        allColumns[0].innerHTML = `
          <h3>No recipes containing ${userSearch} were found!</h3>
        `
      }

    })
    .catch(function(err){
      console.log(err);
    })
  })
}
