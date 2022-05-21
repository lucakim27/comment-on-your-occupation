const loggedinUserTable = document.getElementById("loggedinUser")
const friendsListTable = document.getElementById("friendsList")

socket.emit('addOnlineUser', $("#userId").text())

socket.on('getOnlineUsers', (onlineUsers) => {
    loggedinUserTable.innerHTML = '<thead></thead><tbody></tbody>'
    var header = loggedinUserTable.getElementsByTagName('thead')[0].insertRow(0).insertCell(0)
    header.innerHTML = `<b>Online users</b>`
    const keys = Object.keys(onlineUsers)
    var tableIndex = 0
    keys.forEach((key) => {
        if (onlineUsers[key] != 'anonymous' && onlineUsers[key] != $("#userId").text()) {
            var row = loggedinUserTable.getElementsByTagName('tbody')[0].insertRow(tableIndex).insertCell(0)
            var a = document.createElement('a')
            a.innerHTML = `${onlineUsers[key]}`
            a.setAttribute('data-toggle', 'modal')
            a.setAttribute('data-target', '#showOtherUserProfileModal')
            a.setAttribute('onclick', `putDetailsInOnlineUserModal('${onlineUsers[key]}')`)
            row.appendChild(a)
            tableIndex++
        }
    })
})

socket.on('getFriendsList', (friendsList) => {
    friendsListTable.innerHTML = '<thead></thead><tbody></tbody>'
    var header = friendsListTable.getElementsByTagName('thead')[0].insertRow(0).insertCell(0)
    header.innerHTML = `<b>Your friends</b>`
    if (friendsList === null) return 0
    else {
        displayGetFriendsListTable(0, friendsList)
    }
})

socket.on('updateFriendsRequest', (PendingFriendsRequest) => {
    pendingFriendsRequestTable.innerHTML = '<tbody></tbody>'
    displayUpdateFriendsRequest(0, PendingFriendsRequest)
})

socket.on('declineFriendsRequest', (val) => {
    if (val === 0) {
        alert("You can't request friends because you're already friends with him/her.")
    } else if (val === 1) {
        alert("You can't request friends because you've already sent friends request to him/her.")
    }
})

const putDetailsInOnlineUserModal = function(name) {
    $('.modal-title').html(name)
}

const requestFriends = function() {
    socket.emit('friendsRequest', $('.modal-title').html(), $("#userId").text())
}

const sendChats = function() {
    window.location = 'http://localhost:3000/chat'
}

const displayGetFriendsListTable = function(i, friendsList) {
    if (i < friendsList.length) {
        var row = friendsListTable.getElementsByTagName('tbody')[0].insertRow(i).insertCell(0)
        row.innerHTML = friendsList[i]
        displayGetFriendsListTable(i+1, friendsList)
    }
}

const displayUpdateFriendsRequest = function(i, PendingFriendsRequest) {
    if (i < PendingFriendsRequest.length) {
        var row = pendingFriendsRequestTable.getElementsByTagName('tbody')[0].insertRow(i).insertCell(0)
        row.innerHTML = PendingFriendsRequest[i]  + `<button style='width: 50px; margin-left: 30px;' id='${PendingFriendsRequest[i]}' onclick='acceptFriendsRequest(this.id)'>O</button><button style='width: 50px; margin-left: 30px;' id='${PendingFriendsRequest[i]}' onclick='declineFriendsRequest(this.id)'>X</button>`
        displayUpdateFriendsRequest(i+1, PendingFriendsRequest)
    }
}