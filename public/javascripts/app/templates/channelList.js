define(["jade"],function(jade){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (items, undefined) {
buf.push("<h4>Channels</h4>");
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

buf.push("<a href=\"#\"" + (jade.attr("data-channelid", item.id.channelId, true, false)) + " class=\"channel_detail\"><h4>" + (jade.escape(null == (jade_interp = item.snippet.title) ? "" : jade_interp)) + "</h4><p>" + (jade.escape(null == (jade_interp = item.snippet.description) ? "" : jade_interp)) + "</p></a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("<a href=\"#\"" + (jade.attr("data-channelid", item.id.channelId, true, false)) + " class=\"channel_detail\"><h4>" + (jade.escape(null == (jade_interp = item.snippet.title) ? "" : jade_interp)) + "</h4><p>" + (jade.escape(null == (jade_interp = item.snippet.description) ? "" : jade_interp)) + "</p></a>");
    }

  }
}).call(this);
}.call(this,"items" in locals_for_with?locals_for_with.items:typeof items!=="undefined"?items:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
};

});
