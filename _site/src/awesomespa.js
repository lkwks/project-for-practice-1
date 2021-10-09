import makeInitialStatus from "./home.js";

document.addEventListener("DOMContentLoaded", _=>
{
    fetch("config.json")
        .then(response => response.json())
        .then(config => makeInitialStatus(config));
});
