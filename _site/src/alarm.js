import {backButton, newButton, text_info, turnOffAll} from "./home.js";

let alarms = null;

export default function drawAlarmContent()
{
    turnOffAll();
    document.getElementById("alarm-content").style.display = 'block';
    backButton.style.display = 'block';
    newButton.style.display = 'block';    
}

export function makeSaveButton()
{
    document.getElementById("saveButton").textContent = text_info["SaveButton"];
    document.getElementById("saveButton").addEventListener("click", addNewAlarm);
}

export function addNewAlarm()
{
    let new_alarm_time = parseInt(document.getElementById("new-minute").value) + document.getElementById("new-hour").value * 60;
    if (parseInt(document.getElementById("new-ampm").value) === 1)
        new_alarm_time += 720;
    if (parseInt(document.getElementById("new-hour").value) === 12)
        new_alarm_time -= 720;
    
    const new_alarms = alarms === null? new Array() : alarms;
    new_alarms.unshift(new_alarm_time);
    localStorage.setItem("alarms", JSON.stringify(new_alarms));
    makeAlarmContent();
    drawAlarmContent();
}

export function makeAlarmContent()
{
    document.getElementById("alarm-list").innerHTML = '';
    alarms = JSON.parse(localStorage.getItem("alarms"));
    if (alarms !== null)
        alarms.forEach((elem, idx, arr) =>
        {
            const alarm_elem = document.createElement("li");
            document.getElementById("alarm-list").appendChild(alarm_elem);
            alarm_elem.classList.add("alarm-element");
            const ampm = elem < 720 ? "오전" : "오후";
            let hour = Math.floor(elem/60);
            if (hour > 12) hour -= 12;
            if (hour === 0) hour = 12;
            alarm_elem.textContent = `${ampm} ${hour}시 ${(elem%60)}분`;

            const delete_button = document.createElement("button");
            alarm_elem.appendChild(delete_button);
            delete_button.textContent = text_info["DeleteButton"];
            delete_button.classList.add("button");
            delete_button.addEventListener("click", _=>
            {
                arr.splice(idx, 1);
                localStorage.setItem("alarms", JSON.stringify(arr));
                drawAlarmContent();
            });
        });
}