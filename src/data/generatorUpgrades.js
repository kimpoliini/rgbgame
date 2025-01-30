export const generatorUpgrades = [
    //Triangle
    {
        name: "Sharper edges",
        description: "Your Triangles are 100% more effective",
        MaxRanks: 10,
        price: [150,0,0],
        effect: 2,
        effectModifier: "multiply"
    },
    {
        name: "I guess it kinda looks like a cursor?",
        description: "Each triangle add +1 red to your clicks",
        MaxRanks: 5,
        price: [0,8,0],
        effect: 2,
        effectModifier: "add"
    },
    //Square
    { 
        name: "Straighter corners",
        description: "Your Squares are 100% more effective",
        MaxRanks: 10,
        price: [235,3,0],
        effect: 2,
        effectModifier: "multiply"
    },
    { 
        name: "Square root",
        description: "Adds √(amount of Squares)% to your rps",
        MaxRanks: 1,
        price: [0,12,0],
        effect: 1,
        effectModifier: "multiply"
    },
    //Pentagon
    {
        name: "Demonic angles",
        description: "Your Pentagons are 100% more effective",
        MaxRanks: 10,
        price: [0,15,0],
        effect: 2,
        effectModifier: "multiply"
    },
    //Hexagon
    {
        name: "Benzene",
        description: "Your Hexagons are 100% more effective",
        MaxRanks: 10,
        price: [0,90,0],
        effect: 2,
        effectModifier: "multiply"
    },
    //Septagons
    {
        name: "Hepta or Septa?",
        description: "Your Septagons are 100% more effective",
        MaxRanks: 10,
        price: [0,145,1],
        effect: 2,
        effectModifier: "multiply"
    },
    //Octagons
    {
        name: "1080º",
        description: "Your Octagons are 100% more effective",
        MaxRanks: 10,
        price: [0,0,5],
        effect: 2,
        effectModifier: "multiply"
    }
]