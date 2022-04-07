const socket = io()

function submitRequest() {
    socket.emit('sendRequest', [document.getElementById('occupationName'), document.getElementById('Reason')])
}

socket.on('requestSuccessful', value => {
    document.querySelector('center').innerHTML = 'Your request has been sent successfully.'
})

socket.emit('addOnlineUser', document.getElementById('userId').innerText)
