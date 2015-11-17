define(["jade"],function(jade){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (displayName, image) {
buf.push("<h4><img" + (jade.attr("src", image.url, true, false)) + "/>" + (jade.escape(null == (jade_interp = displayName) ? "" : jade_interp)) + "</h4>");}.call(this,"displayName" in locals_for_with?locals_for_with.displayName:typeof displayName!=="undefined"?displayName:undefined,"image" in locals_for_with?locals_for_with.image:typeof image!=="undefined"?image:undefined));;return buf.join("");
};

});
