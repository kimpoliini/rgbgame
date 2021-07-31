import { values } from "./values"
import { upgrades } from "./upgrades"
import { redToRgb } from "./colorCalc"

export const handleUpgrade = (id, rps) => {
    
    const upgrade = upgrades[id]
    const modifier = upgrade.effectModifier
    
    //Separate vertex.x to an array of two strings
    const typeArray = upgrade.type.split(".")
    const type = typeArray[0]
    
    switch(modifier){
        case "multiply":
            multiplyValue(type, upgrade.effect)
            break
        case "add":
            addValue(type, upgrade.effect)
            break
        case "time":
            addColor(upgrade.effect, rps)
            break
        }
        
    switch(type){
        case "vertex":
            vertexUpgrade(typeArray[1], modifier, upgrade.effect)
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
    }
}

function addValue(upgradeType, addAmount){
    switch(upgradeType){
        case "rps":
            //n/a
            break
        case "click":
            values.clickValue += addAmount
            break
    }
}

function addColor(time, rps){
    let red = (time*60)*rps
    const rgb = redToRgb(red)

    values.color.forEach((c,i) => {
        values.color[i] += rgb[i]
    })
}

function vertexUpgrade(type, modifier, effect){
    switch(type){
        case "rps":
            if(modifier === "add"){
                values.vertexRpsMultiplier += effect
            } else if(modifier === "multiply"){
                values.vertexRpsMultiplier *= effect
            }
            break
        case "click":
            if(modifier === "add"){
                values.clickValuePerVertex += effect
            } else if(modifier === "multiply"){
                values.clickValuePerVertex *= effect
            }
            break
    }
}