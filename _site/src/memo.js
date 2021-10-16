export default class Memo
{
    constructor(AppSet, memoContent)
    {
        this.AppSet = AppSet;
        this.target = memoContent;
        this.now_clicked = null;
        this.newMemo = new NewMemo(this);
        this.renew();
    }
    
    renew()
    {
        this.target.querySelector("ul").innerHTML = '';    
        this.memos = JSON.parse(localStorage.getItem("memos"));
        if (this.memos !== null)
            this.memos.forEach(elem =>
            {
                const memo_elem = document.createElement("li");
                this.target.querySelector("ul").appendChild(memo_elem);
                memo_elem.textContent = elem;
                memo_elem.classList.add("memo-element");
                memo_elem.addEventListener("click", event => 
                {
                    if (this.now_clicked !== null)
                        this.now_clicked.style.maxHeight = '2.6em';
                    event.target.style.maxHeight = 'none';
                    this.now_clicked = event.target;
                });
            });
    }
    
    show()
    {
        this.AppSet.turnOffAll();
        this.target.style.display = 'block';
        this.AppSet.backButton.show();
        this.AppSet.newButton.show();
    }
    
    hide()
    {
        this.target.style.display = 'none';
    }
}


class NewMemo 
{
    constructor(Memo)
    {
        this.target = Memo.target.querySelector("input");
        this.target.setAttribute("placeholder", Memo.AppSet.textInfo["MemoPlaceholder"]);
        this.target.addEventListener("keyup", event => 
        {
            if (event.key == "Enter")
            {
                const new_memos = Memo.memos === null? new Array() : Memo.memos;
                new_memos.unshift(this.target.value);
                this.target.value = '';
                localStorage.setItem("memos", JSON.stringify(new_memos));
                Memo.renew();
                Memo.show();
            }
        });
    }
    
    show()
    {
        this.target.style.display = 'inline';
    }
    
    hide()
    {
        this.target.style.display = 'none';
    }
}
