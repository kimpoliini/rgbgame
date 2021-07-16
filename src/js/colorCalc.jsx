//turns a value of red into rgb
export const redToRgb = (red) => {
    let r = parseFloat(red.toFixed(2))
    let g = 0
    let b = 0

    while(r >= 256){
        r -= 256
        g += 1
    }

    while(g >= 256){
        g -= 256
        b += 1
    }

    console.log(`${red} red -> ${r}, ${g}, ${b}`)
    return [r, g, b]
}

export const rgbToRed = (rgb) => {
    while(rgb[2] > 0){
        rgb[2] -= 1
        rgb[1] += 256
    }

    while(rgb[1] > 0){
        rgb[1] -= 1
        rgb[0] += 256
    }

    let red = rgb[0]

    console.log(`${rgb} -> ${red} reds`)
    return red
}

export const buy = (currentRgb, priceRgb) => {
    let priceRed = rgbToRed(priceRgb)
    let currentRed = rgbToRed(currentRgb)

    if(currentRed >= priceRed){
        currentRed -= priceRed
    } else {
        console.log("cannot afford!!!")
        return null
    }

    return redToRgb(currentRed)
}