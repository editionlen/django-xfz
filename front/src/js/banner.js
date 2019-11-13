
function Banners() {
    
}

Banners.prototype.listenAddBannerEvent = function () {
  var addBtn = $("#add-banner-btn");
  addBtn.click(function () {
      var tpl = template("banner-item");
      var bannerListGroup = $(".banner-list-group");
      bannerListGroup.prepend(tpl);
  });
};

Banners.prototype.run = function () {
    this.listenAddBannerEvent();
};

$(function () {
    var banners = new Banners();
    banners.run();
});