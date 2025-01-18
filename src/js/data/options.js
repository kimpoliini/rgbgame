class Option {
    constructor(
        title,
        tooltip,
        type,
        values, //Used for dropdowns
        currentValue,
        hidden = false,
        shouldSave = true
    ) {
        this._title = title
        this._tooltip = tooltip
        this._type = type
        this._values = values
        this._currentValue = currentValue
        this._hidden = hidden
        this._shouldSave = shouldSave
    }

    get title() { return this._title }
    get tooltip() { return this._tooltip }
    get type() { return this._type }
    get values() { return this._values }
    get currentValue() { return this._currentValue }
    get hidden() { return this._hidden }
    get shouldSave() { return this._shouldSave }

    set currentValue(newValue) { this._currentValue = newValue }
}

export const options = [
    new Option("Enable animations", "Enable animations like Generators spinning when hovering over them",
        "switch", null, true),
    new Option("Enable click effect", "Enables a graphical effect when clicking",
        "switch", null, true),
    new Option("Click effect", "What effect to be shown when clicking",
        "dropdown", ["Ripple", "Alternative ripple", "Splash"], 1),
    new Option("Enable click text", "Enables the the text shown when clicking",
        "switch", null, true),
    new Option("Show stats on-screen", "Show statistics like total multiplier, vertice count, amount of upgrades purchased etc. on the main screen",
        "switch", null, false),
    new Option("Framerate", "How many times numbers are calculated each second. Does not affect RPS. High values might have a negative impact on performance",
        "dropdown", [144, 120, 75, 60, 30, 15], 30),
    new Option("Background color update frequency", "How many times the background color refreshes each second. Values higher than 5 might have a negative impact on performance",
        "dropdown", [10, 5, 2, 1], 5),
    new Option("Reset game", "Resets your progress, not just prestige. Make sure you want to do this before continuing!",
        "button", null, "reset"),
    //Hidden options
    new Option("Buy amount", "How many generators to buy at once", "dropdown", ["1x", "5x", "10x", "next", "max"], 0, true, false),
]