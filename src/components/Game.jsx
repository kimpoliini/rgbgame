import React, { useEffect, useRef, useState } from "react"
import Generator from "./Generator"
import Upgrade from "./Upgrade"
import "./game.css"
import { useInterval } from "../js/interval.jsx"
import { redToRgb, rgbToRed, buy } from "../js/colorCalc.jsx"
import { generators } from  "../js/generators.js"
import { upgrades } from "../js/upgrades.js"
import { generatorUpgrades } from "../js/generatorUpgrades"
import { handleUpgrade } from "../js/upgradeHandler.jsx"
import { values } from "../js/values.js"
import { useCookies } from "react-cookie"

function Game(){
    
    //cookies
    const [cookies, setCookie, removeCookie] = useCookies([])

    //menus
    const [isLeftOpen, setIsLeftOpen] = useState(false)
    const [isRightOpen, setIsRightOpen] = useState(false)
    
    //fps
    const [intervalValue, setIntervalValue] = useState(33.3)
    const [currentInterval, setCurrentInterval] = useState(intervalValue)
    
    //game
    const [elements, setElements] = useState({
        main: null, header: null
    })
    const [color, setColor] = useState({r: 0, g: 0, b: 0})
    
    //click
    const [clickValueRed, setClickValueRed] = useState(values.clickValue*1)
    const [clickValueRgb, setClickValueRgb] = useState([0,0,0])
    
    //rps
    const [rps, setRps] = useState(0)
    const [rpt, setRpt] = useState(0)
    const [rgbps, setRgbps] = useState([0,0,0])
    const [rgbpt, setRgbpt] = useState([0,0,0])
    
    //game
    const [isActive, setIsActive] = useState(true)

    //stats
    const [stats, setStats] = useState({
        generatorCount: 0, upgradeCount: 0, totalMultiplier: 1
    })

    //load game
    useEffect(() => {
        setElements({main: document.querySelector('.square'), 
        header: document.querySelector(".App-header")})
        
        //things i need to know because im too lazy to check manually
        console.log(generatorUpgrades.length + upgrades.length + " total upgrades")

        //Checks if there is any saved data before trying to load it
        if(cookies.values){
            //loads all values from values.js
            for(const property in cookies.values){
                values[property] = cookies.values[property]
            }
        } else {
            console.log("welcome!")
        }
         
        //Checks if there are any bought generators before trying to load them
        if(cookies.generators){
            //loads all generators from generators.js
            generators.forEach((gen, i) => {
                for(const property in cookies.generators[i]){
                    gen[property] = cookies.generators[i][property]
                }
            })
        }

        //Checks if there are any upgrades bought before trying to load them
        if(cookies.upgrades){
            upgrades.forEach((upgrade, i) => {
                if(cookies.upgrades[i] != null){
                    upgrade.bought = cookies.upgrades[i].bought
                } else {
                    upgrade.bought = false
                }
            })
            onUpgrade()
        }

        calculateStats()
        checkRgb()
    }, [])
    
    //Checks if the window is active or not
    document.addEventListener('visibilitychange', () => {
        if(document.hidden){
            setIsActive(false)
        } else {
            setIsActive(true)
        }
    })
    
    //intervals
    
    //save the game once every half minute
    useInterval(() => {
        
        //Loops through generators and saves how many are bought
        //and how much they currently cost
        let generatorData = []
        generators.forEach((gen, i) => {
            generatorData.push({})
            for(const property in generators[i]){
                if(property === "count" || property === "price"){
                    generatorData[i][property] = generators[i][property]
                }
            }
        })
        
        //Loops through upgrades and saves how many are bought
        let upgradeData = []
        upgrades.forEach((upgrade, i) => {
            upgradeData.push({})
            upgradeData[i].bought = upgrade.bought
        })
        
        setCookie('values', values)
        setCookie('generators', generatorData)
        setCookie('upgrades', upgradeData)

        console.log("saved")
    }, 10000)
    
    //increments rgb each tick
    useInterval(() => {
        if(rps > 0){
            incrementRgb(rgbpt)
        }  
    }, currentInterval)
    
    //how often the bg changes
    useInterval(() => {
        elements.main.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`
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
        if(!document.hidden){
            setRpt(rps/(1000/currentInterval))
        } else {
            setRpt(rps)
        }
        setRgbps(redToRgb(rps))
    }, [rps, intervalValue, isActive])
    
    //set rgbpt every time rpt changes
    useEffect(() => {
        setRgbpt(redToRgb(rpt))
    }, [rpt])
    
    //updates the background color to color values after loading the game, probably not necessary
    useEffect(() => {
        if(elements.main != null){
            elements.main.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`
        }
    }, [elements.main])
    
    function checkCanAfford(){
        const c = values.color
        
        generators.forEach((gen, i) => {
            if(rgbToRed(Object.assign({}, gen.price)) > rgbToRed([c[0], c[1], c[2]])){
                document.querySelector(`#generator-${i}`).classList.add("cannot-afford")
            }else {
                document.querySelector(`#generator-${i}`).classList.remove("cannot-afford")
            }
        })
        upgrades.forEach((upgrade, i) => {
            if(upgrade.bought){
                return
            }

            const upgradeElement = document.querySelector(`#upgrade-${i}`)

            if(upgradeElement){   
                if(rgbToRed(Object.assign({}, upgrade.price)) > rgbToRed([c[0], c[1], c[2]])){
                    upgradeElement.classList.add("cannot-afford")
                }else {
                    upgradeElement.classList.remove("cannot-afford")
                }
            }
        })
    }
    
    function incrementRgb(rgb){
        const c = values.color
        values.color = [c[0] + rgb[0], c[1] + rgb[1], c[2] + rgb[2]]
        checkRgb()
    }
    
    function checkRgb(){
        let c = values.color
        if(c[0] >= 256){
            values.color = [c[0] - 256, c[1] + 1, c[2]]
        }
        
        if(c[1] >= 256){
            values.color = [c[0], c[1] - 256, c[2] + 1]
        }
        
        //update numbers
        c = values.color
        setColor({r: c[0], g: c[1], b: c[2]})
    }
    
    function calculateStats(){
        let rps = 0
        let vertices = 0
        let genCount = 0
        generators.forEach((gen, i) => {
                rps += (gen.count * gen.baseRps)
                vertices += (gen.count * gen.vertices)
                genCount += gen.count
        })
        values.vertices = vertices
        
        let upgradeCount = 0
        upgrades.forEach((upgrade, i) => {
            if(upgrade.bought){
                upgradeCount++
            }
        })
        
        let mult = values.rpsMultiplier
        let clickMult = values.clickMultiplier

        if(vertices > 0){
            mult *= 1 + (vertices * values.vertexRpsMultiplier)
            clickMult *= 1 + (vertices * values.vertexClickMultiplier)
        }

        let totalClickValue = (values.clickValue + (vertices * values.clickValuePerVertex)) * clickMult

        setClickValueRed(totalClickValue)
        setRps(rps * mult)
        setStats({generatorCount: genCount, upgradeCount: upgradeCount, totalMultiplier: mult})
    }
    
    function onUpgrade(){
        checkRgb()
        checkCanAfford()
        calculateStats()
    }
    
    function onClick(e) {
        const text = document.createElement("span")
        const headerHeight = elements.header.offsetHeight
        
        text.innerText = clickValueRed
        text.style.position = "absolute"
        text.style.textAlign = "center"
        
        elements.main.appendChild(text)

        //getting pointer location and accounts for header
        const x = e.clientX - text.offsetWidth / 2
        const y = e.clientY - headerHeight - text.offsetHeight * 1.25
        
        text.style.left = `${x}px`
        text.style.top = `${y}px`

        setTimeout(() => { text.remove() }, 900);

        incrementRgb(clickValueRgb)
    }

    //buying generators
    function tryBuy(id){
        const gen = generators[id]
        const price = Object.assign({}, gen.price)
        const c = values.color

        const remainder = buy([c[0], c[1], c[2]], price)

        if(remainder != null){
            values.color = [remainder[0], remainder[1], remainder[2]]
            gen.count += 1
            
            //increase price of the generator when buying
            const priceIncreasePercentage = (112 + id)/100
            gen.price = redToRgb(Math.floor(rgbToRed(price)*priceIncreasePercentage))
            
            calculateStats()
            checkCanAfford()
        }
    }
    
    function tryBuyUpgrade(id){
        const upgrade = upgrades[id]
        const price = Object.assign({}, upgrade.price)
        const c = values.color
        
        const remainder = buy([c[0], c[1], c[2]], price)
        
        if(remainder != null){
            values.color = [remainder[0], remainder[1], remainder[2]]
            handleUpgrade(id, rps)

            upgrade.bought = true
            onUpgrade()
        }
    }

    function openLeft(){
        const lm = document.querySelector('.left-menu')
        const b = document.querySelector('.open-left')

        lm.classList.toggle("hidden-left")

        if(isLeftOpen){
            b.innerText = ">"
        } else {
            b.innerText = "<"
        }
        setIsLeftOpen(!isLeftOpen)
    }
    
    function openRight(){
        const rm = document.querySelector('.right-menu')
        const b = document.querySelector('.open-right')
        
        rm.classList.toggle("hidden-right")
        
        if(isRightOpen){
            b.innerText = "<"
        } else {
            b.innerText = ">"
        }
        setIsRightOpen(!isRightOpen)
    }

     const leftMenu = <div className="left-menu side-menu">
         <div className="left-menu-content menu-content">
             <h4>Upgrades</h4>

             {/* loops through all upgrades and 
             creates an Upgrade component for each */}

            {upgrades.map((upgrade, i) => { 
                if(!upgrade.bought){
                    return <Upgrade key={i} upgradeId={i} onClick={() => tryBuyUpgrade(i)}/>
                } else {
                    return
                }
            })}
         </div>
         <button className="open-left menu-button" onClick={openLeft}>{">"}</button>
     </div>
     
     const rightMenu = <div className="right-menu side-menu">
        <button className="open-right menu-button" onClick={openRight}>{"<"}</button>
         <div className="right-menu-content menu-content">
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
                <p>RGB/s: {rgbps[0].toFixed(2)}, {rgbps[1]}, {rgbps[2]}</p>
                <p>RGB/t: {rgbpt[0]}, {rgbpt[1]}, {rgbpt[2]}</p>
                <p>R/click: {clickValueRed}</p>
            </div>

            <div className="stats bottom-left">
                <p>Total multiplier: {stats.totalMultiplier.toFixed(3)}x</p>
                <p>Total Generators: {stats.generatorCount}</p>
                <p>Vertices: {values.vertices}</p>
                <p>Upgrades purchased: {stats.upgradeCount}</p>
            </div>
        </section>
    )
}

export default Game