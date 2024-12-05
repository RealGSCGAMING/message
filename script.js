const inputbox = document.getElementById("textInput");
const sendButton = document.getElementById("sendButton");
const resetButton = document.getElementById("resetButton");
const reloadButton = document.getElementById("reloadButton");
const textbox = document.getElementById("textBox");
const messagebox = document.getElementById("messages");

function loadMessageVars() {
  const m1 = document.getElementById("m1");
  const m1title = document.getElementById("m1title");
  const m1button = document.getElementById("m1open");
  const m1time = document.getElementById("m1time");
  const m2 = document.getElementById("m2");
  const m2title = document.getElementById("m2title");
  const m2button = document.getElementById("m2opem");
  const m2time = document.getElementById("m2time");
  const m3 = document.getElementById("m3");
  const m3title = document.getElementById("m3title");
  const m3button = document.getElementById("m3opem");
  const m3time = document.getElementById("m3time");
}

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

messageHTML = `<div id="m1" class="paddedBody">
            <p class="messageTitle" id="m1title">Placeholder 1</p><br>
            <p class="messageTime" id="m1time">Opens in 1 second</p><br>
            <button id="m1open" class="smallButton">
              Open
            </button>
            <button id="m1delete" class="smallButton" style="background-color:red;">
              Delete
            </button>
        </div>
        <div id="m2" class="paddedBody">
            <p class="messageTitle" id="m2title">Placeholder 2</p><br>
            <p class="messageTime" id="m2time">Opens in 1 second</p><br>
            <button id="m2open" class="smallButton">
              Open
            </button>
            <button id="m2delete" class="smallButton" style="background-color:red;">
              Delete
            </button>
        </div>
        <div id="m3" class="paddedBody">
            <p class="messageTitle" id="m3title">Placeholder 3</p><br>
            <p class="messageTime" id="m3time">Opens in 1 second</p><br>
            <button id="m3open" class="smallButton">
              Open
            </button>
            <button id="m3delete" class="smallButton" style="background-color:red;">
              Delete
            </button>
        </div>`

function loadMessages() {
  message = getCookie("input")
  messagebox.innerHTML = messageHTML;

  loadMessageVars();

  createMessageDiv(1, message, `[PLACEHOLDER]`, `#4287f5`)

  createMessageDiv(2, "<--- this message...", `[PLACEHOLDER]`, `#d8e617`)

  createMessageDiv(3, "...has what you type below", `[PLACEHOLDER]`, `#bc17e6`)
  
  messagebox.style = "display: block;";
}

function addMessage(number, msg, time, color) {
  
}

function createMessageDiv(number, title, time, color) {
  if (number == 1) {
    m1title.innerHTML = title
    m1.style = `border-color: ${color}; background-color: ${brighterColor(color)}`
    m1time.innerHTML = `Opens in ${time} seconds`
  }

  if (number == 2) {
    m2title.innerHTML = title
    m2.style = `border-color: ${color}; background-color: ${brighterColor(color)}`
    m2time.innerHTML = `Opens in ${time} seconds`
  }

  if (number == 3) {
    m3title.innerHTML = title
    m3.style = `border-color: ${color}; background-color: ${brighterColor(color)}`
    m3time.innerHTML = `Opens in ${time} seconds`
  }
}

function brighterColor(color) {
   const hexToRgb = (hex) => hex.match(/\w\w/g).map(x => parseInt(x, 16));
   const [r, g, b] = hexToRgb(color);
   const brighterR = Math.min(255, Math.floor(r * 1.5));
   const brighterG = Math.min(255, Math.floor(g * 1.5));
   const brighterB = Math.min(255, Math.floor(b * 1.5));
   const rgbToHex = (r, g, b) => "#" + [r, g, b].map(x => {
     const hex = x.toString(16);
     return hex.length === 1 ? "0" + hex : hex;
   }).join('');
   return rgbToHex(brighterR, brighterG, brighterB);
 }

sendButton.addEventListener("click", function () {
  setCookie("input", inputbox.value, 1);
});

reloadButton.addEventListener("click", function () {
  location.reload();
});

resetButton.addEventListener("click", function () {
  setCookie("input", null, 0);
  location.reload();
});

if (getCookie("input") != null) {
  resetButton.style = "background-color: red; display: block;";
  loadMessages();
}