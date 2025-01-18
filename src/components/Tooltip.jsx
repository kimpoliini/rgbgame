import React from 'react'
import "./styles/tooltip.css"
const Tooltip = ({ text, offset }) => {
    return (
        <div className={"tooltip"} style={{bottom: offset+6}}>
            {text}
        </div>
    )
}

export default Tooltip