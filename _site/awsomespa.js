

function drawClock(date_format)
{
    const time = new Date();
    const year = time.getFullYear(), month = time.getMonth() + 1, day = time.getDate();
    const hour = time.getHours(), minute = time.getMinutes(), second = time.getSeconds();
    let date_str = date_format.replace("Y", year); date_str = date_str.replace("M", month); date_str = date_str.replace("D", day);
    date_str = date_str.replace("h", hour); date_str = date_str.replace("m", minute); date_str = date_str.replace("s", second);
    document.getElementById('clock').textContent = date_str;
    setTimeout(_=>drawClock(date_format), 1000);   
}

async function drawHome()
{
    const layout_response = await fetch("layouts/home.html");
    const parsed_obj = new window.DOMParser().parseFromString(await layout_response.text(), "text/xml");
    
    try{
    parsed_obj.firstChild.setAttribute("style", "border:1px solid black;height:30px;");
    alert(parsed_obj.firstChild.getAttribute("style"));
    }
    catch(e){alert(e);}
    document.getElementsByClassName("page-content")[0].appendChild(parsed_obj.firstChild);
    alert(document.getElementsByClassName("page-content")[0].lastChild.getAttribute("style"));
    const newnode = document.createElement("div");
    newnode.innerHTML = "zzzsdfsdf";
    newnode.style = "border:1px solid black;height:30px;";
    document.getElementsByClassName("page-content")[0].appendChild(newnode);
}

async function startApplication()
{
    const config_response = await fetch("config.json");
    const app_config = await config_response.json();
    document.title = app_config["title"];
    drawClock(app_config["date-format"]);
    drawHome();
}

