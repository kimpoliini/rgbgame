export const options = [
    //types: switch, dropdown, custom?
    {
        title: "Enable animations",
        tooltip: "Enable animations like Generators spinning when hovering over them",
        type: "switch",
        value: true,
    },
    {
        title: "Enable click effect",
        tooltip: "Enables a graphical effect when clicking",
        type: "switch",
        value: true,
    },
    {
        title: "Click effect",
        tooltip: "What effect to be shown when clicking",
        type: "dropdown",
        typeValues: ["ripple"],
        value: "ripple",
    },
    {
        title: "Enable click text",
        tooltip: "Enables the the text shown when clicking",
        type: "switch",
        value: true,
    },
    {
        title: "Show stats on-screen",
        tooltip: "Show statistics like total multiplier, vertice count, amount of upgrades purchased etc. on the main screen",
        type: "switch",
        value: false,
    },
    {
        title: "Framerate",
        tooltip: "How many times numbers are calculated each second. Does not affect RPS. High values might have a negative impact on performance",
        type: "dropdown",
        typeValues: [144, 120, 75, 60, 30, 15, 10, 5, 1],
        value: 30,
    },
    {
        title: "Background color update frequency",
        tooltip: "How many times the background color refreshes each second. Values higher than 5 might have a negative impact on performance",
        type: "dropdown",
        typeValues: [10, 5, 2, 1],
        value: 2,
    },
]