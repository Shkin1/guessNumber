window.lib = {
    $:function(id){
       return document.getElementById(id);
    },
    CreateEle:function(str1,str2){
       var ele=document.createElement(str1);
       var text = document.createTextNode(str2);
       ele.appendChild(text);
       return ele;
    }
};
lib.Event = {
	AddEventListener:function(ele,eleType,fun){
    	if(ele.addEventListener){
    		ele.addEventListener(eleType,fun,false);
    	}else if(ele.attachEvent){
    		ele.attachEvent("on"+eleType,fun);
    	}else{
        ele["on"+eleType] = fun;
      }
    }
};