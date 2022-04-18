import React, { useEffect, useState } from 'react'
import './styles/game.css'
import { handleBigNumber, redToRgb, rgbToRed } from '../js/colorCalc'
import { useInterval } from '../js/interval'
import { options } from '../js/data/options'
import { values } from '../js/data/values'

const RgbCounter = ({ rps }) => {

    const [framerate, setFramerate] = useState(30)
    const [color, setColor] = useState({ r: 0, g: 0, b: 0, p: 0 })

    useInterval(() => {
        checkColor()

        if(framerate != options[5].value){
            setFramerate(options[5].value)
        }
    }, 1000 / framerate)

    function checkColor() {
        let c = redToRgb(rgbToRed(values.color))
        c[0] = Math.floor(c[0])
        // values.color = c

        //skips a re-render if color values are the same as the last time it updated
        if(!(c[0] == color.r && c[1] == color.g && c[2] == color.b && c[3] == color.p)){
            setColor({ r: c[0], g: c[1], b: c[2], p: c[3] })
        }
    }

    return (
        <div className={"color-values "}>
            <span className="cur-r">
                {Math.floor(color.r)}
            </span>
            <span className="cur-g">
                {color.g}
            </span>
            <span className="cur-b">
                {color.b}
            </span>
            <span className="cur-p">
                {handleBigNumber(color.p)} px
            </span>
            <p>rps: {handleBigNumber((rps).toFixed(1))}</p>
        </div>
    )
}

export default RgbCounter