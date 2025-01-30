import { buy, redToRgb, rgbToRed } from "../utils/colorCalc"
import { handleUpgrade } from "../utils/upgradeHandler"

class Upgrade {
    constructor(
        name,
        description,
        maxRank,
        price,
        effect,
        effectModifier, /* add, sub, multiply */
        type) {
        this._name = name
        this._description = description
        this._maxRank = maxRank
        this._price = price
        this._effect = effect
        this._effectModifier = effectModifier
        this._type = type

        this._bought = false
        this._rank = 0
    }

    get name() { return this._name }
    get description() { return this._description }
    get price() {
        if (this.maxRank > 1) {
            return redToRgb(Math.floor(rgbToRed(this._price) * (Math.pow(1.5, this._rank))))
        } else {
            return this._price
        }
    }
    get type() { return this._type }
    get effect() { return this._effect }
    get effectModifier() { return this._effectModifier }
    get rank() { return this._rank }
    get maxRank() { return this._maxRank }
    get bought() { return this._bought }

    set rank(newRank) {
        this._rank = newRank
        if (this._rank === this._maxRank) this._bought = true
    }
    set bought(isBought) {
        if (isBought) {
            this._bought = isBought
            this._rank = this._maxRank
        }
    }

    buyUpgrade(currentColor) {
        if (this._bought) return
        if (rgbToRed(currentColor) >= rgbToRed(this.price)) {
            const remainder = buy(currentColor, this.price)
            this._rank++

            if (this._rank === this._maxRank) this._bought = true
            handleUpgrade(this._name)
            return remainder
        }
    }
}

export const upgrades = [
    new Upgrade("Paint brush", "Adds +1 red to your clicks", 10, [100, 0, 0], 1, "add", "click"),
    new Upgrade("Paint bucket", "Adds +0.1 red to your clicks for each vertex acquired", 5, [0, 10, 0], 0.1, "add", "vertex.click"),
    new Upgrade("Vertex extraction", "Gains +0.1% RPS for each vertex owned", 10, [0, 10, 0], 0.001, "add", "vertex.rps"),
    new Upgrade("Brighter colors", "You gain +10% rps", 1, [100, 1, 0], 1.1, "multiply", "rps"),
    new Upgrade("Higher saturation", "You gain +10% rps", 1, [0, 3, 0], 1.1, "multiply", "rps"),
    new Upgrade("Redder reds", "You gain +15% rps", 1, [0, 8, 0], 1.15, "multiply", "rps"),
    new Upgrade("Bluer blues", "You gain +15% rps", 1, [0, 25, 0], 1.15, "multiply", "rps"),
    new Upgrade("Greener greens", "You gain +15% rps", 1, [0, 75, 0], 1.15, "multiply", "rps"),
    new Upgrade("CMYK", "You gain +25% rps", 1, [0, 100, 0], 1.25, "multiply", "rps"),
    new Upgrade("Better color mixing", "You gain +25% rps", 1, [0, 150, 0], 1.25, "multiply", "rps"),
    new Upgrade("JPEG artifacts", "For some reasons gains you +1% rps", 1, [0, 100, 0], 1.01, "multiply", "rps"),
    new Upgrade("SCART connectors", "Multiples click value by 2%", 1, [0, 1, 0], 1.02, "multiply", "click"),
    new Upgrade("RCA connectors", "Multiples click value by 4%", 1, [0, 4, 0], 1.04, "multiply", "click"),
    new Upgrade("VGA connectors", "Multiples click value by 6%", 1, [0, 75, 0], 1.06, "multiply", "click"),
    new Upgrade("DVI connectors", "Multiples click value by 8%", 1, [0, 200, 0], 1.08, "multiply", "click"),
    new Upgrade("HDMI connectors", "Multiples click value by 10%", 1, [0, 0, 2], 1.1, "multiply", "click"),
    new Upgrade("DisplayPort connectors", "Multiples click value by 10%", 1, [0, 0, 8], 1.1, "multiply", "click"),
]