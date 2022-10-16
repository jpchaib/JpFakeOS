//hides start-menu
document.getElementById("start-menu-container").hidden = true;

//opens start-menu
const openMenu = (event) => {
    document.getElementById("start-menu-container").hidden = !document.getElementById("start-menu-container").hidden;
};
const startMenu = document.getElementById("start");
startMenu.addEventListener("click", openMenu);

//closes the start-menu in case the desktop is clicked
const restore = (event) => {
    document.getElementById("start-menu-container").hidden = true;
};
const desktop = document.getElementsByClassName("screen");
for (let i = 0; i < desktop.length; i++) {
    desktop[i].addEventListener("click", restore);
}

//update Clock
const display_c = () => {
    var refresh = 1000; // Refresh rate in milli seconds
    mytime = setTimeout("display_ct()", refresh);
};

const display_ct = () => {
    var x = new Date();
    document.getElementById("ct").innerHTML = `${x.getHours()}:${x.getMinutes()}`;
    document.getElementById("cd").innerHTML = `${x.getDay()}/${x.getMonth()}/${x.getUTCFullYear()}`;
    display_c();
};

//mark
const mark = (event) => {
    const marked = document.getElementsByClassName("selected");
    for (let i = 0; i < marked.length; i++) {
        marked[i].classList.remove("selected");
    }
    event.target.parentElement.lastElementChild.classList.add("selected");
};

const allIcons = document.getElementsByClassName("icons__figure");
for (let i = 0; i < allIcons.length; i++) {
    allIcons[i].addEventListener("click", mark);
}

//unmark
const unmark = (event) => {
    const marked = document.getElementsByClassName("selected");
    for (let i = 0; i < marked.length; i++) {
        marked[i].classList.remove("selected");
    }

    if (event.target.classList.contains("icons__figure")) {
        return;
    }
    event.target.parentElement.lastElementChild.classList.add("selected");
};

const allButSelected = document.querySelectorAll(`.icons:not(${document.getElementsByClassName("selected").classList})`);

for (let i = 0; i < allButSelected.length; i++) {
    allButSelected[i].addEventListener("click", unmark);
}

// opening windows by double-clicking the dektop icons
let x = 380;
let y = 80;
const imgArray = ["./images/mycomputer.png", "./images/file.png", "./images/folder.png", "./images/list.png", "./images/minesweeper.png", "./images/pinball.png", "./images/system.png", "./images/video.png", "./images/music.png"];
const iconArray = ["mycomputer", "file", "folder", "list", "minesweeper", "pinball", "system", "video", "music"];

const createModal = (event) => {
    event.stopPropagation();
    x = 380 + 50 * document.getElementsByClassName("minimized").length;
    y = 80 + 50 * document.getElementsByClassName("minimized").length;

    const minimized = document.createElement("button");
    const div = document.createElement("div");
    const button = document.createElement("button");
    const img = document.createElement("img");

    // style window
    div.classList.add("div");
    div.style.top = `${y}px`;
    div.style.left = `${x}px`;

    // style button - maybe move it to SCSS
    button.classList.add("button");

    //style img
    img.style.width = "100%";
    img.style.height = "100%";

    // style the minimized in SCSS and in JS
    minimized.classList.add("minimized");

    minimized.onclick = function () {
        div.hidden = !div.hidden;
    };

    document.getElementById("windows").appendChild(div);
    div.appendChild(button);
    button.addEventListener("click", () => div.remove());
    button.addEventListener("click", () => minimized.remove());
    button.addEventListener("click", restore);
    button.innerText = "X";
    div.appendChild(img);

    let id = "";
    if (iconArray.indexOf(event.target.id) < 0) {
        id = event.target.parentElement.id;
    } else {
        id = event.target.id;
    }

    minimized.innerText = `${id}`;

    document.getElementById("window-container").appendChild(minimized);
    const winCounter = document.getElementsByClassName("minimized");
    img.src = imgArray[iconArray.indexOf(id)];

    const w = winCounter.length <= 5 ? `${16.6}vw` : `${85 / winCounter.length}vw`;
    for (let i = 0; i < winCounter.length; i++) {
        winCounter[i].style.width = w;
        winCounter[i].style.height = `100%`;
    }

    if (event.target.classList.contains("openapp")) {
        img.remove();
    }
};

const icons = document.getElementsByClassName("icons__figure");
for (let i = 0; i < icons.length; i++) {
    icons[i].addEventListener("dblclick", createModal);
}

// open apps by clicking the menu-start

const appsleft = document.getElementsByClassName("openapp");
for (let i = 0; i < appsleft.length; i++) {
    appsleft[i].addEventListener("click", createModal);
}
