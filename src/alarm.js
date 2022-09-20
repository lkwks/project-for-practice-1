import cache from "./cache.js";


export default class Alarm
{
    constructor($target, hideHome)
    {
        this.$target = $target;
        this.hideHome = hideHome;
        this.alarms = cache.get("alarms");
        if (this.alarms == null) this.alarms = [];
        this.newAlarm = new NewAlarm($target.querySelector("div"), (elem, idx)=>this.makeListItem(elem, idx));
        $target.querySelector("ul").addEventListener("click", e=>
        {
            if (e.target.parentNode.nodeName === "LI")
                this.delAlarmItem(e.target.parentNode.getAttribute("idx"));
        });
        this.timeTextIe = $target.querySelector("ul > li").childNodes[0].textContent;
        this.delButtonText = $target.querySelector("ul > li > button").textContent;
        this.render();
    }

    hide()
    {
        this.$target.classList.add("hide");
    }

    show()
    {
        this.hideHome();
        this.$target.classList.remove("hide");
    }

    delAlarmItem(idx)
    {
        this.alarms.splice(idx, 1);
        cache.set("alarms", this.alarms);
        this.$target.querySelector(`ul > li[idx='${idx}']`).remove();
    }

    getTimeText(time)
    {
        const ampm = time < 720 ? "오전" : "오후";
        let hour = Math.floor(time/60);
        if (hour > 12) hour -= 12;
        if (hour === 0) hour = 12;
        return this.timeTextIe.replace("a", ampm).replace("HH", hour).replace("mm", time%60);
    }
    
    makeListItem(elem, idx)
    {
        const listItem = document.createElement("li");
        listItem.setAttribute("idx", idx);
        listItem.textContent = this.getTimeText(elem);
    
        const delButton = document.createElement("button");
        delButton.textContent = this.delButtonText;
        listItem.appendChild(delButton);
                
        this.$target.querySelector("ul").prepend(listItem);
    }
    
    render()
    {
        this.$target.querySelector("ul > li").remove();
        this.alarms.forEach((elem, idx) => {
            this.makeListItem(elem, idx);
        });
    }
}

class NewAlarm
{
    constructor($target, makeListItem)
    {
        this.$target = $target;
        this.makeListItem = makeListItem;
        this.alarms = cache.get("alarms");
        $target.querySelector("button").addEventListener("click", ()=> this.addNewAlarm());
    }

    addNewAlarm()
    {
        const ampm = parseInt(this.$target.querySelector("select").value);
        const hour = parseInt(this.$target.querySelectorAll("input")[0].value);
        let newTime = hour*60 + parseInt(this.$target.querySelectorAll("input")[1].value);
        if (ampm === 1)
            newTime += 720;
        if (hour === 12)
            newTime -= 720;
        let newAlarms = cache.get("alarms");
        if (newAlarms == null) newAlarms = [];
        newAlarms.push(newTime);
        cache.set("alarms", newAlarms);
        this.makeListItem(newTime, newAlarms.length-1);
        this.toggle();
    }
    
    toggle()
    {
        this.$target.classList.toggle("hide");
    }
}
