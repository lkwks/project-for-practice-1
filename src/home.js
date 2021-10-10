import drawAlarmContent from "./alarm.js";
import drawMemoContent from "./memo.js";
import drawAlbumContent from "./album.js";
import {addNewMemo} from "./memo.js";
import {addNewAlarm} from "./alarm.js";

const homeContentNode = document.getElementById("home-content");
let now_dragging=null, homeButtons, text_info;


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
        alarms.forEach(elem => 
        {
            if (hour*60+minute === elem)
                alert(`${hour}시 ${minute}분`);
            else
                new_alarms.push(elem);
        });
        if (new_alarms.length < alarms.length)
        {
            localStorage.setItem("alarms", JSON.stringify(new_alarms));
            if (document.getElementById("alarm-content").style.display === 'block')
                drawAlarmContent(text_info);
        }
    }

    setTimeout(drawClock, 1000);
}



export default function makeInitialStatus(config)
{
    text_info = config["text-info"];
    document.title = config["title"];
    drawClock();
    document.getElementById("backButton").firstChild.textContent = text_info["BackButton"];
    document.getElementById("newButton").firstChild.textContent = text_info["NewButton"];
    document.getElementById("backButton").firstChild.addEventListener("click", drawHomeContent);

    document.getElementById("saveButton").textContent = text_info["SaveButton"];
    document.getElementById("saveButton").addEventListener("click", _=> addNewAlarm(text_info));

    document.getElementById("memo-content").getElementsByTagName("input")[0].setAttribute("placeholder", text_info["MemoPlaceholder"]);
    document.getElementById("memo-content").getElementsByTagName("input")[0].addEventListener("keyup", event=> addNewMemo(event.key, text_info));


    homeButtons = JSON.parse(localStorage.getItem("homeButtons"));
    
    if (homeButtons === null)
        fetch("pages.json")
            .then(response => response.json())
            .then(pages => 
            {
                homeButtons = pages;
                localStorage.setItem("homeButtons", JSON.stringify(homeButtons));
                makeHomeContent();
            });
    else
        makeHomeContent();
}


function drawHomeContent()
{
    document.getElementById("backButton").firstChild.style.display = 'none';
    document.getElementById("newButton").firstChild.style.display = 'none';
    for (let elem of document.getElementById("page-content").children)
        elem.style.display = 'none';
    homeContentNode.style.display = 'flex';
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
        button_box.classList.add("app-button-box");
        button_box.setAttribute("id", "box"+idx);
        button_box.addEventListener("dragover", _=>dragActions(idx));
                    
        const app_button = document.createElement("button");
        app_button.setAttribute("id", "button_"+elem);
        app_button.setAttribute("draggable", "true");
        app_button.classList.add("app-button");
        app_button.textContent = homeButtons[elem];
        app_button.addEventListener("dragstart", event=>{now_dragging = elem; event.target.style.opacity=0.01;});
        app_button.addEventListener("dragend", event=>event.target.style.opacity=1);
                    
        if (elem === "alarm")
            app_button.addEventListener("click", _=> drawAlarmContent(text_info)); 
        if (elem === "memo")
            app_button.addEventListener("click", _=> drawMemoContent(text_info)); 
        if (elem === "album")
            app_button.addEventListener("click", drawAlbumContent); 
 
        button_box.appendChild(app_button);
        homeContentNode.appendChild(button_box);
    });
    drawHomeContent();
}



