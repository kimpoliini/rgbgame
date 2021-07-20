export const upgrades = [
    {
        name: "Paint bucket",
        description: "Adds +1 red to your clicks",
        rank: 1,
        price: [100,0,0],
        effect: 1,
        effectModifier: "add" /* add, sub, multiply */,
        type: "click"
    },
    {
        name: "Vertex extractor",
        description: "Gains +1% RPS for each vertex owned",
        rank: 1,
        price: [0,10,0],
        effect: 1.01,
        effectModifier: "multiply",
        type: "vertex"
    },
]