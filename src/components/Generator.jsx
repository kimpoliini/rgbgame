import "./sideMenuItems.css"


const Generator = ({name,baseIncrease, basePrice, costScalingPercent}) => {






    return(
        <div className="side-menu-item">
            <h5>{name}</h5>
            <p>{baseIncrease}/s</p>
            <p>{basePrice}</p>
        </div>
    )
}


export default Generator