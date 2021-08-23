import { options } from "./options"

export const click = (e, elements, clickValueRed) => {
    let headerHeight, x, y, randomWidthOffset = 0, randomHeightOffset = 0
    //checks options if any click effects are enabled
    if(options[1].value || options[3].value){
        headerHeight = elements.header.offsetHeight
        
        //getting pointer location and accounts for header
        x = e.clientX
        y = e.clientY
        
        //makes sure the text doesn't appear underneath the header
        randomWidthOffset = Math.floor(Math.random() * 60) - 30
        randomHeightOffset = Math.floor(Math.random() * 40)
    }
    
    //checks if click effect text option is enabled
    if(options[3].value){
        const text = document.createElement("span")
        text.innerText = clickValueRed
        
        text.classList.add("click-text")  
        elements.main.appendChild(text)

        let textX = x - text.offsetWidth + randomWidthOffset + (text.offsetWidth / 2)
        let textY = y - headerHeight - text.offsetHeight - randomHeightOffset
        
        if(textY <= 0){
            textY = 8
        }
        
        text.style.left = `${textX}px`
        text.style.top = `${textY}px`
        
        setTimeout(() => { text.remove() }, 800);
    }
    
    //checks if click effect graphic option is enabled
    if(options[1].value){
        const clickEffect = document.createElement("div")
        clickEffect.style.position = "absolute"
        elements.main.appendChild(clickEffect)
        
        
        switch(options[2].value){
            case "ripple":
                clickEffect.classList.add("ripple")  
                break
            case "material ripple":
                clickEffect.classList.add("ripple-simple")
                break
                case "splash":
                clickEffect.classList.add("splash")

                for(let i = 0; i < 5; i++){
                    const fx = document.createElement("div")
                    let deg = Math.random() * 360 

                    fx.classList.add("splash-line")

                    fx.style.transform = `rotate(${deg}deg)`

                    clickEffect.appendChild(fx)
                }
                break
        }
        
        clickEffect.style.left = `${x - clickEffect.offsetWidth / 2}px`
        clickEffect.style.top = `${y - headerHeight - clickEffect.offsetHeight / 2}px`

        setTimeout(() => { clickEffect.remove() }, 500);
    }
}