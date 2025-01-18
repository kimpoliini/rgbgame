import { useState, useEffect } from "react"
import { options } from "../js/data/options"
import { useCookies } from "react-cookie"
import Option from "./Option"
import "./styles/options.css"

const Options = ({ dismiss }) => {
    const [cookies, setCookie, removeCookie] = useCookies([])
    
    const [optionsElements, setOptionsElements] = useState([])

    useEffect(() => {
        
        let optionCallback = {}
        const elements = options.map((o, i) => {
            if (o.type === "button") {
                switch (o.currentValue) {
                    case "reset":
                        optionCallback = reset
                        break
                }
            }

            return <Option key={i} optionId={i} callback={() => optionCallback()} hidden={o.hidden}/>
        })

        setOptionsElements(elements)
    }, [])

    function click(e) {
        if (e.currentTarget === e.target) {
            //checks if CSS changes needs to be done
            const squareElement = document.querySelector(".the-square")
            if(options[2].currentValue === 2){
                squareElement.classList.remove("square-clip")
            } else {
                squareElement.classList.add("square-clip")
            }
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