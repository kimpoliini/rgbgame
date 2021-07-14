import React, { useEffect, useState } from "react"
import Generator from "./Generator"
import Upgrade from "./Upgrade"
import "./game.css"
import { useInterval } from "../js/interval.jsx"
import { redToRgb } from "../js/colorCalc.jsx"
import { generators } from  "../js/generators.js"
// import Cookies from 'universal-cookie';

function Game(){

    //menus
    const [isLeftOpen, setIsLeftOpen] = useState(false)
    const [isRightOpen, setIsRightOpen] = useState(false)
    
    //fps
    const [intervalValue, setIntervalValue] = useState(66.7)

    //game
    const [gameElement, setGameElement] = useState()
    const [color, setColor] = useState({r: 0, g: 0, b: 0})
    
    //click
    const [clickValueRed, setClickValueRed] = useState(100)
    const [clickValueRgb, setClickValueRgb] = useState([0,0,0])

    //rps
    const [rps, setRps] = useState(0)
    const [rpt, setRpt] = useState(0)
    const [rgbps, setRgbps] = useState([0,0,0])
    const [rgbpt, setRgbpt] = useState([0,0,0])
    
    //load game
    useEffect(() => {
        setGameElement(document.querySelector('.square'))
    }, [])

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
        
    useEffect(() => {
        setClickValueRgb(redToRgb(clickValueRed))
    }, [clickValueRed])
    
    //sets rpt and rgbps every time rps changes
    useEffect(() => {        
        setRpt(rps/(1000/intervalValue))
        setRgbps(redToRgb(rps))
    }, [rps])
    
    //set rgbpt every time rpt changes
    useEffect(() => {
        setRgbpt(redToRgb(rpt))
    }, [rpt])

    
    //updates the background color to color values after loading the game, probably not necessary
    useEffect(() => {
        if(gameElement != null){
            gameElement.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`
        }
    }, [gameElement])

    //calculate each time the color changes
    useEffect(() => {
        if(color.r >= 256){
            setColor({...color, r: color.r - 256, g: color.g + 1})
        }
        
        if(color.g >= 256){
            setColor({...color, g: color.g - 256, b: color.b + 1})
        }
        
    }, [color])

    function incrementRgb(rgb){
        setColor({r: color.r + rgb[0], g: color.g + rgb[1], b: color.b + rgb[2]})
    }
    
    function onClick(e) {
        const text = document.createElement("span")
        
        text.innerText = clickValueRed
        text.style.position = "absolute"
        text.style.textAlign = "center"

        //getting pointer location and accounts for header
        const x = e.clientX - 12
        const y = e.clientY - 130

        text.style.left = `${x}px`
        text.style.top = `${y}px`
        
        gameElement.appendChild(text)

        setTimeout(() => { text.remove() }, 900);

        incrementRgb(clickValueRgb)
    }

    //buying generators
    function tryBuy(id){
        const gen = generators[id]

        console.log("tryBuy " + gen.name)
        
        if(color.r >= gen.basePrice[0]){
            setRps(rps + gen.baseRps)
            setColor({...color, r: color.r - gen.basePrice[0]})
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
            description="Your clicks give +1 red" 
            price="100"/>

         </div>
         <button className="open-left menu-button" onClick={() => openLeft(isLeftOpen)}>{">"}</button>
     </div>
     
     const rightMenu = <div className="right-menu side-menu">
        <button className="open-right menu-button" onClick={() => openRight(isRightOpen)}>{"<"}</button>
         <div className="right-menu-content menu-content hidden">
            <h4>Generators</h4>

            <Generator genId="0" onClick={() => tryBuy(0)} />
            <Generator genId="1" onClick={() => tryBuy(1)}/>
            <Generator genId="2" onClick={() => tryBuy(2)}/>
            <Generator genId="3"/>
            <Generator genId="4"/>
            <Generator genId="5"/>

            <Generator genId="6"/>
            <Generator genId="7"/>
            <Generator genId="8"/>

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
                <p>rps: {rps.toFixed(1)}</p>
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