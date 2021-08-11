import { useState, useEffect } from "react"
import { options } from "../js/options"
import Option from "./Option"
import "./options.css"

const Options = ({dismiss}) => {

    const [optionsElements, setOptionsElements] = useState([])

    useEffect(() => {
        const elements = options.map((o,i) => {
            return <Option optionId={i}/>
        })
        
        setOptionsElements(elements)
    }, [])



    function click(e){
            if(e.currentTarget === e.target){
                dismiss()
            }
        }
        
        return (
            <div className="options-background" onClick={(e) => click(e)}>
                <div className="options-content">
                    <h3>Options</h3>
                    <div>
                        {optionsElements}
                    </div>
                </div>
            </div>
        )
}

export default Options