import { generators } from "../data/generators"
import { options } from "../data/options"
import { upgrades } from "../data/upgrades"

export function prepareSave() {

    // const { generators, upgrades, options } = data

    //Loops through generators and saves how many are bought
    let generatorData = []
    generators.forEach((gen, i) => {
        generatorData.push({})
        generatorData[i].amount = generators[i].amount
    })

    //Loops through upgrades and saves how many are bought or have ranks
    let upgradeData = []
    upgrades.forEach((upgrade, i) => {
        upgradeData.push({})
        upgradeData[i].bought = upgrade.bought
        if (upgrade.bought) return
        if (upgrade.rank) upgradeData[i].rank = upgrade.rank
    })

    let optionsData = []
    options.forEach((opt, i) => {
        if (!opt.shouldSave) return
        optionsData.push({})
        optionsData[i].currentValue = opt.currentValue
    })

    return {
        generators: generatorData,
        upgrades: upgradeData,
        options: optionsData
    }
}