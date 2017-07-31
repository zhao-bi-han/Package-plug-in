//一般将插件放在局部作用域中，而js中没有局部作用域，所以用闭包来模拟局部作用域。
(function($){
	//构造函数
	function PreLoad(img,options){
		//先判断传来的是一个字符串还是数组，因为可能会传一张图片
		this.img=(typeof img)=='string'?[img]:img;
		//将preload.DEFAULTS对象和options对象 融合生成一个新的对象
		this.opts=$.extend({},PreLoad.DEFAULTS,options);
		this._unordered();
	}
	//设置默认参数,当不传递参数时，就使用默认参数。
	PreLoad.DEFAULTS={
      each:null,// 加载完单张图片后要执行的
      all:null  //所有图片加载完要执行的
  }
  PreLoad.prototype._unordered=function(){
  	var img=this.img,
  	    opts=this.opts,
  	    count=0;
  	    len=img.length;
  	$.each(img,function(i, src) {
  		if((typeof src)!='string') return;
  		var imageObj =new Image();
           //img 对象有两个事件，load ——>正常加载，error——>不正常加载
           $(imageObj).on("load error",function(){
           	//当opts.each 不为空时在执行opts.each()
           	opts.each && opts.each(count);
           	
           	if(count>=len-1){
           		opts.all && opts.all();
           	}
           	count++;
           })
           
           
           imageObj.src=src;
       });
  }
  $.extend({
  	preload:function(img,opts){
  		new PreLoad(img,opts);
  	}
  });
})(jQuery);//传递jQuery对象