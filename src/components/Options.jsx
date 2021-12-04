import { useState, useEffect } from "react"
import { options } from "../js/options"
import { useCookies } from "react-cookie"
import Option from "./Option"
import "./options.css"

const Options = ({ dismiss }) => {
    const [cookies, setCookie, removeCookie] = useCookies([])
    
    const [optionsElements, setOptionsElements] = useState([])

    useEffect(() => {
        
        let optionCallback = {}
        const elements = options.map((o, i) => {
            if (o.type == "button") {
                switch (o.value) {
                    case "reset":
                        console.log(i + " is reset")
                        optionCallback = reset
                        break
                }
            }

            return <Option key={i} optionId={i} callback={() => optionCallback()} />
        })

        setOptionsElements(elements)
    }, [])

    function click(e) {
        if (e.currentTarget === e.target) {
            dismiss()
        }
    }

    //Clear cookies and reload page
    const reset = () => {
        console.log("reset")
        for (const c in cookies) {
            removeCookie(c.toString())
        }
        window.location.reload()
        console.log("removed cookies")
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