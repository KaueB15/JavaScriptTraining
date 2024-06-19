const buttons = document.querySelectorAll(".color-picker li");
const image = document.querySelector("#product-image")

buttons.forEach((button) => {

    button.addEventListener("click", (e) => {
        
        buttons.forEach((button) => {
            button.querySelector(".color").classList.remove("selected")
        })

        const button = e.target

        const idButton = button.getAttribute("id")

        button.querySelector(".color").classList.add("selected")

        image.classList.add("changing")
        image.setAttribute("src", `img/iphone_${idButton}.jpg`)
    })
});