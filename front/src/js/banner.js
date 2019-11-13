
function Banners() {
    
}

Banners.prototype.listenAddBannerEvent = function () {
    var self = this;
    var addBtn = $("#add-banner-btn");
    addBtn.click(function () {
      var tpl = template("banner-item");
      var bannerListGroup = $(".banner-list-group");
      bannerListGroup.prepend(tpl);

      var bannerItem = bannerListGroup.find(".banner-item:first");
      self.addImageSelectEvent(bannerItem);
    });
};

Banners.prototype.addImageSelectEvent = function (bannerItem) {
    var image = bannerItem.find('.thumbnail');
    var imageInput = bannerItem.find('.image-input');
    //图片是不能打开文件选择框的，只能通过INput(type=file)
    image.click(function () {
       imageInput.click();
    });

    imageInput.change(function () {
       var file = this.files[0];
       var formData = new FormData();
       formData.append("file", file);
       xfzajax.post({
           'url': '/cms/upload_file/',
           'data':formData,
           'processData': false,
           'contentType': false,
           'success': function (result) {
               if(result['code'] === 200)
               {
                   var url = result['data']['url'];
                   image.attr('src', url);
               }
           }
       })
    });
};

Banners.prototype.run = function () {
    this.listenAddBannerEvent();
};

$(function () {
    var banners = new Banners();
    banners.run();
});