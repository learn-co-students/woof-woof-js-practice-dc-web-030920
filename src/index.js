// var allDogs;
// var dogId = 0
// var filter = false;
// document.addEventListener("DOMContentLoaded", function(){
//     fetchDogs()
//     var filterDiv = document.getElementById("filter-div")
//     var button = filterDiv.querySelector("button")
//     button.addEventListener("click", function(){
//         if(filter){
//             filter = false
//             button.innerText = "Filter good dogs: OFF"
//             fetchDogs()
//         }else{
//             filter = true
//             button.innerText = "Filter good dogs: ON"
//             fetchDogs()
//         }
//     })
    

   


// })

// function fetchDogs(){

//     fetch("http://localhost:3000/pups")
//     .then(resp => resp.json())
//     .then(data => renderDogs(data))

// }

// function renderDogs(data){
//     allDogs = data
//     let div = document.getElementById("dog-bar")
//     div.innerText = ''
//     if (filter){

//         data.filter(dog => dog.isGoodDog === true).forEach(function(dog){

//             let span = document.createElement("span")
//             span.innerText = dog.name
//             span.addEventListener("click", displayDog)
//             div.appendChild(span)
//         })

//     }else{
//         data.forEach(function(dog){

//             let span = document.createElement("span")
//             span.innerText = dog.name
//             span.addEventListener("click", displayDog)
//             div.appendChild(span)
//         })
//     }
    
    


// }

// function displayDog(event){
    
//     let divInfo = document.querySelector("#info-dog")
//     divInfo.innerText = ''
//     let dogName = event.target.innerText
//     let dogObj = allDogs.filter(dog => dog.name === dogName)[0]
//     let dogImg = dogObj.image
//     let img = document.createElement("img")
//     img.src = dogImg
//     let h4 = document.createElement("h4")
//     h4.innerText = dogName
//     let goodBtn = document.createElement("button")
//     goodBtn.innerText = "Good Dog!"
//     dogId = dogObj.id

//     goodBtn.addEventListener("click", goodDog)
//     divInfo.append(img, h4, goodBtn)
    

//     console.log(dogObj)

// }

// function goodDog(event){
//     let id = dogId
//     fetch(`http://localhost:3000/pups/${id}`, {
    
//         method: "PATCH",
//         headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json"
//         },
//         body: JSON.stringify({
//             isGoodDog: true
//         })
    
    
//     })
// }

// =================================================================================

document.addEventListener("DOMContentLoaded", () => {
  
    fetchDogs()
    let filterBtn = document.getElementById("good-dog-filter")
    filterBtn.addEventListener("click", filterDogs)
})
function fetchDogs() {
    const url = "http://localhost:3000/pups"
    fetch(url)
    .then(resp => resp.json())
    // .then(dogsArr => dogsArr.forEach(dog => renderDog(dog)))
    .then(dogsArr => dogsArr.forEach(dogButton)) // if the button === on 
}
function dogButton(dog){ //soccer ball
    const div = document.getElementById("dog-bar"), 
        span = document.createElement("span") //can also make it one const
    span.innerText = dog.name
    div.append(span)
    span.addEventListener("click", (event) => showDog(event, dog)) //kicker
    // add a class to span, so that the class has information about the dog being good or bad 
    if (dog.isGoodDog === true){
        span.classList.add("good")
    } else {
        span.classList.add("bad")
    }
    //theres probably alot of ways to go about this but this is how i did it
    
}
function showDog(event, dog ){ //team mate
    // targeted the div
    const div = document.getElementById("dog-info")
    // created an Img tag
    let imgNode = document.createElement("img")
    imgNode.src = dog.image
    // created an h2 tag
    let h2Node = document.createElement("h2")
    h2Node.innerText = dog.name
    // created a button 
    let btnNode = document.createElement("button")
    if (dog.isGoodDog === true){
        btnNode.innerText = "Good Dog!"
    } else {
        btnNode.innerText = "Bad Dog!"
    }
    // appended everything to the div
    div.append(imgNode,h2Node,btnNode)
    //add event listener to btnNode
    btnNode.addEventListener("click", (event) => changeDogIsGood(event, dog))
}
function changeDogIsGood(event, dog){
    //The button's text should change from Good to Bad or Bad to Good
    if (event.target.innerText === "Bad Dog!"){
        event.target.innerText = "Good Dog!"
        dog.isGoodDog = false // this changes the object boolean for isGoodDog: 'key'
    } else {
        event.target.innerText = "Bad Dog!"
        dog.isGoodDog = true // this changes the object boolean for isGoodDog: 'key'
    }
    //The corresponding pup object in the database should be updated to reflect the new isGoodDog value
    // make a fetch patch request
   
    const obj = {
        isGoodDog: dog.isGoodDog
    }
    const id = dog.id
    const url = `http://localhost:3000/pups/${id}`
    fetch(url,{
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(obj) // body receives an object
    })
}
 function filterDogs(event){//this is the last bonus function
    // if (event.target.innerText === "Filter good dogs: OFF") {
    //     event.target.innerText = "Filter good dogs: ON"
    // } else {
    //     event.target.innerText = "Filter good dogs: OFF"
    // }
    const dogBar = document.getElementById("dog-bar") 
    
    let spansArr = dogBar.querySelectorAll("span") 
    if (this.innerText === "Filter good dogs: OFF") {
        this.innerText = "Filter good dogs: ON" 
        // do the display thing for each span here for good dogs
        spansArr.forEach(span => { 
            if (span.className === "bad") {
                span.style.display = "none" 
            }
        })
    } else {
        this.innerText = "Filter good dogs: OFF"
        // else all spans in node list display = block
        spansArr.forEach(span => span.style.display = "") //"block" displayed weird"
          
    }
  
 }
kkkkk
