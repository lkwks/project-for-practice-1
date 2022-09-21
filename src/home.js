import cache from "./cache.js";

export default class Home
{    
    constructor($target, reactFunc) 
    {
        this.$target = $target;
        this.homeButtons = cache.get("homeButtons");
        
        this.mappedFunc = {};
        $target.querySelectorAll("button").forEach((elem, idx) => {
            this.mappedFunc[elem.textContent] = reactFunc[idx];
        });
        
        if (this.homeButtons === null)
        {
            this.homeButtons = [];
            this.$target.querySelectorAll("div").forEach(elem => {
                this.homeButtons.push(elem.querySelector("button").textContent);
            });
            cache.set("homeButtons", this.homeButtons);
        }
                
        $target.addEventListener("dragover", e=>
        {
            if (e.target.nodeName == "DIV" && e.target.parentNode.classList.contains("home-content"))
            {
                if (this.lastDraggedBox != e.target)
                    this.dragAction(e.target);
                this.lastDraggedBox = e.target;
            }
        });

        $target.addEventListener("dragstart", e=>
        {
            if (e.target.nodeName == "BUTTON")
            {
                this.nowDragging = e.target;
                e.target.classList.add("transparent");
            }
        });
        
        $target.addEventListener("dragend", e=>
        {
            if (e.target.nodeName == "BUTTON")
                e.target.classList.remove("transparent");
        });
        
        $target.addEventListener("click", e=>
        {
            if (e.target.nodeName == "BUTTON") this.mappedFunc[e.target.textContent];
        });

        this.homeButtonNodes = {};
        this.render();
    }

    hide()
    {
        this.$target.classList.add("hide");
    }

    show()
    {
        this.$target.classList.remove("hide");
    }


    render()
    {
        this.$target.querySelectorAll("button").forEach((elem, idx) => {
            elem.textContent = this.homeButtons[idx];
            this.homeButtonNodes[elem.textContent] = elem;
        });        
    }
    
    dragAction(destBox)
    {
        const newList = [];
        this.$target.querySelectorAll("div").forEach( elem =>
        {
            if (elem == destBox)
                newList.push(this.nowDragging.textContent);
            else
            {
                let nowButton = this.homeButtons.shift();
                if (nowButton == this.nowDragging.textContent)
                    nowButton = this.homeButtons.shift();
                newList.push(nowButton);
            }
            elem.appendChild(this.homeButtonNodes[newList[newList.length-1]]);
        });
        cache.set("homeButtons", newList);
        this.homeButtons = newList;
    }    
}
