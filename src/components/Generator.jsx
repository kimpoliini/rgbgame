import "./sideMenuItems.css"


const Generator = ({name, baseIncrease, basePrice, costScalingPercent, onClick}) => {






    return(
        <div className="side-menu-item" onClick={onClick}>
            <h5>{name}</h5>
            <p>{baseIncrease}/s</p>
            <p>{basePrice}</p>
        </div>
    )
}


export default Generator