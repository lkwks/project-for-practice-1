import {addNewMemoFunction} from "./memo.js";

const new_alarm_node = document.getElementById("new-alarm");

function drawAlarmContent(text_info)
{
    for (let elem of document.getElementById("page-content").children)
        elem.style.display = 'none';
    document.getElementById("alarm-content").style.display = 'block';
    new_alarm_node.style.display = 'none';

    document.getElementById("backButton").firstChild.style.display = 'block';
    document.getElementById("newButton").firstChild.style.display = 'block';
    document.getElementById("newButton").firstChild.addEventListener("click", addNewAlarmFunction);
    document.getElementById("newButton").firstChild.removeEventListener("click", addNewMemoFunction);
    
    
    const alarm_list = document.createElement("ul");
    document.getElementById("alarm-list").innerHTML = '';
    document.getElementById("alarm-list").appendChild(alarm_list);
    const alarms = JSON.parse(localStorage.getItem("alarms"));
    if (alarms !== null)
        alarms.forEach((elem, idx, arr) =>
        {
            const alarm_elem = document.createElement("li");
            alarm_list.appendChild(alarm_elem);
            alarm_elem.classList.add("alarm-element");
            const ampm = elem < 720 ? "오전" : "오후";
            let hour = elem < 780 ? Math.floor(elem/60) : Math.floor(elem/60) -12;
            if (elem < 60) hour = 12;
            alarm_elem.textContent = `${ampm} ${hour}시 ${(elem%60)}분`;

            const delete_button = document.createElement("button");
            alarm_elem.appendChild(delete_button);
            delete_button.textContent = text_info["DeleteButton"];
            delete_button.classList.add("button");
            delete_button.addEventListener("click", _=>
            {
                arr.splice(idx, 1);
                localStorage.setItem("alarms", JSON.stringify(arr));
                drawAlarmContent(text_info);
            });
        });
}

function addNewAlarmFunction()
{
    new_alarm_node.style.display = 'block';
}

function addNewAlarm(text_info)
{
    const alarms = localStorage.getItem("alarms");
    const new_alarms = alarms === null? new Array() : JSON.parse(alarms);
    
    let new_alarm_time = parseInt(document.getElementById("new-minute").value);
    if (document.getElementById("new-ampm").value == 1 || (document.getElementById("new-ampm").value == 0 && parseInt(document.getElementById("new-hour").value) !== 12))
        new_alarm_time += document.getElementById("new-hour").value * 60;
    if (document.getElementById("new-ampm").value == 1 && parseInt(document.getElementById("new-hour").value) !== 12)
        new_alarm_time += 720;
    
    new_alarms.unshift(new_alarm_time);
    localStorage.setItem("alarms", JSON.stringify(new_alarms));
    new_alarm_node.style.display = 'none';
    drawAlarmContent(text_info);
}

export {drawAlarmContent as default, addNewAlarm, addNewAlarmFunction};