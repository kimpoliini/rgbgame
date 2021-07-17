import "./sideMenuItems.css"
import { upgrades } from "../js/upgrades"
import { useState } from "react"

const Upgrade = ({onClick, upgradeId}) => {

    const [upgrade, setUpgrade] = useState(upgrades[upgradeId])

    return(
        <div className="side-menu-item" onClick={onClick}>
            <div>
                <h5>{upgrade.name}</h5>
                <p>{upgrade.description}</p>
                <div className="generator-price">
                    <span>{upgrade.price[0]}</span>
                    <span>{upgrade.price[1]}</span>
                    <span>{upgrade.price[2]}</span>
                </div>
            </div>
        </div>
    )
}

export default Upgrade