import Home from "./home.js";
import Alarm from "./alarm.js";
import Memo from "./memo.js";
import Album from "./album.js";

function clock(AlarmContent)
{
    const time = new Date();
    const year = time.getFullYear(), month = time.getMonth() + 1, day = time.getDate();
    const hour = time.getHours(), minute = time.getMinutes(), second = time.getSeconds();
    document.getElementById('clock').textContent = `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분 ${second}초`;
    
    const alarms = JSON.parse(localStorage.getItem("alarms"));
    if (alarms !== null)
        alarms.forEach((elem, idx) =>
        {
            if (hour*60+minute === elem)
            {
                alert(`${hour}시 ${minute}분`);
                AlarmContent().deleteListItem(idx);
            }
        });
    setTimeout(_=>clock(AlarmContent), 1000);
}


class BackButton 
{
    isVisible = false;
    
    constructor(AppObj)
    {
        this.AppObj = AppObj;
        this.AppObj.backButtonNode.textContent = this.AppObj.textInfo["BackButton"];
        this.AppObj.backButtonNode.addEventListener("click", _=> this.AppObj.setState(this.AppObj.homeContent()));
        this.render();
    }
    
    setState(isVisible)
    {
        this.isVisible = isVisible;
        this.render();
    }
    
    render()
    {
        if (this.isVisible)
            this.AppObj.backButtonNode.classList.remove("hide");
        else
            this.AppObj.backButtonNode.classList.add("hide");            
    }    
}

class NewButton 
{
    isVisible = false;
    
    constructor(AppObj)
    {
        this.AppObj = AppObj;
        this.AppObj.newButtonNode.textContent = this.AppObj.textInfo["NewButton"];
        this.AppObj.newButtonNode.addEventListener("click", _=> { this.AppObj.alarmContent().newAlarm.setState(true); this.AppObj.memoContent().newMemo.setState(true); });
        this.render();
    }

    setState(isVisible)
    {
        this.isVisible = isVisible;
        this.render();
    }
    
    render()
    {
        if (this.isVisible)
            this.AppObj.newButtonNode.classList.remove("hide");
        else
            this.AppObj.newButtonNode.classList.add("hide");            
    }    
}


class App {
    usingNewButton = false;
    
    constructor(config, target)
    {
        document.title = config["title"];
        clock(_=>this.alarmContent);
        
        const thisObj = 
        {
            textInfo: config["text-info"], nowContent: _=>this.nowContent, setState: newContent=>this.setState(newContent),
            backButton: _=>this.backButton, newButton: _=>this.newButton, 
            alarmContent: _=>this.alarmContent, memoContent: _=>this.memoContent, albumContent: _=>this.albumContent, homeContent: _=>this.homeContent,
            alarmContentNode: target.querySelector("#alarm-content"), memoContentNode: target.querySelector("#memo-content"), albumContentNode: target.querySelector("#album-content"), homeContentNode: target.querySelector("#home-content"),
            backButtonNode: target.querySelector("#backButton button"), newButtonNode: target.querySelector("#newButton button")
        };
        
        this.alarmContent = new Alarm(thisObj);
        this.memoContent = new Memo(thisObj);
        this.albumContent = new Album(thisObj);
        this.homeContent = new Home(thisObj);
        this.backButton = new BackButton(thisObj);
        this.newButton = new NewButton(thisObj);
        this.nowContent = this.homeContent;
        this.homeContent.setState(true);
    }
    
    setState(newContent)
    {
        this.nowContent.setState(false);
        this.backButton.setState(newContent !== this.homeContent);
        this.newButton.setState(newContent === this.alarmContent || newContent === this.memoContent);
        this.alarmContent.newAlarm.setState(false);
        this.memoContent.newMemo.setState(false);
        this.nowContent = newContent;
        this.nowContent.setState(true);
    }
}

fetch("config.json")
    .then(response => response.json())
    .then(config => new App(config, document.querySelector(".app-frame")));
