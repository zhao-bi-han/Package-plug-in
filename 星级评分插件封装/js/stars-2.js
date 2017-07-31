var staring=(function(){
	var stars=function (ele,option){
		this.$ele=$(ele);
		this.$item=this.$ele.find(".item");
		this.opt=option;
	}

	stars.prototype.init=function(){
		this.onLight(this.opt.num);
		this.bindEvent();
	}
	stars.prototype.onLight=function(num){
		this.$item.each(function(index){    
			if(index<num){
				$(this).css("backgroundPosition", "0 0");
			}else{
				$(this).css("backgroundPosition", "-50px 0");
			}
		})
	}
	stars.prototype.bindEvent=function(){
		var _this=this;

		_this.$ele.on('mouseover','li',function(){
			_this.onLight($(this).index()+1);

		}).on('click','li',function(){
			_this.opt.num=$(this).index()+1;
		}).on("mouseout",function(){
			_this.onLight(_this.opt.num);
		})
	}

	 	//默认参数
	var defaults={
	 		num:0,
	 		readOnly:false,
	 		select:function(){},
	 		chose:function(){}
	 }
   //初始化
   var int=function(ele,option){
   	opt=$.extend({},defaults,option);
   	new stars(ele,opt).init();
   }


   return {
   	init:int
   }

})()