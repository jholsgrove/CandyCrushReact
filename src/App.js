import { useEffect, useState } from "react"
import blueCandy from './images/blue-candy.png'
import greenCandy from './images/green-candy.png'
import orangeCandy from './images/orange-candy.png'
import purpleCandy from './images/purple-candy.png'
import redCandy from './images/red-candy.png'
import yellowCandy from './images/yellow-candy.png'
import blank from './images/blank.png'

const width = 8
const candyColours = [
  'blue',
  'green',
  'orange',
  'red',
  'yellow',
  'purple'
]


const App = () => {
  const [currentColourArrangement, setCurrentColourArrangement] = useState([])
  const [squareBeingDragged, setSquareBeingDragged] = useState(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
  
  const checkForColOfFour = () => {
    for (let i = 0; i <= 39; i++) {
        const columnOfFour = [i, i+ width, i+width*2, i+width *3]
        const decidedColour = currentColourArrangement[i]

        if(columnOfFour.every(square => currentColourArrangement[square] === decidedColour)) {
          columnOfFour.forEach(square => currentColourArrangement[square] = '')
          return true
        }
    }
  }

  const checkForColOfThree = () => {
    for (let i = 0; i <= 47; i++) {
        const columnOfThree = [i, i+ width, i+width*2]
        const decidedColour = currentColourArrangement[i]

        if(columnOfThree.every(square => currentColourArrangement[square] === decidedColour)) {
          columnOfThree.forEach(square => currentColourArrangement[square] = '')
          return true
        }
    }
  }

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
        const rowOfThree = [i, i+ 1, i+2]
        const decidedColour = currentColourArrangement[i]
        const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]

        if (notValid.includes(i)) continue

        if(rowOfThree.every(square => currentColourArrangement[square] === decidedColour)) {
          rowOfThree.forEach(square => currentColourArrangement[square] = '')
          return true
        }
    }
  }

  
  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
        const rowOfFour = [i, i+ 1, i+2, i+3]
        const decidedColour = currentColourArrangement[i]
        const notValid = [5, 6,7,13, 14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,62,63,64]

        if (notValid.includes(i)) continue

        if(rowOfFour.every(square => currentColourArrangement[square] === decidedColour)) {
          rowOfFour.forEach(square => currentColourArrangement[square] = '')
          return true
        }
    }
  }
  
const moveIntoSquareBelow = () => {
  for (let i = 0; i <= 55 - width; i++) {
    const firstRow = [0,1,2,3,4,5,6,7]
    const isFirstRow = firstRow.includes(i)

    if(isFirstRow && currentColourArrangement[i] === ''){
      let randomColour = Math.floor(Math.random() * candyColours.length)
      currentColourArrangement[i] = candyColours[randomColour]
    }

    if(currentColourArrangement[i + width] === '') {
      currentColourArrangement[i + width] = currentColourArrangement[i]
      currentColourArrangement[i] = ''
    }
  } 
}

const dragStart = (e) => {
  setSquareBeingDragged(e.target)
}

const dragDrop = (e) => {
  setSquareBeingReplaced(e.target)
}

const dragEnd = (e) => {
  const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
  const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

  currentColourArrangement[squareBeingReplacedId] = squareBeingDragged.style.backgroundColor
  currentColourArrangement[squareBeingDraggedId] = squareBeingReplaced.style.backgroundColor

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
      currentColourArrangement[squareBeingReplacedId]  = squareBeingReplaced.style.backgroundColor
      currentColourArrangement[squareBeingDraggedId]  = squareBeingDragged.style.backgroundColor
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
     
      console.log(currentColourArrangement)

  return (
    <div className="app">
      <div className="game">
        {currentColourArrangement.map((candyColour, index) => (
          <img 
            key={index}
            style={{backgroundColor:candyColour}}
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
    </div>
  );
}

export default App;