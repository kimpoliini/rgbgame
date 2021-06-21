import { useEffect, useState } from "react"
import './game.css'

const Game = () => {

    // const [color, setColor] = useState([0,0,0])
    const [value, setValue] = useState(10)
    const [color, setColor] = useState({
        r: 0, g: 0, b: 0
    })

    useEffect(() => {
        document.querySelector('.square').style.backgroundColor = "#000000"
    }, [])
    
    useEffect(() => {
        if(color.r > 255){
            setColor({r: color.r - 255, g: color.g + 1, b: color.b})
        }
        
        if(color.g > 255){
            setColor({r: color.r, g: color.g - 255, b: color.b + 1})
        }
        
        
        document.querySelector('.square').style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`

    }, [color])


    function onClick() {
        console.log("CLICK HELVETE")

        setColor({r: color.r + value, g: color.g, b: color.b})
        
        // if(color.r > 255){
        //     console.log("255")
        //     setColor({r: color.r - 255, g: color.g + 1, b: color.b})
        // }
        


    }


    return (
        <section>
        <div className="square" onClick={onClick}>
            <div className="color-values">
                <span className="cur-r">
                    {color.r}
                </span>
                <span className="cur-g">
                    {color.g}
                </span>
                <span className="cur-b">
                    {color.b}
                </span>
            </div>

        </div>
        </section>
    )
}

export default Game