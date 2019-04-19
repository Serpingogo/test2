class Release{
    constructor(selector,btn){
        this.containner = document.querySelector(selector);              
        this.aBtn = document.querySelector(btn);
        this.type = null;        
        this.bindEvent();             
    }
    bindEvent(){
        this.aBtn.onclick = this.createNode.bind(this);
        this.containner.oncontextmenu = e=>{
            e.preventDefault();                      
            if(this.type === 1){
                this.containner.removeChild(this.ul);
            }                         
            let ul = document.createElement("ul");
            ul.style.left = e.offsetX +"px";
			ul.style.top = e.offsetY +"px";
            ul.innerHTML = `<li>撤销</li>`;
            this.containner.appendChild(ul);
            this.ul = this.containner.querySelector("ul");
            this.type = this.ul.nodeType; 
            this.ul.children[0].onclick = this.undo.bind(this,e);       
                                             
        }               
    }
    createNode(){
        this.model = document.createElement("div");
        this.model.className="model";
        this.edit = document.createElement("div");
        this.edit.innerHTML = `<h4>发布内容<span id="del">X</span></h4>
        <textarea name="" id="" ></textarea>
        <a href="javascript:;" id="release">发布</a>`
        this.edit.id = "edit";
        this.model.appendChild(this.edit);
        document.body.appendChild(this.model);
        this.delBtn = document.querySelector("#del");
        this.relBtn = document.querySelector("#release");
        this.content = document.querySelector("textarea");
        this.render();
        this.delBtn.onclick = this.del.bind(this);
        this.relBtn.onclick =  this.rel.bind (this);
    }
    render(){
        this.editContainer = document.querySelector("#edit");
        let left = (tools.getBody().width-this.editContainer.offsetWidth)/2+"px";
        let top = (tools.getBody().height-this.editContainer.offsetHeight)/2+"px";
        window.onresize = ()=>{
            left = (tools.getBody().width-this.editContainer.offsetWidth)/2+"px";
            top = (tools.getBody().height-this.editContainer.offsetHeight)/2+"px";
        }
        tools.setStyle(this.editContainer,{
            "left": left,
            "top" : top,
        })            
    }
    del(){
        document.body.removeChild(this.model);
    }
    rel(){
        let date = new Date();
        this.years= date.getFullYear()
        this.month = date.getMonth();
        this.day = date.getDate();     
        this.hours = date.getHours();
        this.minutes = date.getMinutes();
        let div = document.createElement("div");
        div.className = "con";        
        div.innerHTML = ` <p>${this.content.value}</p>
        <span>${this.years}年${this.month}月${this.day}日${this.hours}时${this.minutes}分</span>`;
        this.containner.appendChild(div);        
        this.del();  
    }
    undo(e){
        if(e.target.nodeName==="P"||e.target.nodeName==="SPAN"){
            this.containner.removeChild(e.target.parentNode);                   
        }
        this.ul.remove();
        this.type = 0;
    }
}