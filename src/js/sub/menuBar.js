const sidebarOpen = function() {
  $("#mySidebar").css('display', 'block')
}

const sidebarClose = function() {
  $("#mySidebar").css('display', 'none')
}

var renderMenubar;
(renderMenubar = function(){
  var div = document.createElement('div')
  div.innerHTML = `
    <img src="../img/menuBar.png" onclick="sidebarOpen()" alt="menuBar" class="menuBar dropbtn" style="width:70px; height:70px;">
    <div class="w3-sidebar w3-bar-block w3-border-right" style="display: none; margin-top: -120px;" id="mySidebar">
      <button onclick="sidebarClose()" class="w3-bar-item w3-large" style='background-color: rgb(54, 153, 207); color: white;'>Close &times;</button>
      <a href="/home" class="w3-bar-item w3-button">Home</a>
      <a href="/online" class="w3-bar-item w3-button">Online</a>
      <a href="/chat" class="w3-bar-item w3-button">Chat</a>
      <a href="/chart" class="w3-bar-item w3-button">Chart</a>
      <a href="/about" class="w3-bar-item w3-button">About</a>
      <a onclick="window.location.href = 'mailto:nikolaikim27@google.com'" class="w3-bar-item w3-button">Contact</a>
    </div>
  `
  for (var i = 0; i < div.getElementsByTagName('a').length; i++) {
    if (window.location.pathname === div.getElementsByTagName('a')[i].pathname) {
      div.getElementsByTagName('a')[i].style.color = 'rgb(54, 153, 207)'
    }
  }
  document.querySelector('header').appendChild(div)
})()
