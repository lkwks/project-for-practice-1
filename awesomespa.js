let homeContentNode = document.createElement("div");
const backButtonNode = document.createElement("button");

function drawClock(date_format)
{
    const time = new Date();
    const year = time.getFullYear(), month = time.getMonth() + 1, day = time.getDate();
    const hour = time.getHours(), minute = time.getMinutes(), second = time.getSeconds();
    let date_str = date_format.replace("YYYY", year); date_str = date_str.replace("MM", month); date_str = date_str.replace("DD", day);
        date_str = date_str.replace("hh", hour); date_str = date_str.replace("mm", minute); date_str = date_str.replace("ss", second);
    document.getElementById('clock').textContent = date_str;
    setTimeout(_=>drawClock(date_format), 1000);   
}

function createBackButton(button_text)
{
    backButtonNode.textContent = button_text;
    backButtonNode.classList.add("status-bar-button");
    backButtonNode.addEventListener("click", drawHomeContent);
}

function drawHomeContent()
{
    document.getElementById("backButton").innerHTML = "";
    document.getElementById("newButton").innerHTML = "";
    document.getElementById("page-content").innerHTML = homeContentNode.outerHTML;
}


async function makeHomeContent()
{
    const pages_response = await fetch("pages.json");
    const pages_json = await pages_response.json();    
    //이것도 로컬 스토리지 비어있을 때나 여는 거고 원래는 로컬 스토리지에서 로드해야 함.

    Object.keys(pages_json).forEach((elem, idx) => {
        const button_box = document.createElement("div");
        button_box.classList.add("app-button-box");
        button_box.setAttribute("id", "box"+idx);
        //drag 상태에서 마우스 커서가 이 box 안으로 들어오면 박스 안 앱 버튼 움직이게 하는 event listener 달아야 함.
        //박스 안에 drop시 그 박스 안에 커서에 달려있던 앱 버튼이 떨어지게 하는 함수 짜야 함.
        //위치 바뀔 때마다 로컬 스토리지에 바뀐 위치 업데이트 해야 함 ㅅㅂ
        
        const app_button = document.creatElement("button");
        app_button.classList.add("app-button");
        app_button.textContent = pages_json[elem][0];

        if (pages_json[elem] === "alarm")
            app_button.addEventListener("click", _=>drawAlarmContent(pages_json[elem][1])); 
        if (pages_json[elem] === "memo")
            app_button.addEventListener("click", _=>drawMemoContent(pages_json[elem][1])); 
        if (pages_json[elem] === "album")
            app_button.addEventListener("click", _=>drawAlbumContent(pages_json[elem][1]));
        //drag시 버튼이 box 안에서 사라지고 커서에 붙어다니게 하는 함수 짜야 함.
        
        button_box.appendChild(app_button);
        homeContentNode.appendChild(button_box);
    });
}

async function startApplication()
{
    const config_response = await fetch("config.json");
    const app_config = await config_response.json();
    document.title = app_config["title"];
    drawClock(app_config["date-format"]);
    createBackButton(app_config["text-info"]["BackButton"]);
    await makeHomeContent();
    drawHomeContent();
}




function drawAlarmContent()
{
    if (document.getElementById("backButton").innerHTML === "")
        document.getElementById("backButton").appendChild(backButtonNode);
    document.getElementById("newButton").innerHTML = "";

    const newButtonNode = document.createElement("button");    
    
    document.getElementById("page-content").innerHTML = ; 
}


