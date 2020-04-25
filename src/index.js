var allDogs;
var dogId = 0
var filter = false;
document.addEventListener("DOMContentLoaded", function(){
    fetchDogs()
    var filterDiv = document.getElementById("filter-div")
    var button = filterDiv.querySelector("button")
    button.addEventListener("click", function(){
        if(filter){
            filter = false
            button.innerText = "Filter good dogs: OFF"
            fetchDogs()
        }else{
            filter = true
            button.innerText = "Filter good dogs: ON"
            fetchDogs()
        }
    })
    

   


})

function fetchDogs(){

    fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(data => renderDogs(data))

}

function renderDogs(data){
    allDogs = data
    let div = document.getElementById("dog-bar")
    div.innerText = ''
    if (filter){

        data.filter(dog => dog.isGoodDog === true).forEach(function(dog){

            let span = document.createElement("span")
            span.innerText = dog.name
            span.addEventListener("click", displayDog)
            div.appendChild(span)
        })

    }else{
        data.forEach(function(dog){

            let span = document.createElement("span")
            span.innerText = dog.name
            span.addEventListener("click", displayDog)
            div.appendChild(span)
        })
    }
    
    


}

function displayDog(event){
    
    let divInfo = document.querySelector("#info-dog")
    divInfo.innerText = ''
    let dogName = event.target.innerText
    let dogObj = allDogs.filter(dog => dog.name === dogName)[0]
    let dogImg = dogObj.image
    let img = document.createElement("img")
    img.src = dogImg
    let h4 = document.createElement("h4")
    h4.innerText = dogName
    let goodBtn = document.createElement("button")
    goodBtn.innerText = "Good Dog!"
    dogId = dogObj.id

    goodBtn.addEventListener("click", goodDog)
    divInfo.append(img, h4, goodBtn)
    

    console.log(dogObj)

}

function goodDog(event){
    let id = dogId
    fetch(`http://localhost:3000/pups/${id}`, {
    
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            isGoodDog: true
        })
    
    
    })
}



