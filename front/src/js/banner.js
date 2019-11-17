function Banners() {

}

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
            'data': formData,
            'processData': false,
            'contentType': false,
            'success': function (result) {
                if (result['code'] === 200) {
                    var url = result['data']['url'];
                    image.attr('src', url);
                }
            }
        })
    });
};

Banners.prototype.loadData = function () {
    var self = this;
    xfzajax.get({
        'url': '/cms/banner_list/',
        'success': function (result) {
            if (result['code'] === 200) {
                var banners = result['data'];
                for (var i = 0; i < banners.length; i++) {
                    var banner = banners[i];
                    self.createBannerItem(banner);
                }
            }
        }
    })
};

Banners.prototype.createBannerItem = function (banner) {
    var self = this;
    var tpl = template("banner-item", {"banner": banner});
    var bannerListGroup = $(".banner-list-group");

    var bannerItem = null;
    if (banner) {
        bannerListGroup.append(tpl);
        bannerItem = bannerListGroup.find(".banner-item:last");
    }
    else {
        bannerListGroup.prepend(tpl);
        bannerItem = bannerListGroup.find(".banner-item:first");
    }

    self.addImageSelectEvent(bannerItem);
    self.addRemoveBannerEvent(bannerItem);
    self.addSaveBannerEvent(bannerItem);
};

Banners.prototype.listenAddBannerEvent = function () {
    var self = this;
    var addBtn = $("#add-banner-btn");
    addBtn.click(function () {
        self.createBannerItem();
    });
};

Banners.prototype.addRemoveBannerEvent = function (bannerItem) {
    var closeBtn = bannerItem.find('.close-btn');

    closeBtn.click(function () {
        var bannerId = bannerItem.attr('data-banner-id');
        if (bannerId) {
            xfzalert.alertConfirm({
                'text': '您确定要删除这个轮播图吗?',
                'confirmCallback': function () {
                    console.log('确定要删除!');
                    xfzajax.post({
                        'url': '/cms/delete_banner/',
                        'data':{
                            'banner_id': bannerId
                        },
                        'success': function (result) {
                            if(result['code'] === 200){
                                bannerItem.remove();
                                window.messageBox.showSuccess('轮播图删除成功！');
                            }
                            
                        }
                    })
                }
            });
        } else {
            bannerItem.remove();
        }
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
            'success': function (result) {
                if (result['code'] === 200) {
                    var bannerId = result['data']['banner_id'];
                    prioritySpan.text("优先级：" + priority);
                    window.messageBox.showSuccess('轮播图添加完成！');
                }
            }
        })
    });
};

Banners.prototype.run = function () {
    this.listenAddBannerEvent();
    this.loadData();
};

$(function () {
    var banners = new Banners();
    banners.run();
});