const inputbox = document.getElementById("textInput");
const sendButton = document.getElementById("sendButton");
const resetButton = document.getElementById("resetButton");
const reloadButton = document.getElementById("reloadButton");
const textbox = document.getElementById("textBox");

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function write(text) {
  textbox.innerHTML = text;
}

function loadMessages() {}

sendButton.addEventListener("click", function () {
  write("saved input to cookie");
  setCookie("input", inputbox.value, 1);
  inputbox.style = "display:none;";
  sendButton.style = "display:none;";
});

reloadButton.addEventListener("click", function () {
  location.reload();
});

resetButton.addEventListener("click", function () {
  setCookie("input", null, 0);
  write("deleted cookie");
  resetButton.style = "display: none;";
});

if (getCookie("input") != null) {
  write('youve been here before and wrote: "' + getCookie("input") + '"');
  resetButton.style = "background-color: red; display: block;";
  inputbox.style = "display:none;";
  sendButton.style = "display:none;";
}
