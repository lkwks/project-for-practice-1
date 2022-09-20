import cache from "./cache.js";


export default class Memo
{
    constructor($target, hideHome)
    {
        this.$target = $target;
        this.now_clicked = null;
        this.hideHome = hideHome;
        this.newMemo = new NewMemo($target.querySelector("input"), (elem)=>this.makeListItem(elem));
        
        this.memos = cache.get("memos");
        if(this.memos == null) this.memos = [];
        $target.querySelector("ul").addEventListener("click", event => 
        {
            if (event.target.nodeName === "LI")
                this.clickListItem(event.target);
        });

        this.render();
    }

    clickListItem(target)
    {
        if (this.now_clicked !== null)
            this.now_clicked.classList.remove("clicked");
        target.classList.add("clicked");
        this.now_clicked = target;
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

    
    render()
    {
        this.memos.forEach(elem =>{
            this.makeListItem(elem);
        });
    }
    
    makeListItem(elem)
    {
        const listItem = document.createElement("li");
        listItem.textContent = elem;
        this.$target.querySelector("ul").prepend(listItem);
    }
    
}


class NewMemo 
{
    constructor($target, makeListItem)
    {
        this.$target = $target
        this.makeListItem = makeListItem;
        $target.addEventListener("keyup", event => 
        {
            if (event.key == "Enter")
                this.addNewMemo();
        });
    }

    addNewMemo()
    {
        let new_memos = cache.get("memos");
        new_memos.push(this.$target.value);
        cache.set("memos", new_memos);
        this.makeListItem(this.$target.value);
        this.$target.value = '';
        this.toggle(false);
    }

    toggle()
    {
        this.$target.classList.toggle("hide");
    }
}
