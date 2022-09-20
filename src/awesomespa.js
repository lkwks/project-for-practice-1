import Home from "./home.js";
import Alarm from "./alarm.js";
import Memo from "./memo.js";
import Album from "./album.js";
import Button from "./button.js";
import cache from "./cache.js";

class Clock
{
    constructor($target, delAlarmItem)
    {
        this.$target = $target;        
        this.delAlarmItem = delAlarmItem;
        this.runClock();
    }

    runClock()
    {
        const time = new Date();
        const year = time.getFullYear(), month = time.getMonth() + 1, day = time.getDate();
        const hour = time.getHours(), minute = time.getMinutes(), second = time.getSeconds();
        this.$target.textContent = `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분 ${second}초`;
        
        const alarms = cache.get("alarms");
        if (alarms !== null)
            alarms.forEach((elem, idx) =>
            {
                if (hour*60+minute === elem)
                {
                    alert(`${hour}시 ${minute}분`);
                    this.delAlarmItem(idx);
                }
            });
        setTimeout(()=>this.runClock(), 1000);
    }
}



class App 
{    
    constructor($target)
    {
        this.albumContent = new Album($target.querySelector(".album-content"), ()=>this.hideHome());
        this.memoContent = new Memo($target.querySelector(".memo-content"), ()=>{this.hideHome();this.newMemoButton.show();});
        this.alarmContent = new Alarm($target.querySelector(".alarm-content"), ()=>{this.hideHome();this.newAlarmButton.show();});
        this.homeContent = new Home($target.querySelector(".home-content"), ()=>this.alarmContent.show(), ()=>this.memoContent.show(), ()=>this.albumContent.show());

        this.backButton = new Button($target.querySelector(".status-bar > div:nth-child(1) > button"), ()=>this.showHome());
        this.clock = new Clock($target.querySelector(".status-bar > div:nth-child(2) > span"), (elem)=>this.alarmContent.delAlarmItem(elem));
        this.newAlarmButton = new Button($target.querySelector(".status-bar > div:nth-child(3) > button:nth-child(1)"), ()=>this.alarmContent.newAlarm.toggle());
        this.newMemoButton = new Button($target.querySelector(".status-bar > div:nth-child(3) > button:nth-child(2)"), ()=>this.memoContent.newMemo.toggle());
    }

    hideHome()
    {
        this.backButton.show();
        this.homeContent.hide();
    }

    showHome()
    {
        if (!this.alarmContent.$target.classList.contains("hide")) this.alarmContent.hide();
        if (!this.memoContent.$target.classList.contains("hide")) this.memoContent.hide();
        if (!this.albumContent.$target.classList.contains("hide")) this.albumContent.hide();
        this.backButton.hide();
        if (!this.newAlarmButton.$target.classList.contains("hide")) this.newAlarmButton.hide();
        if (!this.newMemoButton.$target.classList.contains("hide")) this.newMemoButton.hide();
        this.homeContent.show();
    }
}

new App(document.querySelector(".app-frame"));
