// important elements

const inputbox = document.getElementById("textInput");
const timebox = document.getElementById("timeInput");
const titlebox = document.getElementById("titleInput");
const sendButton = document.getElementById("sendButton");
const resetButton = document.getElementById("resetButton");
const reloadButton = document.getElementById("reloadButton");
const tutorialButton = document.getElementById("tutorialButton");
const tutorialButton2 = document.getElementById("tutorialButton2");
const refreshButton = document.getElementById("refreshButton");
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
const m2delete = document.getElementById("m2delete");
const m2time = document.getElementById("m2time");
const m3 = document.getElementById("m3");
const m3title = document.getElementById("m3title");
const m3button = document.getElementById("m3open");
const m3delete = document.getElementById("m3delete");
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
  if (!confirm("are you sure you want to delete ALL MESSAGES?")) {
    return;
  }

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
  inputbox.addEventListener("click", function () {
    if (inputbox.innerHTML == "message content") {
      inputbox.innerHTML = "";
    }
  });

  titlebox.addEventListener("click", function () {
    if (titlebox.innerHTML == "message title") {
      titlebox.innerHTML = "";
    }
  });
}

tutorial = false;

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
  tutorialButton.style = "display: none;";
  tutorialButton2.style = "display: block;";
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

  dateData = date.split("-");
  timeData = time.split(":");
  hour = timeData[0];

  if (hour > 12) {
    hour = hour - 12;
    timeData[0] = hour;
    timeData[2] = "PM";
  } else {
    timeData[2] = "AM";
  }

  timeText = `Opens on ${dateData[1]}-${dateData[2]}-${dateData[0]} at ${timeData[0]}:${timeData[1]} ${timeData[2]}`;

  if (number == 1) {
    m1title.innerHTML = title;
    m1time.innerHTML = timeText;
  }

  if (number == 2) {
    m2title.innerHTML = title;
    m2time.innerHTML = timeText;
  }

  if (number == 3) {
    m3title.innerHTML = title;
    m3time.innerHTML = timeText;
  }
}

function deleteMessage(number) {
  if (!confirm("are you sure you want to delete this message?")) {
    return;
  }

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

function checkIfOpen(number) {
  currentDate = new Date();
  var day = String(currentDate.getDate()).padStart(2, "0");
  var month = String(currentDate.getMonth() + 1).padStart(2, "0");
  var year = currentDate.getFullYear();
  var hour = String(currentDate.getHours()).padStart(2, "0");
  var minute = String(currentDate.getMinutes()).padStart(2, "0");

  if (number == 1) {
    messageDate = getCookie("m1time").split("T")[0];
    messageTime = getCookie("m1time").split("T")[1];
  }

  if (number == 2) {
    messageDate = getCookie("m2time").split("T")[0];
    messageTime = getCookie("m2time").split("T")[1];
  }

  if (number == 3) {
    messageDate = getCookie("m3time").split("T")[0];
    messageTime = getCookie("m3time").split("T")[1];
  }

  dateData = messageDate.split("-");
  timeData = messageTime.split(":");
  hour = timeData[0];

  if (dateData[0] < year) {
    return true;
  }
  if (dateData[0] == year) {
    if (dateData[1] < month) {
      return true;
    }
    if (dateData[1] == month) {
      if (dateData[2] < day) {
        return true;
      }
      if (dateData[2] == day) {
        if (timeData[0] < hour) {
          return true;
        }
        if (timeData[0] == hour) {
          if (timeData[1] < minute) {
            return true;
          }
          if (timeData[1] == minute) {
            return true;
          }
        }
      }
    }
  }

  return false;
}

function openMessage(number) {
  if (!checkIfOpen(number)) {
    alert("you can't open this message yet");
    return;
  }

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

function showTutorial() {
  messageView.style =
    "display: block; position: fixed; right: %; top: -1%; width: 75%;";
  messageTitleView.innerHTML = "Tutorial";
  messageTextView.innerHTML = `
  <h2>Creating messages</h2>
  Type your message title in the first box and your text in the second box. Enter the date that the message will open in the third box. Then, click the <b>Send</b> button.
  <h2>Using messages</h2>
  When a message can be opened, click the <b>Open</b> button to view it. You can also delete them by clicking the <b>Delete</b> button.
  <h2>Refreshing messages</h2>
  Due to browser limitations, the website requires you to return once every year and reset your cookie. To do this, click the <b>Refresh Messages</b> button. 
  <h2>Deleting data</h2>
  To delete your data for this website, click the <b>Clear Data</b> button. You can also manually delete the cookie through your browser settings.
  <h2>Thank you for visiting!</h2>
  `;
}

function refreshMessages() {
  var rfchecked;
  if (getCookie("m1title") != null) {
    rftitle = getCookie("m1title");
    rftext = getCookie("m1text");
    rftime = getCookie("m1time");
    setCookie("m1title", rftitle, 365);
    setCookie("m1text", rftext, 365);
    setCookie("m1time", rftime, 365);
    loadMessages();
    rfchecked = true;
  }

  if (getCookie("m2title") != null) {
    rftitle = getCookie("m2title");
    rftext = getCookie("m2text");
    rftime = getCookie("m2time");
    setCookie("m2title", rftitle, 365);
    setCookie("m2text", rftext, 365);
    setCookie("m2time", rftime, 365);
    loadMessages();
    rfchecked = true;
  }

  if (getCookie("m3title") != null) {
    rftitle = getCookie("m3title");
    rftext = getCookie("m3text");
    rftime = getCookie("m3time");
    setCookie("m3title", rftitle, 365);
    setCookie("m3text", rftext, 365);
    setCookie("m3time", rftime, 365);
    loadMessages();
    rfchecked = true;
  }

  if (rfchecked) {
    alert(
      "messages refreshed successfully. make sure to refresh them at least once a year!",
    );
  } else {
    alert("found no messages to refresh");
  }
}

tutorialButton.addEventListener("click", function () {
  showTutorial();
  tutorial = true;
});

tutorialButton2.addEventListener("click", function () {
  showTutorial();
});

refreshButton.addEventListener("click", function () {
  refreshMessages();
});

reloadButton.addEventListener("click", function () {
  location.reload();
});

resetButton.addEventListener("click", function () {
  clearCookies();
});

messageClose.addEventListener("click", function () {
  messageView.style = "display: none;";

  if (tutorial == true) {
    tutorial = false;
    tutorialButton.style = "display: none;";
    tutorialButton2.style = "display: block;";
    tutorialButton = tutorialButton2;
  }
});

if (
  getCookie("m1title") != null ||
  getCookie("m2title") != null ||
  getCookie("m3title") != null
) {
  resetButton.style = "background-color: red; display: block;";
  loadMessages();
  tutorialButton.style = "display: none;";
  tutorialButton2.style = "display: block;";
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
