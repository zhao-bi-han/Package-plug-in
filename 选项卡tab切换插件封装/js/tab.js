(function($){
	var tab=function(ele,options){
		this.ele=ele,
		this.content=ele.find(".content-warp");
		this.opts=$.extend({},tab.defaults,options);
		this.bindEvent();
	}

	tab.defaults={
		triggerType:"click", //鼠标触发类型
        effect:"default",        //内容切换效果
        invoke:1,                //默认显示第几个tab
        auto:false               //是否自动切换
    }

    tab.prototype.bindEvent=function(){
    	var _this=this;
    	// 当用户输入triggerType有误时，默认触发mouseover
    	if(this.opts.triggerType!="mouseover"||this.opts.triggerType!="click"){
    		this.opts.triggerType="mouseover";
    	}
    	this.ele.on(this.opts.triggerType,'li',function(){
    		var index=$(this).index();
    		_this.show(index);
    	});

    	//默认显示那个tab
    	if(this.opts.invoke!=1){
    		this.show(this.opts.invoke-1);
    	}

    	//是否自动切换
    	if(this.opts.auto){
    		this.autoPlay();
    	}

    }

    tab.prototype.show=function(index){
    	//判断是否带有切换效果
    	this.ele.find("li").eq(index).addClass("active").siblings().removeClass('active');
    	if(this.opts.effect=="fade"){
    		this.content.eq(index).fadeIn().siblings().fadeOut();
    	}else{
    		this.content.eq(index).addClass("current").siblings().removeClass("current");
    	}
    }

    tab.prototype.autoPlay=function(){
    	var _this=this,
    	    len=this.ele.find("li").length,
            setTime=null;  //设置一个定时器

            auto();
           //当鼠标移到内容上停止切换
           this.content.hover(function(){
           	   clearInterval(setTime);
           },function(){
           	   auto();
           	  _this.show(_this.opts.invoke-1);
           })

           function auto(){
           	   setTime=setInterval(function(){
           		 _this.opts.invoke++;
           		   if(_this.opts.invoke>len){
           			  _this.opts.invoke=1;
           		   }
           		   _this.show(_this.opts.invoke-1);
            	},3000)
            }
       }

      //封装成jq方法
      $.fn.extend({
      	tab:function(options){
			//多个tab，this是指DOM对象
			this.each(function(){
				new tab($(this),options);
			})
		}
	})
  })(jQuery)