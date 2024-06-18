const mainContainer = document.querySelector(".main-container");
const buttonGenerator = document.querySelector("#button-generate");

const urlInput = document.querySelector("#url")

const codeImage = document.querySelector(".qr-box img")


function generateQrCode(){
    const urlValue = urlInput.value

    if(!urlValue) return;

    buttonGenerator.innerHTML = "Gerando Código..."

    codeImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${urlValue}`


    codeImage.addEventListener("load", () => {
        mainContainer.classList.add("qr-visible")
        buttonGenerator.innerHTML = "Código Gerado"
    })
}

buttonGenerator.addEventListener("click", () => {
    generateQrCode()
})

urlInput.addEventListener("keydown", (e) => {
    if (e.code === "Enter"){
        generateQrCode()
    }
})

urlInput.addEventListener("keyup", () => {
    if(!urlInput.value){
        mainContainer.classList.remove("qr-visible")
        buttonGenerator.innerHTML = "Gerar QR Code"
    }
})