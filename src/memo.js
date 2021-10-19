export default class Memo
{
    constructor(AppObj)
    {
        this.AppObj = AppObj;
        this.target = AppObj.memoContentNode;
        this.memoList = this.target.querySelector("ul");
        this.now_clicked = null;
        this.newMemo = new NewMemo({newMemoNode: this.target.querySelector("input"), textInfo: AppObj.textInfo, memos: _=>this.memos, render:_=>this.render()});
        
        this.target.querySelector("ul").addEventListener("click", event => 
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
    
    render()
    {
        this.memoList.innerHTML = '';    
        this.memos = JSON.parse(localStorage.getItem("memos"));
        if (this.memos !== null)
            this.memos.forEach(elem =>
            {
                const memo_elem = document.createElement("li");
                this.memoList.appendChild(memo_elem);
                memo_elem.textContent = elem;
                memo_elem.classList.add("memo-element");
            });
    }
    
    toggle()
    {
        this.target.classList.toggle("hide");
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
