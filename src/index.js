const mainDiv = document.querySelector("#content")

function getAll(){
  return fetch("http://localhost:3000/tests").then(res => res.json())
}

function getOne(testId) {
  return fetch(`http://localhost:3000/tests/${testId}`).then(res => res.json())
}

function getAnswer(testId) {
  return fetch(`http://localhost:3000/tests/${testId}`).then(res => res.json())
}

function renderSingleTest(testObj) {
  const testTitleUl = document.createElement('ul')
  testTitleUl.classList.add('all-tests')
  testTitleUl.dataset.id = testObj.id

  const testTitleP = document.createElement('p')
  testTitleP.innerText = `${testObj.title} (${testObj.description})`
  testTitleP.addEventListener('click', handleTitleClick)
  // const testDescText = document.createElement('text')
  // testDescText.innerText = testObj.description

  allTestsContainer.append(testTitleUl, testTitleP)
}


function testInfo(data) {
  const ul = document.createElement('ul')

  const titleH5 = document.createElement('h5')
  titleH5.innerText = data.title

  const descText = document.createElement('text')
  descText.innerText = data.description

  const questionsOl = document.createElement('ol')
  data.questions.forEach(test => {
    const eachLis = eachquestionsLi(test)
    questionsOl.append(eachLis)
  })

  const button = document.createElement('button')
  button.innerText = 'SUBMIT'
  button.dataset.id = data.id
  button.addEventListener('click', handleClickSubmit)

  ul.append(titleH5, descText, questionsOl, button)

  return ul
}

function eachquestionsLi(data) {
  const questionLi = document.createElement('li')
  const questionP = document.createElement('p')
  questionP.innerText = data.title


  const input = document.createElement('input')
  input.type = 'text'
  input.dataset.questionId = data.id

  questionLi.append(questionP, input)

  return questionLi
}

function handleTitleClick(e) {
  const oneTestId = event.target.previousElementSibling.dataset.id
  // const oneTestUl = event.target.parentElement.querySelector('.all-tests')
  getOne(oneTestId).then(test => {
    const showPage = testInfo(test)
    allTestsContainer.innerHTML = ''
    showTestContainer.append(showPage)
  })
}

function handleClickSubmit(e) {
  let numCorrect = 0
  const userAnswerLis = event.target.parentElement.querySelector('ol').querySelector('li')
  const testAnswerId = userAnswerLis.querySelector('input').dataset.questionId
  const userAnswerInput = userAnswerLis.querySelector('input').value

  getAnswer(testAnswerId).then(questionsObj => {
    questionsObj.questions.forEach(question => {
      if (question.answer === userAnswerInput) {
        numCorrect += 1;
      }
      console.log(question.answer, userAnswerInput, numCorrect)
    })
  })
}


const allTestsContainer = document.querySelector(".list-test")
const showTestContainer = document.querySelector(".show-test")
const oneTestContainer = document.querySelector('.show-one-test')


getAll().then(tests => {
  tests.forEach(test => {
    renderSingleTest(test)
  })
})




// function printOnScreen(test){
//   mainDiv.innerHTML += `
//   <div> ${test.title}</div>
//   <div> ${test.description}</div>`
// }
