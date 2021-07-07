document.addEventListener("DOMContentLoaded", function(){
    let filterBtn = document.getElementById("good-dog-filter")
    // filterBtn.value = false
    filterBtn.addEventListener("click", function(){

        if(filterBtn.value == "false"){
            filterBtn.innerText = "Filter good dogs: ON";
            filterBtn.value = true;
            pageLoad()
        }else{
            filterBtn.innerText = "Filter good dogs: OFF";
            filterBtn.value = false;
            pageLoad()
        }
    })
    fetchPups()
    
})

function pageLoad(){
    let btnValue = event.target.value
    const dogBar = document.getElementById("dog-bar")
    while(dogBar.firstChild){
        dogBar.removeChild(dogBar.firstChild)
    }

    if(btnValue == "true"){
        fetchGoodPups();
    }else{
        fetchPups();
    }
}

// On page load, make a fetch to get all of the pup objects. 
function fetchPups(){
    fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(pups => {
        pups.forEach(pup => renderPup(pup))
    })
}

function fetchGoodPups(){
    fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(pups => {
        pups.forEach(pup => renderGoodPup(pup))
    })
}

// add a span with the pup's name to the dog bar 
function renderPup(pup){
    // console.log(pup)
    let containerDiv = document.getElementById("dog-bar")
    let pupSpan = document.createElement("span")
    pupSpan.dataset.id = pup.id
    pupSpan.addEventListener("click", fetchPupInfo)
    pupSpan.innerText = pup.name

    containerDiv.append(pupSpan)

}

function renderGoodPup(pup){
    // console.log(pup)
    if(pup.isGoodDog === true){
    let containerDiv = document.getElementById("dog-bar")
    let pupSpan = document.createElement("span")
    pupSpan.dataset.id = pup.id
    pupSpan.addEventListener("click", fetchPupInfo)
    pupSpan.innerText = pup.name

    containerDiv.append(pupSpan)
    }
}

//on click of pup, fetch pup info 
function fetchPupInfo(event){
    // console.log(event)
    fetch(`http://localhost:3000/pups/${event.target.dataset.id}`)
    .then(resp => resp.json())
    .then(pupInfo => {
        // const parent = document.getElementById("dog-info")
        // parent.removeChild()
        renderPupInfo(pupInfo)
    })
}

// then render pup's info (image, name, and isGoodDog status) should show up in the div with the id of "dog-info". 
    // When you have the pup's information, the dog info div should have the following children:
// an img tag with the pup's image url
// an h2 with the pup's name
// a button that says "Good Dog!" or "Bad Dog!" based on whether isGoodDog is true or false. 
    //Ex: <img src=dog_image_url> <h2>Mr. Bonkers</h2> <button>Good Dog!</button>

function renderPupInfo(pup){
    // console.log(pup);

    // let pupName = pup.name
    // let pupImage = pup.image
    let isDogGood = pup.isGoodDog
    const pupInfoContainer = document.getElementById("dog-info");
    //Below, remove the currently showing pup.
    while (pupInfoContainer.firstChild) {
        pupInfoContainer.removeChild(pupInfoContainer.firstChild);
    }

    const pupImgTag = document.createElement("img");
    pupImgTag.src = pup.image;

    const pupNameTag = document.createElement("h2");
    pupNameTag.innerText = pup.name;

    const pupStatusBtn = document.createElement("button");
    pupStatusBtn.value = isDogGood;
    pupStatusBtn.dataset.pupId = pup.id;
    // if statement to change button inner text based on pup.isGoodDog value
    if(isDogGood == false){
        pupStatusBtn.innerText = "Good Dog!"
    }else{
        let isDogGood = true
        pupStatusBtn.innerText = "Bad Dog!"
    }
    //Not sure if I have the order of good/bad right !

    pupStatusBtn.addEventListener("click", renderPupStatus)
    
    pupInfoContainer.append(pupImgTag, pupNameTag, pupStatusBtn);
    // console.log(pupInfoContainer);
    
}

// When a user clicks the Good Dog/Bad Dog button, two things should happen:
    // 1-The button's text should change from Good to Bad or Bad to Good
    // 2-The corresponding pup object in the database should be updated to reflect the new isGoodDog value
    // Please note, you can update a dog by making a PATCH request to /pups/:id
function renderPupStatus(event){
 console.log(event)
    let id = event.target.dataset.pupId
    let btnValue = event.target.value
    let dogStat 
    
    if(btnValue === "true"){
        dogStat = false
    }else{
        dogStat = true
    }

    let statusObj = {
        isGoodDog: dogStat
    }

    fetch(`http://localhost:3000/pups/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
            // "Accept": "application/json"
        },
        body: JSON.stringify(statusObj)
    })
    .then(resp => resp.json())
    .then(pup => renderPupInfo(pup))
    
}


