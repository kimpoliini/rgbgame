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

    return rgb
}

//turns a value of rgb into red
export const rgbToRed = ([...rgb]) => {
    for(let i = 4; i > 0; i--){
        if(i === 0) break
        
        if(rgb[i] > 0){
            rgb[i-1] += rgb[i] * 256
            rgb[i] = 0
        }
    }

    let red = rgb[0]

    return red
}

export const buy = ([...currentRgb], [...priceRgb]) => {
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

const suffixes = [
    "K",
    "M",
    "B",
    "T",
    "Qa",
    "Qi",
    "Sx",
    "Sp",
    "O",
    "N",
    "D",
]

export function handleBigNumber(number){
    if(number >= 1000){
        let log = Math.floor(Math.log10(number))
        let suffix = Math.floor(log/3) - 1
        let text = (number/Math.pow(10,log - (log % 3))).toFixed(3)

        return `${text} ${suffixes[suffix]}`
    } else {
        return number
    }
}