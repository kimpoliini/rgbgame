import { buy, redToRgb, rgbToRed } from "../colorCalc"
import { options } from "./options"
import { values } from "./values"

class Generator {
    constructor(
        name,
        baseRps,
        basePrice,
        priceIncrease,
        vertices,
        image,
        imageAnim
    ) {
        this._name = name
        this._baseRps = baseRps
        this._basePrice = basePrice
        this._priceIncrease = priceIncrease
        this._vertices = vertices
        this._image = image
        this._imageAnim = imageAnim

        this._amount = 0
    }

    get name() { return this._name }
    get rps() { return this._baseRps * this.multiplier * values.rpsMultiplier * (1 + (values.vertexRpsMultiplier * this._vertices)) }
    get rpsTotal() { return this._baseRps * this._amount * this.multiplier * values.rpsMultiplier * (1 + (values.vertexRpsMultiplier * this._vertices * this._amount)) }
    get baseRps() { return this._baseRps }
    get amount() { return this._amount }
    get vertices() { return this._vertices }
    get price() {
        let buyCount = this.getBuyCount(options[8].currentValue)
        return this.getTotalPrice(buyCount)
    }
    get image() { return this._image }
    get imageAnim() { return this._imageAnim }

    get multiplier() {
        let multiplier = 1

        levelThresholds.some(i => {
            if (this._amount >= i[0]) { multiplier *= i[1] } else return true
        })

        return multiplier
    }

    set amount(newAmount) { this._amount = newAmount }

    buyGenerator(currentColor) {
        let buyCount = this.getBuyCount(options[8].currentValue)

        if (rgbToRed(currentColor) >= rgbToRed(this.price)) {
            const remainder = buy(currentColor, this.price)
            this._amount += buyCount
            return remainder
        }
    }

    getBuyCount(optionValue) {
        if (optionValue <= 2) return parseInt(options[8].values[optionValue]) // 1x, 5x, 10x
        else if (optionValue === 3) {
            let remainder = 0
            for (const threshold of levelThresholds) {
                if (this._amount < threshold[0]) {
                    let nextThreshold = threshold[0]
                    remainder = nextThreshold - this._amount
                    break
                }
            }
            return remainder
        }
    }

    getTotalPrice(buyCount) {
        const basePrice = rgbToRed(this._basePrice)
        let currentCost = basePrice * (this._priceIncrease ** this._amount)
        return redToRgb(currentCost * ((this._priceIncrease ** buyCount) - 1) / (this._priceIncrease - 1))
    }
}

export const generators = [
    new Generator("Triangle", 0.2, [30, 0, 0], 1.10, 3, "/assets/generators/triangle.png", "/assets/generators/triangle-anim.gif"),
    new Generator("Square", 1, [200, 0, 0], 1.10, 4, "/assets/generators/square.png", "/assets/generators/square-anim.gif"),
    new Generator("Pentagon", 3, [0, 3, 0], 1.10, 5, "/assets/generators/pentagon.png", "/assets/generators/pentagon-anim.gif"),
    new Generator("Hexagon", 15, [0, 18, 0], 1.10, 6, "/assets/generators/hexagon.png", "/assets/generators/hexagon-anim.gif"),
    new Generator("Septagon", 50, [0, 80, 0], 1.10, 7, "/assets/generators/septagon.png", "/assets/generators/septagon-anim.gif"),
    new Generator("Octagon", 125, [0, 0, 1], 1.10, 8, "/assets/generators/octagon.png", "/assets/generators/octagon-anim.gif"),

    new Generator("Pyramid", 750, [0, 0, 5], 1.10, 5, "/assets/generators/pyramid.png", "/assets/generators/pyramid-anim.gif"),
    new Generator("Cube", 3000, [0, 0, 24], 1.10, 8, "/assets/generators/cube.png", "/assets/generators/cube-anim.gif"),
    new Generator("Dodecahedron", 12000, [0, 0, 100], 1.10, 20, "/assets/generators/dodecahedron.png", "/assets/generators/dodecahedron-anim.gif"),
]

export const levelThresholds = [
    [10, 1.1],
    [25, 1.2],
    [50, 1.25],
    [75, 1.2],
    [100, 1.5],
    [150, 1.25],
    [200, 1.25],
    [250, 1.25],
    [300, 1.25],
    [350, 1.25],
    [400, 1.25],
    [450, 1.25],
    [500, 1.25],
]