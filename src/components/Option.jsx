import { useEffect } from "react"
import { useState } from "react"
import { options } from "../js/data/options.js"
import "./styles/options.css"
import Tooltip from "./Tooltip.jsx"

const Option = ({ optionId, callback }) => {
    const [opt, setOpt] = useState(options[optionId])
    const [action, setAction] = useState()
    const [isEnabled, setIsEnabled] = useState(false)
    const [dropdownValue, setDropdownValue] = useState("")
    const [tooltip, setTooltip] = useState()

    useEffect(() => {
        let el = <div></div>

        switch (opt.type) {
            case "switch":
                el = <div className={`switch-icon ${opt.value ? "enabled" : "disabled"}`}><div /></div>
                setIsEnabled(opt.value)
                break
            case "dropdown":
                const values = opt.typeValues.map((v, i) => {
                    return <option key={i} id={`option-${i}`} value={v}>{v}</option>
                })

                el = <select id={`option-${optionId}`} value={opt.value} name={opt.title}
                    onChange={(e) => {
                        opt.value = e.target.value
                        setDropdownValue(opt.value)
                    }}>
                    {values}
                </select>
                break
                case "button":
                    el = <div className={`button`} onClick={onClick}><div>{opt.value}</div></div>
                    break
        }
        
        setAction(el)
    }, [isEnabled, dropdownValue])
    
    function onClick() {
        if (opt.type === "switch") {
            opt.value = !opt.value
            setIsEnabled(opt.value)
        } else if (opt.type == "button") {
            //opt.value is what the button will do
            switch (opt.value) {
                case "reset":
                    //add confirmation dialog
                    callback()
                    break
            }
        }
    }    

    return (
        <div className="option" onClick={opt.type == "button" ? null : onClick} 
        onMouseEnter={() => {
            setTooltip(<Tooltip text={opt.tooltip}/>)
        }}
        onMouseLeave={() => {
            setTooltip(null)
        }}>
            <span>{opt.title}</span>
            {action}
            {tooltip}
        </div>
    )
}

export default Option