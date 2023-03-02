// url 1st json convert start
const loadUser = async(searchText) =>{
     const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
     const res = await fetch(url);
     const data = await res.json();
     display(data.meals);
 };
//url 1st json convert end
 function display(dataArray){
    const parentDiv = document.getElementById('parent-div');
    parentDiv.innerHTML = '';

    // display no item 
    const noItem = document.getElementById('no-item');
    if (dataArray === null) {
      noItem.classList.remove('d-none');
      return;
    }
    else{
      noItem.classList.add('d-none');
    }
    dataArray = dataArray.slice(0, 10);
    // display all item 
     dataArray.forEach(element =>{
        //   new tag create 
          const childDiv = document.createElement('div');
        //   new tag class create 
          childDiv.classList.add('col');
          childDiv.innerHTML=`
            <div class="card h-100">
                <div class="m-3">
                     <img src="${element.strMealThumb}" class="card-img-top" alt="...">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${element.strArea}</h5>
                     <p class="card-text"> Put the potatoes in a large pan of cold salted water and bring to the boil. Lower the heat, cover, then simmer gently for 15 minutes until tender. Drain, then return to the pan over a low heat for</p>
                    <button onclick="modalJson('${element.idMeal}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Details
                  </button>
                </div>
            </div>
          `
        //   parentTag append childTag 
          parentDiv.appendChild(childDiv);
     });
 };

 // search part 
document.getElementById('btn-submit').addEventListener('click', function(){
  const inputField = document.getElementById('input-field');
  const inputText = inputField.value;
  inputField.value ='';
  
  // json function call 
  loadUser(inputText);   
});
// search part 
loadUser('chi');


//  jason button click id function 
 function modalJson(id){
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(url)
  .then(res => res.json())
  .then(data => modal(data.meals));
 };

 function modal(arrayModal){
  const modalParentDiv = document.getElementById('modal-div');
  modalParentDiv.innerHTML = '';

  arrayModal.forEach(element =>{
    const divField = document.getElementById('exampleModalLabel');
    divField.innerText = element.strArea;

    const modalChildDiv = document.createElement('div');
    modalChildDiv.innerHTML =`
    <img class="img-fluid" src="${element.strMealThumb}"  alt="...">
    `
    modalParentDiv.appendChild(modalChildDiv);
  })
 }


