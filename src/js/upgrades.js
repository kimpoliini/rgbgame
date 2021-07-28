export const upgrades = [
    {
        name: "Paint bucket",
        description: "Adds +1 red to your clicks",
        rank: 1,
        price: [100,0,0],
        effect: 1,
        effectModifier: "add" /* add, sub, multiply */,
        type: "click",
    },
    {
        name: "Vertex extractor",
        description: "Gains +1% RPS for each vertex owned",
        rank: 1,
        price: [0,10,0],
        effect: 1.01,
        effectModifier: "multiply",
        type: "vertex",
    },
    {
        name: "test",
        description: "",
        price: [0,2,0]
    },
    {
        name: "test",
        description: "",
        price: [0,3,0]
    },
    {
        name: "test",
        description: "",
        price: [0,4,0]
    },
    {
        name: "test",
        description: "",
        price: [0,5,0]
    },
    {
        name: "test",
        description: "",
        price: [0,6,0]
    },
    {
        name: "test",
        description: "",
        price: [0,7,0]
    },
]