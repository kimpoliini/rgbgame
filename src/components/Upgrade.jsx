import "./sideMenuItems.css"


const Upgrade = ({name, description, price}) => {






    return(
        <div className="side-menu-item">
            <div>
                <h5>{name}</h5>
                <p>{description}</p>
                <p>{price}</p>
            </div>
        </div>
    )
}


export default Upgrade