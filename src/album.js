let now_clicked=null;

export default function drawAlbumContent()
{
    for (let elem of document.getElementById("page-content").children)
        elem.style.display = 'none';
    document.getElementById("album-content").style.display = 'block';
    document.getElementById("backButton").firstChild.style.display = 'block';
 
    const albumContentNode = document.getElementById("album-content");
    const flistContentNode = albumContentNode.getElementsByTagName("ul")[0];
    const viewFrameNode = albumContentNode.getElementsByTagName("div")[0];
    
    flistContentNode.innerHTML = '';

    fetch("./album/file_list.json")
        .then(response => response.json())
        .then(file_list =>
        {
            file_list.forEach(elem => 
            {
                const img_frame = document.createElement("li");
                img_frame.classList.add("album-img-frame");
                img_frame.style.backgroundImage = `url(./album/${elem})`;
                
                img_frame.addEventListener("click", event=>
                {
                    if (now_clicked !== null)
                        now_clicked.classList.remove("album-clicked");
                    event.target.classList.add("album-clicked");
                    viewFrameNode.style.backgroundImage = `url(./album/${elem})`;
                    viewFrameNode.style.backgroundPosition = `center center`;
                    now_clicked = event.target;
                });
                flistContentNode.appendChild(img_frame);
            });
        });
        
}