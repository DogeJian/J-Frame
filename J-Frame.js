/*

思路：

   通过这两天的知识累积与学习，认为简单的框架就是不同功能的JS封装的集合，因此写一个完整的属于自己的框架需要把JS各种功能的封装先一个个做好

   首先需要有一个命名空间即namespace，作为框架的标识符。DogeJian就用J命名好啦

   其次需要写一个函数接口，其中以数组的形式存储各种方法用以命名空间中返回对象进行调用

   1.通过参照JQuery的选择器模式 $('#/.+id/class')，写一个类似方法，在命名空间的函数里传参并用 CharAt()与 substring()方法进行字符判断，并调用相应的方法返回传值
   2.CSS选择器暂时通过简单的 element.style.attr=value 式子 取attr与value的值进行封装

 */
var J=function(args){                     //命名空间，调用时返回一个DogeJian对象
    return new DogeJian(args);
};
function DogeJian(args){
    this.elements=[];                 //创建属性数组 保存获取的节点数组,实例（私有）属性不可在原型里添加 否则会被折叠覆盖
    if(typeof args=='string') {
        switch(args.charAt(0)){                                        //判断参数的第一个字符
            case '#':
                this.elements.push(this.getId(args.substring(1)));     //第二个字符开始截取
                break;
            case '.':
                this.elements=this.getClass(args.substring(1));        //因为获取class节点的方法返回的是节点数组所以用等于号替换
                break;
            default:
                this.elements=this.getTagName(args);
        }
    }
}
// 不能DogeJian.prototype.elements=[]；因为设置了一个id为main的颜色；再设置id为其它的颜色会把main的颜色覆盖掉，这样在原型里添加属于共有
// 获取id节点的方法
DogeJian.prototype.getId=function(id){
    return document.getElementById(id);                                       //返回DogeJian对象实现连缀
};
//获取name节点数组的方法
DogeJian.prototype.getName=function(name){
    var name=document.getElementsByName(name);
    for(var i=0;i<name.length;i++){             //这里相同节点不止一个所以要循环，节点长度不是数组长度
        this.elements.push(name[i])             //每个节点都要添加进去
    }
    return this;
};
//获取元素节点数组的方法
DogeJian.prototype.getTagName=function(tag,parentNode){
    var node=null;         //创建一个对象·
    var temps=[];
    if(parentNode!==undefined){
        node=parentNode;
    }else{
        node=document;
    }
    var tags=node.getElementsByTagName(tag);
    for(var i=0;i<tags.length;i++){
        temps.push(tags[i]);
    }
    return temps;
};
//获取节点数组的某一个
DogeJian.prototype.getElement=function(num){
    var element=this.elements[num];   //获取这个节点
    this.elements=[];                 //让数组为空
    this.elements[0]=element;         //把这个节点作为第一个节点也是唯一一个传入
    return this;
};
//获取指定区域下的class
DogeJian.prototype.getClass=function(className,parentNode){
    var node=null;                                      //表明node是一个对象但没有赋值
    var temps=[];                                       // 数组用来存储目标节点
    if (parentNode!=undefined) {                      //parentNode是节点对象，undefined不用加引号
        node=parentNode;
    }else{
        node=document;
    }
    var all=node.getElementsByTagName('*');          //获取所有的元素节点
    for(var i=0;i<all.length;i++)
    {
        if(all[i].className==className){             //如果节点的class名等于参数的class
            temps.push(all[i]);
        }
    }
    return temps;
};
//设置和获取css属性传入两个参数
DogeJian.prototype.css=function(attr,value){   //document.getElementById('aa').style.color=red      this.element[i].style.attr=value
    for(var i=0;i<this.elements.length;i++) {
        this.elements[i].style[attr] = value;
    }
    return this;
};
// 设置和获取html内容的方法
DogeJian.prototype.html=function(str){
    for(var i=0;i<this.elements.length;i++){

            this.elements[i].innerHTML=str;
    }
    return this;
};
