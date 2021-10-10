import {backButton, newButton, text_info, turnOffAll} from "./home.js";

let now_clicked = null, memos = null;

export function makeMemoInput()
{
    document.getElementById("new-memo").setAttribute("placeholder", text_info["MemoPlaceholder"]);
    document.getElementById("new-memo").addEventListener("keyup", event=> addNewMemo(event.key));
}

export function addNewMemo(key)
{
    if (key == "Enter")
    {
        const new_memos = memos === null? new Array() : memos;
        new_memos.unshift(document.getElementById("new-memo").value);
        document.getElementById("new-memo").value = '';
        localStorage.setItem("memos", JSON.stringify(new_memos));
        makeMemoContent();
        drawMemoContent();
    }
}

export default function drawMemoContent()
{
    turnOffAll();
    document.getElementById("memo-content").style.display = 'block';
    backButton.style.display = 'block';
    newButton.style.display = 'block';    
}

export function makeMemoContent()
{
    document.getElementById("memo-list").innerHTML = '';    
    memos = JSON.parse(localStorage.getItem("memos"));
    if (memos !== null)
        memos.forEach(elem =>
        {
            const memo_elem = document.createElement("li");
            document.getElementById("memo-list").appendChild(memo_elem);
            memo_elem.textContent = elem;
            memo_elem.classList.add("memo-element");
            memo_elem.addEventListener("click", _=> 
            {
                if (now_clicked !== null)
                    now_clicked.style.maxHeight = '2.6em';
                memo_elem.style.maxHeight = 'none';
                now_clicked = memo_elem;
            });
        });
}