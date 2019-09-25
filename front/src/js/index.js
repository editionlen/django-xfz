function Banner() {
    
}

Banner.prototype.run = function(){
    var bannerUl = $("#banner-ul");//#+id名称表示选择了id为xxx的控件
    var index=0;
    setInterval(function(){
        if(index >= 3)
        {
            index = 0;
        }
        else {
            index++;
        }
        bannerUl.animate({"left":-798*index}, 500);
    }, 2000)
};
//万能的$方法，确保轮播图片加载完再执行轮播
$(function(){
    var banner = new Banner();
    banner.run()
});