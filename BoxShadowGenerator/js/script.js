class BoxShadowGenerator {
    constructor(horizontal, horizontalValue, vertical, verticalValue, blur, blurValue, spread, spreadValue, color, colorValue, opacity, opacityValue, inset, previewBox, rule, webkitRule, mozRule) {
        this.horizontal = horizontal
        this.horizontalValue = horizontalValue
        this.vertical = vertical
        this.verticalValue = verticalValue
        this.blur = blur
        this.blurValue = blurValue
        this.spread = spread
        this.spreadValue = spreadValue
        this.color = color
        this.colorValue = colorValue
        this.opacity = opacity
        this.opacityValue = opacityValue
        this.inset = inset
        this.insetValue = insetInput.checked
        this.previewBox = previewBox
        this.rule = rule
        this.webkitRule = webkitRule
        this.mozRule = mozRule
    }

    initialize() {
        this.horizontalValue.value = this.horizontal.value
        this.verticalValue.value = this.vertical.value
        this.blurValue.value = this.blur.value
        this.spreadValue.value = this.spread.value
        this.colorValue.value = this.color.value
        this.opacityValue.value = this.opacity.value

        this.applyRule()
        this.showRule()
    }

    applyRule() {
        const rgbValue = this.hexToRgb(this.colorValue.value)

        console.log(this.insetValue);

        this.previewBox.style.boxShadow = `${this.insetValue ? "inset" : ""} ${this.horizontalValue.value}px ${this.verticalValue.value}px ${this.blurValue.value}px ${this.spreadValue.value}px rgba(${rgbValue}, ${this.opacityValue.value})`
        this.currentRule = this.previewBox.style.boxShadow
    }

    showRule() {
        this.rule.innerText = this.currentRule
        this.webkitRule.innerText = this.currentRule
        this.mozRule.innerText = this.currentRule
    }

    updateValue(type, value) {
        switch (type) {
            case "horizontal":
                this.horizontalValue.value = value
                break
            case "vertical":
                this.verticalValue.value = value
                break
            case "blur":
                this.blurValue.value = value
                break
            case "spread":
                this.spreadValue.value = value    
                break
            case "color":
                this.colorValue.value = value        
                break
            case "opacity":
                this.opacityValue.value = value
                break
            case "inset":
                this.insetValue = value    
        }

        this.applyRule()
        this.showRule()
    }

    hexToRgb(hex) {
        return `${("0x" + hex[1] + hex[2]) | 0}, ${("0x" + hex[3] + hex[4]) | 0}, ${
            ("0x" + hex[5] + hex[6]) | 0}`
    }
}

// DOM

const horizontalInput = document.querySelector("#horizontal")
const horizontalValueInput = document.querySelector("#horizontal-value")

const verticalInput = document.querySelector("#vertical")
const verticalValueInput = document.querySelector("#vertical-value")

const blurInput = document.querySelector("#blur")
const blurValueInput = document.querySelector("#blur-value")

const spreadInput = document.querySelector("#spread")
const spreadValueInput = document.querySelector("#spread-value")

const colorInput = document.querySelector("#color")
const colorValueInput = document.querySelector("#color-value")

const opacityInput = document.querySelector("#opacity")
const opacityValueInput = document.querySelector("#opacity-value")

const insetInput = document.querySelector("#inset")

const previewBox = document.querySelector(".box")

const rule = document.querySelector("#rule span")
const webkitRule = document.querySelector("#webkit-rule span")
const mozRule = document.querySelector("#moz-rule span")

const rulesCopy = document.querySelector("#rules-area")
const copyInstructions = document.querySelector("#copy-instructions")

const boxShadow = new BoxShadowGenerator(horizontalInput, horizontalValueInput, verticalInput, verticalValueInput, blurInput, blurValueInput, spreadInput, spreadValueInput, colorInput, colorValueInput, opacityInput, opacityValueInput, insetInput, previewBox, rule, webkitRule, mozRule)

// FUNCTIONS



//  EVENTS

horizontalInput.addEventListener("input", (e) => {
    const targetValue = e.target.value

    boxShadow.updateValue("horizontal", targetValue)
})

verticalInput.addEventListener("input", (e) => {
    const targetValue = e.target.value

    boxShadow.updateValue("vertical", targetValue)
})

blurInput.addEventListener("input", (e) => {
    const targetValue = e.target.value

    boxShadow.updateValue("blur", targetValue)
})

spreadInput.addEventListener("input", (e) => {
    const targetValue = e.target.value

    boxShadow.updateValue("spread", targetValue)
})

colorInput.addEventListener("input", (e) => {
    const targetValue = e.target.value

    boxShadow.updateValue("color", targetValue)
})

opacityInput.addEventListener("input", (e) => {
    const targetValue = e.target.value

    boxShadow.updateValue("opacity", targetValue)
})

insetInput.addEventListener("input", (e) => {
    const targetValue = e.target.checked

    boxShadow.updateValue("inset", targetValue)
})

rulesCopy.addEventListener("click", (e) => {
    const rules = rulesCopy.innerText.replace(/^\s*\n/gm, "")

    navigator.clipboard.writeText(rules).then(() => {
        copyInstructions.innerText = "Regra copiada com sucesso"

        setTimeout(() => {
            copyInstructions.innerText = "Clique no quadro acima para copiar as regras"
        }, 1000)
    })
})

// INITIALIZE

boxShadow.initialize()