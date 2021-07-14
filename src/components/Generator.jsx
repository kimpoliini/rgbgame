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
                <h5>{generators[genId].name}</h5>
                <p>{generators[genId].baseRps} R/s</p>
                <p>{generators[genId].basePrice}</p>
            </div>
            <img className="generator-image" src={image} alt=""/>
        </div>
    )
}


export default Generator