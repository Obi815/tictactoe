const X_CLASS = 'x'
const CIRCLE_CLASS ='circle'
const WINNING_COMBOS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.querySelector('[data-winning-msg-text]')
let circleTurn

startGame()

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick, {once:true})
    })
    setBoardHoverCLass()   
}

function handleClick(e) {
   //placeMark
   const cell = e.target 
   const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
   placeMark(cell, currentClass)

   //Check For Mark 
   if (checkWin(currentClass)){
   endGame(false)
   }
   // Check For Draw 
   // Switch Turns 
   swapTurns()
   setBoardHoverCLass()
}
function endGame(draw) {
    if (draw) {

    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn =!circleTurn
}

function setBoardHoverCLass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
       board.classList.add(CIRCLE_CLASS) 
    } else {
        board.classList.add(X_CLASS)
    }
}
function checkWin(currentClass){
    return WINNING_COMBOS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}