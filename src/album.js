export default class Album
{
    isVisible = false;
    
    constructor($target, hideHome)
    {
        this.$target = $target;
        this.hideHome = hideHome;
        this.now_clicked=null;
        this.albumViewFrame = this.$target.querySelector("div");
        this.$target.addEventListener("click", event=>
        {
            if (event.target.nodeName === "IMG")
                this.clickListItem(event.target);
        });
        this.render();
    }
    
    clickListItem(target)
    {
        if (this.now_clicked !== null)
            this.now_clicked.parentNode.classList.remove("clicked");
        this.now_clicked = target;
        target.parentNode.classList.add("clicked");
        this.albumViewFrame.style.backgroundImage = `url(${target.src})`;
    }
    
    makeListItem(elem)
    {
        const listItem = document.createElement("li");
        listItem.style.backgroundImage = `url(./album/${elem})`;
        listItem.appendChild(document.createElement("img"));
        listItem.querySelector("img").src = `./album/${elem}`;
        return listItem;
    }
    

    hide()
    {
        this.$target.classList.add("hide");
    }

    show()
    {
        this.hideHome();
        this.$target.classList.remove("hide");
    }

    render()
    {
        fetch("./album/file_list.json")
            .then(response => response.json())
            .then(file_list =>
            {
                file_list.forEach(elem => {
                    this.$target.querySelector("ul").appendChild(this.makeListItem(elem));
                });
            });
    }        
}
