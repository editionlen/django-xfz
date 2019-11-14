
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
      self.addRemoveBannerEvent(bannerItem);
      self.addSaveBannerEvent(bannerItem);
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

Banners.prototype.addRemoveBannerEvent = function (bannerItem) {
    var closeBtn = bannerItem.find('.close-btn');
    closeBtn.click(function () {
        console.log("close bannerITem");
        bannerItem.remove();
    });
};

Banners.prototype.addSaveBannerEvent = function (bannerItem) {
    var saveBtn = bannerItem.find('.save-btn');
    var imageTag = bannerItem.find('.thumbnail');
    var priorityTag = bannerItem.find("input[name='priority']");
    var linktoTag = bannerItem.find("input[name='link_to']");
    var prioritySpan = bannerItem.find('span[class="priority"]');
    saveBtn.click(function () {
        var image_url = imageTag.attr('src');
        var priority = priorityTag.val();
        var link_to = linktoTag.val();
        xfzajax.post({
            'url': '/cms/add_banner/',
            'data': {
                'image_url': image_url,
                'priority': priority,
                'link_to': link_to
            },
            'success':function (result) {
                if(result['code'] === 200)
                {
                    var bannerId = result['data']['banner_id'];
                    prioritySpan.text("优先级："+priority);
                    window.messageBox.showSuccess('轮播图添加完成！');
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