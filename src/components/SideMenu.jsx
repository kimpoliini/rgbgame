import React, { useRef, useState } from 'react'
import { options } from "../js/data/options"
import "./styles/sideMenu.css"

const SideMenu = ({ direction, list, onBuyAmountChange }) => {
    const isLeft = direction === "left"
    const menuRef = useRef()
    const [chevron, setChevron] = useState(isLeft ? "<" : ">")

    function onClick() {
        menuRef.current.classList.toggle(`hidden-${direction}`)
        setChevron(isLeft && chevron === "<" ? ">" : (chevron === ">" ? "<" : ">"))
    }

    const sideMenuButton = () => {
        return <button className={`open-${direction} menu-button`} onClick={() => {onClick()}}>
            <span>{isLeft ? chevron : "Generators"}</span>
            <span>{isLeft ? "Upgrades" : chevron}</span>
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
                                    options[8].currentValue = i
                                    onBuyAmountChange()
                                }}>{v}</span>
                        })
                    }
                </div>
            }
            {list}
        </div>
    )

    return <div ref={menuRef} className={`${direction}-menu side-menu`}>
        {isLeft ? sideMenuContent(direction) : sideMenuButton(direction)}
        {isLeft ? sideMenuButton(direction) : sideMenuContent(direction)}
    </div>
}

export default SideMenu