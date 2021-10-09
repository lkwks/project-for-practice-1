import {addNewAlarmFunction} from "./alarm.js";

const new_memo_node = document.getElementById("memo-content").getElementsByTagName("input")[0];
let now_clicked = null;

export function addNewMemoFunction()
{
    new_memo_node.style.display = 'inline';
}

export function addNewMemo(key, text_info)
{
    if (key == "Enter")
    {
        const memos = localStorage.getItem("memos");
        const new_memos = memos === null? new Array() : JSON.parse(memos);
        new_memos.unshift(new_memo_node.value);
        new_memo_node.value = '';
        localStorage.setItem("memos", JSON.stringify(new_memos));
        new_memo_node.style.display = 'none';
        drawMemoContent(text_info);
    }
}

export default function drawMemoContent(text_info)
{
    for (let elem of document.getElementById("page-content").children)
        elem.style.display = 'none';
    document.getElementById("memo-content").style.display = 'block';
    document.getElementById("memo-list").innerHTML = '';
    new_memo_node.style.display = 'none';

    document.getElementById("backButton").firstChild.style.display = 'block';
    document.getElementById("newButton").firstChild.style.display = 'block';
    document.getElementById("newButton").firstChild.addEventListener("click", addNewMemoFunction);
    document.getElementById("newButton").firstChild.removeEventListener("click", addNewAlarmFunction);
    
    
    const memo_list = document.createElement("ul");
    document.getElementById("memo-list").appendChild(memo_list);
    const memos = JSON.parse(localStorage.getItem("memos"));
    if (memos !== null)
        memos.forEach(elem =>
        {
            const memo_elem = document.createElement("li");
            memo_list.appendChild(memo_elem);
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