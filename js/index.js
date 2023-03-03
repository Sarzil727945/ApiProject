// main part start 
  // url 1st json convert start
    const loadUser = async(searchText, allData=5) =>{
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        const res = await fetch(url);
        const data = await res.json();
        display(data.meals, allData);
    };
  //url 1st json convert end

  //main display item part start
    function display(dataArray, allData){
        const parentDiv = document.getElementById('parent-div');
        parentDiv.innerHTML = '';
     // display no item part starts
        const noItem = document.getElementById('no-item');
        // spinner function call loader stop
        toggleSpinner(false);
        
        const showAll = document.getElementById('show-all');
        if (dataArray === null) {
          noItem.classList.remove('d-none');
          showAll.classList.add('d-none');
          return;
        }
        else{
          noItem.classList.add('d-none');
        }
      // display no item part end

      // show all part start
        if(allData===5 && dataArray.length > 10){
          dataArray = dataArray.slice(0, 10);
          showAll.classList.remove('d-none');
        }
        else{
          showAll.classList.add('d-none');
        }
      // show all part end
         
        dataArray.forEach(element =>{
              // new tag create 
              const childDiv = document.createElement('div');
              // new tag class create 
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
                        Show Details
                      </button>
                    </div>
                </div>
              `
              // parentTag append childTag 
              parentDiv.appendChild(childDiv);
        });
      
    };
  // main display item part ends
// main part ends

// search part starts
  document.getElementById('btn-search').addEventListener('click', function(){
    // spinner function call loader start 
    toggleSpinner(true);
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;

    // 1st json function call 
    loadUser(inputText);   
  });
// search part starts 
loadUser('chi');


// modal part starts 
  // modal button click id jason part start
    function modalJson(id){
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      fetch(url)
      .then(res => res.json())
      .then(data => modal(data.meals));
    };
  // modal button click id jason part ends 

  //  modal button click id function start
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
      });
    };
  // modal button click id function end
// modal part ends 

// spinner part start
  function toggleSpinner(isLoading) {
    const spinnerField = document.getElementById('spinner');
    if(isLoading){
      spinnerField.classList.remove('d-none');
    }
    else{
      spinnerField.classList.add('d-none');
    }
  };
// spinner part end

document.getElementById('show-all').addEventListener('click', function(){
  loadUser('', "allData")
})



