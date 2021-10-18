export default class Album
{
    constructor(AppObj)
    {
        this.AppObj = AppObj;
        this.target = AppObj.albumContentNode;
        this.now_clicked=null;
        fetch("./album/file_list.json")
            .then(response => response.json())
            .then(file_list =>
            {
                file_list.forEach(elem => 
                {
                    const img_frame = document.createElement("li");
                    this.target.querySelector("ul").appendChild(img_frame);
                    img_frame.classList.add("album-img-frame");
                    img_frame.style.backgroundImage = `url(./album/${elem})`;
                });
                
                this.target.addEventListener("click", event=>
                {
                    if (event.target.nodeName === "LI")
                    {
                        if (this.now_clicked !== null)
                            this.now_clicked.classList.remove("album-clicked");
                        event.target.classList.add("album-clicked");
                        this.target.querySelector("#album-view-frame").style.backgroundImage = event.target.style.backgroundImage;
                        this.target.querySelector("#album-view-frame").style.backgroundPosition = `center center`;
                        this.now_clicked = event.target;
                    }
                });
            }); 
    }

    show()
    {
        this.AppObj.turnOffAll();
        this.target.style.display = 'block';
        this.AppObj.backButton().show();
    }
    
    hide()
    {
        this.target.style.display = 'none';
    }
}