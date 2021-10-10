import drawAlarmContent from "./alarm.js";
import drawMemoContent from "./memo.js";
import drawAlbumContent from "./album.js";
import {makeSaveButton, makeAlarmContent} from "./alarm.js";
import {makeMemoInput, makeMemoContent} from "./memo.js";
import {makeAlbumContent} from "./album.js";

export let text_info;
export const backButton = document.getElementById("backButton").firstChild, newButton = document.getElementById("newButton").firstChild;
let now_dragging=null, homeButtons;

export function turnOffAll()
{
    backButton.style.display = 'none';
    newButton.style.display = 'none';
    for (let elem of document.getElementById("page-content").children)
        elem.style.display = 'none';
    document.getElementById("new-alarm").style.display = 'none';
    document.getElementById("new-memo").style.display = 'none';
}

function drawClock()
{
    const time = new Date();
    const year = time.getFullYear(), month = time.getMonth() + 1, day = time.getDate();
    const hour = time.getHours(), minute = time.getMinutes(), second = time.getSeconds();
    document.getElementById('clock').textContent = `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분 ${second}초`;
    
    const alarms = JSON.parse(localStorage.getItem("alarms"));
    if (alarms !== null)
    {
        const new_alarms = new Array();
        for (let elem of alarms)
            if (hour*60+minute === elem)
                alert(`${hour}시 ${minute}분`);
            else
                new_alarms.push(elem);
        if (new_alarms.length !== alarms.length)
        {
            localStorage.setItem("alarms", JSON.stringify(new_alarms));
            if (document.getElementById("alarm-content").style.display === 'block')
            {
                makeAlarmContent();
                drawAlarmContent();
            }
        }
    }
    setTimeout(drawClock, 1000);
}

export default function makeInitialStatus(config)
{
    text_info = config["text-info"];

    document.title = config["title"];
    drawClock();

    backButton.textContent = text_info["BackButton"];
    backButton.addEventListener("click", drawHomeContent);
    newButton.textContent = text_info["NewButton"];
    newButton.addEventListener("click", _=> { document.getElementById("new-alarm").style.display = 'block'; document.getElementById("new-memo").style.display = 'inline';});
    makeAlarmContent();
    makeSaveButton();
    makeMemoContent();
    makeMemoInput();
    makeAlbumContent();

    homeButtons = JSON.parse(localStorage.getItem("homeButtons"));
    
    if (homeButtons === null)
        fetch("pages.json")
            .then(response => response.json())
            .then(pages => 
            {
                homeButtons = pages;
                makeHomeContent();
            });
    else
        makeHomeContent();
}


function drawHomeContent()
{
    turnOffAll();
    document.getElementById("home-content").style.display = 'flex';
}

function dragActions(now_box)
{
    const new_button_list = new Object();
    const now_order = Object.keys(homeButtons);
    for (let i=0, j=0; i<now_order.length; i++)
        if (i === now_box)
            new_button_list[now_dragging] = homeButtons[now_dragging];
        else
        {
            if (now_order[j] == now_dragging) j++;
            new_button_list[now_order[j]] = homeButtons[now_order[j++]];
        }
    Object.keys(new_button_list).forEach((elem, idx) =>
    {
        document.getElementById("box"+idx).appendChild(document.getElementById("button_"+elem));
    });
    localStorage.setItem("homeButtons", JSON.stringify(new_button_list));
    homeButtons = new_button_list;
}


function makeHomeContent()
{
    Object.keys(homeButtons).forEach((elem, idx) => 
    {
        const button_box = document.createElement("div");
        document.getElementById("home-content").appendChild(button_box);
        button_box.classList.add("app-button-box");
        button_box.setAttribute("id", "box"+idx);
        button_box.addEventListener("dragover", _=>dragActions(idx));
                    
        const app_button = document.createElement("button");
        button_box.appendChild(app_button);
        app_button.setAttribute("id", "button_"+elem);
        app_button.setAttribute("draggable", "true");
        app_button.classList.add("app-button");
        app_button.textContent = homeButtons[elem];
        app_button.addEventListener("dragstart", event=>{now_dragging = elem; event.target.style.opacity=0.01;});
        app_button.addEventListener("dragend", event=>event.target.style.opacity=1);
                    
        if (elem === "alarm")
            app_button.addEventListener("click", drawAlarmContent); 
        if (elem === "memo")
            app_button.addEventListener("click", drawMemoContent); 
        if (elem === "album")
            app_button.addEventListener("click", drawAlbumContent);  
    });
    drawHomeContent();
}



