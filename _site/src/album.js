import {backButton, turnOffAll} from "./home.js";

let now_clicked=null;

export default function drawAlbumContent()
{
    turnOffAll();
    document.getElementById("album-content").style.display = 'block';
    backButton.style.display = 'block';
 }
 
 export function makeAlbumContent()
 {
    fetch("./album/file_list.json")
        .then(response => response.json())
        .then(file_list =>
        {
            document.getElementById("album-flist").innerHTML = '';
            file_list.forEach(elem => 
            {
                const img_frame = document.createElement("li");
                document.getElementById("album-flist").appendChild(img_frame);
                img_frame.classList.add("album-img-frame");
                img_frame.style.backgroundImage = `url(./album/${elem})`;
                
                img_frame.addEventListener("click", event=>
                {
                    if (now_clicked !== null)
                        now_clicked.classList.remove("album-clicked");
                    event.target.classList.add("album-clicked");
                    document.getElementById("album-view-frame").style.backgroundImage = `url(./album/${elem})`;
                    document.getElementById("album-view-frame").style.backgroundPosition = `center center`;
                    now_clicked = event.target;
                });
            });
        });
 }