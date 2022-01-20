import React from 'react'
import "./styles/tooltip.css"
const Tooltip = ({ text }) => {
    return (
        <div className={"tooltip"}>
            {text}
        </div>
    )
}

export default Tooltip