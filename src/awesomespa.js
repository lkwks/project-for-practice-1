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
        this.AppObj.backButtonNode.addEventListener("click", _=> this.AppObj.setState(this.AppObj.homeContent()));
        this.toggle();
    }
    
    toggle()
    {
        this.AppObj.backButtonNode.classList.toggle("hide");
    }    
}

class NewButton {
    constructor(AppObj)
    {
        this.AppObj = AppObj;
        this.AppObj.newButtonNode.textContent = this.AppObj.textInfo["NewButton"];
        this.AppObj.newButtonNode.addEventListener("click", _=> { this.AppObj.alarmContent().newAlarm.toggle(); this.AppObj.memoContent().newMemo.toggle(); });
        this.toggle();
    }

    toggle()
    {
        this.AppObj.newButtonNode.classList.toggle("hide");
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
            backButton: _=>this.backButton, newButton: _=>this.newButton, usingNewButton: _=>this.usingNewButton,
            alarmContent: _=>this.alarmContent, memoContent: _=>this.memoContent, albumContent: _=>this.albumContent, homeContent: _=>this.homeContent,
            alarmContentNode: target.querySelector("#alarm-content"), memoContentNode: target.querySelector("#memo-content"), albumContentNode: target.querySelector("#album-content"), homeContentNode: target.querySelector("#home-content"),
            backButtonNode: target.querySelector("#backButton button"), newButtonNode: target.querySelector("#newButton button")
        };
        
        this.alarmContent = new Alarm(thisObj);
        this.memoContent = new Memo(thisObj);
        this.albumContent = new Album(thisObj);

        const homeButtons = JSON.parse(localStorage.getItem("homeButtons"));
    
        if (homeButtons === null)
            fetch("pages.json")
                .then(response => response.json())
                .then(pages => 
                {
                    localStorage.setItem("homeButtons", JSON.stringify(pages));
                    this.homeContent = new Home(thisObj, pages);
                });
        else
            this.homeContent = new Home(thisObj, homeButtons);

        this.backButton = new BackButton(thisObj);
        this.newButton = new NewButton(thisObj);
        this.nowContent = this.homeContent;
    }
    
    setState(newContent)
    {
        this.nowContent.toggle();
        this.backButton.toggle();
        
        if (newContent === this.homeContent)
        {
            if (this.usingNewButton)
                this.newButton.toggle();
            if (this.alarmConten.newAlarm.target.classList.contains("hide") === false)
                this.alarmContent.newAlarm.toggle();
            if (this.memoContent.newMemo.target.classList.contains("hide") === false)
                this.memoContent.newMemo.toggle();
        }        
        else if (newContent === this.alarmContent || newContent === this.memoContent)
        {
            this.newButton.toggle();
            this.usingNewButton = true;
        }
        else
            this.usingNewButton = false;
        
        this.nowContent = newContent;
        this.nowContent.toggle();
    }
}

fetch("config.json")
    .then(response => response.json())
    .then(config => new App(config, document.querySelector(".app-frame")));
