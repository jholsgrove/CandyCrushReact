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
          checkForColOfThree()
          setCurrentColourArrangement([...currentColourArrangement])
        }, 100)
        return () => clearInterval(timer)
    }, [checkForColOfFour, checkForColOfThree, currentColourArrangement])
     
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