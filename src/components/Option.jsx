import { useEffect } from "react"
import { useState } from "react"
import { options } from "../js/options.js"
import "./options.css"

const Option = ({optionId}) => {
    const [opt, setOpt] = useState(options[optionId])
    const [action, setAction] = useState()
    const [isEnabled, setIsEnabled] = useState(false)

    useEffect(() => {
        let el = <div></div>
        if(opt.type === "switch"){
            el = <div className={`switch-icon ${opt.value ? "enabled" : "disabled" }`}>
                <div></div></div>
            setIsEnabled(opt.value)
        } else if(opt.type === "dropdown"){
            const values = opt.typeValues.map((v,i) => {
                return <option id={`option-${i}`} value={v}>{v}</option>
            })
            
            el = <select value={opt.value} name={opt.title}>
                {values}
            </select>
        }
        
        setAction(el)
    }, [isEnabled])
    
    function onClick(){
        if(opt.type === "switch"){
            opt.value = !opt.value
            setIsEnabled(opt.value)
        }
    }

    return (
        <div className="option" onClick={onClick}>
            <span>{opt.title}</span>
            {action}
        </div>
    )
}

export default Option