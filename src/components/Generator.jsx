import { useEffect, useState } from "react"
import "./sideMenuItems.css"
import { generators, levelThresholds } from  "../js/generators.js"
import { options } from "../js/options"


const Generator = ({onClick, genId}) => {

    const [gen, setGen] = useState(generators[genId])
    const [width, setWidth] = useState(0)
    const [level, setLevel] = useState(0)
    const [image, setImage] = useState(gen.image)

    useEffect(() => {
        onBuy()
    }, [])
    
    //Makes sure the progress bar to the next level has the correct width
    function onBuy(){
        for(const i in levelThresholds){
            const t = levelThresholds[i].threshold
            let prevT = 0
            
            if(i > 0){
                prevT = levelThresholds[i-1].threshold
            }
            
            if(gen.count < t){
                const widthPercent = (((gen.count - prevT) / (t - prevT)) % t) * 100
                setWidth(widthPercent)
                setLevel(i)
                break
            }
        }
    }

    return(
        <div id={`generator-${genId}`} className="side-menu-item cannot-afford" onClick={() => {
            onClick()
            onBuy()
        }} 
        //prevent images from animating when hovering over things you can't afford, or when animations are disabled
        onMouseEnter={() => { 
            if(options[0].value){
                const el = document.querySelector(`#generator-${genId}`)
                if(!el.classList.contains("cannot-afford")){
                    setImage(gen.imageAnim)
                }            
            }
        }
        } 
        onMouseLeave={() => setImage(gen.image)} >
            <div>
                <h5>{gen.name}</h5>
                <p>+{gen.rps ? gen.rps.toFixed(2) : gen.baseRps}/s</p>
                <p>({gen.count > 0 ? (gen.rps * gen.count).toFixed(2) : "0"}/s)</p>
                <div className="generator-price">
                    <span>{gen.price[0]}</span>
                    <span>{gen.price[1]}</span>
                    <span>{gen.price[2]}</span>
                </div>
                <div className="generator-count">
                    <span>{gen.count}</span>
                    <div className="generator-count-bar" style={{width: `${width}%`}}></div>
                    <span className="next-level-bonus">
                        +{((levelThresholds[level].bonus-1)*100).toFixed(0)}%
                    </span>
                </div>
            </div>
            <img className="generator-image" src={image} alt=""/>
            <div className="prevent-flicker"></div>
        </div>
    )
}

export default Generator