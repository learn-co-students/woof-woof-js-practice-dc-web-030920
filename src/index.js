

document.addEventListener("DOMContentLoaded", () => {
    console.log('DOM loaded');
    fetchDogs();
    const filteredDiv = document.getElementById('filtered')
    const filterBtn = document.getElementById('good-dog-filter')
    filterBtn.addEventListener('click', (e) => filterDogs(e, filteredDiv))
});

function fetchDogs(){

    const div = document.querySelector('#dog-bar')

    fetch('http://localhost:3000/pups')
    .then ((response) => {
        return response.json()
    })
    .then ((dogArray) => {
        return dogArray.forEach( dog => renderDog(dog,div))
    })
};

function renderDog(dog, div){
    const span = document.createElement('span')
    span.innerText = dog.name
    div.appendChild(span)
    span.addEventListener('click', (e) => showPupInfo(e, dog, span))
}

function showPupInfo(e, dog, span) {
  const dogInfoDiv = document.getElementById('dog-info')
  const img = document.createElement('img')
  img.src = dog.image
  const h2 = document.createElement('h2')
  h2.innerText = dog.name
  const behaviorBtn = document.createElement('button')
    
        if(dog.isGoodDog == true){
            behaviorBtn.innerText = "Good Dog!"
        }else{
            behaviorBtn.innerText = "Bad Dog!"
        }
    behaviorBtn.addEventListener('click', (e) => changeBehavior(e, dog))
    dogInfoDiv.append(img, h2, behaviorBtn)
}


function changeBehavior(e, dog){
    
    let id = dog.id

    if(e.target.parentElement.children[2].innerText == "Bad Dog!"){
            let dogObj = {
                isGoodDog: true
            }
            
            fetch(`http://localhost:3000/pups/${id}`, {
                method: 'PATCH',
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(dogObj)
            })
          e.target.parentElement.children[2].innerText = "Good Dog!"
          

    }else{
            let dogObj = {
                isGoodDog: false
            }
            
            fetch(`http://localhost:3000/pups/${id}`, {
                method: 'PATCH',
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(dogObj)
            })
                e.target.parentElement.children[2].innerText = "Bad Dog!"

    }
}

function filterDogs(e, filteredDiv){
    if(e.target.innerText = "Filter good dogs: OFF"){
        e.target.innerText = "Filter good dogs: ON"
        filteredDiv.style = "display:inline"
        fetch('http://localhost:3000/pups')
        .then((response) => {
            return response.json()
        })
        .then((dogArray) => {

            dogArray.forEach(dog => {
                displayGoodDogs(dog, filteredDiv)

            })

        });
    }
    
}

function displayGoodDogs(dog, filteredDiv){
  
    if(dog.isGoodDog === true){
        const titleH2 = filteredDiv.children[0]
        const div = document.createElement('div')
        div.id = 'filtered-div'
        const img = document.createElement('img')
        img.src = dog.image
        const h6 = document.createElement('h6')
        h6.innerText = dog.name
        div.append(h6, img)
        titleH2.appendChild(div)
    }

}

