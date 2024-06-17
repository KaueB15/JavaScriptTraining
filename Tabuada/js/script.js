const buttonCalcule = document.querySelector("button")
const multiplicationForm = document.querySelector("form")
const multiplicationInput = document.querySelector("#number-times")
const numberInput = document.querySelector("#number-tabuada")
const multiplicationResults = document.querySelector(".multiplication-operations")
const title = document.querySelector("#multiplication-title span")


const creationTable = (number, multiplicator) => {
    multiplicationResults.innerHTML = ""

    for(let i = 1; i <= multiplicator; i++){

        const result = number * i

        const template = `<div class="row">
                            <div class="operation">${number} x ${i} =</div>
                            <div class="result">${result}</div>
                        </div>`

        console.log(template)

        const parser = new DOMParser()

        const htmlTemplate = parser.parseFromString(template, "text/html")

        const row = htmlTemplate.querySelector(".row")

        multiplicationResults.appendChild(row)
    }

    title.innerText = number
}


buttonCalcule.addEventListener("click", (e) => {
    e.preventDefault()

    const multiplicationNumber = +numberInput.value

    const multiplicatorNumber = +multiplicationInput.value

    if(!multiplicationNumber || !multiplicatorNumber){
        return
    }

    creationTable(multiplicationNumber, multiplicatorNumber)
})