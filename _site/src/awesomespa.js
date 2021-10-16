import Home from "./home.js";
import Alarm from "./alarm.js";
import Memo from "./memo.js";
import Album from "./album.js";
import {clock} from "./home.js";

class BackButton {
    constructor(backButton, text_info, homeContent)
    {
        this.target = backButton;
        backButton.textContent = text_info;
        backButton.addEventListener("click", _=> homeContent.show());
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

class NewButton {
    constructor(newButton, text_info, newAlarm, newMemo)
    {
        this.target = newButton;
        newButton.textContent = text_info;
        newButton.addEventListener("click", _=> { newAlarm.show(); newMemo.show(); });
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


class App {
    constructor(config)
    {
        document.title = config["title"];
        this.textInfo = config["text-info"];

        this.alarmContent = new Alarm(this, document.getElementById("alarm-content"));
        this.memoContent = new Memo(this, document.getElementById("memo-content"));
        this.albumContent = new Album(this, document.getElementById("album-content"));

        this.homeButtons = JSON.parse(localStorage.getItem("homeButtons"));
    
        if (this.homeButtons === null)
            fetch("pages.json")
                .then(response => response.json())
                .then(pages => 
                {
                    localStorage.setItem("homeButtons", JSON.stringify(pages));
                    this.homeContent = new Home(this, pages, document.getElementById("home-content"));
                });
        else
            this.homeContent = new Home(this, this.homeButtons, document.getElementById("home-content"));

        this.backButton = new BackButton(document.getElementById("backButton").firstChild, this.textInfo["BackButton"], this.homeContent);
        this.newButton = new NewButton(document.getElementById("newButton").firstChild, this.textInfo["NewButton"], this.alarmContent.newAlarm, this.memoContent.newMemo);

        this.turnOffSet = [this.homeContent, this.backButton, this.newButton, this.alarmContent, this.alarmContent.newAlarm, this.memoContent, this.memoContent.newMemo, this.albumContent];
        this.homeContent.show();
        clock(this);
    }
    
    turnOffAll()
    {
        for (let i in this.turnOffSet)
            this.turnOffSet[i].hide();
    }
}

fetch("config.json")
    .then(response => response.json())
    .then(config => new App(config));
