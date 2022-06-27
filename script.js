const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})


function startGame(){
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random()- .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  questionCounter = 0
  setNextQuestion()
  
}

function setNextQuestion(){
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
  que_count++;
  que_numb++;
}

function showQuestion(question){
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText= answer.text
    button.classList.add('btn')
    if(answer.correct){
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click',selectAnswer)
    answerButtonsElement.appendChild(button)
  })

}

function resetState(){
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while(answerButtonsElement.firstChild){
    answerButtonsElement.removeChild
    (answerButtonsElement.firstChild)
    
  }
}

function selectAnswer(e){
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body,correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if(shuffledQuestions.length > currentQuestionIndex +1){
    nextButton.classList.remove('hide')
  } else{
    startButton.innerText = "Restart"
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct){
  clearStatusClass(element)
  if(correct){
    element.classList.add('correct')
  }else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')

}

const questions = [
  {
    question: 'What is 5*5 ?',
    answers: [
      {text: '25', correct:true},
      {text: '10', correct:false},
      {text: '0', correct:false},
      {text: '100', correct:false},
          ]
  },
  {
    question: 'What is 5*5*0 ?',
    answers: [
      {text: '0', correct:true},
      {text: '150', correct:false},
      {text: '10', correct:false},
      {text: '15', correct:false},      
    ]
  },
  {
    question: 'What is 10+8*5 ?',
    answers: [
      {text: '25', correct:false},
      {text: '50', correct:true},
      {text: '7', correct:false},
      {text: '90', correct:false},
    ]
  },
  {
    question: 'What is 10*10*10/5 ?',
    answers: [
      {text: '200', correct:true},
      {text: '10', correct:false},
      {text: '1000', correct:false},
      {text: '90', correct:false},
    ]
  },
]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 4

startGame = () => {
  questionCounter = 0
  score = 0
  avaliableQuestions = [...questions]
  getNewQuestion()
}

getNewQuestion = () => {
  if(avaliableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
    localStorage.setItem('mostRecentScore',score)

    return window.location.assign('/end.html')
  } 

  questionCounter++
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
  progressBarFull.getElementsByClassName.width = `${(questionCounter/MAX_QUESTIONS)*1}%`
  
  const questionsIndex = Math.floor(Math.random() * avaliableQuestions.length)
  currentQuestion = avaliableQuestions[questionsIndex]
  question.innerText = currentQuestion.question

choices.forEach(choice => {
  const number = choice.dataset['number']
  choice.innerText = currentQuestion['choice' + number]
})
availableQuestions.splice(questionsIndex,1)
acceptingAnswers = true
 }

choices.forEach(choice => {
  choice.addEventListener('click', e =>{
    if(!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectAnswer = selectedChoice.dataset['number']

    let classToApply = selectAnswer == currentQuestion.answer ? 'correct':
    'incorrect'
    
    if(classToApply === 'correct') {
      incrementScore(SCORE_POINTS)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()
    },1000)
  })
})

incrementScore = num => {
  score += num
  scoreText.innerText = score
}

startGame()