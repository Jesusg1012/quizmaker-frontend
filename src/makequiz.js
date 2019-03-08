const form = document.createElement("div")
form.id = "form"
let questdiv = document.createElement("div")
questdiv.id = "allquestions"
let num = 0
form.innerHTML += "<h1>Make a Quiz</h1>"
form.innerHTML += `<label name='title'><div class='title'>
Title  <input name='title'>
</input><label name="subject">Subject </label><input name="subject"></input><br />
  </div></label>
  <label name="desc">Description</label>
  <input name='desc' id='desc'></input>`
form.append(questdiv)
function makequiz(){
  if(!(body.querySelector("#form"))){
    questdiv.innerHTML = ""
    num = 0
    body.innerHTML = ""
    body.append(form)
    console.log("hi")
    addQuestion()
    addMore()
  }
}
function removeQuestion(event){
  event.remove()
  num -= 1
  changeNums()
}
function addQuestion(){
  questdiv = document.querySelector("#allquestions")
  num += 1
  let newdiv = document.createElement("div")
  newdiv.className = "question"
  newdiv.innerHTML += `<label name="ques${num}">
  Question ${num}</label>
  <input type="textfield" name="ques${num}">
  </input> <div class="minus"><i class="fas fa-minus"></div></i><label name="answer${num}"><div class='answer'>Answer <input type="textfield"  name="answer${num}"></input></label</div>`
  questdiv.append(newdiv)
}

function addMore(){
  let buttdiv = document.createElement("div")
  buttdiv.className = "buttdiv"
  buttdiv.innerHTML = `
  <div class="butt">
    Finished
  </div>
  <div class="butt">
  clear
  </div>
  `
  body.innerHTML += `<div class="add">
  <i class="fas fa-plus"></i>
  </div>`
  body.append(buttdiv)
  body.addEventListener("click", event => {
    if(event.target.className === "add" || event.target.className === "fas fa-plus"){
      addQuestion()
    }
    if(event.target.className === "minus"){
      removeQuestion(event.target.parentNode)
    }
    if(event.target.className === "fas fa-minus"){
      removeQuestion(event.target.parentNode.parentNode)
    }
    if(event.target.innerText === "clear"){
      document.querySelector('#allquestions').innerHTML = ""
      num = 0
      addQuestion()
    }
    if(event.target.innerText === "Finished"){
      submit()
    }
  })
}

function changeNums(){
  let num1 = 1
  let all = document.querySelectorAll(".question")
  all.forEach(quesnumber => {
    let labels = quesnumber.querySelectorAll("label")
    labels.forEach(label => {
      if(label.getAttribute("name").includes("ques")){
        label.setAttribute("name", `ques${num1}`)
        label.innerText = `Question ${num1}`
        label.parentNode.querySelector("input").setAttribute("name", `ques${num1}`)
      }
      if(label.getAttribute("name").includes("answer")){
        label.setAttribute("name", `answer${num1}`)
        label.querySelector("input").setAttribute("name", `answer${num1}`)
      }
    })
    num1+=1
  })
}

function submit(){
  let title = document.querySelector('input[name="title"]').value
  let subject = document.querySelector('input[name="subject"]').value
  let questions = document.querySelectorAll(".question")
  let values = []
  let answers = []
  let numcheck = 1
  let desc = document.querySelector('input[name="desc"]').value
  questions.forEach(question00 => {
    answers.push(question00.querySelector(`input[name='answer${numcheck}']`).value)
    values.push(question00.querySelector("input").value)
    numcheck += 1
  })
  fetch("http://localhost:3000/tests", {
    method: 'POST',
    headers:
    {
      'accept': 'application/json',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      subject: subject,
      description: desc,
      questions: values,
      answers: answers
    })
  })

}
