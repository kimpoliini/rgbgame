import { useEffect, useState } from "react"
import "./sideMenuItems.css"
import { generators } from  "../js/generators.js"


const Generator = ({name, baseIncrease, basePrice, costScalingPercent, onClick, tempImage, tempAnim, genId}) => {

    const [image, setImage] = useState(tempImage)

    useEffect(() => {
        console.log(generators[0].name)
    }, [])

    return(
        <div className="side-menu-item" onClick={onClick} 
        onMouseEnter={() => setImage(tempAnim)} 
        onMouseLeave={() => setImage(tempImage)} >
            <div>
                <h5>{name}</h5>
                <p>{baseIncrease}/s</p>
                <p>{basePrice}</p>
            </div>
            <img className="generator-image" src={image} alt=""/>
        </div>
    )
}


export default Generator