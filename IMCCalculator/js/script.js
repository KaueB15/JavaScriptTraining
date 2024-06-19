const data = [
    {
      min: 0,
      max: 18.4,
      classification: "Menor que 18,5",
      info: "Magreza",
      obesity: "0",
    },
    {
      min: 18.5,
      max: 24.9,
      classification: "Entre 18,5 e 24,9",
      info: "Normal",
      obesity: "0",
    },
    {
      min: 25,
      max: 29.9,
      classification: "Entre 25,0 e 29,9",
      info: "Sobrepeso",
      obesity: "I",
    },
    {
      min: 30,
      max: 39.9,
      classification: "Entre 30,0 e 39,9",
      info: "Obesidade",
      obesity: "II",
    },
    {
      min: 40,
      max: 99,
      classification: "Maior que 40,0",
      info: "Obesidade grave",
      obesity: "III",
    },
  ];


// Elements

const imcTable = document.querySelector("#imc-table")

const heightInput = document.querySelector("#height")
const weightInput = document.querySelector("#weight")
const calcButton = document.querySelector("#submit-button")
const clearButton = document.querySelector("#clear-button")

const calcContainer = document.querySelector("#calc-container")
const resultContainer = document.querySelector("#result-container")

const imcNumber = document.querySelector("#imc-number span")
const imcInfo = document.querySelector("#imc-info span")
const backButton = document.querySelector("#back-button")

const arrayInputs = [heightInput, weightInput]

// Functions

const createTable = (data) => {
    data.forEach((item) => {

        const newDiv = document.createElement("div")
        newDiv.classList.add("table-data")

        const classification = document.createElement("p")
        classification.innerText = item.classification

        const info = document.createElement("p")
        info.innerText = item.info

        const obesity = document.createElement("p")
        obesity.innerText = item.obesity

        newDiv.appendChild(classification)
        newDiv.appendChild(info)
        newDiv.appendChild(obesity)

        imcTable.appendChild(newDiv)
    })
}

const clearInputs = () => {
    heightInput.value = ""
    weightInput.value = ""
    imcNumber.classList = ""
    imcInfo.classList = ""
}

const validDigits = (text) => {
    return text.replace(/[^0-9,]/g, "")

}

const calcIMC = (weight, height) => {
    const imc = (weight/(height * height)).toFixed(1)

    return imc

}

const showHide = () => {
    calcContainer.classList.toggle("hide")
    resultContainer.classList.toggle("hide")
}

// Initialize

createTable(data)

// Events

arrayInputs.forEach((el) => {
    el.addEventListener("input", (e) => {
        const updateValue = validDigits(e.target.value)

        e.target.value = updateValue
    })
})

clearButton.addEventListener("click", (e) => {
    e.preventDefault()
    clearInputs()
})

calcButton.addEventListener("click", (e) => {
    e.preventDefault()

    const userWeight = weightInput.value.replace(",", ".")
    const userHeight = heightInput.value.replace(",", ".")

    if (!userWeight || !userHeight) return

    const imcFinal = calcIMC(userWeight, userHeight)

    let info 

    data.forEach((item) => {
        if(imcFinal >= item.min && imcFinal <= item.max){
            info = item.info 
        }
    })

    if (!info) return

    imcNumber.innerText = imcFinal
    imcInfo.innerText = info

    switch(info){
        case "Magreza":
            imcNumber.classList.add("low")
            imcInfo.classList.add("low")
            break
        case "Normal":
            imcNumber.classList.add("good")
            imcInfo.classList.add("good")
            break
        case "Sobrepeso":
            imcNumber.classList.add("low")
            imcInfo.classList.add("low")
            break
        case "Obesidade":
            imcNumber.classList.add("medium")
            imcInfo.classList.add("medium")
            break
        case "Obesidade Grave":
            imcNumber.classList.add("high")
            imcInfo.classList.add("high")
            break
    }

    showHide()
})

backButton.addEventListener("click", () => {
    clearInputs()
    showHide()
})