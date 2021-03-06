// Variables //

const search = document.querySelector('input');
const allColumns = document.querySelectorAll('.column');
let button = document.querySelector('.button');

const key = config.key;
const mashH = mashHeaders;

// Event Listeners //

button.addEventListener('click', getPromise);
search.addEventListener('keyup', function(e){
  if(e.keyCode === 13){
    getPromise();
  }
})

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
      let recipes = response.recipes;
      if(recipes.length > 0){
        for(let i = 1; i < allColumns.length; i++){
          allColumns[i].innerHTML = `
            <h2><a href="${recipes[i-1].source_url}" target="_blank"><strong>${recipes[i-1].title}</strong></a></h2>
            <figure class="image is-square">
              <a href="${recipes[i-1].source_url}" target="_blank"><img src="${recipes[i-1].image_url}" alt="Recipe Results"></a>
            </figure>
          `
          allColumns[0].style.display = "none"
        }
      } else {
        allColumns[0].style.display = "";
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
