const mainDiv = document.querySelector("#content")

function getAll(){
  return fetch("http://localhost:3000/tests")
}

getAll()
.then(res => res.json())
.then(json => {
  json.forEach(printOnScreen)
})

function printOnScreen(test){
  mainDiv.innerHTML += `
  <div> ${test.title}</div>
  <div> ${test.description}</div>`
}
