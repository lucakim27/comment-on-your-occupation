const socket = io()
const occupationArray = []
var socketid = ''

socket.on('userEnter', (array) => {
    for (var i = 0; i < array.length; i++) {
        occupationArray.push(array[i])
    }
    listOutOccupations()
})

checkIfLoggedIn()

socket.on('updatedComment', (array) => {
    occupationArray = array
})

socket.on('displayId', id => {
    document.getElementById('userAccountId').innerHTML = "Your id: " + id
    document.getElementById('userId').innerHTML = "<img src='../img/accountIMG.jpeg' style='width: 50px; height: 50px; margin-left: 315px; margin-top: -2px; padding: 3px;'>"
})

function listOutOccupations() {
    for (var i = 0; i < occupationArray.length; i++) {
        document.getElementById('divScroll').innerHTML += "<a onclick='directPage(this.innerText)'>" + occupationArray[i][0] + "</a><hr>"
    }
}

function directPage(occupationName) {
    if (getQueryVariable('socketid') == undefined) {
        document.location.href = 'http://localhost:3000/comment?occupation=' + occupationName
    }
    else {
        document.location.href = 'http://localhost:3000/comment?occupation=' + occupationName  + '&socketid=' + getQueryVariable('socketid')
    }
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1)
    var vars = query.split('&')
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=')
        if (decodeURIComponent(pair[0]) == variable) {
            if (decodeURIComponent(pair[1]).includes('+') == false) {
                return decodeURIComponent(pair[1])
            }
            else {
                return decodeURIComponent(pair[1].replaceAll('+', ' '))
            }
        }
    }
}

function checkIfLoggedIn() {
    if (getQueryVariable('socketid') == '' || getQueryVariable('socketid') == undefined) {
        document.getElementById('userId').style.display = 'none'
    }
    else {
        document.getElementById('loginBtn').style.display = 'none'
        socketid = getQueryVariable('socketid')
        socket.emit('getId', socketid)
    }
}

function searchOccupationBtn() {
    document.getElementById('divScroll').innerHTML = ""
    for (var i = 0; i < occupationArray.length; i++) {
        if (occupationArray[i][0].toLowerCase().includes(document.getElementById('userInput').value.toLowerCase()) == true) {
            document.getElementById('divScroll').innerHTML += "<a onclick='directPage(this.innerText)'>" + occupationArray[i][0] + "</a><hr>"
        }
    }
}

function clickProfile() {
    if (document.getElementById('myForm').style.display == 'block') {
        document.getElementById('myForm').style.display = 'none';
    } else {
        document.getElementById('myForm').style.display = 'block';
    }
}

function directToAboutPage() {
    if (getQueryVariable('socketid') == '' || getQueryVariable('socketid') == undefined) {
        document.location.href = 'http://localhost:3000/about'
    }
    else {
        document.location.href = `http://localhost:3000/about?socketid=${getQueryVariable('socketid')}` 
    }
}

function directToChartPage() {
    if (getQueryVariable('socketid') == '' || getQueryVariable('socketid') == undefined) {
        document.location.href = 'http://localhost:3000/chart'
    }
    else {
        document.location.href = `http://localhost:3000/chart?socketid=${getQueryVariable('socketid')}` 
    }
}