export default class Alarm
{
    constructor(AppObj)
    {
        this.AppObj = AppObj;
        this.target = AppObj.alarmContentNode;
        this.newAlarm = new NewAlarm({textInfo:AppObj.textInfo, newAlarmNode: this.target.querySelector("#new-alarm"), addNewAlarm: _=>this.addNewAlarm()});
        this.renew();
        this.target.querySelector("ul").addEventListener("click", e=>
        {
            this.target.querySelectorAll("li").forEach((elem, idx) =>
            {
                if (e.target.parentNode === elem)
                {
                    this.alarms.splice(idx, 1);
                    localStorage.setItem("alarms", JSON.stringify(this.alarms));
                    this.renew();
                    this.show();
                }
            });
        });
    }
    
    show()
    {
        this.AppObj.turnOffAll();
        this.target.style.display = 'block';
        this.AppObj.backButton().show();
        this.AppObj.newButton().show();
    }
    
    hide()
    {
        this.target.style.display = 'none';
    }

    addNewAlarm()
    {
        let new_alarm_time = parseInt(this.target.querySelector("#new-minute").value) + this.target.querySelector("#new-hour").value * 60;
        if (parseInt(this.target.querySelector("#new-ampm").value) === 1)
            new_alarm_time += 720;
        if (parseInt(this.target.querySelector("#new-hour").value) === 12)
            new_alarm_time -= 720;
    
        const new_alarms = this.alarms === null? new Array() : this.alarms;
        new_alarms.unshift(new_alarm_time);
        localStorage.setItem("alarms", JSON.stringify(new_alarms));
        this.renew();
        this.show();
    }

    renew()
    {
        this.target.querySelector("ul").innerHTML = '';
        this.alarms = JSON.parse(localStorage.getItem("alarms"));
        if (this.alarms !== null)
            this.alarms.forEach((elem, idx, arr) =>
            {
                const alarm_elem = document.createElement("li");
                this.target.querySelector("ul").appendChild(alarm_elem);
                alarm_elem.classList.add("alarm-element");
                const ampm = elem < 720 ? "오전" : "오후";
                let hour = Math.floor(elem/60);
                if (hour > 12) hour -= 12;
                if (hour === 0) hour = 12;
                alarm_elem.textContent = `${ampm} ${hour}시 ${(elem%60)}분`;
    
                const delete_button = document.createElement("button");
                alarm_elem.appendChild(delete_button);
                delete_button.textContent = this.AppObj.textInfo["DeleteButton"];
                delete_button.classList.add("button");
            });
    }
}

class NewAlarm
{
    constructor(Alarm)
    {
        this.target = Alarm.newAlarmNode;
        this.target.querySelector("button").textContent = Alarm.textInfo["SaveButton"];
        this.target.querySelector("button").addEventListener("click", _=> Alarm.addNewAlarm());
    }
    
    show()
    {
        this.target.style.display = 'block';
    }
    
    hide()
    {
        this.target.style.display = 'none';
    }
}
