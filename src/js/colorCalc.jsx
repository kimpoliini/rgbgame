
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