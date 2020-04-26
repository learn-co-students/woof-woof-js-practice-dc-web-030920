document.addEventListener('DOMContentLoaded', function(){ 
    fetchAllDogs()
    goodDogsFilter = document.querySelector('#good-dog-filter')
    goodDogsFilter.addEventListener('click', filterDogs)
})

function filterDogs(event) {
    const dogBar = document.querySelector('#dog-bar')
    dogBar.innerHTML = ""
    button = event.target 
    if (button.innerText ==="Filter good dogs: OFF"){
        button.innerText = "Filter good dogs: ON"
        fetch('http://localhost:3000/pups')
        .then(response => response.json())
        .then(dogsArray => dogsArray.filter(dog => dog.isGoodDog)
        .forEach(dog => displayDogs(dog))
        )
    }
    else  {
        button.innerText = "Filter good dogs: OFF"
        fetchAllDogs()
    }
}

function fetchAllDogs() {
    const dogBar = document.querySelector('#dog-bar')
    dogBar.innerHTML = ""
    fetch('http://localhost:3000/pups')
    .then(response => response.json())
    .then(dogsArray => dogsArray.forEach(dog => displayDogs(dog)))
}

function displayDogs(dog) {
    const dogBar = document.querySelector('#dog-bar')
    const dogElement = document.createElement('span')
    dogElement.innerText = dog.name
    dogBar.appendChild(dogElement)
    dogElement.addEventListener('click', () =>  moreInfo(dog))
}

function moreInfo(dog) {
    const dogInfo = document.querySelector('#dog-info')
    dogInfo.innerHTML = ""
    const image = document.createElement('img')
    image.src = dog.image
    const header = document.createElement('h2')
    header.innerText = dog.name
    const button = document.createElement('button')
    if (dog.isGoodDog) {
        button.innerText = "Good Dog"
    }
    else { button.innerText = "Bad Dog"
        }
    dogInfo.append(image,header,button)
    button.addEventListener('click', () => updateDog(dog))
}

function updateDog(dog) {
    fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: "PATCH",
        headers: {
                'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "isGoodDog": !dog.isGoodDog 
        })
    })
    .then(response => response.json())
    .then(dog => moreInfo(dog))
}

