
//点击登录按钮，弹出模态对话框
$(function () {
    $("#btn").click(function () {
        $(".mask-wrapper").show();
    });
    $(".close-btn").click(function () {
        $(".mask-wrapper").hide()
    })
});