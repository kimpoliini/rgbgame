//Keep generator upgrades in a separate file?
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
        name: "Sharper edges",
        description: "Your Triangles are 100% more effective",
        rank: 1,
        price: [120,0,0],
        effect: 2,
        effectModifier: "multiply"
    },
    { 
        name: "Square root",
        description: "Your Squares are 100% more effective",
        rank: 1,
        price: [0,3,0],
        effect: 2,
        effectModifier: "multiply"
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