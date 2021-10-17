import Home from "./home.js";
import Alarm from "./alarm.js";
import Memo from "./memo.js";
import Album from "./album.js";
import {clock} from "./home.js";

class BackButton {
    constructor(AppObj)
    {
        this.AppObj = AppObj;
        this.AppObj.backButtonNode.textContent = this.AppObj.textInfo["BackButton"];
        this.AppObj.backButtonNode.addEventListener("click", _=> this.AppObj.homeContent().show());
    }
    
    show()
    {
        this.AppObj.backButtonNode.style.display = 'block';
    }
    
    hide()
    {
        this.AppObj.backButtonNode.style.display = 'none';
    }
}

class NewButton {
    constructor(AppObj)
    {
        this.AppObj = AppObj;
        this.AppObj.newButtonNode.textContent = this.AppObj.textInfo["NewButton"];
        this.AppObj.newButtonNode.addEventListener("click", _=> { this.AppObj.alarmContent().newAlarm.show(); this.AppObj.memoContent().newMemo.show(); });
    }

    show()
    {
        this.AppObj.newButtonNode.style.display = 'block';
    }
    
    hide()
    {
        this.AppObj.newButtonNode.style.display = 'none';
    }
}


class App {
    constructor(config, target)
    {
        document.title = config["title"];
        clock(_=>this.alarmContent);
        
        const thisObj = 
        {
            textInfo: config["text-info"], 
            backButton: _=>this.backButton, newButton: _=>this.newButton, turnOffAll: _=>this.turnOffAll(), 
            alarmContent: _=>this.alarmContent, memoContent: _=>this.memoContent, albumContent: _=>this.albumContent, homeContent: _=>this.homeContent,
            alarmContentNode: target.querySelector("#alarm-content"), memoContentNode: target.querySelector("#memo-content"), albumContentNode: target.querySelector("#album-content"), homeContentNode: target.querySelector("#home-content"),
            backButtonNode: target.querySelector("#backButton button"), newButtonNode: target.querySelector("#newButton button")
        };
        
        this.alarmContent = new Alarm(thisObj);
        this.memoContent = new Memo(thisObj);
        this.albumContent = new Album(thisObj);

        this.homeButtons = JSON.parse(localStorage.getItem("homeButtons"));
    
        if (this.homeButtons === null)
            fetch("pages.json")
                .then(response => response.json())
                .then(pages => 
                {
                    localStorage.setItem("homeButtons", JSON.stringify(pages));
                    this.homeContent = new Home(thisObj, pages);
                });
        else
            this.homeContent = new Home(thisObj, this.homeButtons);

        this.backButton = new BackButton(thisObj);
        this.newButton = new NewButton(thisObj);

        this.turnOffSet = [this.homeContent, this.backButton, this.newButton, this.alarmContent, this.alarmContent.newAlarm, this.memoContent, this.memoContent.newMemo, this.albumContent];
        this.homeContent.show();
    }
    
    turnOffAll()
    {
        for (let i in this.turnOffSet)
            this.turnOffSet[i].hide();
    }
}

fetch("config.json")
    .then(response => response.json())
    .then(config => new App(config, document.querySelector(".app-frame")));
