var e = "300";

function t() {
    return Math.random().toString(36).substring(7)
}

function n1(e) {
    var t = "";
    return e ? (e.ctl && (t += "ctl=1"), e.openFile && (t += (t.length ? "&" : "") + "file=" + e.openFile), (e.view && "preview" === e.view || "editor" === e.view) && (t += (t.length ? "&" : "") + "view=" + e.view), t.length ? "?" + t : t) : t
}

function n(e)
{
    var t="";
    return e?(e.forceEmbedLayout&&(t+="embed=1"),e.clickToLoad&&(t+=(t.length?"&":"")+"ctl=1"),e.openFile&&(t+=(t.length?"&":"")+"file="+e.openFile),!e.view||"preview"!==e.view&&"editor"!==e.view||(t+=(t.length?"&":"")+"view="+e.view),e.hideExplorer&&(t+=(t.length?"&":"")+"hideExplorer=1"),e.hideNavigation&&(t+=(t.length?"&":"")+"hideNavigation=1;"),e.hideDevTools&&(t+=(t.length?"&":"")+"hidedevtools=1"),"number"==typeof e.devToolsHeight&&e.devToolsHeight>0&&e.devToolsHeight<100&&(t+=(t.length?"&":"")+"devtoolsheight="+e.devToolsHeight),t.length?"?"+t:t):t
}

function i(e, t, n) {
    if (null === e.parentNode) throw "Invalid Element";
    t.id = e.id, o(t, n), e.parentNode.replaceChild(t, e)
}

function r(e) {
    if ("string" == typeof e) {
        var t = document.getElementById(e);
        if (null !== t) return t
    } else if (e instanceof HTMLElement) return e;
    throw "Invalid Element"
}

function o(t, n) {
    debugger;
    n && (n.hasOwnProperty("height") && (t.height = "" + n.height), n.hasOwnProperty("width") && (t.width = "" + n.width)), t.height || (t.height = e), t.width || t.setAttribute("style", "width:100%;")
}
var a = function(e) {
    var t = this;
    this.pending = {}, this.port = e, this.port.onmessage = function(e) {
        if (e.data.payload.__reqid) {
            var n = e.data.payload.__reqid,
                i = e.data.payload.__success;
            if (t.pending[n]) {
                if (delete e.data.payload.__reqid, delete e.data.payload.__success, i) {
                    var r = 0 === Object.keys(e.data.payload).length && e.data.payload.constructor === Object ? null : e.data.payload;
                    t.pending[n].resolve(r)
                } else {
                    var o = e.data.payload.error ? e.data.type + ": " + e.data.payload.error : e.data.type;
                    t.pending[n].reject(o)
                }
                delete t.pending[n]
            }
        }
    }
};
a.prototype.request = function(e) {
    var n = this,
        i = t();
    return new Promise(function(t, r) {
        n.pending[i] = {
            resolve: t,
            reject: r
        }, e.payload.__reqid = i, n.port.postMessage(e)
    })
};
var d = function(e) {
    var t = this;
    this.rdc = new a(e), this.editor = {
        openFile: function(e) {
            return t.rdc.request({
                type: "SDK_OPEN_FILE",
                payload: {
                    path: e
                }
            })
        }
    }
};
d.prototype.applyFsDiff = function(e) {
    return this.rdc.request({
        type: "SDK_APPLY_FS_DIFF",
        payload: e
    })
}, d.prototype.getFsSnapshot = function() {
    return this.rdc.request({
        type: "SDK_GET_FS_SNAPSHOT",
        payload: {}
    })
};
var c = [],
    s = function(e) {
        var n = this;
        this.id = t(), this.element = e, this.pending = new Promise(function(e, t) {
            var i = function(t) {
                    t.data.action && "SDK_INIT_SUCCESS" === t.data.action && t.data.id === n.id && (n.vm = new d(t.ports[0]), e(n.vm), o())
                },
                r = function() {
                    n.element.contentWindow.postMessage({
                        action: "SDK_INIT",
                        id: n.id
                    }, "*")
                };

            function o() {
                window.clearInterval(s), window.removeEventListener("message", i)
            }
            window.addEventListener("message", i), r();
            var a = 0,
                s = window.setInterval(function() {
                    if (n.vm) o();
                    else {
                        if (a >= 20) return o(), t("Timeout: Unable to establish a connection with the StackBlitz VM"), void c.forEach(function(e, t) {
                            e.id === n.id && c.splice(t, 1)
                        });
                        a++, r()
                    }
                }, 500)
        }), c.push(this)
    },
    l = function(e) {
        var t = e instanceof Element ? "element" : "id",
            n = c.find(function(n) {
                return n[t] === e
            });
        return n || null
    };

function p(e, t) {
    var n = document.createElement("input");
    return n.type = "hidden", n.name = e, n.value = t, n
}

function u(e) {
    var t = document.createElement("form");
    return t.method = "POST", t.setAttribute("style", "display:none;"), t.appendChild(p("project[title]", e.title)), t.appendChild(p("project[description]", e.description)), t.appendChild(p("project[template]", e.template)), e.tags && e.tags.forEach(function(e, n) {
        t.appendChild(p("project[tags][" + n + "]", e))
    }), e.dependencies && t.appendChild(p("project[dependencies]", JSON.stringify(e.dependencies))), Object.keys(e.files).forEach(function(n) {
        t.appendChild(p("project[files][" + n + "]", e.files[n]))
    }), t
}

function h(e, t) {
    var i = document.createElement("iframe"),
        r = u(e);
    return r.id = "sb", r.action = "https://stackblitz.com/run" + n(t), i.src = "data:text/html;charset=utf-8,<html><head><title></title></head><body>" + encodeURI(r.outerHTML) + "<script>document.getElementById('sb').submit();<\/script></body></html>", i
}

function f(e, t) {
    document.createElement("iframe");
    var i = u(e);
    i.action = "https://stackblitz.com/run" + n(t), i.target = "_blank", document.body.appendChild(i), i.submit(), document.body.removeChild(i)
}
var m = {
    connect: function(e) {
        if (!e || !e.contentWindow) return Promise.reject("Provided element is not an iframe.");
        var t = l(e);
        return t ? t.pending : new s(e).pending
    },
    openGithubProject: function(e, t) {
        window.open("https://stackblitz.com/github/" + e + n(t))
    },
    openProject: function(e, t) {
        f(e, t)
    },
    openProjectId: function(e, t) {
        window.open("https://stackblitz.com/edit/" + e + n(t))
    },
    embedGithubProject: function(e, t, o) {
        var a = r(e),
            d = document.createElement("iframe");
        return d.src = "https://stackblitz.com/github/" + t + n(o), i(a, d, o), m.connect(d)
    },
    embedProject: function(e, t, n) {
        var o = r(e),
            a = h(t, n);
        return i(o, a, n), m.connect(a)
    },
    embedProjectId: function(e, t, o) {
        var a = r(e),
            d = document.createElement("iframe");
        return d.src = "https://stackblitz.com/edit/" + t + n(o), i(a, d, o), m.connect(d)
    }
};
export default m;