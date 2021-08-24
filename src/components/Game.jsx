import React, { useEffect, useRef, useState } from "react"
import Generator from "./Generator"
import Upgrade from "./Upgrade"
import "./game.css"
import { useInterval } from "../js/interval.jsx"
import { redToRgb, rgbToRed, buy } from "../js/colorCalc.jsx"
import { generators, levelThresholds } from  "../js/generators.js"
import { upgrades } from "../js/upgrades.js"
import { generatorUpgrades } from "../js/generatorUpgrades"
import { handleUpgrade } from "../js/upgradeHandler.jsx"
import { values } from "../js/values.js"
import { useCookies } from "react-cookie"
import { options } from "../js/options"
import { click } from "../js/click"

function Game(){
    
    //cookies
    const [cookies, setCookie, removeCookie] = useCookies([])

    //menus
    const [isMenuOpen, setIsMenuOpen] = useState({left: false, right: false})
    
    //fps
    const [framerate, setFramerate] = useState(30)
    
    //game
    const [isActive, setIsActive] = useState(true)
    const [generatorElements, setGeneratorElements] = useState([])
    const [upgradeElements, setUpgradeElements] = useState([])
    const [elements, setElements] = useState({
        main: null, header: null
    })

    const [color, setColor] = useState({r: 0, g: 0, b: 0, p: 0})
    
    //click
    const [clickValueRed, setClickValueRed] = useState(values.clickValue*1)
    const [clickValueRgb, setClickValueRgb] = useState([0,0,0,0])
    
    //rps
    const [rps, setRps] = useState(0)
    const [rpt, setRpt] = useState(0)
    const [rgbps, setRgbps] = useState([0,0,0,0])
    const [rgbpt, setRgbpt] = useState([0,0,0,0])

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
        }

        //Checks if there are option values stored in cookies
        if(cookies.options){
            options.forEach((opt,i) => {
                if(cookies.options[i] != null){
                    opt.value = cookies.options[i].value
                }
            })
        }
        
        onUpgrade()
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
                if(property === "count" || property === "price" || property === "multiplier"){
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

        let optionsData = []
        options.forEach((opt,i) => {
            optionsData.push({})
            optionsData[i].value = opt.value
        })
        
        setCookie('values', values)
        setCookie('generators', generatorData)
        setCookie('upgrades', upgradeData)
        setCookie('options', optionsData)

        console.log("saved")
    }, 10000)
    
    //increments rgb each tick
    useInterval(() => {
        if(rps > 0){
            incrementRgb(rgbpt)
        }
        if(framerate != options[5].value){
            setFramerate(options[5].value)
        }
    }, 1000 / framerate)
    
    //handle background color change
    useInterval(() => {
        let bg = elements.main

        if(rgbps[2] >= 1){
            bg.style.backgroundColor = `rgb(255, 255, ${color.b})`
        } else if(rgbps[1] >= 1){
            bg.style.backgroundColor = `rgb(255, ${color.g}, ${color.b})`
        } else {
            bg.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`
        }
    }, 1000 / options[6].value)
    
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
            setRpt(rps/(1000/(1000/framerate)))
        } else {
            setRpt(rps)
        }
        setRgbps(redToRgb(rps))
    }, [rps, framerate, isActive])
    
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
            if(rgbToRed(Object.assign({}, gen.price)) > rgbToRed([c[0], c[1], c[2], c[3]])){
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
                if(rgbToRed(Object.assign({}, upgrade.price)) > rgbToRed([c[0], c[1], c[2], c[3]])){
                    upgradeElement.classList.add("cannot-afford")
                }else {
                    upgradeElement.classList.remove("cannot-afford")
                }
            }
        })
    }
    
    function incrementRgb(rgb){
        const c = values.color
        values.color = [c[0] + rgb[0], c[1] + rgb[1], c[2] + rgb[2], c[3] + rgb[3]]
        checkRgb()
    }
    
    function checkRgb(){
        let c = values.color
        if(c[0] >= 256){
            values.color = [c[0] - 256, c[1] + 1, c[2], c[3]]
        }
        
        if(c[1] >= 256){
            values.color = [c[0], c[1] - 256, c[2] + 1, c[3]]
        }

        if(c[2] >= 256){
            values.color = [c[0], c[1], c[2] - 256, c[3] + 1]
        }
        
        //update numbers
        c = values.color
        setColor({r: c[0], g: c[1], b: c[2], p: c[3]})
    }
    
    function calculateStats(){
        let rps = 0
        let vertices = 0
        let genCount = 0
        generators.forEach((gen, i) => {
            let genRps = gen.count * gen.baseRps

            //Checks if the current generator has a multiplier
            if(gen.multiplier){
                genRps *= gen.multiplier
            }

            rps += genRps
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
        let totalRps = rps * mult

        setClickValueRed(totalClickValue)
        setRps(totalRps)
        setStats({generatorCount: genCount, upgradeCount: upgradeCount, totalMultiplier: mult})
        values.rps = totalRps

        //Calculate each individual generator's rps
        generators.forEach((gen, i) => {
            gen.rps = gen.baseRps * mult
            if(gen.multiplier){
                gen.rps *= gen.multiplier
            }
        })
    }
    
    function checkMultiplier(){
        let generatorElements = generators.map((gen, i) => {
            return <Generator key={i} genId={i} onClick={() => tryBuy(i)} /> 
        })

        setGeneratorElements(generatorElements)
    }

    function onUpgrade(){
        let upgradeElements = upgrades.map((upgrade, i) => { 
            if(!upgrade.bought){
                return <Upgrade key={i} upgradeId={i} onClick={() => tryBuyUpgrade(i)}/>
            } else {
                return
            }
        })
        setUpgradeElements(upgradeElements)
        
        checkRgb()
        calculateStats()
        checkMultiplier()
    }
    
    function onClick(e) {
        click(e, elements, clickValueRed)
        incrementRgb(clickValueRgb)
    }

    //buying generators
    function tryBuy(id){
        const gen = generators[id]
        const price = Object.assign({}, gen.price)
        const c = values.color

        const remainder = buy([c[0], c[1], c[2], c[3]], price)

        if(remainder != null){
            values.color = [remainder[0], remainder[1], remainder[2], remainder[3]]
            gen.count += 1
            
            let multiplier = 1
            
            for(const i in levelThresholds){
                const t = levelThresholds[i].threshold
                const bonus = levelThresholds[i].bonus

                if(gen.count >= t){
                    multiplier *= bonus
                } else {
                    break
                } 
            }

            gen.multiplier = multiplier

            //increase price of the generator when buying
            const priceIncreasePercentage = (112 + id)/100
            gen.price = redToRgb(Math.floor(rgbToRed(price)*priceIncreasePercentage))
            
            calculateStats()
            checkCanAfford()
            checkMultiplier()
        }
    }
    
    function tryBuyUpgrade(id){
        const upgrade = upgrades[id]
        const price = Object.assign({}, upgrade.price)
        const c = values.color
        const remainder = buy([c[0], c[1], c[2], c[3]], price)

        if(remainder != null){
            values.color = [remainder[0], remainder[1], remainder[2], remainder[3]]
            handleUpgrade(id, values.rps)
            
            upgrade.bought = true
            onUpgrade()
            checkCanAfford()
        }
    }
    
    function openMenu(dir){
        const menu = document.querySelector(`.${dir}-menu`)
        const button = document.querySelector(`.open-${dir}`)

        menu.classList.toggle(`hidden-${dir}`)

        isMenuOpen[dir] ? button.firstChild.innerText = ">" : button.firstChild.innerText = "<"

        setIsMenuOpen({...isMenuOpen, [dir]: !isMenuOpen[dir]})
    }

     const leftMenu = <div className="left-menu side-menu">
         <div className="left-menu-content menu-content">
             <h4>Upgrades</h4>
             {upgradeElements}
         </div>
         <button className="open-left menu-button" onClick={() => openMenu("left")}><span>{">"}</span></button>
     </div>
     
     const rightMenu = <div className="right-menu side-menu">
        <button className="open-right menu-button" onClick={() => openMenu("right")}><span>{">"}</span></button>
         <div className="right-menu-content menu-content">
            <h4>Generators</h4>
            {generatorElements}
             </div>
        </div>

        const leftStats = <div className="stats bottom-right">
            <p>R/t: {rpt.toFixed(2)}</p>
            <p>RGB/s: {rgbps[0].toFixed(2)}, {rgbps[1]}, {rgbps[2]}, {rgbps[3]}</p>
            <p>RGB/t: {rgbpt[0].toFixed(2)}, {rgbpt[1]}, {rgbpt[2]}, {rgbpt[3]}</p>
            <p>R/click: {clickValueRed}</p>
        </div>

        const rightStats = <div className="stats bottom-left">
            <p>Total multiplier: {stats.totalMultiplier.toFixed(3)}x</p>
            <p>Total Generators: {stats.generatorCount}</p>
            <p>Vertices: {values.vertices}</p>
            <p>Upgrades purchased: {stats.upgradeCount}</p>
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
                <span className="cur-p">
                    {color.p}
                </span>
                <p>rps: {rps.toFixed(1)}</p>
            </div>
            {leftMenu}
            {rightMenu}
            {options[4].value ? leftStats : null}
            {options[4].value ? rightStats : null}
        </section>
    )
}

export default Game