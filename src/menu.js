document.addEventListener("scroll", menuOpener)
const menu = document.querySelector("#menu")
const menuButton = document.querySelector("#menu-open")
const menuWrapper = document.querySelector("#menu-wrapper")
const body = document.querySelector("#content")
menu.addEventListener("mouseover", changeColor)
menuWrapper.addEventListener("click", changeContent)
menuButton.addEventListener("mouseover", open)
const div = document.createElement("div")
div.id = "overlay"
div.addEventListener("mouseover", close)
function menuOpener(){
  if(window.scrollY <= 100){
    menu.id = "menu"
    menuWrapper.id = "menu-wrapper"
  }

}
function open(){
  menuWrapper.style.backgroundColor = "rgb(200, 15, 30)"
  if(window.scrollY >= 100){
    div.style.backgroundColor = "rgba(200, 15, 30, .7)"
    menu.id = "menu-fixed-open"
    menu.style.left = '143px'
    menuWrapper.id = "menu-wrapper-fixed"
    document.querySelector("body").append(div)
  }
}
function close(){
  menu.id = "menu"
  menuWrapper.id = "menu-wrapper"
  div.remove()
}

function changeColor(e){
  if(e.target.innerText === "Home"){
    div.style.backgroundColor = "rgba(100, 15, 200, .7)"
    menuWrapper.style.backgroundColor = "rgb(100, 15, 200)"
  }
  if(e.target.innerText === "Browse"){
    div.style.backgroundColor = "rgba(10, 130, 130, .7)"
    menuWrapper.style.backgroundColor = "rgb(10, 130, 150)"
  }
  if(e.target.innerText === "Your quizes"){
    div.style.backgroundColor = "rgba(30, 30, 250, .7)"
    menuWrapper.style.backgroundColor = "rgb(30, 30, 250)"
  }
  if(e.target.innerText === "Make a quiz"){
    div.style.backgroundColor = "rgba(10, 130, 130, .7)"
    menuWrapper.style.backgroundColor = "rgb(10, 130, 150)"
  }
}

function changeContent(e){

  if(e.target.innerText === "Make a quiz"){
    makequiz()
  }
  if(e.target.innerText == "Home"){
    document.querySelector('#allquestions').innerHTML = ""
    num = 0
    body.innerHTML = `<div class="list-test">
    </div>

    <div class="show-test">
    </div>

    <div class='test-result'>
    </div>
  </div>`
  allTestsContainer = document.querySelector(".list-test")
  showTestContainer = document.querySelector(".show-test")
  oneTestContainer = document.querySelector('.show-one-test')
    getAll().then(tests => {
      tests.forEach(test => {
        renderSingleTest(test)
      })
    })
  }
}
