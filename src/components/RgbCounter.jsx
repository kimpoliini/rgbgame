import React, { useEffect, useState } from 'react'
import './styles/game.css'
import { handleBigNumber, redToRgb, rgbToRed } from '../js/colorCalc'
import { useInterval } from '../js/interval'
import { options } from '../js/data/options'
import { values } from '../js/data/values'

const RgbCounter = ({ rps }) => {

    const [framerate, setFramerate] = useState(30)
    const [color, setColor] = useState([0, 0, 0, 0])

    useInterval(() => {
        checkColor()

        if (framerate != options[5].currentValue) {
            setFramerate(options[5].currentValue)
        }
    }, 1000 / framerate)

    function checkColor() {
        let c = redToRgb(rgbToRed(values.color))
        c[0] = Math.floor(c[0])
        
        //skips a re-render if color values are the same as the last time it updated
        if (!(c.toString() === color.toString())) setColor(c)
    }

    return (
        <div className={"color-values "}>
            <span className="cur-r">
                {Math.floor(color[0])}
            </span>
            <span className="cur-g">
                {color[1]}
            </span>
            <span className="cur-b">
                {color[2]}
            </span>
            <span className="cur-p">
                {handleBigNumber(color[3])} px
            </span>
            <p>rps: {handleBigNumber((rps).toFixed(1))}</p>
        </div>
    )
}

export default RgbCounter