import { useEffect, useState } from "react"
import './game.css'
// import Cookies from 'universal-cookie';

const Game = () => {

    
    const [isLeftOpen, setIsLeftOpen] = useState(false)
    const [isRightOpen, setIsRightOpen] = useState(false)

    const [value, setValue] = useState(10)
    const [color, setColor] = useState({
        r: 0, g: 0, b: 0
    })


    //load game
    useEffect(() => {
        // document.querySelector('.square').style.backgroundColor = "#000000"

        

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
        setColor({r: color.r + value, g: color.g, b: color.b})
    }

    function openLeft(open){
        const lm = document.querySelector('.left-menu-content')
        const b = document.querySelector('.open-left')
        if(open){
            lm.style.display = "none"
            b.innerText = ">"
        } else {
            lm.style.display = "block"
            b.innerText = "<"
        }
        setIsLeftOpen(!isLeftOpen)
    }

    function openRight(open){
        const rm = document.querySelector('.right-menu-content')
        const b = document.querySelector('.open-right')
        if(open){
            rm.style.display = "none"
            b.innerText = "<"
        } else {
            rm.style.display = "block"
            b.innerText = ">"
        }
        setIsRightOpen(!isRightOpen)
    }

     const leftMenu = <div className="left-menu side-menu">
         <div className="left-menu-content menu-content">
            <span>hej</span>
            <span>hej</span>
            <span>hej</span>
            <span>hej</span>
            <span>hej</span>
         </div>
         <button className="open-left menu-button" onClick={() => openLeft(isLeftOpen)}>{">"}</button>
     </div>
     
     const rightMenu = <div className="right-menu side-menu">
        <button className="open-right menu-button" onClick={() => openRight(isRightOpen)}>{"<"}</button>
         <div className="right-menu-content menu-content">
             <span>hej</span>
             <span>hej</span>
             <span>hej</span>
             <span>hej</span>
             <span>hej</span>
             </div>
        
        
        </div>

    return (
        <section>
        <div className="square" onClick={onClick}>



        </div>
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
            {leftMenu}
            {rightMenu}
        </section>
    )
}

export default Game