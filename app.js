const puzzleBoard = document.querySelector('#puzzle')

const solveButton = document.querySelector('#solve-button')
const solutionMessage = document.querySelector('#solution-message')

const squaresCount = 81 //amount of squarest in sudoku 
let submissionArray = []



for (let i = 0; i < squaresCount; i++){
    const squareInput = document.createElement('input')
    squareInput.setAttribute('type', 'number')
    squareInput.setAttribute('min', '0')
    squareInput.setAttribute('max', '9')

    if (
        ((i %  9 == 0 || i % 9 == 1 || i % 9 == 2 || i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && ((i >= 0 && i <= 26) || (i >= 54)) ||
        ((i %  9 == 3 || i % 9 == 4 || i % 9 == 5) && (i >=27 && i <=53)))
    ) {
        squareInput.classList.add('diagonal-section')
    }
    puzzleBoard.appendChild(squareInput)
}



const gridToArray = () => {
    const inputArray = document.querySelectorAll('input')
    let correctFlag = true;
    inputArray.forEach(input => {
        if (input.value) {
            if (input.value <=9 && input.value >= 1) {
                input.setAttribute("style", "background-image:none;")
                submissionArray.push(input.value)
            } else {
                input.setAttribute("style", "background-image:linear-gradient(to bottom, red, red);")
                correctFlag = false;
            }
        } else {
            submissionArray.push('.')
        }
    })
    return correctFlag
}

const fillValues = (isSolvable, solution) => {
    const squaresArray = document.querySelectorAll('input')
    if(isSolvable && solution) {
        squaresArray.forEach((square, index) => {
            square.value = solution[index]
        })
        solutionMessage.innerHTML = "Sudoku solved!"
    } else {
        solutionMessage.innerHTML = "Impossible to solve :("
    }

}





const solve = () => {
    if (!gridToArray()) {               //if inputted forbidden number
        solutionMessage.innerHTML = "Wrong numbers! Input correct values!" 
        inputArray = []
        submissionArray= []
    } else {
        const data = { numbers: submissionArray.join("")}
    console.log('data', data)

    fetch('http://localhost:8000/solve', {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        fillValues(data.solvable, data.solution)
        submissionArray = []
    })
    .catch((error) => {
        console.error('Error:', error)
    })
    }
    
}


solveButton.addEventListener('click', solve)