export default class Album
{
    constructor(AppObj)
    {
        this.AppObj = AppObj;
        this.target = AppObj.albumContentNode;
        this.albumList = this.target.querySelector("ul");
        this.albumViewFrame = this.target.querySelector("#album-view-frame");
        this.now_clicked=null;
        this.target.addEventListener("click", event=>
        {
            if (event.target.nodeName === "LI")
            {
                if (this.now_clicked !== null)
                    this.now_clicked.classList.remove("album-clicked");
                event.target.classList.add("album-clicked");
                this.albumViewFrame.style.backgroundImage = event.target.style.backgroundImage;
                this.albumViewFrame.style.backgroundPosition = `center center`;
                this.now_clicked = event.target;
            }
        });
        this.render();
    }

    toggle()
    {
        this.target.classList.toggle("hide");
    }
    
    makeListItem(elem)
    {
        const listItem = document.createElement("li");
        listItem.classList.add("album-img-frame");
        listItem.style.backgroundImage = `url(./album/${elem})`;
        return listItem;
    }
    
    render()
    {
        fetch("./album/file_list.json")
            .then(response => response.json())
            .then(file_list =>
            {
                this.albumList.innerHTML = file_list.map(elem => this.makeListItem(elem)).join("");                
            }); 
    }
}
