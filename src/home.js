export default class Home
{
    homeButtonBoxes = {};
    appButtons = {};
    
    constructor(AppObj) 
    {
        this.AppObj = AppObj;
        this.homeContent = this.AppObj.homeContentNode;
        
        this.homeButtons = JSON.parse(localStorage.getItem("homeButtons"));
    
        if (this.homeButtons === null)
            fetch("pages.json")
                .then(response => response.json())
                .then(homeButtons => 
                {
                    localStorage.setItem("homeButtons", JSON.stringify(homeButtons));
                    this.homeButtons = homeButtons;
                });
        
        Object.keys(this.homeButtons).forEach((elem, idx) =>
        {
            const bbox = new ButtonBox(idx);
            const abtn = new AppButton(this.homeButtons, bbox.node, elem);
            this.homeButtonBoxes[idx] = bbox;
            this.appButtons[elem] = abtn;
        });
            
        
        this.homeContentWrapper = this.homeContent.querySelector(".home-content-wrapper");
        this.homeContent.addEventListener("dragover", e=>
        {
            if (e.target.className === "app-button-box")
                this.dragAction(e.target.id)
        });

        this.homeContent.addEventListener("dragstart", event=>
        {
            if (event.target.nodeName == "BUTTON")
            {
                this.now_dragging = event.target.id.replace("button_", ""); event.target.style.opacity=0.01;
            }
        });
        
        this.homeContent.addEventListener("dragend", event=>
        {
            if (event.target.nodeName == "BUTTON")
                event.target.style.opacity=1;
        });
        
        this.homeContent.addEventListener("click", event=>
        {
            if (event.target.id === "button_alarm")
                this.AppObj.setState(this.AppObj.alarmContent()); 
            if (event.target.id === "button_memo")
                this.AppObj.setState(this.AppObj.memoContent()); 
            if (event.target.id === "button_album")
                this.AppObj.setState(this.AppObj.albumContent()); 
        });
        this.render();
    }
    
    toggle()
    {
        this.homeContent.classList.toggle("hide");
    }

    dragAction(now_box)
    {
        const new_button_list = new Object();
        const now_order = Object.keys(this.homeButtons);
        for (let i=0, j=0; i<now_order.length; i++)
            if ("box"+i === now_box)
                new_button_list[this.now_dragging] = this.homeButtons[this.now_dragging];
            else
            {
                if (now_order[j] == this.now_dragging) j++;
                new_button_list[now_order[j]] = this.homeButtons[now_order[j++]];
            }
        localStorage.setItem("homeButtons", JSON.stringify(new_button_list));
        this.homeButtons = new_button_list;
        Object.keys(new_button_list).map((elem, idx) => this.homeButtonBoxes[idx].setState(this.appButtons[elem].node));
    }
    
    render()
    {
        this.homeContentWrapper.innerHTML = Object.keys(this.homeButtons).map((_, idx) => this.homeButtonBoxes[idx].node.outerHTML).join("");
    }
}

class ButtonBox 
{
    constructor(idx)
    {
        this.node = document.createElement("div");
        this.node.classList.add("app-button-box");
        this.node.setAttribute("id", "box"+idx);
    }
    
    setState(appButtonNode)
    {
        this.node.appendChild(appButtonNode);
    }
}

class AppButton
{
    constructor(homeButtons, parentBox, elem)
    {
        this.node = document.createElement("button");
        this.node.setAttribute("id", "button_"+elem);
        this.node.setAttribute("draggable", "true");
        this.node.classList.add("app-button");
        this.node.textContent = homeButtons[elem];
        parentBox.appendChild(this.node);
    }
}
