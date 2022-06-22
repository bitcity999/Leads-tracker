let mySaves = []

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const saveTabBtn = document.getElementById("save-tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")

let savesFromLocalStorage = JSON.parse( localStorage.getItem("mySaves") )

if (savesFromLocalStorage) {
    mySaves = savesFromLocalStorage
    render(mySaves)
}

function render(saves) {
    let listItems = ""

    for (let i = 0; i < saves.length; i++) {

        listItems += `
        <li>
            <a target="_blank" target="_blank" rel="noreferrer noopener" title="save" href="${saves[i]}">
            ${saves[i]}
            </a>
        </li>
        `

        // listItems = document.createElement("li")
        // listItems.textContent = mySaves[i]
        // ulEl.append(listItems)
    }

    ulEl.innerHTML = listItems
}

inputBtn.addEventListener("click", function () {
    mySaves.push(inputEl.value)
    inputEl.value = "";
    localStorage.setItem("mySaves", JSON.stringify(mySaves))
    render(mySaves)
})

saveTabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        mySaves.push(tabs[0].url)
        localStorage.setItem("mySaves", JSON.stringify(mySaves))
        render(mySaves)
    })
})

deleteBtn.addEventListener("click", function() {
    localStorage.clear()
    mySaves = []
    render(mySaves)
})

