const url = "http://localhost:3000/pups"

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM LOADED")
    const div = document.getElementById("good-dog-filter")
    fetchDogs()
    div.onclick = () => filterGoodDogs()
})

// On Page, make fetch to get all pup objects.
// Add span with pups name to the dog bar.

function fetchDogs(event){
    fetch(url)
    .then(resp => resp.json())
    .then(dogArray => {
        dogArray.forEach(dog => renderDogNames(dog))
    })
}

function renderDogNames(dog){
    const div = document.getElementById("dog-bar")
    const span = document.createElement("span")
    div.append(span)
    span.innerText = dog.name
    span.id = dog.id
    // info.innerHTML = ""
    if (dog.isGoodDog === true) {
        span.className = "good-dog"
    } 
    else if (dog.isGoodDog === false) {
        span.className = "bad-dog"
    }
    span.onclick = () => pupInfo(dog.name, dog.image, dog.isGoodDog, dog.id, span)
}

//When a user clicks on a pups span in the pups info, dog info, name, and status should appear. 
// When you ahve the pup's info, the dog info should have the following children: img, h2, button.
function pupInfo(name, image, status, id, span) {
    const dogs =  div = document.getElementById("dog-info"),
                  img = document.createElement("img"),
                  h2 = document.createElement("h2"),
                  button = document.createElement("button")
    dogs.innerHTML = ""
    div.append(img, h2, button)
    h2.innerText = name
    img.src = image
    button.id = id
    if (status === true) {
        button.innerText = "Good Dog!"
        span.classNAME = "good-dog"
    }
    else if (status === false) {
        button.innerText = "Bad Dog!"
        span.classNAME = "bad-dog"
    }
    button.onclick = () => filterButton(name, image, status, id, span)
}

// When user clicks GoodDog/BadDog button, button should change to Good or Bad Dog
// The corresponding dog in the database should be updated to reflect the new isGoodDog value

function filterButton(name, image, status, id, span) {
    if (status === true){
        status = false
    }
    else if (status === false){
        status = true
    }
    pupInfo(name, image, status, id, span)
    const statusChange = {
        isGoodDog: status
    }
    fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json",
                Accepts: "application/json"},
        body: JSON.stringify(statusChange)
    })
}

// BONUSSSS When a User clicks Filter Good Dogs Button:
// Button Text should change "Filter good dogs: OFF" to "Filter good dogs: ON", or vice versa.
// If the button now says "ON" (meaning the filter is on), 
//then the Dog Bar should only show pups whose isGoodDog attribute is true. If the filter is off, the Dog Bar should show all pups (like normal).

function filterGoodDogs() {
    const div = document.getElementById("good-dog-filter")
    const spans = document.querySelectorAll("span")
    if (div.innerText === "Filter good dogs: OFF") {
        div.innerText = "Filter good dogs: ON"
        spans.forEach(span => {
            if (span.className === "bad-dog") {
                span.style.display = "none"
            } 
        })
    }
    else {
        div.innerText = "Filter good dogs: OFF"
        spans.forEach(span => {
            span.style.display = ""
        })
    }
}