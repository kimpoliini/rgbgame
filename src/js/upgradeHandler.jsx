import { values } from "./values"
import { upgrades } from "./upgrades"

export const handleUpgrade = (id) => {

    const upgrade = upgrades[id]
    const modifier = upgrade.effectModifier

    switch(modifier){
        case "multiply":
            multiplyValue(upgrade.type, upgrade.effect)
            break
        case "add":
            addValue(upgrade.type, upgrade.effect)
            break
    }
}


function multiplyValue(upgradeType, multiplier){
    switch(upgradeType){
        case "rps":
            values.rpsMultiplier *= multiplier
            break

        case "click":
            values.clickMultiplier *= multiplier
            break

        case "vertex":
            values.vertexMultiplier *= multiplier
            break
    }
}

function addValue(upgradeType, addAmount){
    switch(upgradeType){
        case "rps":
            //n/a
            break
        case "click":
            values.clickValue += addAmount
            console.log(values.clickValue)
            break
        case "vertex":
            //n/a
            break
    }
}