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
output += "</p></div></div>";
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
