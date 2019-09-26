function Banner() {
    this.bannerGroup = $("#banner-group");
    this.index = 0;
    this.listenBannerHover();
}

Banner.prototype.listenBannerHover = function () {
    var self = this;
  this.bannerGroup.hover(function(){
      //鼠标移到banner上执行的函数
      clearInterval(self.timer)
      },
      function(){
      //鼠标从banner移走会执行的函数
          self.loop()
      });
};

Banner.prototype.loop = function(){
    var self = this;
    var bannerUl = $("#banner-ul");//#+id名称表示选择了id为xxx的控件
    this.timer = setInterval(function(){
        if(self.index >= 3)
        {
            self.index = 0;
        }
        else {
            self.index++;
        }
        bannerUl.animate({"left":-798*self.index}, 500);
    }, 2000);
};

Banner.prototype.run = function(){
    console.log("abc");
    this.loop()
};
//万能的$方法，确保轮播图片加载完再执行轮播
$(function(){
    var banner = new Banner();
    banner.run()
});