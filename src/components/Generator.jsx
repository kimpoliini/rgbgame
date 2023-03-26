import { useEffect, useState } from "react"
import "./styles/sideMenuItems.css"
import { generators, levelThresholds } from "../js/data/generators.js"
import { options } from "../js/data/options"
import { handleBigNumber } from "../js/colorCalc"

const Generator = ({ onClick, genId }) => {
    const gen = generators[genId]

    const [width, setWidth] = useState(0)
    const [levelIndex, setLevelIndex] = useState(0)
    const [image, setImage] = useState(gen.image)

    useEffect(() => {
        onBuy()
    }, [])

    //Makes sure the progress bar to the next level has the correct width
    function onBuy() {
        levelThresholds.some((current, i) => {
            const t = current[0]
            let prevT = 0

            if (i > 0) prevT = levelThresholds[i - 1][0]

            if (gen.amount < t) {
                const widthPercent = (((gen.amount - prevT) / (t - prevT)) % t) * 100
                setWidth(widthPercent)
                setLevelIndex(i)
                return true
            }
        })
    }


    return (
        <div id={`generator-${genId}`} className="side-menu-item cannot-afford" onClick={() => {
            onClick()
            onBuy()
        }}
            //prevent images from animating when hovering over things you can't afford, or when animations are disabled
            onMouseEnter={() => {
                if (options[0].currentValue) {
                    const el = document.querySelector(`#generator-${genId}`)
                    if (!el.classList.contains("cannot-afford")) {
                        setImage(gen.imageAnim)
                    }
                }
            }
            }
            onMouseLeave={() => setImage(gen.image)} >
            <h5>{gen.name}</h5>
            <div>
                <p>+{gen.rps ? handleBigNumber(gen.rps.toFixed(2)) : gen.baseRps}/s</p>
                <p>({gen.amount > 0 ? handleBigNumber((gen.rpsTotal).toFixed(2)) : "0"}/s)</p>
                <div className="generator-price">
                    <span>{gen.price[0]}</span>
                    <span>{gen.price[1]}</span>
                    <span>{gen.price[2]}</span>
                </div>
                <div className="generator-count">
                    <span>{gen.amount}</span>
                    <div className="generator-count-bar" style={{ width: `${width}%` }}></div>
                    <span className="next-level-bonus">
                        +{((levelThresholds[levelIndex][1] - 1) * 100).toFixed(0)}% @ {levelThresholds[levelIndex][0]}
                    </span>
                </div>
            </div>
            <img className="generator-image" src={process.env.PUBLIC_URL + image} alt={gen.name} />
            <div className="prevent-flicker"></div>
        </div>
    )
}

export default Generator