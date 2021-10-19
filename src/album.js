export default class Album
{
    constructor(AppObj)
    {
        this.target = AppObj.albumContentNode;
        this.albumList = this.target.querySelector("ul");
        this.albumViewFrame = this.target.querySelector("#album-view-frame");
        this.now_clicked=null;
        this.target.addEventListener("click", event=>
        {
            if (event.target.nodeName === "LI")
                this.clickListItem(event.target);
        });
        this.render();
    }
    
    clickListItem(target)
    {
        if (this.now_clicked !== null)
            this.now_clicked.classList.remove("album-clicked");
        this.now_clicked = target;
        target.classList.add("album-clicked");
        this.albumViewFrame.style.backgroundImage = target.style.backgroundImage;
        this.albumViewFrame.style.backgroundPosition = `center center`;
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
        return listItem.outerHTML;
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
