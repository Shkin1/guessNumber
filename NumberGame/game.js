(function(){
	var  start = lib.$("started");
	var  submit = lib.$("submit");
	var  status = lib.$("status");
	var  result = lib.$("result");
	var  chkbox = lib.$("box");
	// var  textNum = document.getElementsByTagName("input").length-1;
	var inputs = myform.elements,
		textNum = inputs.length - 1,
		NumArr = [],
		InputArr = [],
		numA,
		numB,
		flag = 0;
	var  Index = [];
	var  Value =[];
	var  loadApp = {
		/*初始化 */
		init:function(){
			this.disable();
			this.bindEvent();
			this.ShowStatus();
		},
		/* 绑定事件*/
		bindEvent:function(){
			var me = this;
			/* 绑定开始按钮click事件*/
			lib.Event.AddEventListener(start,"click",function(){
				me.initInput();
				me.StartGame();
			});
			/* 绑定提交click事件*/
			lib.Event.AddEventListener(submit,"click",function(){
				me.GoSubmit();
			});
			this.KeyUp();
			
		},
	   KeyUp:function(){
	   	   var me =this;
          for(var i=0;i<inputs.length;i++){
				lib.Event.AddEventListener(inputs[i],"keyup",function(){
					/*js以代码块为单位执行不进行绑定在this会产生覆盖最终只是最后一次for循环的结果而且*/
				    var index = Array.prototype.indexOf.call(inputs,this);
				    // console.log(this);
				    console.log(index);
					if(index<4){
						if(me.suitable(index))
							// me.Focus(index+1);
						inputs[index+1].focus();
					}else{
						for(var i=0;i<4;i++){
							if(!me.suitable(i))
								 // me.Focus(i);
								inputs[i].focus();
						}
					}

				});
			}
		},
		initInput:function(){
			for(var i=0;i<textNum;i++){
                 lib.$(i).value='';
                 //  错误 lib.$(i).disabled='false';
                 lib.$(i).removeAttribute("disabled");
			}
		   submit.removeAttribute("disabled");
		},
		disable:function(){
			for(var i=0;i<textNum;i++){
               lib.$(i).disabled='true';
			}
			submit.disabled='true';
		},
		/*开始游戏 */
		StartGame:function(){
		   NumArr=[];
		   this.Generation();
           flag = 1;
           this.ShowStatus();
           
		},
		/*提交数据 */
		GoSubmit:function(){
			this.GetInpValue();
			this.Display();
		},
		/*显示当前状态 */
		ShowStatus:function(){
			if(flag==0){
               // status.firstChild.nodeValue = "游戏开始啦。。。"
               status.innerHTML = "点击“开始游戏”进入游戏状态";
               result.innerHTML = '<div>检测结果</div>';
           }else if(flag==1){
           	status.innerHTML = "游戏进行中。。。";
           	result.innerHTML = '<div>检测结果</div>';
           }else{
           	 status.innerHTML = "游戏结束!!!";
           	 start.firstChild.innerHTML ="再玩一次";
           } 
		},
		/*生成随机数*/
		Generation:function(){
			/*for(var i =0;i<textNum;i++){
                  newNum = this.SingleNum();
            	  NumArr.push(newNum);
            	}*/
		  var newNum;
		   if(chkbox.checked){
            	while(NumArr.length<=4){            		
            		newNum = this.SingleNum();

            		/*直接if(！NumArr.indexOf(newNum)) 不对非0为TRUE,0为FALSE*/

            		/*直接if(！NumArr.indexOf(newNum)) 不对*/
            		if(NumArr.indexOf(newNum)==-1)
            			NumArr.push(newNum);
            	}
		   }
		  else{
              for(var i =0;i<textNum;i++){
                  newNum = this.SingleNum();
            	  NumArr.push(newNum);
            	}
            }
            console.log(NumArr);
		},
		SingleNum:function(){
            return parseInt(Math.floor(Math.random()*10));
		},
		/*获取输入值*/
		GetInpValue:function(){
           for(var i=0;i<textNum;i++){
           	InputArr[i] = parseInt(lib.$(i).value);
           }
		},

		// 获取输入与机器数的相似匹配结果
		getResult: function() {
			var at = [];
				numA = 0,numB = 0;
			var n = n || InputArr.length;
			console.log("NumArr:" + NumArr);
			console.log("InputArr:" + InputArr);
			for (var i = 0; i < n; i++) {
				if (at[NumArr[i]]) {
					at[NumArr[i]]++;
				} else {
					at[NumArr[i]] = 1;
				}
			};
			for (var i = 0; i < n; i++) {
				if (NumArr[i] == InputArr[i]) {
					numA++;
					if (at[NumArr[i]] >= 1) {
						at[NumArr[i]]--;
					}
				} else if (at[InputArr[i]] > 0) {
					at[InputArr[i]]--;
					numB++;
				}
			}
			console.log("numA:" + numA);
			console.log("numB:" + numB);
		},
		Display:function(){			
			// var numA = this.AllSame(),numB = this.ValueSame();
			this.getResult();
		},

		/* 值和位置都相同*/
		AllSame:function(){
            var num = 0;
            for(var i=0;i<textNum;i++){
            	if(InputArr[i]==NumArr[i]){
            		num +=1;
            	}else{
            		 Index.push(i);
            		 Value.push(NumArr[i]);
            	}
            }
            return num;
		},
		/* 值相同位置不同*/
		ValueSame:function(){
			var num2 = 0;
			for(var i=0;i< Index.length;i++)				
				for(var j=0;j< Index.length;j++){
					if(InputArr[Index[i]]==Value[j])
					{
                       num2 +=1;
                       Value[j] = -1;
                       break;
                       // continue;  /////存在错误   为什么是继续执行内循环呢？？？？		
					}
			 };			  
			 /*for(var i=0;i< Index.length;i++)				
			   for(var j=0;j<textNum;j++){
				   if(InputArr[Index[i]]==NumArr[j])
				   {
                        num2 +=1;
                         break;
                         // continue;  /////存在错误   为什么是继续执行内循环呢？？？？		
				   }
		     }*/
			  
	    Value = [];
	    Index = [];
	    return num2;				
		},
		Display:function(){			
			var numA = this.AllSame();
			var numB = this.ValueSame();
			if(numA!=textNum){
			var addResult ="";
			// var random ='';
			for(var i=0;i<textNum;i++)
			{
			 	addResult += InputArr[i] + " ";
				 // random +=NumArr[i] + ' ';
			}
			addResult += "  ---- "+ numA + " A" +numB + " B";
			/*var p = document.createElement('p');    +"----"+random
			var textNode=document.createTextNode(addResult);
			p.appendChild(textNode);*/
			var p=lib.CreateEle("p",addResult);
			var SChild = result.childNodes[1];
			result.insertBefore(p,SChild);
            // result.innerHTML +='<p>' +addResult+random+'</p>';

			}else{
				flag =2;
				this.ShowStatus();
				result.innerHTML = '<div>检测结果</div>'+'<p class="success">恭喜你！猜对了！</p>';
				this.disable();
			}
		},
		suitable:function(i){
			val = parseInt(lib.$(i).value);
			if(val>=0 &&val <=9){
				return true;
			}else
			return false;
		}
	};
	loadApp.init();

})()	/* 值和位置都相同*/
		// AllSame:function(){
  //           var num = 0;
  //           for(var i=0;i<textNum;i++){
  //           	if(InputArr[i]==NumArr[i]){
  //           		num +=1;
  //           	}else{
  //           		 Index.push(i);
  //           		 Value.push(NumArr[i]);
  //           	}
  //           }
  //           return num;
		// },
		/* 值相同位置不同*/
		// ValueSame:function(){
		// 	var num2 = 0;
		// 	for(var i=0;i< Index.length;i++)				
		// 		for(var j=0;j< Index.length;j++){
		// 			if(InputArr[Index[i]]==Value[j])
		// 			{
  //                      num2 +=1;
  //                      Value[j] = -1;
  //                      break;
  //                      // continue;  /////存在错误   为什么是继续执行内循环呢？--跳过单次语句		
		// 			}
		// 	 };			  
			 /*for(var i=0;i< Index.length;i++)				
			   for(var j=0;j<textNum;j++){
				   if(InputArr[Index[i]]==NumArr[j])
				   {
                        num2 +=1;
                         break;
				   }
		     }*/
			  
	    // Value = [];
	    // Index = [];
	 //    return num2;				
		// },})();



