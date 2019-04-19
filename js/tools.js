var tools = {
	setStyle: function(obj,attr){
		for(let key in attr){
			obj.style[key] = attr[key];
		}
	},
	/* 获取元素的样式
	 * @param  obj <DOM Object> 要获取样式的元素对象
	 * @param  attr <string>  要获取的属性名
	 * @return  <string>  样式的值
	 */
	getStyle : function (obj, attr) {
	// 	if(obj.currentStyle){
	// 		// IE
	// 		return obj.currentStyle[attr];
	// 	}else{
	// 		return getComputedStyle(obj, false)[attr];
	// 	}
		
		return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
		
	// 	try{
	// 		return obj.currentStyle[attr];
	// 	}catch(){
	// 		return  getComputedStyle(obj, false)[attr];
	// 	}
	},
	
	/* 获取一个元素距离body边缘的坐标
	 * @param obj <DOM Object>  要获取坐标的那个元素对象
	 * @return <object> {left, top}
	 */
	getBodyDis : function (obj) {
		var left = 0, top = 0;
		while(obj.offsetParent) {
			left += obj.offsetLeft;
			top += obj.offsetTop;
			// obj赋值为父级，往前走一步继续计算
			obj = obj.offsetParent;
		}
		return {
			"top" : top,
			"left" : left
		};
	},
	
	/* 获取整个body的宽高
	 * @return <object> {width, height}
	 */
	getBody : function () {
		return {
			width : document.documentElement.clientWidth || document.body.clientWidth,
			height : document.documentElement.clientHeight || document.body.clientHeight
		}
	},
	/* 添加事件监听
	 * obj <DOM object>   添加监听的DOM对象
	 * type <string> 事件句柄（不带on）
	 * fn <function> 事件处理函数
	 * isCapture <boolean> 是否捕获，默认为false（IE8+有效）
	 */
	on: function (obj, type, fn, isCapture) {
		isCapture = isCapture || false;
		
		if(window.attachEvent){
			obj.attachEvent("on"+type, fn);
		}else{
			obj.addEventListener(type, fn, isCapture);
		}
		
	},
	/* 移出事件监听
	 * obj <DOM object>   添加监听的DOM对象
	 * type <string> 事件句柄（不带on）
	 * fn <function> 要移出的那个事件处理函数
	 * isCapture <boolean> 监听是在捕获阶段的话那么移出也要传true，默认为false（IE8+有效）
	 */
	off : function (obj, type, fn, isCapture) {
		isCapture = isCapture || false;
		if(window.detachEvent){
			obj.detachEvent("on"+type, fn);
		}else{
			obj.removeEventListener(type, fn, isCapture);
		}
	},
	
	/* 给某个元素绑定鼠标滚轮事件
	 * obj <DOM object>   添加监听的DOM对象
	 * fn <function>  事件处理函数 这个函数有一个参数 <boolean>  true向下  false代表向上
	 */
	scroll : function (obj, fn) {
		// 回调函数
		// 判断事件有没有效，而不是有没有绑定（有效但是没有绑定的时候值为null）
		if(obj.onmousewheel !== undefined) {
			
			obj.onmousewheel = function (e) {
				e = e || event;
				
				fn(e.wheelDelta < 0);
				/* if(e.wheelDelta < 0) fn(true);
				else fn(false); */
			}
		}else{
			
			obj.addEventListener("DOMMouseScroll", function (e) {
				e = e || event;
				fn(e.detail>0);
			})
		}
	}
}

