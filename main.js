// Variables //

const search = document.querySelector('input');
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
      console.log(response)
    })
    .catch(function(err){
      console.log(err);
    })
  })
}
