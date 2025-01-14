import React, { useEffect, useRef, useState } from "react"
import Generator from "./Generator"
import Upgrade from "./Upgrade"
import "./styles/game.css"
import "./styles/effects.css"
import { useInterval } from "../js/interval.jsx"
import { redToRgb, rgbToRed, handleBigNumber } from "../js/colorCalc.jsx"
import { generators } from "../js/data/generators.js"
import { upgrades } from "../js/data/upgrades.js"
import { generatorUpgrades } from "../js/data/generatorUpgrades"
import { values } from "../js/data/values.js"
import { useCookies } from "react-cookie"
import { options } from "../js/data/options"
import { click } from "../js/click"
import Notification from "./Notification"
import SideMenu from "./SideMenu"
import RgbCounter from "./RgbCounter"

function Game() {

    //cookies
    const [cookies, setCookie, removeCookie] = useCookies([])

    //menus
    const [isMenuOpen, setIsMenuOpen] = useState({ left: false, right: false })

    //fps
    const [framerate, setFramerate] = useState(30)

    //game
    const [isActive, setIsActive] = useState(true)
    const [generatorElements, setGeneratorElements] = useState([])
    const [upgradeElements, setUpgradeElements] = useState([])
    const [elements, setElements] = useState({
        main: null, header: null, background: null, container: null, transformContainer: null
    })

    const [sideLength, setSideLength] = useState(0)

    const [color, setColor] = useState([0, 0, 0, 0])

    //click
    const [clickValueRed, setClickValueRed] = useState(values.clickValue * 1)
    const [clickValueRgb, setClickValueRgb] = useState([0, 0, 0, 0])

    //rps
    const [rps, setRps] = useState(0)
    const [rpt, setRpt] = useState(0)
    const [rgbps, setRgbps] = useState([0, 0, 0, 0])
    const [rgbpt, setRgbpt] = useState([0, 0, 0, 0])

    //stats
    const [stats, setStats] = useState({
        generatorCount: 0, upgradeCount: 0, totalMultiplier: 1
    })

    //notifications
    const [notifs, setNotifs] = useState([])

    //load game
    useEffect(() => {
        setElements({
            main: document.querySelector('.the-square'),
            header: document.querySelector(".App-header"),
            background: document.querySelector(".background"),
            container: document.querySelector(".square-container"),
            transformContainer: document.querySelector(".square-transform-container")
        })

        //things i need to know because im too lazy to check manually
        console.log(generatorUpgrades.length + upgrades.length + " total upgrades")

        //Checks if there is any saved data before trying to load it
        if (cookies.values) {
            //loads all values from values.js
            for (const property in cookies.values) {
                values[property] = cookies.values[property]
            }
        } else {
            console.log("welcome!")
        }

        //Checks if there are any bought generators before trying to load them
        if (cookies.generators) {
            generators.forEach((gen, i) => {
                if (cookies.generators[i].amount) gen.amount = cookies.generators[i].amount
            })
        }

        //Checks if there are any upgrades bought or have ranks before trying to load them
        if (cookies.upgrades) {
            upgrades.forEach((upgrade, i) => {
                if (cookies.upgrades[i] != null) {
                    upgrade.bought = Boolean(cookies.upgrades[i].bought)
                    if (upgrade.bought) return

                    if (cookies.upgrades[i].rank) upgrade.rank = cookies.upgrades[i].rank
                }
            })
        }

        //Checks if there are option values stored in cookies
        if (cookies.options) {
            options.forEach((opt, i) => {
                if (cookies.options[i] != null) opt.currentValue = cookies.options[i].currentValue
            })
        }

        //Initial check to make sure the square has any size
        setSideLength(document.querySelector(".background").offsetHeight / 3)

        onUpgrade()
    }, [])

    //Checks if the window is active or not
    document.addEventListener('visibilitychange', () => setIsActive(document.hidden))

    window.addEventListener('resize', () => {
        if (elements.background) {
            setSideLength(elements.background.offsetHeight / 3)
        }
    })

    //intervals

    //save the game once every half minute
    useInterval(() => {
        //Loops through generators and saves how many are bought
        let generatorData = []
        generators.forEach((gen, i) => {
            generatorData.push({})
            generatorData[i].amount = generators[i].amount
        })

        //Loops through upgrades and saves how many are bought or have ranks
        let upgradeData = []
        upgrades.forEach((upgrade, i) => {
            upgradeData.push({})
            upgradeData[i].bought = upgrade.bought
            if (upgrade.bought) return
            if (upgrade.rank) upgradeData[i].rank = upgrade.rank
        })

        let optionsData = []
        options.forEach((opt, i) => {
            optionsData.push({})
            optionsData[i].currentValue = opt.currentValue
        })

        setCookie('values', values)
        setCookie('generators', generatorData)
        setCookie('upgrades', upgradeData)
        setCookie('options', optionsData)

        console.log("saved")
        addNotification("Saved")
    }, 6000)

    //increments rgb each tick
    useInterval(() => {
        if (rps > 0) {
            incrementRgb(rgbpt)
        }
        if (framerate !== options[5].currentValue) {
            setFramerate(options[5].currentValue)
        }
    }, 1000 / framerate)

    //handle background color change
    useInterval(() => {
        let bg = elements.main

        let c = redToRgb(rgbToRed(values.color))

        if (rgbps[2] >= 1) {
            bg.style.backgroundColor = `rgb(255, 255, ${c[2]})`
        } else if (rgbps[1] >= 1) {
            bg.style.backgroundColor = `rgb(255, ${c[1]}, ${c[2]})`
        } else {
            bg.style.backgroundColor = `rgb(${c[0]}, ${c[1]}, ${c[2]})`
        }
    }, 1000 / options[6].currentValue)

    //checks if you can afford each generator and applies a filter for those you cannot
    useInterval(() => {
        checkCanAfford()
    }, 1000 / 2) //lower if necessary

    //conversions
    useEffect(() => {
        setClickValueRgb(redToRgb(clickValueRed))
    }, [clickValueRed])

    //sets rpt and rgbps every time rps changes
    useEffect(() => {
        if (!document.hidden) {
            setRpt(rps / (1000 / (1000 / framerate)))
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
        if (elements.main != null) {
            elements.main.style.backgroundColor = `rgb(${color.slice(0, 3).join(",")})`
        }
    }, [elements.main])

    function checkCanAfford() {
        const c = values.color

        generators.forEach((gen, i) => {
            if (rgbToRed(gen.price) > rgbToRed(c)) {
                document.querySelector(`#generator-${i}`).classList.add("cannot-afford")
            } else {
                document.querySelector(`#generator-${i}`).classList.remove("cannot-afford")
            }
        })

        upgrades.forEach((upgrade, i) => {
            if (upgrade.bought) return

            const upgradeElement = document.querySelector(`#upgrade-${i}`)

            if (upgradeElement) {
                if (rgbToRed(upgrade.price) > rgbToRed(c)) {
                    upgradeElement.classList.add("cannot-afford")
                } else {
                    upgradeElement.classList.remove("cannot-afford")
                }
            }
        })
    }

    function incrementRgb(rgb) {
        const c = values.color
        values.color = [c[0] + rgb[0], c[1] + rgb[1], c[2] + rgb[2], c[3] + rgb[3]]
    }

    function calculateStats() {
        let rps = 0, vertices = 0, generatorCount = 0, upgradeCount = 0

        generators.forEach(gen => {
            rps += gen.rpsTotal
            vertices += (gen.amount * gen.vertices)
            generatorCount += gen.amount
        })

        upgrades.forEach(upgrade => {
            if (upgrade.rank) upgradeCount += upgrade.rank
        })

        let totalMultiplier = values.rpsMultiplier * (1 + (vertices * values.vertexRpsMultiplier))
        let clickMult = values.clickMultiplier * (1 + (vertices * values.vertexClickMultiplier))
        let totalClickValue = (values.clickValue + (vertices * values.clickValuePerVertex)) * clickMult

        setClickValueRed(totalClickValue)
        setRps(rps)
        setStats({ generatorCount, upgradeCount, totalMultiplier })

        values.rps = rps
        values.vertices = vertices
    }

    function checkMultiplier() {
        let generatorElements = generators.map((gen, i) => {
            return <Generator key={i} genId={i} onClick={() => tryBuyGenerator(i)} />
        })

        setGeneratorElements(generatorElements)
    }

    function onUpgrade() {
        //Sorts upgrades by price and adds them to the list
        const sortedUpgrades = [...upgrades].sort((a, b) => {
            let aPrice = rgbToRed(a.price)
            let bPrice = rgbToRed(b.price)
            return aPrice - bPrice
        })

        let upgradeElements = sortedUpgrades.map((upgrade, i) => {
            //Gets the index of the upgrade from upgrades.js
            const index = upgrades.indexOf(upgrade)

            if (!upgrade.bought) {
                return <Upgrade key={index} upgradeId={index} onClick={() => tryBuyUpgrade(index)} />
            }
        })

        setUpgradeElements(upgradeElements)

        calculateStats()
        checkMultiplier()
    }

    function onClick(e) {
        click(e, elements, clickValueRed)
        incrementRgb(clickValueRgb)
    }

    function addNotification(text, important = false) {
        const notif = <Notification text={text} important={important} key={text} />

        setNotifs([notif])
        setTimeout(() => {
            setNotifs([])
        }, important ? 4000 : 2500);
    }

    //buying generators
    function tryBuyGenerator(id) {
        const remainder = generators[id].buyGenerator(values.color)
        if (remainder != null) values.color = remainder

        calculateStats()
        checkCanAfford()
        checkMultiplier()
    }

    //buying upgrades
    function tryBuyUpgrade(id) {
        const remainder = upgrades[id].buyUpgrade(values.color)
        if (remainder != null) values.color = remainder

        onUpgrade()
        checkCanAfford()
    }

    function openMenu(dir) {
        const menu = document.querySelector(`.${dir}-menu`)
        const button = document.querySelector(`.open-${dir}`)

        menu.classList.toggle(`hidden-${dir}`)

        if (isMenuOpen[dir]) {
            dir === "left" ? button.firstChild.innerText = ">" : button.lastChild.innerText = ">"
        } else {
            dir === "left" ? button.firstChild.innerText = "<" : button.lastChild.innerText = "<"
        }

        setIsMenuOpen({ ...isMenuOpen, [dir]: !isMenuOpen[dir] })
    }

    const leftStats = <div className="stats bottom-right">
        <p>R/t: {rpt.toFixed(2)}</p>
        <p>RGB/s: {rgbps[0].toFixed(2)}, {rgbps[1]}, {rgbps[2]}, {rgbps[3]}</p>
        <p>RGB/t: {rgbpt[0].toFixed(2)}, {rgbpt[1]}, {rgbpt[2]}, {rgbpt[3]}</p>
        <p>R/click: {clickValueRed.toFixed(2)}</p>
    </div>

    const rightStats = <div className="stats bottom-left">
        <p>Total multiplier: {stats.totalMultiplier.toFixed(3)}x</p>
        <p>Total Generators: {stats.generatorCount}</p>
        <p>Vertices: {values.vertices}</p>
        <p>Upgrades purchased: {stats.upgradeCount}</p>
    </div>

    const theSquare = <div className="the-square square-clip" onClick={onClick}
        style={{
            height: (sideLength > 160 ? sideLength : 160) + "px",
            width: (sideLength > 160 ? sideLength : 160) + "px"
        }}>
    </div>

    return (
        <section>
            <div className="background"></div>
            <RgbCounter rps={rps} />

            <div className="square-container">
                <div className="square-transform-container">

                    {theSquare}
                </div>
            </div>

            <SideMenu direction={"left"} list={upgradeElements} callback={(d) => openMenu(d)} />
            <SideMenu direction={"right"} list={generatorElements} callback={(d) => openMenu(d)} />
            {options[4].currentValue ? leftStats : null}
            {options[4].currentValue ? rightStats : null}
            {notifs}
        </section>
    )
}

export default Game