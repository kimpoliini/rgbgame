
//turns a value of red into rgb
export const calculateRed = (red) => {
    let green, blue = 0

    while(red >= 256){
        red -= 256
        green += 1


    }

    while(green >= 256){
        green -= 256
        blue += 1
    }

    return [red, green, blue]
}