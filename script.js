// important elements

const inputbox = document.getElementById("textInput");
const timebox = document.getElementById("timeInput");
const titlebox = document.getElementById("titleInput");
const sendButton = document.getElementById("sendButton");
const resetButton = document.getElementById("resetButton");
const reloadButton = document.getElementById("reloadButton");
const textbox = document.getElementById("textBox");
const messagebox = document.getElementById("messages");
const messageView = document.getElementById("messageView");
const messageTitleView = document.getElementById("messageTitleView");
const messageTextView = document.getElementById("messageTextView");
const messageClose = document.getElementById("messageClose");

// message elements

const m1 = document.getElementById("m1");
const m1title = document.getElementById("m1title");
const m1button = document.getElementById("m1open");
const m1delete = document.getElementById("m1delete");
const m1open = document.getElementById("m1open");
const m1time = document.getElementById("m1time");
const m2 = document.getElementById("m2");
const m2title = document.getElementById("m2title");
const m2button = document.getElementById("m2open");
const m2time = document.getElementById("m2time");
const m3 = document.getElementById("m3");
const m3title = document.getElementById("m3title");
const m3button = document.getElementById("m3open");
const m3time = document.getElementById("m3time");

// utilities

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

function clearCookies() {
  document.cookie.split(";").forEach((cookie) => {
    setCookie(cookie, 0, -1);
  });
  location.reload();
}

function brighterColor(color) {
  const hexToRgb = (hex) => hex.match(/\w\w/g).map((x) => parseInt(x, 16));
  const [r, g, b] = hexToRgb(color);
  const brighterR = Math.min(255, Math.floor(r * 1.5));
  const brighterG = Math.min(255, Math.floor(g * 1.5));
  const brighterB = Math.min(255, Math.floor(b * 1.5));
  const rgbToHex = (r, g, b) =>
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("");
  return rgbToHex(brighterR, brighterG, brighterB);
}

// placeholders
{
  inputbox.addEventListener("click", function() {
    if (inputbox.innerHTML == "message content") {
      inputbox.innerHTML = ""
    }
  })

  titlebox.addEventListener("click", function() {
    if (titlebox.innerHTML == "message title") {
      titlebox.innerHTML = ""
    }
  })
}
  

// message functions

function loadMessages() {
  createMessageDiv(1, getCookie("m1title"), getCookie("m1time"));
  m1.style = "display: block;";

  if (getCookie("m2title") != null) {
    createMessageDiv(2, getCookie("m2title"), getCookie("m2time"));
    m2.style = "display: block;";
  }

  if (getCookie("m3title") != null) {
    createMessageDiv(3, getCookie("m3title"), getCookie("m3time"));
    m3.style = "display: block;";
  }

  messagebox.style = "display: block;";
}

function addMessage(title, msg, time) {
  if (getCookie("m1title") == null) {
    setCookie("m1title", title, 365);
    setCookie("m1text", msg, 365);
    setCookie("m1time", time, 365);
    loadMessages();
    return;
  }

  if (getCookie("m2title") == null) {
    setCookie("m2title", title, 365);
    setCookie("m2text", msg, 365);
    setCookie("m2time", time, 365);
    loadMessages();
    return;
  }

  if (getCookie("m3title") == null) {
    setCookie("m3title", title, 365);
    setCookie("m3text", msg, 365);
    setCookie("m3time", time, 365);
    loadMessages();
    return;
  } else {
    alert("you have max messages, delete one to continue");
  }
}

function createMessageDiv(number, title, time) {
  date = time.split("T")[0];
  time = time.split("T")[1];

  if (number == 1) {
    m1title.innerHTML = title;
    m1time.innerHTML = `Opens on ${date} at ${time}`;
  }

  if (number == 2) {
    m2title.innerHTML = title;
    m2time.innerHTML = `Opens on ${date} at ${time}`;
  }

  if (number == 3) {
    m3title.innerHTML = title;
    m3time.innerHTML = `Opens on ${date} at ${time}`;
  }
}

function deleteMessage(number) {
  if (number == 1) {
    setCookie("m1title", "", -1);
    setCookie("m1text", "", -1);
    setCookie("m1time", "", -1);
    m1.style = "display: none;";
  }

  if (number == 2) {
    setCookie("m2title", "", -1);
    setCookie("m2text", "", -1);
    setCookie("m2time", "", -1);
    m2.style = "display: none;";
  }

  if (number == 3) {
    setCookie("m3title", "", -1);
    setCookie("m3text", "", -1);
    setCookie("m3time", "", -1);
    m3.style = "display: none;";
  }

  if (
    getCookie("m1title") == null &&
    getCookie("m2title") == null &&
    getCookie("m3title") == null
  ) {
    messagebox.style = "display:none;";
    resetButton.style = "display:none;";
  }
}

function openMessage(number) {

  messageView.style = "display: block; position: fixed; right: 35%; top: 25%";
  
  if (number == 1) {
    messageTitleView.innerHTML = getCookie("m1title");
    messageTextView.innerHTML = getCookie("m1text");
  }

  if (number == 2) {
    messageTitleView.innerHTML = getCookie("m2title");
    messageTextView.innerHTML = getCookie("m2text");
  }

  if (number == 3) {
    messageTitleView.innerHTML = getCookie("m3title");
    messageTextView.innerHTML = getCookie("m3text");
  }
}

sendButton.addEventListener("click", function () {
  addMessage(titlebox.innerHTML, inputbox.innerHTML, timebox.value);
});

reloadButton.addEventListener("click", function () {
  location.reload();
});

resetButton.addEventListener("click", function () {
  clearCookies();
});

messageClose.addEventListener("click", function() {
  messageView.style = "display: none;";
})



if (
  getCookie("m1title") != null ||
  getCookie("m2title") != null ||
  getCookie("m3title") != null
) {
  resetButton.style = "background-color: red; display: block;";
  loadMessages();
}

// delete buttons
{
  m1delete.addEventListener("click", function () {
    deleteMessage(1);
  });
  m2delete.addEventListener("click", function () {
    deleteMessage(2);
  });
  m3delete.addEventListener("click", function () {
    deleteMessage(3);
  });
}

// open buttons
{
  m1open.addEventListener("click", function () {
    openMessage(1);
  });

  m2open.addEventListener("click", function () {
    openMessage(2);
  });

  m3open.addEventListener("click", function () {
    openMessage(3);
  });
}