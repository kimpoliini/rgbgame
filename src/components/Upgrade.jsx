import "./styles/sideMenuItems.css"
import { upgrades } from "../js/data/upgrades"
import { useState } from "react"

const Upgrade = ({onClick, upgradeId}) => {

    const [upgrade, setUpgrade] = useState(upgrades[upgradeId])

    return(
        <div id={`upgrade-${upgradeId}`} className="side-menu-item cannot-afford" onClick={onClick}>
            <div>
                <h5>{upgrade.name}</h5>
                <p>{upgrade.description}</p>
                <div className="generator-price">
                    <span>{upgrade.price[0]}</span>
                    <span>{upgrade.price[1]}</span>
                    <span>{upgrade.price[2]}</span>
                </div>
            </div>
            <div className="prevent-flicker"></div>
        </div>
    )
}

export default Upgrade