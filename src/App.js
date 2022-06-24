import { useEffect, useState, useCallback } from "react"
import ScoreBoard from "./components/ScoreBoard"
import blueCandy from './images/blue-candy.png'
import greenCandy from './images/green-candy.png'
import orangeCandy from './images/orange-candy.png'
import purpleCandy from './images/purple-candy.png'
import redCandy from './images/red-candy.png'
import yellowCandy from './images/yellow-candy.png'
import blank from './images/blank.png'

const width = 8
const candyColours = [
  blueCandy,
  greenCandy,
  orangeCandy,
  redCandy,
  yellowCandy,
  purpleCandy
]

const App = () => {
  const [currentColourArrangement, setCurrentColourArrangement] = useState([])
  const [squareBeingDragged, setSquareBeingDragged] = useState(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
  const [scoreDisplay, setScoreDisplay] = useState(0)
  
  const checkForColOfFour = useCallback(() => {
    for (let i = 0; i <= 39; i++) {
        const columnOfFour = [i, i + width, i  + width * 2, i + width * 3]
        const decidedColour = currentColourArrangement[i]
        const isBlank = currentColourArrangement[i] === blank

        if(columnOfFour.every(square => currentColourArrangement[square] === decidedColour && !isBlank)) {
          setScoreDisplay((score) => score + 4)
          columnOfFour.forEach(square => currentColourArrangement[square] = blank)
          return true
        }
    }
  }, [currentColourArrangement])

  const checkForRowOfFour = useCallback(() => {
    for (let i = 0; i < 64; i++) {
        const rowOfFour = [i, i+ 1, i+2, i+3]
        const decidedColour = currentColourArrangement[i]
        const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
        const isBlank = currentColourArrangement[i] === blank

        if (notValid.includes(i)) continue

        if(rowOfFour.every(square => currentColourArrangement[square] === decidedColour && !isBlank)) {
          setScoreDisplay((score) => score + 4)
          rowOfFour.forEach(square => currentColourArrangement[square] = blank)
          return true
        }
    }
  }, [currentColourArrangement])

const checkForColOfThree = useCallback(() => {
    for (let i = 0; i <= 47; i++) {
        const columnOfThree = [i, i+ width, i+width*2]
        const decidedColour = currentColourArrangement[i]
        const isBlank = currentColourArrangement[i] === blank

        if(columnOfThree.every(square => currentColourArrangement[square] === decidedColour && !isBlank)) {
          setScoreDisplay((score) => score + 3)
          columnOfThree.forEach(square => currentColourArrangement[square] = blank)
          return true
        }
    }
  }, [currentColourArrangement])

  const checkForRowOfThree = useCallback(() => {
    for (let i = 0; i < 64; i++) {
        const rowOfThree = [i, i+ 1, i+2]
        const decidedColour = currentColourArrangement[i]
        const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
        const isBlank = currentColourArrangement[i] === blank

        if (notValid.includes(i)) continue

        if(rowOfThree.every(square => currentColourArrangement[square] === decidedColour && !isBlank)) {
          setScoreDisplay((score) => score + 3)
          rowOfThree.forEach(square => currentColourArrangement[square] = blank)
          return true
        }
    }
  }, [currentColourArrangement])
  
  const moveIntoSquareBelow = useCallback(() => {
    for (let i = 0; i <= 55; i++) {
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
        const isFirstRow = firstRow.includes(i)

        if (isFirstRow && currentColourArrangement[i] === blank) {
            let randomNumber = Math.floor(Math.random() * candyColours.length)
            currentColourArrangement[i] = candyColours[randomNumber]
        }

        if ((currentColourArrangement[i + width]) === blank) {
            currentColourArrangement[i + width] = currentColourArrangement[i]
            currentColourArrangement[i] = blank
        }
    }
}, [currentColourArrangement])

const dragStart = (e) => {
  setSquareBeingDragged(e.target)
}

const dragDrop = (e) => {
  setSquareBeingReplaced(e.target)
}

const dragEnd = (e) => {
  const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
  const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

  currentColourArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
  currentColourArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')

  const validMoves = [
    squareBeingDraggedId - 1,
    squareBeingDraggedId - width,
    squareBeingDraggedId + 1,
    squareBeingDraggedId + width
  ]

  const validMove = validMoves.includes(squareBeingReplacedId)
  const isColOfFour = checkForColOfFour()
  const isRowOfFour = checkForRowOfFour()
  const isColOfThree = checkForColOfThree()
  const isRowOfThree = checkForRowOfThree()

  if(squareBeingReplacedId && 
    validMove && 
    (isColOfFour || isRowOfFour || isColOfThree || isRowOfThree)) {
    setSquareBeingDragged(null)
    setSquareBeingReplaced(null)
    } else {
      currentColourArrangement[squareBeingReplacedId]  = squareBeingReplaced.getAttribute('src')
      currentColourArrangement[squareBeingDraggedId]  = squareBeingDragged.getAttribute('src')
      setCurrentColourArrangement([...currentColourArrangement])
    }
}

  const createBoard = () =>  {
        const randomColourArrangement = []  
        for (let i = 0; i < width * width; i++) {
          const randomColour = candyColours[Math.floor(Math.random() * candyColours.length)]
          randomColourArrangement.push(randomColour)
        }
        setCurrentColourArrangement(randomColourArrangement)
      }

      useEffect(() => {
        createBoard()
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
          checkForColOfFour()
          checkForRowOfFour()
          checkForColOfThree()
          checkForRowOfThree()
          moveIntoSquareBelow()
          setCurrentColourArrangement([...currentColourArrangement])
        }, 100)
        return () => clearInterval(timer)
    }, [checkForColOfFour, checkForRowOfFour, checkForColOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColourArrangement])
     
  return (
    <div className="app">
      <div className="game">
        {currentColourArrangement.map((candyColour, index) => (
          <img 
            key={index}
            src={candyColour}
            alt={candyColour}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
      <ScoreBoard score = {scoreDisplay}/>
    </div>
  )
}

export default App;