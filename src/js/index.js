const userInput = document.getElementById("userInput")
const output = document.getElementById("output")
const searchBtn = document.getElementById("searchBtn")
const header = document.getElementById("header")
const occupationArray = [["software engineer", [], [], []], ["software developer", [], [], []], ["programmer", [], [], []]]
const socket = io()

socket.on('enter', (array) => {
    console.log(array)
})

function searchOccupation() {
    searchBtn.value = ''
    displayOccupation(userInput, output)
    userInput.value = ''
}

function displayOccupation(userInput, output) {
    output.innerHTML = ''
    for (var i=0; i < occupationArray.length; i++) {
        if (occupationArray[i][0].toLowerCase().includes(userInput.value.toLowerCase()) == true) {
            output.innerHTML += `<a href="#" onclick="displayComment(${i})">${occupationArray[i][0]}</a><hr>`
        }
    }
}

function displayComment(value) {
    header.innerHTML = `${occupationArray[value][0]}`
    header.setAttribute("href", "#")
    userInput.value = ''
    output.innerHTML = ''
    searchBtn.innerText = "comment"
    searchBtn.setAttribute("onclick", "comment()")
}

function comment() {

    output.innerHTML = ""

    // iterate occupationArray array
    for (var i = 0; i < occupationArray.length; i++) {
        // if it matches with header and not none
        if (occupationArray[i][0] == header.innerText && userInput.value != "") {
            // insert values into occupationArray
            occupationArray[i][1].push(userInput.value)
            occupationArray[i][2].push(0)
            occupationArray[i][3].push(0)
            userInput.value = ''
        }
    }

    for (var i = 0; i < occupationArray.length; i++) {
        if (occupationArray[i][0] == header.innerText) {
            for(var j = 0; j < occupationArray[i][1].length; j++) {
                output.innerHTML += `<p>${occupationArray[i][1][j]}</p><button onclick=like(this.id) id="${occupationArray[i][1][j]}+">${occupationArray[i][2][j]} Likes</button>`
                output.innerHTML += `<button onclick="dislike(this.id)" id="${occupationArray[i][1][j]}-">${occupationArray[i][3][j]} Dislikes</button><hr>`
            }
        }
    }
}

function like(clicked_id) {

    for (var i = 0; i < occupationArray.length; i++) {
        if (occupationArray[i][0] == header.innerText) {
            for (var j = 0; j < occupationArray[i][1].length; j++) {
                if (occupationArray[i][1][j] + "+" == clicked_id) {
                    occupationArray[i][2][j]++
                }
            }
        }
    }

    output.innerHTML = ""

    for (var i = 0; i < occupationArray.length; i++) {
        if (occupationArray[i][0] == header.innerText) {
            for(var j = 0; j < occupationArray[i][1].length; j++) {
                output.innerHTML += `<p>${occupationArray[i][1][j]}</p><button onclick=like(this.id) id="${occupationArray[i][1][j]}+">${occupationArray[i][2][j]} Likes</button>`
                output.innerHTML += `<button onclick="dislike(this.id)" id="${occupationArray[i][1][j]}-">${occupationArray[i][3][j]} Dislikes</button><hr>`
            }
        }
    }


}

function dislike(clicked_id) {
    for (var i = 0; i < occupationArray.length; i++) {
        if (occupationArray[i][0] == header.innerText) {
            for (var j = 0; j < occupationArray[i][1].length; j++) {
                if (occupationArray[i][1][j] + "-" == clicked_id) {
                    occupationArray[i][3][j]++
                }
            }
        }
    }

    output.innerHTML = ""

    for (var i = 0; i < occupationArray.length; i++) {
        if (occupationArray[i][0] == header.innerText) {
            for(var j = 0; j < occupationArray[i][1].length; j++) {
                output.innerHTML += `<p>${occupationArray[i][1][j]}</p><button onclick=like(this.id) id="${occupationArray[i][1][j]}+">${occupationArray[i][2][j]} Likes</button>`
                output.innerHTML += `<button onclick="dislike(this.id)" id="${occupationArray[i][1][j]}-">${occupationArray[i][3][j]} Dislikes</button><hr>`
            }
        }
    }
}

function show() {
    console.log(occupationArray)

    document.getElementById("myForm").style.display = "block"

}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}