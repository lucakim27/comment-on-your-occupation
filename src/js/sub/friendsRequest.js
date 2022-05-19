const socket = io()
const pendingFriendsRequestTable = document.getElementById("pendingFriendsRequest")

socket.on('getUsername', () => {
    socket.emit('passBackUsername', $("#userId").text())
})

socket.on('getFriendsRequestPending', (array) => {
    pendingFriendsRequestTable.innerHTML = '<tbody></tbody>'
    displayPendingFriendsRequestTable(0, array)
})

const acceptFriendsRequest = function(counterpart) {
    socket.emit('acceptFriendsRequest', counterpart, $("#userId").text())
    removeRowInTable('pendingFriendsRequest', counterpart)
}

const declineFriendsRequest = function(counterpart) {
    alert(`You just declined the friends request from '${counterpart}'.`)
    removeRowInTable('pendingFriendsRequest', counterpart)
}

const displayPendingFriendsRequestTable = function(i, array) {
    if (i < array.length) {
        var row = pendingFriendsRequestTable.getElementsByTagName('tbody')[0].insertRow(i).insertCell(0)
        row.innerHTML = array[i]  + `<button style='width: 50px; margin-left: 30px;' id='${array[i]}' onclick='acceptFriendsRequest(this.id)'>O</button><button style='width: 50px; margin-left: 30px;' onclick='declineFriendsRequest(this.id)'>X</button>`
        displayPendingFriendsRequestTable(i+1, array)
    }
}

const removeRowInTable = function(tableId, counterpart) {
    $(`#${tableId} tr`).each(function() {
        $(this).find('td').each(function() {
            if (counterpart + "OX" === this.innerText) {
                pendingFriendsRequestTable.deleteRow(this)
            }
        })
    })
}