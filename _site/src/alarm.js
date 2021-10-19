export default class Alarm
{
    constructor(AppObj)
    {
        this.AppObj = AppObj;
        this.target = AppObj.alarmContentNode;
        this.alarmList = this.target.querySelector("ul");
        this.newAlarm = new NewAlarm({textInfo:AppObj.textInfo, newAlarmNode: this.target.querySelector("#new-alarm"), render: _=>this.render(), alarms:_=>this.alarms});
        this.alarmList.addEventListener("click", e=>
        {
            this.target.querySelectorAll("li").forEach((elem, idx) =>
            {
                if (e.target.parentNode === elem)
                    this.deleteListItem(idx);
            });
        });
        this.render();
    }
    
    deleteListItem(idx)
    {
        this.alarms.splice(idx, 1);
        localStorage.setItem("alarms", JSON.stringify(this.alarms));
        this.render();
    }
    
    toggle()
    {
        this.target.classList.toggle("hide");
    }
    
    makeListItem(elem)
    {
        const listItem = document.createElement("li");
        listItem.classList.add("alarm-element");
        const ampm = elem < 720 ? "오전" : "오후";
        let hour = Math.floor(elem/60);
        if (hour > 12) hour -= 12;
        if (hour === 0) hour = 12;
        listItem.textContent = `${ampm} ${hour}시 ${(elem%60)}분`;
    
        const delete_button = document.createElement("button");
        listItem.appendChild(delete_button);
        delete_button.textContent = this.AppObj.textInfo["DeleteButton"];
        delete_button.classList.add("button");
                
        return listItem.outerHTML;
    }
    
    render()
    {
        this.alarms = JSON.parse(localStorage.getItem("alarms"));
        if (this.alarms !== null)
            this.alarmList.innerHTML = this.alarms.map(elem => this.makeListItem(elem)).join("");
    }
}

class NewAlarm
{
    constructor(Alarm)
    {
        this.Alarm = Alarm;
        this.target = Alarm.newAlarmNode;
        
        this.target.querySelector("#new-minute").addEventListener("change", e=>this.minute = parseInt(e.target.value));
        this.target.querySelector("#new-hour").addEventListener("change", e=>this.hour = parseInt(e.target.value));
        this.target.querySelector("#new-ampm").addEventListener("change", e=>this.ampm = parseInt(e.target.value));
        this.target.querySelector("button").textContent = Alarm.textInfo["SaveButton"];
        this.target.querySelector("button").addEventListener("click", _=> this.addNewAlarm());
        
        this.toggle();
    }

    addNewAlarm()
    {
        let new_alarm_time = this.minute + this.hour * 60;
        if (this.ampm === 1)
            new_alarm_time += 720;
        if (this.hour === 12)
            new_alarm_time -= 720;
    
        const new_alarms = this.Alarm.alarms() === null? new Array() : this.Alarm.alarms();
        new_alarms.unshift(new_alarm_time);
        localStorage.setItem("alarms", JSON.stringify(new_alarms));
        this.Alarm.render();
        this.toggle();
    }
    
    toggle()
    {
        this.target.classList.toggle("hide");
    }    
}
