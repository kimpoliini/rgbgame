import { options } from "../data/options"
import { handleBigNumber } from "./colorCalc"

export const click = (e, elements, clickValueRed) => {
    elements.transformContainer.classList.remove("on-click")


    let x, y, randomWidthOffset = 0, randomHeightOffset = 0
    //checks options if any click effects are enabled
    if (options[1].currentValue || options[3].currentValue) {
        //getting pointer location and accounts for header
        x = e.clientX
        y = e.clientY

        //makes sure the text doesn't appear underneath the header
        randomWidthOffset = Math.floor(Math.random() * 60) - 30
        randomHeightOffset = Math.floor(Math.random() * 40)
    }

    //checks if click effect text option is enabled
    if (options[3].currentValue) {
        const text = document.createElement("span")
        text.innerText = handleBigNumber(clickValueRed.toFixed(0))

        text.className = "click-text effect"
        elements.container.appendChild(text)

        let textX = x - text.offsetWidth + randomWidthOffset + (text.offsetWidth / 2)
        let textY = y - text.offsetHeight - randomHeightOffset

        if (textY <= 0) {
            textY = 8
        }

        text.style.left = `${textX}px`
        text.style.top = `${textY}px`

        setTimeout(() => { text.remove() }, 800);
    }

    //checks if click effect graphic option is enabled
    if (options[1].currentValue) {
        const clickEffect = document.createElement("div")
        clickEffect.style.position = "absolute"
        elements.main.appendChild(clickEffect)

        switch (options[2].currentValue) {
            case 0:
                clickEffect.className = "ripple effect"
                break
            case 1:
                clickEffect.className = "ripple-simple effect"
                break
            case 2:
                clickEffect.className = "splash effect"

                for (let i = 0; i < 5; i++) {
                    const fx = document.createElement("div")
                    let deg = Math.random() * 360

                    fx.classList.add("splash-line")

                    fx.style.transform = `rotate(${deg}deg)`

                    clickEffect.appendChild(fx)
                }
                break
            default:
                clickEffect.className = "ripple effect"
                break
        }


        let distanceX = window.scrollX + elements.main.getBoundingClientRect().left
        let distanceY = window.scrollY + elements.main.getBoundingClientRect().top

        clickEffect.style.left = `${x - distanceX - clickEffect.offsetWidth / 2}px`
        clickEffect.style.top = `${y - distanceY - clickEffect.offsetHeight / 2}px`

        setTimeout(() => { clickEffect.remove() }, 400);
    }
    elements.transformContainer.classList.add("on-click")

}