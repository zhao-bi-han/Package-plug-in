(function($){
	function slider(options){
		this.opts=$.extend({},slider.defaluts,options);
		this._imgSlider();
	}
	//设置默认值
	slider.defaluts={
		imgElement:null,
		liElement:null,
		leftBtn:null,
		rightBtn:null,
		time:2000
	}
	slider.prototype._imgSlider=function(){
		var opts=this.opts,
		    index=0,
		    len=opts.imgElement.length,
		    timeInter=null;
		if(opts.imgElement=='') return;
		opts.imgElement.eq(0).show();
		showTime();
		  //当鼠标经过  轮播停止，移开继续
		  opts.imgElement.hover(function() {
		  	clearInterval(timeInter);
		  }, function() {
		  	showTime();
		  });

        //点击li  显示对应的图片
        opts.liElement.click(function(){
        	var id=$(this).index();
        	show(id);
        });
        //向左向右
        opts.leftBtn.click(function(){
        	clearInterval(timeInter);
        	--index;
        	index=Math.max(0,index);
        	show(index);
        	showTime();
        });
        opts.rightBtn.click(function(){
        	clearInterval(timeInter);
        	++index;
        	index=Math.min(len-1,index);
        	show(index);
        	showTime();
        });


        function showTime(){
        	timeInter=setInterval(function(){
        		index++;
        		if(index>len){
        			index=0;
        		}
        		show(index);
        	},opts.time);
        }
        function show(index){
        	opts.imgElement.eq(index).fadeIn(1000).siblings('img').fadeOut(1000);
        	opts.liElement.eq(index).addClass('active').siblings('li').removeClass('active');
        }

    }
    $.extend({
    	slider:function(options){
    		new slider(options);
    	}
    })
})(jQuery)