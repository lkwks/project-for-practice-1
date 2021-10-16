export default class Album
{
    constructor(AppSet, albumContent)
    {
        this.AppSet = AppSet;
        this.target = albumContent;
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
                
                    img_frame.addEventListener("click", event=>
                    {
                        if (this.now_clicked !== null)
                            this.now_clicked.classList.remove("album-clicked");
                        event.target.classList.add("album-clicked");
                        document.getElementById("album-view-frame").style.backgroundImage = `url(./album/${elem})`;
                        document.getElementById("album-view-frame").style.backgroundPosition = `center center`;
                        this.now_clicked = event.target;
                    });
                });
            }); 
    }

    show()
    {
        this.AppSet.turnOffAll();
        this.target.style.display = 'block';
        this.AppSet.backButton.show();
    }
    
    hide()
    {
        this.target.style.display = 'none';
    }
}