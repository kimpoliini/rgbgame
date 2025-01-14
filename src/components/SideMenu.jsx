import React, { useState } from 'react'
import { options } from "../js/data/options"
import "./styles/sideMenu.css"

const SideMenu = ({ direction, list, callback }) => {
    const [selectedBuyAmount, setSelectedBuyAmount] = useState("1x")
    const isLeft = direction === "left"

    const sideMenuButton = () => {
        const name = isLeft ? <span>Upgrades</span> : <span>Generators</span>
        const arrow = <span className="arrow">{">"}</span>
        return <button className={`open-${direction} menu-button`} onClick={() => callback(direction)}>
            {isLeft ? arrow : name}
            {isLeft ? name : arrow}
        </button>
    }

    const sideMenuContent = () => (
        <div className={`${direction}-menu-content menu-content`}>
            {isLeft
                ? null
                : <div className='buy-count'>
                    {
                        options[8].values.map((v, i) => {
                            return <span key={i} className={options[8].currentValue === i ? "selected" : ""}
                                onClick={() => {
                                    setSelectedBuyAmount(v)
                                    options[8].currentValue = i
                                }}>{v}</span>
                        })
                    }
                </div>
            }
            {list}
        </div>
    )

    return <div className={`${direction}-menu side-menu`}>
        {isLeft ? sideMenuContent(direction) : sideMenuButton(direction)}
        {isLeft ? sideMenuButton(direction) : sideMenuContent(direction)}
    </div>
}

export default SideMenu