import React, { useEffect, useState } from "react"
import Generator from "./Generator"
import Upgrade from "./Upgrade"
import "./game.css"
import { useInterval } from "../js/interval.jsx"
import { redToRgb } from "../js/colorCalc.jsx"
// import Cookies from 'universal-cookie';

function Game(){

    const [isLeftOpen, setIsLeftOpen] = useState(false)
    const [isRightOpen, setIsRightOpen] = useState(false)
    
    //fps
    const [intervalValue, setIntervalValue] = useState(66.7)

    const [gameElement, setGameElement] = useState()
    const [value, setValue] = useState(123)
    const [color, setColor] = useState({r: 0, g: 0, b: 0})

    //rps
    const [rps, setRps] = useState(0)
    const [rpt, setRpt] = useState(0)
    const [rgbps, setRgbps] = useState([0,0,0])
    const [rgbpt, setRgbpt] = useState([0,0,0])
    
    //intervals

    //increments rgb each tick
    useInterval(() => {
        if(rps > 0){
            incrementRgb(rgbpt)
          }  
      }, intervalValue)

    //how often the bg changes
    useInterval(() => {
        gameElement.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`
    }, 200)
        
    //sets rpt and rgbps every time rps changes
    useEffect(() => {        
        setRpt(rps/(1000/intervalValue))
        setRgbps(redToRgb(rps))
    }, [rps])
    
    //set rgbpt every time rpt changes
    useEffect(() => {
        setRgbpt(redToRgb(rpt))
    }, [rpt])

    //load game
    useEffect(() => {
        setGameElement(document.querySelector('.square'))
    }, [])
    
    //updates the background color to color values after loading the game, probably not necessary
    useEffect(() => {
        if(gameElement != null){
            gameElement.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`
        }
    }, [gameElement])
    
    function increment(red){
        setColor({...color, r: color.r + red})
    }

    function incrementRgb(rgb){
        setColor({r: color.r + rgb[0], g: color.g + rgb[1], b: color.b + rgb[2]})
    }

    //calculate each time the color changes
    useEffect(() => {
        if(color.r >= 256){
            setColor({...color, r: color.r - 256, g: color.g + 1})
        }
        
        if(color.g >= 256){
            setColor({...color, g: color.g - 256, b: color.b + 1})
        }
        
    }, [color])    
    
    function onClick(e) {
        const text = document.createElement("span")

        text.innerText = value
        text.style.position = "absolute"
        text.style.textAlign = "center"

        //getting pointer location and accounts for header
        const x = e.clientX - 12
        const y = e.clientY - 130

        text.style.left = `${x}px`
        text.style.top = `${y}px`
        
        gameElement.appendChild(text)

        setTimeout(() => { text.remove() }, 900);

        setColor({...color, r: color.r + value})
    }

    //buying generators
    function tryBuy(name){
        switch(name){
            case "triangle":
                // console.log("triangle")
                if(color.r >= 27){
                    setRps(rps + 0.25)
                    setColor({...color, r: color.r - 27})
                    // console.log("bought")
                }
                break
            case "square":
                // console.log("square")
                if(color.r >= 100){
                    setRps(rps + 8)
                    setColor({...color, r: color.r - 100})
                    // console.log("bought")
                }
                break
            case "pentagon":
                // console.log("pentagon")
                if(color.r >= 250){
                    setRps(rps + 25)
                    setColor({...color, r: color.r - 250})
                    // console.log("bought")
                }
                break
            default:
                break
        }

    }

    function openLeft(open){
        const lm = document.querySelector('.left-menu-content')
        const b = document.querySelector('.open-left')

        lm.classList.toggle("hidden")

        if(open){
            b.innerText = ">"
        } else {
            b.innerText = "<"
        }
        setIsLeftOpen(!isLeftOpen)
    }

    function openRight(open){
        const rm = document.querySelector('.right-menu-content')
        const b = document.querySelector('.open-right')

        rm.classList.toggle("hidden")

        if(open){
            b.innerText = "<"
        } else {
            b.innerText = ">"
        }
        setIsRightOpen(!isRightOpen)
    }

     const leftMenu = <div className="left-menu side-menu">
         <div className="left-menu-content menu-content hidden">
             <h4>Upgrades</h4>
            <Upgrade name="Paint bucket" 
            description="Your clicks give +1 re" 
            price="100"/>

         </div>
         <button className="open-left menu-button" onClick={() => openLeft(isLeftOpen)}>{">"}</button>
     </div>
     
     const rightMenu = <div className="right-menu side-menu">
        <button className="open-right menu-button" onClick={() => openRight(isRightOpen)}>{"<"}</button>
         <div className="right-menu-content menu-content hidden">
            <h4>Generators</h4>

            <Generator name="Triangle" basePrice="27" baseIncrease="0.25" onClick={() => tryBuy("triangle")}/>
            <Generator name="Square" basePrice="256" baseIncrease="8" onClick={() => tryBuy("square")}/>
            <Generator name="Pentagon" basePrice="3125" baseIncrease="15" onClick={() => tryBuy("pentagon")}/>
            <Generator name="Hexagon" basePrice="46656" baseIncrease="24"/>
            <Generator name="Septagon" basePrice="823543" baseIncrease="35"/>
            <Generator name="Octagon" basePrice="16777216" baseIncrease="248"/>

            <Generator name="Pyramid" basePrice="15" baseIncrease="2"/>
            <Generator name="Cube" basePrice="15" baseIncrease="2"/>
            <Generator name="Dodecahedron" basePrice="15" baseIncrease="2"/>

             </div>
        </div>

    return (
        <section>
        <div className="square" onClick={onClick}></div>
            <div className="color-values">
                <span className="cur-r">
                    {color.r.toFixed(0)}
                </span>
                <span className="cur-g">
                    {color.g}
                </span>
                <span className="cur-b">
                    {color.b}
                </span>
                <p>rps: {rps}</p>
            </div>
            {leftMenu}
            {rightMenu}

            <div className="stats">
                <p>R/t: {rpt.toFixed(2)}</p>
                <p>RGB/s: {rgbps[0]}, {rgbps[1]}, {rgbps[2]}</p>
                <p>RGB/t: {rgbpt[0]}, {rgbpt[1]}, {rgbpt[2]}</p>
            </div>
        </section>
    )
}

export default Game