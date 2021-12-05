import React from 'react'
import "./tooltip.css"
const Tooltip = ({ text }) => {
    return (
        <div className={"tooltip"}>
            {text}
        </div>
    )
}

export default Tooltip