import React, { useEffect, useRef, useState } from "react"
import Generator from "./Generator"
import Upgrade from "./Upgrade"
import "./game.css"
import { useInterval } from "../js/interval.jsx"
import { redToRgb, rgbToRed, buy } from "../js/colorCalc.jsx"
import { generators } from  "../js/generators.js"
import { upgrades } from "../js/upgrades.js"
import { handleUpgrade } from "../js/upgradeHandler"
import { values } from "../js/values"
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
    const [clickValueRed, setClickValueRed] = useState(values.clickValue)
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
    }, 1000/2)
    
    //checks if you can afford each generator and applies a filter for those you cannot
    useInterval(() => {
        checkCanAfford()
    }, 1000/2) //lower if necessary

    //convertions

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

    function checkCanAfford(){
        generators.forEach((gen, i) => {
            if(rgbToRed(Object.assign({}, gen.price)) > rgbToRed([color.r, color.g, color.b])){
                document.querySelector(`#generator-${i}`).classList.add("cannot-afford")
            }else {
                document.querySelector(`#generator-${i}`).classList.remove("cannot-afford")
            }
        })
        upgrades.forEach((upgrade, i) => {
            if(upgrade.bought){
                return
            }
            if(rgbToRed(Object.assign({}, upgrade.price)) > rgbToRed([color.r, color.g, color.b])){
                document.querySelector(`#upgrade-${i}`).classList.add("cannot-afford")
            }else {
                document.querySelector(`#upgrade-${i}`).classList.remove("cannot-afford")
            }
        })
    }

    function incrementRgb(rgb){
        setColor({r: color.r + rgb[0], g: color.g + rgb[1], b: color.b + rgb[2]})
    }
    
    function onUpgrade(){
        setClickValueRed(values.clickValue * values.clickMultiplier)
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

        //to prevent the basePrice to change in generators.js
        const price = Object.assign({}, gen.price)

        const remainder = buy([color.r, color.g, color.b], price)

        if(remainder != null){
            setRps(rps + gen.baseRps)
            setColor({r: remainder[0], g: remainder[1], b: remainder[2]})
            gen.count += 1

            //increase price of the generator when buying
            const priceIncreasePercentage = (112 + id)/100
            gen.price = redToRgb(Math.floor(rgbToRed(price)*priceIncreasePercentage))

            //add to total vertices
            values.vertices += gen.vertices
        }

    }

    function tryBuyUpgrade(id){
        const upgrade = upgrades[id]
        const price = Object.assign({}, upgrade.price)

        const remainder = buy([color.r, color.g, color.b], price)

        if(remainder != null){
            handleUpgrade(id)
            onUpgrade() //applies multipliers when upgrading
            setColor({r: remainder[0], g: remainder[1], b: remainder[2]})
            upgrade.bought = true
            document.querySelector(`#upgrade-${id}`).remove()
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
            {upgrades.map((upgrade, i) => { 
                return <Upgrade key={i} upgradeId={i} onClick={() => tryBuyUpgrade(i)}/>
            })}
         </div>
         <button className="open-left menu-button" onClick={() => openLeft(isLeftOpen)}>{">"}</button>
     </div>
     
     const rightMenu = <div className="right-menu side-menu">
        <button className="open-right menu-button" onClick={() => openRight(isRightOpen)}>{"<"}</button>
         <div className="right-menu-content menu-content hidden">
            <h4>Generators</h4>
            {/* loops through all generators and 
            creates a Generator component for each */}
            {generators.map((gen, i) => {
            return <Generator key={i} genId={i} onClick={() => tryBuy(i)} />
            })}
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

            <div className="stats bottom-right">
                <p>R/t: {rpt.toFixed(2)}</p>
                <p>RGB/s: {rgbps[0]}, {rgbps[1]}, {rgbps[2]}</p>
                <p>RGB/t: {rgbpt[0]}, {rgbpt[1]}, {rgbpt[2]}</p>
                <p>R/click: {clickValueRed}</p>
            </div>

            <div className="stats bottom-left">
                <p>Total Generators: </p>
                <p>Vertices: {values.vertices}</p>
                <p>Upgrades purchased: </p>
            </div>
        </section>
    )
}

export default Game