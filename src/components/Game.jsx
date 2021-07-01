import React, { useRef, useEffect, useState } from "react"
import Generator from "./Generator"
import Upgrade from "./Upgrade"
import './game.css'
// import Cookies from 'universal-cookie';

function Game(){

    
    const [isLeftOpen, setIsLeftOpen] = useState(false)
    const [isRightOpen, setIsRightOpen] = useState(false)
    
    //fps
    const [intervalValue, setIntervalValue] = useState(33.3)

    const [value, setValue] = useState(1)
    const [color, setColor] = useState({r: 0, g: 0, b: 0})

    //temporary
    const [rps, setRps] = useState(0)
    
    //interval
    useInterval(() => {
        if(rps > 0){
            let amountToAdd = (rps/(1000/intervalValue))
            increment(amountToAdd)
          }
          
      }, intervalValue)

      useInterval(() => {
          document.querySelector('.square').style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`
        }, 100)
        
        //load game
        useEffect(() => {
            document.querySelector('.square').style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`
        
    }, [])
    
    function increment(red){
        setColor({r: color.r + red, g: color.g, b: color.b})
    }

    function useInterval(callback, delay) {
        const savedCallback = useRef();
      
        // Remember the latest callback.
        useEffect(() => {
          savedCallback.current = callback;
        }, [callback]);
      
        // Set up the interval.
        useEffect(() => {
          function tick() {
            savedCallback.current();
          }
          if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
          }
        }, [delay]);
      }
      
    //calculate each press/tick
    useEffect(() => {
        if(color.r > 255){
            setColor({r: color.r - 256, g: color.g + 1, b: color.b})
        }
        
        if(color.g > 255){
            setColor({r: color.r, g: color.g - 256, b: color.b + 1})
        }
        
    }, [color])    
    
    function onClick(e) {
        const square = document.querySelector('.square')
        const text = document.createElement("span")

        text.innerText = value
        text.style.position = "absolute"

        //getting pointer location and accounts for header
        const x = e.clientX - 12
        const y = e.clientY - 165

        text.style.left = `${x}px`
        text.style.top = `${y}px`
        
        square.appendChild(text)

        setTimeout(() => {text.remove() }, 900);

        setColor({r: color.r + value, g: color.g, b: color.b})
    }

    //buying generators
    function tryBuy(name){
        switch(name){
            case "triangle":
                console.log("triangle")
                if(color.r >= 27){
                    setRps(rps + 0.25)
                    console.log("bought")
                }
                break
            case "square":
                console.log("square")
                if(color.r >= 100){
                    setRps(rps + 8)
                    console.log("bought")
                }
                break
            case "pentagon":
                console.log("pentagon")
                if(color.r >= 250){
                    setRps(rps + 25)
                    console.log("bought")
                }
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
        </section>
    )
}

export default Game