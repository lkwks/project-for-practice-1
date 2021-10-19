export default class Memo
{
    constructor(AppObj)
    {
        this.AppObj = AppObj;
        this.target = AppObj.memoContentNode;
        this.memoList = this.target.querySelector("ul");
        this.now_clicked = null;
        this.newMemo = new NewMemo({newMemoNode: this.target.querySelector("input"), textInfo: AppObj.textInfo, memos: _=>this.memos, render:_=>this.render()});
        
        this.memoList.addEventListener("click", event => 
        {
            if (event.target.nodeName === "LI")
            {
                if (this.now_clicked !== null)
                    this.now_clicked.style.maxHeight = '2.6em';
                event.target.style.maxHeight = 'none';
                this.now_clicked = event.target;
            }
        });

        this.render();
    }

    toggle()
    {
        this.target.classList.toggle("hide");
    }
    
    makeListItem(elem)
    {
        const listItem = document.createElement("li");
        listItem.textContent = elem;
        listItem.classList.add("memo-element");
        return listItem;
    }
    
    render()
    {
        this.memos = JSON.parse(localStorage.getItem("memos"));
        if (this.memos !== null)
            this.memoList.innerHTML = this.memos.map(elem => makeListItem(elem)).join("");
    }    
}


class NewMemo 
{
    constructor(Memo)
    {
        this.target = Memo.newMemoNode;
        this.target.setAttribute("placeholder", Memo.textInfo["MemoPlaceholder"]);
        this.target.addEventListener("keyup", event => 
        {
            if (event.key == "Enter")
            {
                const new_memos = Memo.memos() === null? new Array() : Memo.memos();
                new_memos.unshift(this.target.value);
                this.target.value = '';
                localStorage.setItem("memos", JSON.stringify(new_memos));
                Memo.render();
                this.toggle();
            }
        });
        
        this.toggle();
    }
    
    toggle()
    {
        this.target.classList.toggle("hide");
    }
}
