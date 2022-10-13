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

let x = 380;
let y = 80;
const imgArray = ["./images/mycomputer.png", "./images/file.png", "./images/folder.png", "./images/list.png", "./images/minesweeper.png", "./images/pinball.png", "./images/system.png", "./images/video.png", "./images/music.png"];
const iconArray = ["mycomputer", "file", "folder", "list", "minesweeper", "pinball", "system", "video", "music"];

const createModal = (event) => {
    const minimized = document.createElement("button");
    const div = document.createElement("div");
    const button = document.createElement("button");
    console.log(button);
    const img = document.createElement("img");

    // style window - maybe move it to SCSS
    div.style.position = "fixed";
    div.style.width = "500px";
    div.style.height = "450px";
    div.style.top = `${y}px`;
    div.style.left = `${x}px`;
    div.style.backgroundColor = "white";
    div.style.border = "2px solid white";
    div.style.borderRadius = "10px";

    // style button - maybe move it to SCSS
    button.style.position = "absolute";
    button.style.width = "20px";
    button.style.height = "20px";
    button.style.bottom = `100%`;
    button.style.left = `100%`;
    button.style.backgroundColor = "red";
    button.style.color = "white";
    button.style.border = "1px solid white";
    button.style.pointerEvents = "auto";

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

    const w = winCounter.length <= 5 ? `${28.6}vh` : `${143 / winCounter.length}vh`;
    for (let i = 0; i < winCounter.length; i++) {
        winCounter[i].style.width = w;
        winCounter[i].style.height = `100%`;
    }

    x = x + 50;
    y = y + 50;
};

const icons = document.getElementsByClassName("icons__figure");
for (let i = 0; i < icons.length; i++) {
    icons[i].addEventListener("dblclick", createModal);
}
