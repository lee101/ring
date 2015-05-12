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
frame.set("thumb", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += " <a href=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"url", env.opts.autoescape), env.opts.autoescape);
output += "\" title=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"title", env.opts.autoescape), env.opts.autoescape);
output += "\" target=\"_blank\"><img alt=\"$ ";
output += runtime.suppressValue(runtime.memberLookup((t_4),"price", env.opts.autoescape), env.opts.autoescape);
output += "\" src=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"image", env.opts.autoescape), env.opts.autoescape);
output += "\" onerror=\"if (this.src != '/images/ring-gem-icon512-rotated.png') this.src = '/images/ring-gem-icon512-rotated.png';\"></a> ";
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
