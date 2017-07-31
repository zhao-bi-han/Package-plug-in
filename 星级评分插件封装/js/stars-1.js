(function(){
	function stars(ele,option){
		this.$ele=$(ele);
		this.$item=$(ele+" li");
		this.opt=$.extend({},stars.default,option);
		this.init();
	}
	stars.default={
		num:0,
		readOnly:false,  //是否只读
		select:function(){},
		chose:function(){}
	}
	stars.prototype.init=function(){
		this.onLight(this.opt.num);
		if(!this.opt.readOnly){
			this.bindEvent();
		}	
	}
	stars.prototype.onLight=function(num){
		   var num=parseInt(num);
			this.$item.each(function(index){    
				if(num>index){
					$(this).css("backgroundPosition", "0 0");
				}else{
					$(this).css("backgroundPosition", "-50px 0");
				}
			})
	}
	stars.prototype.bindEvent=function(){
		var _this=this;

		_this.$ele.on('mouseover','li',function(){
			var num=$(this).index()+1,
			    itemLength=_this.$item.length;

			_this.onLight(num);
			//打印当前星星
            (typeof _this.opt.select==="function")&&_this.opt.select.call(this,num,itemLength);
		}).on('click','li',function(){
			_this.opt.num=$(this).index()+1;
			(typeof _this.opt.chose==="function")&&_this.opt.chose.call(this,_this.opt.num,_this.$item.length);
		}).on("mouseout",function(){
			_this.onLight(_this.opt.num);
		})
	}

	
	$.extend({
		stars:function(ele,option){
			return new stars(ele,option);
		}
	})
})(jQuery)