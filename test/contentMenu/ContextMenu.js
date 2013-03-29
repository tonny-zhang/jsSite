/*
 * ***************************************************
 * poweredBy:水牛叔叔
 * 2012-7-27,15:29
 * ***************************************************
 * ContextMenu（右键菜单）类共两个成员变量和两个成员方法。
 * 两个成员没有太多让使用者去了解的意义。使用者只要关心其
 * 中的两个方法就够了。下面介绍两个方法。
 * ***************************************************
 * addItem(itemText,styleImg,ev)方法，给右键菜单添加功能
 * 项,共三个参数。
 * itemText : 功能项（subItem,下同）的文字
 * styleImg : 功能项的小图标
 * ev       : 功能项被点击时响应的函数
 * ***************************************************
 * addMenuTo(obj)方法,将该右键菜单应用到指定的元素。共一
 * 个参数。
 * obj : 应用该右键菜单的元素
 */
function ContextMenu(){
    this.menu       = document.createElement("div");
    this.menuBody   = document.createElement("ul");
    /**
     * addItem方法给右键菜单添加功能项。共三个参数
     * itemText :功能项（subItem,下同）的文字
     * styleImg : 功能项的小图标
     * ev       :功能项被点击时响应的函数 
     */
    this.addItem    = function(itemText,styleImg,ev){
        var subItem = document.createElement("li");
        var menu    = this.menu;
        
        subItem.innerHTML   = itemText;
        
        with(subItem.style){
            /*配合外部样式表，控制样式*/
            className       = "ContextMenuSubItem";
            fontSize        = "12px";
            height          = "16px";
            paddingLeft     = "22px";
            margin          = "2px";
            background      = "url(" + styleImg + ") no-repeat #cde6c7";
            opacity         = "0.7";
            cursor          = "default";
        }
        subItem.onmouseover = function(){
            with(subItem.style){
                opacity       = "1";
                cursor        = "default";
                background    = "url(" + styleImg + ") no-repeat #abc88b";
            }
        };
        subItem.onmouseout  = function(){
            subItem.style.opacity       = "0.7";
            subItem.style.cursor        = "default";
            subItem.style.background    = "url(" + styleImg + ") no-repeat #cde6c7";
        };
        subItem.onclick = function(){
            subItem.style.cursor  = "default";
            /*
             * 特别提醒：此处如果你把以下这句写成"menu.style.cssText = 'display:none;'"
             * 会出现一个很奇怪的现象。那就是当menu每改变一个或多个样式时，
             * 其余未改动的样式会全部丧失，不得不把其他样式再次重设。这问
             * 题浪费了我3~4个钟，后来不得已，一句一句代码看了几遍，再次
             * 看到这时，隐约想起在网上有文章说过，cssText设置样式会有
             * “一改全无”的现象。这才搞定。
             */
            menu.style.display = "none";
            ev();
            return false;
        };
        this.menuBody.appendChild(subItem);
    };
    /**
     * addMenuTo方法将该右键菜单应用到指定的元素。一个参数。
     * obj : 应用该右键菜单的元素
     */
    this.addMenuTo  = function(obj){
        /*设置ul的样式*/
        with(this.menuBody.style){
            /*配合外部样式表，控制样式*/
            className           = "myContextMenuBody";
            listStyle           = "none";
            listStylePosition   = "inside";
            margin              = "0px";
            padding             = "0px";
        }
        /*设置div的样式*/
        with(this.menu.style){
            /*配合外部样式表，控制样式*/
            className   = "myContextMenu";
            position    = "absolute";
            display     = "none"
            background  = "#cde6c7";
            width       = "110px";
            zindex      = "9000";
            border      = "1px solid #1d953f"
        }
        
        this.menu.appendChild(this.menuBody);
        document.body.appendChild(this.menu);
        /*由于在事件函数内，this指代的对象不再是本类的对象，
         * 所以为以下函数定义一个全局变量menu
         */
        var menu = this.menu;
        obj.onblur = function(){
            menu.style.display = "none";
        }
        obj.oncontextmenu = function(ev){
            menu.style.top     = ev.pageY;
            menu.style.left    = ev.pageX;
            menu.style.display = "block";
            return false;
        }
    }
}