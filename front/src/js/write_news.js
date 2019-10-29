
function News() {
    
}

News.prototype.initUEditor = function () {
    window.ue = UE.getEditor('editor',{
        'initialFrameHeight': 400,
        'serverUrl': '/ueditor/upload/'
    });
};

News.prototype.listenUploadFielEvent = function () {
    var uploadBtn = $('#thumbnail-btn');
    uploadBtn.change(function () {
        var file = uploadBtn[0].files[0];
        var formData = new FormData();
        formData.append('file',file);
        xfzajax.post({
            'url':'/cms/upload_file/',
            'data': formData,
            'processData': false,
            'contentType': false,
            'success': function (result) {
                if(result['code'] === 200){
                    // console.log(result['data']);
                    var url = result['data']['url'];
                    var thumbnailInput = $("#thumbnail-form");
                    thumbnailInput.val(url);
                }
            }
        })
    });
};

News.prototype.listenQiniuUploadFileEvent = function () {
    var self = this;
    var uploadBtn = $('#thumbnail-btn');
    uploadBtn.change(function () {
        var file = this.files[0];
        xfzajax.get({
            'url': '/cms/qntoken/',
            'success': function(result){
                if(result['code'] === 200){
                    var token = result['data']['token'];
                    var key = (new Date()).getTime() + '.' + file.name.split('.')[1];
                    var putExtra = {
                        fname: key,
                        params: {},
                        mimeType: ['image/png', "image/jpeg", "image/gif", "video/mp4"]
                    };
                    var config = {
                        useCdnDomain: true,
                        retryCount: 6,
                        region:qiniu.region.z2
                    };
                    var observable = qiniu.upload(file, key, token, putExtra, config);
                    observable.subscribe({
                        'next': self.handleFileUploadProgress,
                        'error': self.handleFileUploadError,
                        'complete': self.handleFileUploadComplete
                    })
                }
            }
        })
    });
};

News.prototype.handleFileUploadProgress = function (response) {
  var total = response.total;
  var percent = total.percent;
  var percentText = percent.toFixed(0) + '%';
  var progressGroup = News.progressGroup;
  progressGroup.show();
  var progressBar = $(".progress-bar");
  progressBar.css({"width":percentText});
  progressBar.text(percentText);
};

News.prototype.handleFileUploadError = function (error) {
    console.log(error.message);
};

News.prototype.handleFileUploadComplete = function (response) {
    console.log(response);
    var progressGroup = News.progressGroup;
    progressGroup.hide();

    var domain = "http://q036lyvu6.bkt.clouddn.com/";
    var filename =response.key;
    var url = domain + filename;
    var thumbnailInput = $("input[name='thumbnail']");
    thumbnailInput.val(url);
};

News.prototype.run = function () {
    var self = this;
    self.initUEditor();
    self.listenQiniuUploadFileEvent();
    //self.listenUploadFielEvent();
};

$(function () {
    var news = new News();
    news.run();

    News.progressGroup = $("#progress-group");
});