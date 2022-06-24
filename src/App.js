import { useEffect, useState } from "react"

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
  
  const checkForColOfFour = () => {
    for (let i = 0; i < 39; i++) {
        const columnOfFour = [i, i+ width, i+width*2, i+width *3]
        const decidedColour = currentColourArrangement[i]

        if(columnOfFour.every(square => currentColourArrangement[square] === decidedColour)) {
          columnOfFour.forEach(square => currentColourArrangement[square] = '')
        }
    }
  }

  const checkForColOfThree = () => {
    for (let i = 0; i < 47; i++) {
        const columnOfThree = [i, i+ width, i+width*2]
        const decidedColour = currentColourArrangement[i]

        if(columnOfThree.every(square => currentColourArrangement[square] === decidedColour)) {
          columnOfThree.forEach(square => currentColourArrangement[square] = '')
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
        }
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
          setCurrentColourArrangement([...currentColourArrangement])
        }, 100)
        return () => clearInterval(timer)
    }, [checkForColOfFour, checkForRowOfFour, checkForColOfThree, checkForRowOfThree, currentColourArrangement])
     
      console.log(currentColourArrangement)

  return (
    <div className="app">
      <div className="game">
        {currentColourArrangement.map((candyColour, index) => (
          <img 
            key={index}
            style={{backgroundColor:candyColour}}
            alt={candyColour}
          />
        ))}
      </div>
    </div>
  );
}

export default App;