//turns a value of red into rgb
export const redToRgb = (red) => {
    let r = parseFloat(red.toFixed(2))
    let rgb = [r,0,0,0]

    for(let i = 0; i < 3; i++){
        if(rgb[i] >= 256){
            let next = Math.floor(rgb[i]/256)
            rgb[i+1] = next
            rgb[i] %= 256
        }
    }
    
    //old
    // while(r >= 256){
    //     r -= 256
    //     g += 1
    // }

    // while(g >= 256){
    //     g -= 256
    //     b += 1
    // }

    // while(b >= 256){
    //     b -= 256
    //     p += 1
    // }

    return rgb
}

export const rgbToRed = (rgb) => {

    //new
    for(let i = 4; i > 0; i--){
        if(i === 0) break
        
        if(rgb[i] > 0){
            rgb[i-1] += rgb[i] * 256
            rgb[i] = 0
        }
    }

    //old
    // while(rgb[3] > 0){
    //     rgb[3] -= 1
    //     rgb[2] += 256
    // }

    // while(rgb[2] > 0){
    //     rgb[2] -= 1
    //     rgb[1] += 256
    // }

    // while(rgb[1] > 0){
    //     rgb[1] -= 1
    //     rgb[0] += 256
    // }

    let red = rgb[0]

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