import { useEffect, useState } from "react"
import "./sideMenuItems.css"
import { generators } from  "../js/generators.js"


const Generator = ({onClick, genId}) => {

    const [gen, setGen] = useState(generators[genId])
    const [image, setImage] = useState(gen.image)

    return(
        <div id={`generator-${genId}`} className="side-menu-item cannot-afford" onClick={onClick} 
        onMouseEnter={() => setImage(gen.imageAnim)} 
        onMouseLeave={() => setImage(gen.image)} >
            <div>
                <h5>{gen.name}</h5>
                <p>+{gen.baseRps} R/s</p>
                <div className="generator-price">
                    <span>{gen.price[0]}</span>
                    <span>{gen.price[1]}</span>
                    <span>{gen.price[2]}</span>
                </div>
                <div className="generator-count">
                    <span>{gen.count}</span>
                    <div className="generator-count-bar" style={{width: `${(gen.count % 10)*10}%`}}></div>
                </div>
            </div>
            <img className="generator-image" src={image} alt=""/>
        </div>
    )
}

export default Generator