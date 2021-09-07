function randomInt(max) {
    return Math.floor(Math.random() * max)
}

function properNounCase(word) {
    return `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`
}



function inputFactory() {
    const newTD = document.createElement("td")
    newTD.classList.add("col-11")

    const newInput = document.createElement("input")
    newInput.style.width = "100%"
    newInput.addEventListener("keydown", nextOnEnter, true)
    newInput.addEventListener("blur", leaveOnClick, true)
    newTD.appendChild(newInput)

    return newTD
}

function delOptionFactory() {
    const newTD = document.createElement("td")
    newTD.classList.add("col-1")

    const newBtn = document.createElement("button")
    newBtn.classList.add("btn")
    newBtn.classList.add("btn-primary")
    newBtn.classList.add("btn-floating")
    newBtn.setAttribute("onclick", "delOption(this)")

    const newIcon = document.createElement("i")
    newIcon.classList.add("fas")
    newIcon.classList.add("fa-times-circle")

    newBtn.appendChild(newIcon)
    newTD.appendChild(newBtn)

    return newTD
}

function addOptionFactory() {
    const newTD = document.createElement("td")
    newTD.classList.add("col-1")

    const newBtn = document.createElement("button")
    newBtn.classList.add("btn")
    newBtn.classList.add("btn-primary")
    newBtn.classList.add("btn-floating")
    newBtn.setAttribute("onclick", "addOption(this)")

    const newIcon = document.createElement("i")
    newIcon.classList.add("fas")
    newIcon.classList.add("fa-plus-circle")

    newBtn.appendChild(newIcon)
    newTD.appendChild(newBtn)

    return newTD
}

function addOption() {
    const options = document.getElementById("options-body")
    const newOptionNo = options.childElementCount
    console.log(newOptionNo)

    if (newOptionNo != 0) {
        const lastTR = options.children[newOptionNo - 1]
        lastTR.children[1].remove()
        const firstDelTD = delOptionFactory()
        lastTR.appendChild(firstDelTD)
    }

    const newTR = document.createElement("tr")
    const newInputTD = inputFactory()

    const newAddTD = addOptionFactory()

    newTR.appendChild(newInputTD)
    newTR.appendChild(newAddTD)
    options.appendChild(newTR)
}

function delOption(e) {
    /*
        button is the grandchild element of the tr that we will want to delete 
    */
    const options = document.getElementById("options-body")
    const rowToDel = e.parentElement.parentElement
    rowToDel.remove()
    const numOptions = options.childElementCount
    if (numOptions == 1) {
        const firstTR = options.children[0]
        const firstDelTD = firstTR.children[1]
        firstDelTD.remove()
        const firstAddTD = addOptionFactory()
        firstTR.appendChild(firstAddTD)
    }

}

function leaveOnClick(e) {
    checkInputValue(e.target)
}

function nextOnEnter(e) {
    if (e.keyCode === 13) {
        const input = e.target
        input.blur();
        checkInputValue(input)
    }
}

function checkInputValue(input) {
    inputDom.style.border = "solid"
    inputDom.style.borderWidth = "thin"
    inputDom.style.borderRadius = "2px"

    if (input.value.trim() == "") {
        inputDom.style.borderColor = "red"
    } else {
        inputDom.style.borderColor = "black"
    }
}


function pickMe() {
    const options = document.getElementById("options-body")
    const numOptions = options.childElementCount

    let foundEmpty = false
    for (let i = 0; i < numOptions; i++) {
        let option = options.children[i].children[0].children[0]
        if (option.value.trim() == "") {
            inputStyleError(option)
            foundEmpty = true
        }
    }
    if (foundEmpty) {
        alert("Some of our options are empty!")
        return
    } else {
        const rowNo = randomInt(numOptions)
        console.log(rowNo)
        const foundRow = options.children[rowNo]
        const choice = foundRow.children[0].children[0].value
        document.getElementById("decision").textContent = `${properNounCase(choice)} has been chosen for you!`
    }
}