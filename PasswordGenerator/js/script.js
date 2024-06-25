// DOM

const generatePasswordButton = document.querySelector("#generate-password")
const generatedPassword = document.querySelector("#generated-password")

const openGenerateButton = document.querySelector("#open-generate-password")
const generatePasswordContainer = document.querySelector("#generate-options")
const lengthInput = document.querySelector("#length")
const lettersInput = document.querySelector("#letters")
const numbersInput = document.querySelector("#numbers")
const symbolsInput = document.querySelector("#symbols")
const copyPasswordButton = document.querySelector("#copy-password")

// FUNCTIONS

const getLetterLowerCase = () => {

    const letterLowerCase = String.fromCharCode(Math.floor(Math.random() * 26) + 97)

    return letterLowerCase
}

const getLetterUpperCase = () => {
    const letterUpperCase = String.fromCharCode(Math.floor(Math.random() * 26) + 65)

    return letterUpperCase
}

const getNumber = () => {
    const number = Math.floor(Math.random() * 10).toString()

    return number
}

const getSymbols = () => {
    const symbols = "=<>/,.!@#$%&*"

    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)]

    return randomSymbol
}

const generatePassword = (getLetterLowerCase, getLetterUpperCase, getSymbols, getNumber) => {
    let password = ""

    const passwordLength = +lengthInput.value

    const generators = []

    if(lettersInput.checked){
        generators.push(getLetterLowerCase, getLetterUpperCase)
    }
    if(numbersInput.checked){
        generators.push(getNumber)
    }
    if(symbolsInput.checked){
        generators.push(getSymbols)
    }
    if(generators.length === 0) return

    for(i = 0; i < passwordLength; i = i+generators.length) {
        
        generators.forEach(() => {
            let randomNumber = Math.floor(Math.random() * generators.length)

            const randomValue = generators[randomNumber]();

            password += randomValue
        })
    }

    password = password.slice(0, passwordLength)

    generatedPassword.style.display = "block"
    generatedPassword.querySelector("h4").innerText = password
}

const showCloseGenerator = () => {
    generatePasswordContainer.classList.toggle("hide")
}

// EVENTS

openGenerateButton.addEventListener("click", (e) => {
    e.preventDefault()
    showCloseGenerator()
})

generatePasswordButton.addEventListener("click", () => {
    generatePassword(getLetterLowerCase, getLetterUpperCase, getSymbols, getNumber)
})

copyPasswordButton.addEventListener("click", (e) => {
    e.preventDefault()

    const password = generatedPassword.querySelector("h4").innerText

    navigator.clipboard.writeText(password).then(() => {
        copyPasswordButton.innerText = "Senha copiada!"

        setTimeout(() => {
            copyPasswordButton.innerText = "Copiar"
        }, 1000)
    })  
})
