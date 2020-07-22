const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATTIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const restartButton = document.getElementById('restartButton')
const winnigMessageElement = document.getElementById('winningMessage')
const winnigMessageTextElement = document.querySelector('[data-winning-message-text]')
const board = document.getElementById('board')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame(){
  winnigMessageElement.classList.remove('show')
  circleTurn = false
  //it only does a click event once
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.addEventListener('click', handleClick, {once: true})
  })
  setBoardHoverClass()
}

function handleClick(e){
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  //placeMark
  placeMark(cell, currentClass)

  //check for win
  if(checkWin(currentClass)){
    endGame(false)
  }else if(isDraw()){
     //check for draw
    endGame(true)
  }else{
    //switch turns
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(draw){
  if(draw){
    winnigMessageTextElement.innerText = 'Draw!'
  }else{
    winnigMessageTextElement.innerText = `${circleTurn ? "O's " : "X's "} Wins!`
  }

  winnigMessageElement.classList.add('show')
}

function isDraw(){
  return [...cellElements].every(cell =>{
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass){
  cell.classList.add(currentClass)
}

function swapTurns(){
  circleTurn = !circleTurn
}

function setBoardHoverClass(){
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if(circleTurn){
    board.classList.add(CIRCLE_CLASS)
  }else{
    board.classList.add(X_CLASS)
  }

}

function checkWin(currentClass){
  return WINNING_COMBINATTIONS.some(combinations =>{
    return combinations.every(index =>{
      return cellElements[index].classList.contains(currentClass)
    })
  })
}