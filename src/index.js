let filter = false
document.addEventListener("DOMContentLoaded", () => {
    const filterButton = document.getElementById("good-dog-filter")
    
    fetchDogs()
    filterButton.onclick = filterDogs
})

function filterDogs(event){
    event.preventDefault
    const bar = document.getElementById('dog-bar'),
        spans = bar.querySelectorAll("span");
        // debugger
    if (filter === false){
        // debugger
        event.target.innerText = "Filter good dogs:ON"
        filter = true
        spans.forEach(span =>{
            if (span.className === "bad-dog"){
                // debugger
                span.style.display = "none"
               
            }
        })
    } else {
        event.target.innerText = "Filter good dogs:OFF"
        filter = false
        spans.forEach(span => span.style.display = "")
        
    }
}
function fetchDogs(filter){
    fetch('http://localhost:3000/pups')
    .then(response => response.json())
    .then(dogs => dogs.forEach(renderDogNames))

}

function renderDogNames(dog){
    const span = document.createElement('span')
    span.innerText = dog.name
    span.id = dog.id
    dog.isGoodDog === true ? span.className = "good-dog" : span.className = "bad-dog"
    document.getElementById('dog-bar').appendChild(span)
    span.onclick = () => showDog(dog.name, dog.image, dog.isGoodDog, dog.id, span)
}


function showDog(name, image, isGood, id, span){
    
    const info = document.getElementById("dog-info"),
        img = document.createElement('img'),
        h2 = document.createElement('h2'),
        button = document.createElement('button')
    info.innerHTML = ""
    img.src = image
    h2.innerText = name
    button.id = id
    if (isGood === true){
        button.innerText = "Good Dog"
        span.className = "good-dog"
    } else if (isGood === false) {
        button.innerText = "Bad Dog"
        span.className = "bad-dog"
    }
    info.append(img, h2, button)
    button.onclick = () => changeStatus(name, image, isGood, id, span)
}

function changeStatus(name, image, isGood, id, span){
    isGood === true ? isGood = false : isGood = true
    showDog(name, image, isGood, id, span)
    const status = {
        isGoodDog: isGood
    }
    fetch(`http://localhost:3000/pups/${id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            Accepts: 'application/json'
        },
        body: JSON.stringify(status)
    })
}