export const generators = [
    //tier 1
    {
        name: "Triangle",
        baseRps: 0.2, //150s
        basePrice: [30,0,0],
        image: "/assets/generators/triangle.png",
        imageAnim: "/assets/generators/triangle-anim.gif"
    },
    {
        name: "Square",
        baseRps: 1, //200s
        basePrice: [200,0,0],
        image: "/assets/generators/square.png",
        imageAnim: "/assets/generators/square-anim.gif"
    },
    {
        name: "Pentagon",
        baseRps: 3, //256s
        basePrice: [0,3,0],
        image: "/assets/generators/pentagon.png",
        imageAnim: "/assets/generators/pentagon-anim.gif"
    },
    {
        name: "Hexagon",
        baseRps: 15, //307.2s
        basePrice: [0,18,0],
        image: "/assets/generators/hexagon.png",
        imageAnim: "/assets/generators/hexagon-anim.gif"
    },
    {
        name: "Septagon",
        baseRps: 50, //409.6s
        basePrice: [0,80,0],
        image: "/assets/generators/septagon.png",
        imageAnim: "/assets/generators/septagon-anim.gif"
    },
    {
        name: "Octagon",
        baseRps: 125, //524.288s
        basePrice: [0,0,1],
        image: "/assets/generators/octagon.png",
        imageAnim: "/assets/generators/octagon-anim.gif"
    },

    //tier 2
    {
        name: "Pyramid",
        baseRps: 750, //436.9s
        basePrice: [0,0,5],
        image: "",
        imageAnim: ""
    },
    {
        name: "Cube",
        baseRps: 3000, //524.288s
        basePrice: [0,0,24],
        image: "",
        imageAnim: ""
    },
    {
        name: "Dodecahedron",
        baseRps: 12000, //546.13s
        basePrice: [0,0,100],
        image: "",
        imageAnim: ""
    },
]