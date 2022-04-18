import React from 'react'

const SideMenu = ({ direction, list, callback }) => {
    const isLeft = direction == "left"

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
            {list}
        </div>
    )

    return <div className={`${direction}-menu side-menu`}>
        {isLeft ? sideMenuContent(direction) : sideMenuButton(direction)}
        {isLeft ? sideMenuButton(direction) : sideMenuContent(direction)}
    </div>
}

export default SideMenu