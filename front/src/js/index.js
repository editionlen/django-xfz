function Banner() {
    this.bannerWidth = 798;
    this.bannerGroup = $("#banner-group");
    this.index = 0;
    this.leftArrow = $('.left-arrow');
    this.rightArrow = $(".right-arrow");
    this.bannerUl = $("#banner-ul");
    this.liList = this.bannerUl.children("li");
    this.bannerCount = this.liList.length;
    this.listenBannerHover();
}

Banner.prototype.initBanner = function () {
    var self = this;
    self.bannerUl.css({"width": self.bannerWidth*self.bannerCount})
};

Banner.prototype.initPageControl=function () {
    var self = this;
    var pageControl = $(".page-control");
    for(var i=0;i<self.bannerCount;i++)
    {
        var circle = $("<li></li>");
        pageControl.append(circle);
        if(i === 0)
        {
            circle.addClass("active")
        }
    }
    pageControl.css({"width":self.bannerCount*12+8*2+16*(self.bannerCount -1)});
};

Banner.prototype.animate = function () {
    var self = this;
    self.bannerUl.animate({"left":-798*self.index},500)
};

Banner.prototype.listenArrowClick = function () {
    var self = this;
    self.leftArrow.click(function(){
        if(self.index === 0)
        {
            self.index = self.bannerCount - 1;
        }
        else
        {
            self.index--;
        }
        self.animate();
    });
    self.rightArrow.click(function(){
        if(self.index === self.bannerCount - 1)
        {
            self.index = 0;
        }
        else
        {
            self.index++;
        }
        self.animate();
    })
};

Banner.prototype.toggleArrow = function (isShow) {
    var self = this;
    if(isShow)
    {
      self.leftArrow.show();
      self.rightArrow.show();
    }else{
      self.leftArrow.hide();
      self.rightArrow.hide();
    }
};

Banner.prototype.listenBannerHover = function () {
    var self = this;
  this.bannerGroup.hover(function(){
      //鼠标移到banner上执行的函数
      clearInterval(self.timer);
      self.toggleArrow(true);
      },
      function(){
      //鼠标从banner移走会执行的函数
          self.loop();
          self.toggleArrow(false);
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
        self.animate();
    }, 2000);
};

Banner.prototype.run = function(){
    console.log("abc");
    this.initBanner();
    this.initPageControl();
    this.loop();
    this.listenArrowClick();
};
//万能的$方法，确保轮播图片加载完再执行轮播
$(function(){
    var banner = new Banner();
    banner.run()
});