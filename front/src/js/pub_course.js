
function PubCourse() {
    
}

PubCourse.prototype.initUEditor = function () {
  window.ue = UE.getEditor("editor", {
      'serverUrl': '/ueditor/upload/'
  });
};

PubCourse.prototype.run = function () {
    this.initUEditor();
};

$(function () {
   var course = new PubCourse();
   course.run();
});