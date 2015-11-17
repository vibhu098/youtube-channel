define(["jade"],function(jade){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (items, undefined) {
buf.push("<h4>Videos</h4>");
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

buf.push("<a" + (jade.attr("href", "http://www.youtube.com/embed/"+item.snippet.resourceId.videoId+"?autoplay=1", true, false)) + (jade.attr("data-videoid", item.snippet.resourceId.videoId, true, false)) + " class=\"video_link\"><div" + (jade.attr("style", "background-image:url("+item.snippet.thumbnails.default.url+")", true, false)) + " class=\"thumbnail\"></div><h6>" + (jade.escape(null == (jade_interp = item.snippet.title) ? "" : jade_interp)) + "</h6></a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("<a" + (jade.attr("href", "http://www.youtube.com/embed/"+item.snippet.resourceId.videoId+"?autoplay=1", true, false)) + (jade.attr("data-videoid", item.snippet.resourceId.videoId, true, false)) + " class=\"video_link\"><div" + (jade.attr("style", "background-image:url("+item.snippet.thumbnails.default.url+")", true, false)) + " class=\"thumbnail\"></div><h6>" + (jade.escape(null == (jade_interp = item.snippet.title) ? "" : jade_interp)) + "</h6></a>");
    }

  }
}).call(this);
}.call(this,"items" in locals_for_with?locals_for_with.items:typeof items!=="undefined"?items:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
};

});
