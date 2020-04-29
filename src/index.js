// when SOME EVENT happens, I want to make WHAT FETCH
// to the API, and manipulate the DOM HOW?

// 1. view the data
//    id, name, isGoodDog, image

// 2. add pups to dog bar
//    when a page loads, fetch to get all pups
//    then, add each pup to the span bar
document.addEventListener("DOMContentLoaded", () => {
    fetchPups()

    //5- filter good dogs button
    const filterButton = document.querySelector("#good-dog-filter")
    filterButton.className = "OFF"
    filterButton.addEventListener("click", filterDogs)
})

// 2-fetch all pups
function fetchPups(){

    const div = document.querySelector("#dog-bar")
    div.innerHTML = "" //this is to clear the content before re-rendering

    fetch("http://localhost:3000/pups")
    .then(response => response.json())
    .then(pupsArray => {
        pupsArray.forEach((pup) => {renderPup(pup)})
    })
}

// 2- render pup
function renderPup(pup){
    console.log(pup)
    
    const div = document.querySelector("#dog-bar")
    const span = document.createElement("span")
    div.append(span)
    span.id = pup.id
    span.innerText = pup.name
    
    // 3. when a user clicks a pup's span
    //    show that pup info (name, isGoodDog) in the div
    const name = pup.name
    const image = pup.image
    const status = pup.isGoodDog
    span.onclick = () => pupInfo(pup)
}
// find div with id dog-info
// show the pup's image, name, status
function pupInfo(pup){
    console.log("puppies!")

    const pupDiv = document.querySelector("#dog-info")
    const pupImg = document.createElement("img")
    const pupName = document.createElement("h2")
    const pupStatusButton = document.createElement("button")

    pupDiv.innerHTML = ""
    pupImg.src = pup.image
    pupName.innerText = pup.name
    
    // pupStatusButton.id = id
    if (pup.isGoodDog){
        pupStatusButton.innerText = "Status: Good Dog!"
    } else {
        pupStatusButton.innerText = "Status: Bad Dog.."
    }
    pupStatusButton.onclick = () => statusChange(pup)
    //4. when a user clicks the status button,
    // button's text should change from good to bad or reverse
    // the pup object in the db should be updated with new value
    
    pupDiv.append(pupImg, pupName, pupStatusButton)
}

// 4- change the status from good to bad or reverse
//    make a patch fetch
//    button reflects new status
function statusChange(pup){
    console.log("change status here")
    
    if (pup.isGoodDog === true){
        pup.isGoodDog = false
    } else { 
        pup.isGoodDog = true
    }

    const pupNewStatus = {
        isGoodDog: pup.isGoodDog
    }
    
    fetch(`http://localhost:3000/pups/${pup.id}`,{
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            Accepts: 'application/json'
        },
        body: JSON.stringify(pupNewStatus)
    })
    .then(response => response.json())
    .then(pup => pupInfo(pup))
}

// 5. when a user clicks on the filter good dogs button
//    the button text should change from OFF to ON
//    if the button says ON, only show pups who are good
//    if the button says OFF, show all dogs
function filterDogs(){
    console.log("filter dogs here")

    const filterButton = event.target

    if (filterButton.className === "OFF"){
        console.log("button is now ON")
        filterButton.className = "ON"
        filterButton.innerText = "Filter good dogs: ON"

        const div = document.querySelector("#dog-bar")
        div.innerHTML = "" //this is to clear the content before re-rendering
    
        fetch("http://localhost:3000/pups")
        .then(response => response.json())
        .then(
            (pupsArray => { 
                (pupsArray.filter((pup) => pup.isGoodDog))
                .forEach((pup) => renderPup(pup))
            }))
        } else {
        console.log("button is now OFF")
        filterButton.className = "OFF"
        filterButton.innerText = "Filter good dogs: OFF"
        fetchPups()
    }
    
}
