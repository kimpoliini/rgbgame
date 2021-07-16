import { useEffect, useState } from "react"
import "./sideMenuItems.css"
import { generators } from  "../js/generators.js"


const Generator = ({name, onClick, tempImage, tempAnim, genId}) => {

    const [gen, setGen] = useState(generators[genId])
    const [image, setImage] = useState(gen.image)

    return(
        <div className="side-menu-item" onClick={onClick} 
        onMouseEnter={() => setImage(gen.imageAnim)} 
        onMouseLeave={() => setImage(gen.image)} >
            <div>
                <h5>{gen.name}</h5>
                <p>{gen.baseRps} R/s</p>
                <div className="generator-price">
                    <span>{gen.basePrice[0]}</span>
                    <span>{gen.basePrice[1]}</span>
                    <span>{gen.basePrice[2]}</span>
                </div>
            </div>
            <img className="generator-image" src={image} alt=""/>
        </div>
    )
}


export default Generator