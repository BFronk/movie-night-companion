console.log("MAIN.JS IS RUNNING");

import App from "./app.js";

const root = document.getElementById("root");

console.log("ROOT:", root);

root.innerHTML = "";
root.append(App());