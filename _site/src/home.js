export function clock(AlarmContent)
{
    const time = new Date();
    const year = time.getFullYear(), month = time.getMonth() + 1, day = time.getDate();
    const hour = time.getHours(), minute = time.getMinutes(), second = time.getSeconds();
    document.getElementById('clock').textContent = `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분 ${second}초`;
    
    const alarms = JSON.parse(localStorage.getItem("alarms"));
    if (alarms !== null)
    {
        const new_alarms = new Array();
        for (let elem of alarms)
            if (hour*60+minute === elem)
                alert(`${hour}시 ${minute}분`);
            else
                new_alarms.push(elem);
        if (new_alarms.length !== alarms.length)
        {
            localStorage.setItem("alarms", JSON.stringify(new_alarms));
            AlarmContent().renew();
            if (AlarmContent().target.style.display === 'block')
                AlarmContent().show();
        }
    }
    setTimeout(_=>clock(AlarmContent), 1000);
}

export default class Home
{
    constructor(AppObj, homeButtons) 
    {
        this.AppObj = AppObj;
        this.homeContent = this.AppObj.homeContentNode;
        this.homeButtons = homeButtons;
        
        Object.keys(homeButtons).forEach((elem, idx) => 
        {
            const button_box = document.createElement("div");
            this.homeContent.appendChild(button_box);
            button_box.classList.add("app-button-box");
            button_box.setAttribute("id", "box"+idx);
            button_box.addEventListener("dragover", _=>this.dragActions(idx));
                    
            const app_button = document.createElement("button");
            button_box.appendChild(app_button);
            app_button.setAttribute("id", "button_"+elem);
            app_button.setAttribute("draggable", "true");
            app_button.classList.add("app-button");
            app_button.textContent = this.homeButtons[elem];
            app_button.addEventListener("dragstart", event=>{this.now_dragging = elem; event.target.style.opacity=0.01;});
            app_button.addEventListener("dragend", event=>event.target.style.opacity=1);
                    
            if (elem === "alarm")
                app_button.addEventListener("click", _=> AppObj.alarmContent().show()); 
            if (elem === "memo")
                app_button.addEventListener("click", _=> AppObj.memoContent().show()); 
            if (elem === "album")
                app_button.addEventListener("click", _=> AppObj.albumContent().show());  
        });
    }
    
    show()
    {
        this.AppObj.turnOffAll();
        this.homeContent.style.display = 'flex';
    }
    
    hide()
    {
        this.homeContent.style.display = 'none';
    }
    
    dragActions(now_box)
    {
        const new_button_list = new Object();
        const now_order = Object.keys(this.homeButtons);
        for (let i=0, j=0; i<now_order.length; i++)
            if (i === now_box)
                new_button_list[this.now_dragging] = this.homeButtons[this.now_dragging];
            else
            {
                if (now_order[j] == this.now_dragging) j++;
                new_button_list[now_order[j]] = this.homeButtons[now_order[j++]];
            }
        Object.keys(new_button_list).forEach((elem, idx) =>
        {
            document.getElementById("box"+idx).appendChild(document.getElementById("button_"+elem));
        });
        localStorage.setItem("homeButtons", JSON.stringify(new_button_list));
        this.homeButtons = new_button_list;
    }
}



