(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["rings.jinja2"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "thumbs");
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("ring", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "<div id=\"ring-";
output += runtime.suppressValue(runtime.memberLookup((t_4),"urltitle", env.opts.autoescape), env.opts.autoescape);
output += "\" class=\"jg-item\" title=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"title", env.opts.autoescape), env.opts.autoescape);
output += "\"><a href=\"/ring/";
output += runtime.suppressValue(runtime.memberLookup((t_4),"urltitle", env.opts.autoescape), env.opts.autoescape);
output += "\" title=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"title", env.opts.autoescape), env.opts.autoescape);
output += "\"><img class=\"gallery-image\" alt=\"$ ";
output += runtime.suppressValue(runtime.memberLookup((t_4),"price", env.opts.autoescape), env.opts.autoescape);
output += "\" src=\"http://cdn.ring.nz/";
output += runtime.suppressValue((lineno = 0, colno = 230, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "zutils")),"urlencode", env.opts.autoescape), "zutils[\"urlencode\"]", [runtime.memberLookup(((lineno = 0, colno = 254, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "fixtures")),"getCompanyById", env.opts.autoescape), "fixtures[\"getCompany\"]", [runtime.memberLookup((t_4),"company_id", env.opts.autoescape)]))),"name", env.opts.autoescape)])), env.opts.autoescape);
output += "/";
output += runtime.suppressValue(runtime.memberLookup((t_4),"urltitle", env.opts.autoescape), env.opts.autoescape);
output += ".jpg\" onerror=\"APP.thumbFallback(this, '";
output += runtime.suppressValue(runtime.memberLookup((t_4),"image", env.opts.autoescape), env.opts.autoescape);
output += "')\"></a><div class=\"hidden-detail\" style=\"display: none\"><paper-icon-button class=\"close-icon\" icon=\"clear\" title=\"clear\" onclick=\"APP.goto('/'); return false;\"></paper-icon-button><a class=\"ring-link\" href=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"url", env.opts.autoescape), env.opts.autoescape);
output += "\" target=\"_blank\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"title", env.opts.autoescape), env.opts.autoescape);
output += "</a><p class=\"ring-description\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"description", env.opts.autoescape), env.opts.autoescape);
output += "</p><p class=\"ring-company\">";
output += runtime.suppressValue(runtime.memberLookup(((lineno = 0, colno = 696, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "fixtures")),"getCompanyById", env.opts.autoescape), "fixtures[\"getCompany\"]", [runtime.memberLookup((t_4),"company_id", env.opts.autoescape)]))),"name", env.opts.autoescape), env.opts.autoescape);
output += "</p><p class=\"mm-sharing-btns\">";
var t_5;
t_5 = (lineno = 0, colno = 779, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "urlencode"), "urlencode", [runtime.memberLookup((t_4),"title", env.opts.autoescape)]));
frame.set("encoded_desc", t_5, true);
if(!frame.parent) {
context.setVariable("encoded_desc", t_5);
context.addExport("encoded_desc");
}
var t_6;
t_6 = (lineno = 0, colno = 828, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "urlencode"), "urlencode", [runtime.memberLookup((t_4),"title", env.opts.autoescape)]));
frame.set("encoded_desc_short", t_6, true);
if(!frame.parent) {
context.setVariable("encoded_desc_short", t_6);
context.addExport("encoded_desc_short");
}
var t_7;
t_7 = (lineno = 0, colno = 870, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "urlencode"), "urlencode", ["http://ring.nz/ring/" + runtime.memberLookup((t_4),"urltitle", env.opts.autoescape)]));
frame.set("encoded_url", t_7, true);
if(!frame.parent) {
context.setVariable("encoded_url", t_7);
context.addExport("encoded_url");
}
output += "<a href=\"#\" class=\"facebook-share-btn\" title=\"Share ";
output += runtime.suppressValue(runtime.memberLookup((t_4),"title", env.opts.autoescape), env.opts.autoescape);
output += " on Facebook\"><i class=\"fa fa-facebook-square mm-share-btn\"></i></a> <a href=\"https://twitter.com/intent/tweet?url=";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "encoded_url"), env.opts.autoescape);
output += "&text=";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "encoded_desc_short"), env.opts.autoescape);
output += "\" target=\"_blank\" rel=\"nofollow\" title=\"Tweet ";
output += runtime.suppressValue(runtime.memberLookup((t_4),"title", env.opts.autoescape), env.opts.autoescape);
output += " on Twitter\"><i class=\"fa fa-twitter-square mm-share-btn mm-share-btn--twitter\"></i></a> <a href=\"https://pinterest.com/pin/create/bookmarklet/?url=";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "encoded_url"), env.opts.autoescape);
output += "&description=";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "encoded_desc"), env.opts.autoescape);
output += "\" target=\"_blank\" rel=\"nofollow\" title=\"Pin ";
output += runtime.suppressValue(runtime.memberLookup((t_4),"title", env.opts.autoescape), env.opts.autoescape);
output += " on pinterest\"><i class=\"fa fa-pinterest-square mm-share-btn mm-share-btn--pinterest\"></i></a> <a href=\"https://plus.google.com/share?url=";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "encoded_url"), env.opts.autoescape);
output += "\" target=\"_blank\" rel=\"nofollow\" title=\"Share ";
output += runtime.suppressValue(runtime.memberLookup((t_4),"title", env.opts.autoescape), env.opts.autoescape);
output += " on Google Plus\"><i class=\"fa fa-google-plus-square mm-share-btn mm-share-btn--google-plus\"></i></a> <a href=\"http://www.stumbleupon.com/submit?url=";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "encoded_url"), env.opts.autoescape);
output += "&title=";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "encoded_desc"), env.opts.autoescape);
output += "\" target=\"_blank\" rel=\"nofollow\" title=\"Share ";
output += runtime.suppressValue(runtime.memberLookup((t_4),"title", env.opts.autoescape), env.opts.autoescape);
output += " on Stumble Upon\"><i class=\"fa fa-stumbleupon-circle mm-share-btn mm-share-btn--stumbleupon\"></i></a></p></div></div>";
;
}
}
frame = frame.pop();
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
