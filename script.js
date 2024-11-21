const inputbox = document.getElementById("textInput");
const button = document.getElementById("sendButton");
const textbox = document.getElementById("textBox");

button.addEventListener("click", function () {
  textbox.innerHTML = inputbox.value;
});
