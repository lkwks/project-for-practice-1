export default class Button 
{
    constructor($target, reactionFunc)
    {
        this.$target = $target;
        this.reactionFunc = reactionFunc;
        this.$target.addEventListener("click", ()=> this.reactionFunc());
    }
    
    show()
    {
        this.$target.classList.remove("hide");        
    }

    hide()
    {
        this.$target.classList.add("hide");            
    }
}
