/*
 * jQuery JavaScript Library v1.6.2
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Thu Jun 30 14:16:56 2011 -0400
 */
(function(a, b) {
	function cv(a) {
		return f.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1
	}
	function cs(a) {
		if(!cg[a]) {
			var b = c.body,
				d = f("<" + a + ">").appendTo(b),
				e = d.css("display");
			d.remove();
			if(e === "none" || e === "") {
				ch || (ch = c.createElement("iframe"), ch.frameBorder = ch.width = ch.height = 0), b.appendChild(ch);
				if(!ci || !ch.createElement) ci = (ch.contentWindow || ch.contentDocument).document, ci.write((c.compatMode === "CSS1Compat" ? "<!doctype html>" : "") + "<html><body>"), ci.close();
				d = ci.createElement(a), ci.body.appendChild(d), e = f.css(d, "display"), b.removeChild(ch)
			}
			cg[a] = e
		}
		return cg[a]
	}
	function cr(a, b) {
		var c = {};
		f.each(cm.concat.apply([], cm.slice(0, b)), function() {
			c[this] = a
		});
		return c
	}
	function cq() {
		cn = b
	}
	function cp() {
		setTimeout(cq, 0);
		return cn = f.now()
	}
	function cf() {
		try {
			return new a.ActiveXObject("Microsoft.XMLHTTP")
		} catch(b) {}
	}
	function ce() {
		try {
			return new a.XMLHttpRequest
		} catch(b) {}
	}
	function b$(a, c) {
		a.dataFilter && (c = a.dataFilter(c, a.dataType));
		var d = a.dataTypes,
			e = {},
			g, h, i = d.length,
			j, k = d[0],
			l, m, n, o, p;
		for(g = 1; g < i; g++) {
			if(g === 1) for(h in a.converters) typeof h == "string" && (e[h.toLowerCase()] = a.converters[h]);
			l = k, k = d[g];
			if(k === "*") k = l;
			else if(l !== "*" && l !== k) {
				m = l + " " + k, n = e[m] || e["* " + k];
				if(!n) {
					p = b;
					for(o in e) {
						j = o.split(" ");
						if(j[0] === l || j[0] === "*") {
							p = e[j[1] + " " + k];
							if(p) {
								o = e[o], o === !0 ? n = p : p === !0 && (n = o);
								break
							}
						}
					}
				}!n && !p && f.error("No conversion from " + m.replace(" ", " to ")), n !== !0 && (c = n ? n(c) : p(o(c)))
			}
		}
		return c
	}
	function bZ(a, c, d) {
		var e = a.contents,
			f = a.dataTypes,
			g = a.responseFields,
			h, i, j, k;
		for(i in g) i in d && (c[g[i]] = d[i]);
		while(f[0] === "*") f.shift(), h === b && (h = a.mimeType || c.getResponseHeader("content-type"));
		if(h) for(i in e) if(e[i] && e[i].test(h)) {
			f.unshift(i);
			break
		}
		if(f[0] in d) j = f[0];
		else {
			for(i in d) {
				if(!f[0] || a.converters[i + " " + f[0]]) {
					j = i;
					break
				}
				k || (k = i)
			}
			j = j || k
		}
		if(j) {
			j !== f[0] && f.unshift(j);
			return d[j]
		}
	}
	function bY(a, b, c, d) {
		if(f.isArray(b)) f.each(b, function(b, e) {
			c || bC.test(a) ? d(a, e) : bY(a + "[" + (typeof e == "object" || f.isArray(e) ? b : "") + "]", e, c, d)
		});
		else if(!c && b != null && typeof b == "object") for(var e in b) bY(a + "[" + e + "]", b[e], c, d);
		else d(a, b)
	}
	function bX(a, c, d, e, f, g) {
		f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
		var h = a[f],
			i = 0,
			j = h ? h.length : 0,
			k = a === bR,
			l;
		for(; i < j && (k || !l); i++) l = h[i](c, d, e), typeof l == "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l), l = bX(a, c, d, e, l, g)));
		(k || !l) && !g["*"] && (l = bX(a, c, d, e, "*", g));
		return l
	}
	function bW(a) {
		return function(b, c) {
			typeof b != "string" && (c = b, b = "*");
			if(f.isFunction(c)) {
				var d = b.toLowerCase().split(bN),
					e = 0,
					g = d.length,
					h, i, j;
				for(; e < g; e++) h = d[e], j = /^\+/.test(h), j && (h = h.substr(1) || "*"), i = a[h] = a[h] || [], i[j ? "unshift" : "push"](c)
			}
		}
	}
	function bA(a, b, c) {
		var d = b === "width" ? a.offsetWidth : a.offsetHeight,
			e = b === "width" ? bv : bw;
		if(d > 0) {
			c !== "border" && f.each(e, function() {
				c || (d -= parseFloat(f.css(a, "padding" + this)) || 0), c === "margin" ? d += parseFloat(f.css(a, c + this)) || 0 : d -= parseFloat(f.css(a, "border" + this + "Width")) || 0
			});
			return d + "px"
		}
		d = bx(a, b, b);
		if(d < 0 || d == null) d = a.style[b] || 0;
		d = parseFloat(d) || 0, c && f.each(e, function() {
			d += parseFloat(f.css(a, "padding" + this)) || 0, c !== "padding" && (d += parseFloat(f.css(a, "border" + this + "Width")) || 0), c === "margin" && (d += parseFloat(f.css(a, c + this)) || 0)
		});
		return d + "px"
	}
	function bm(a, b) {
		b.src ? f.ajax({
			url: b.src,
			async: !1,
			dataType: "script"
		}) : f.globalEval((b.text || b.textContent || b.innerHTML || "").replace(be, "/*$0*/")), b.parentNode && b.parentNode.removeChild(b)
	}
	function bl(a) {
		f.nodeName(a, "input") ? bk(a) : "getElementsByTagName" in a && f.grep(a.getElementsByTagName("input"), bk)
	}
	function bk(a) {
		if(a.type === "checkbox" || a.type === "radio") a.defaultChecked = a.checked
	}
	function bj(a) {
		return "getElementsByTagName" in a ? a.getElementsByTagName("*") : "querySelectorAll" in a ? a.querySelectorAll("*") : []
	}
	function bi(a, b) {
		var c;
		if(b.nodeType === 1) {
			b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase();
			if(c === "object") b.outerHTML = a.outerHTML;
			else if(c !== "input" || a.type !== "checkbox" && a.type !== "radio") {
				if(c === "option") b.selected = a.defaultSelected;
				else if(c === "input" || c === "textarea") b.defaultValue = a.defaultValue
			} else a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value);
			b.removeAttribute(f.expando)
		}
	}
	function bh(a, b) {
		if(b.nodeType === 1 && !! f.hasData(a)) {
			var c = f.expando,
				d = f.data(a),
				e = f.data(b, d);
			if(d = d[c]) {
				var g = d.events;
				e = e[c] = f.extend({}, d);
				if(g) {
					delete e.handle, e.events = {};
					for(var h in g) for(var i = 0, j = g[h].length; i < j; i++) f.event.add(b, h + (g[h][i].namespace ? "." : "") + g[h][i].namespace, g[h][i], g[h][i].data)
				}
			}
		}
	}
	function bg(a, b) {
		return f.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
	}
	function W(a, b, c) {
		b = b || 0;
		if(f.isFunction(b)) return f.grep(a, function(a, d) {
			var e = !! b.call(a, d, a);
			return e === c
		});
		if(b.nodeType) return f.grep(a, function(a, d) {
			return a === b === c
		});
		if(typeof b == "string") {
			var d = f.grep(a, function(a) {
				return a.nodeType === 1
			});
			if(R.test(b)) return f.filter(b, d, !c);
			b = f.filter(b, d)
		}
		return f.grep(a, function(a, d) {
			return f.inArray(a, b) >= 0 === c
		})
	}
	function V(a) {
		return !a || !a.parentNode || a.parentNode.nodeType === 11
	}
	function N(a, b) {
		return(a && a !== "*" ? a + "." : "") + b.replace(z, "`").replace(A, "&")
	}
	function M(a) {
		var b, c, d, e, g, h, i, j, k, l, m, n, o, p = [],
			q = [],
			r = f._data(this, "events");
		if(!(a.liveFired === this || !r || !r.live || a.target.disabled || a.button && a.type === "click")) {
			a.namespace && (n = new RegExp("(^|\\.)" + a.namespace.split(".").join("\\.(?:.*\\.)?") + "(\\.|$)")), a.liveFired = this;
			var s = r.live.slice(0);
			for(i = 0; i < s.length; i++) g = s[i], g.origType.replace(x, "") === a.type ? q.push(g.selector) : s.splice(i--, 1);
			e = f(a.target).closest(q, a.currentTarget);
			for(j = 0, k = e.length; j < k; j++) {
				m = e[j];
				for(i = 0; i < s.length; i++) {
					g = s[i];
					if(m.selector === g.selector && (!n || n.test(g.namespace)) && !m.elem.disabled) {
						h = m.elem, d = null;
						if(g.preType === "mouseenter" || g.preType === "mouseleave") a.type = g.preType, d = f(a.relatedTarget).closest(g.selector)[0], d && f.contains(h, d) && (d = h);
						(!d || d !== h) && p.push({
							elem: h,
							handleObj: g,
							level: m.level
						})
					}
				}
			}
			for(j = 0, k = p.length; j < k; j++) {
				e = p[j];
				if(c && e.level > c) break;
				a.currentTarget = e.elem, a.data = e.handleObj.data, a.handleObj = e.handleObj, o = e.handleObj.origHandler.apply(e.elem, arguments);
				if(o === !1 || a.isPropagationStopped()) {
					c = e.level, o === !1 && (b = !1);
					if(a.isImmediatePropagationStopped()) break
				}
			}
			return b
		}
	}
	function K(a, c, d) {
		var e = f.extend({}, d[0]);
		e.type = a, e.originalEvent = {}, e.liveFired = b, f.event.handle.call(c, e), e.isDefaultPrevented() && d[0].preventDefault()
	}
	function E() {
		return !0
	}
	function D() {
		return !1
	}
	function m(a, c, d) {
		var e = c + "defer",
			g = c + "queue",
			h = c + "mark",
			i = f.data(a, e, b, !0);
		i && (d === "queue" || !f.data(a, g, b, !0)) && (d === "mark" || !f.data(a, h, b, !0)) && setTimeout(function() {
			!f.data(a, g, b, !0) && !f.data(a, h, b, !0) && (f.removeData(a, e, !0), i.resolve())
		}, 0)
	}
	function l(a) {
		for(var b in a) if(b !== "toJSON") return !1;
		return !0
	}
	function k(a, c, d) {
		if(d === b && a.nodeType === 1) {
			var e = "data-" + c.replace(j, "$1-$2").toLowerCase();
			d = a.getAttribute(e);
			if(typeof d == "string") {
				try {
					d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : f.isNaN(d) ? i.test(d) ? f.parseJSON(d) : d : parseFloat(d)
				} catch(g) {}
				f.data(a, c, d)
			} else d = b
		}
		return d
	}
	var c = a.document,
		d = a.navigator,
		e = a.location,
		f = function() {
			function J() {
				if(!e.isReady) {
					try {
						c.documentElement.doScroll("left")
					} catch(a) {
						setTimeout(J, 1);
						return
					}
					e.ready()
				}
			}
			var e = function(a, b) {
					return new e.fn.init(a, b, h)
				},
				f = a.jQuery,
				g = a.$,
				h, i = /^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
				j = /\S/,
				k = /^\s+/,
				l = /\s+$/,
				m = /\d/,
				n = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
				o = /^[\],:{}\s]*$/,
				p = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
				q = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
				r = /(?:^|:|,)(?:\s*\[)+/g,
				s = /(webkit)[ \/]([\w.]+)/,
				t = /(opera)(?:.*version)?[ \/]([\w.]+)/,
				u = /(msie) ([\w.]+)/,
				v = /(mozilla)(?:.*? rv:([\w.]+))?/,
				w = /-([a-z])/ig,
				x = function(a, b) {
					return b.toUpperCase()
				},
				y = d.userAgent,
				z, A, B, C = Object.prototype.toString,
				D = Object.prototype.hasOwnProperty,
				E = Array.prototype.push,
				F = Array.prototype.slice,
				G = String.prototype.trim,
				H = Array.prototype.indexOf,
				I = {};
			e.fn = e.prototype = {
				constructor: e,
				init: function(a, d, f) {
					var g, h, j, k;
					if(!a) return this;
					if(a.nodeType) {
						this.context = this[0] = a, this.length = 1;
						return this
					}
					if(a === "body" && !d && c.body) {
						this.context = c, this[0] = c.body, this.selector = a, this.length = 1;
						return this
					}
					if(typeof a == "string") {
						a.charAt(0) !== "<" || a.charAt(a.length - 1) !== ">" || a.length < 3 ? g = i.exec(a) : g = [null, a, null];
						if(g && (g[1] || !d)) {
							if(g[1]) {
								d = d instanceof e ? d[0] : d, k = d ? d.ownerDocument || d : c, j = n.exec(a), j ? e.isPlainObject(d) ? (a = [c.createElement(j[1])], e.fn.attr.call(a, d, !0)) : a = [k.createElement(j[1])] : (j = e.buildFragment([g[1]], [k]), a = (j.cacheable ? e.clone(j.fragment) : j.fragment).childNodes);
								return e.merge(this, a)
							}
							h = c.getElementById(g[2]);
							if(h && h.parentNode) {
								if(h.id !== g[2]) return f.find(a);
								this.length = 1, this[0] = h
							}
							this.context = c, this.selector = a;
							return this
						}
						return !d || d.jquery ? (d || f).find(a) : this.constructor(d).find(a)
					}
					if(e.isFunction(a)) return f.ready(a);
					a.selector !== b && (this.selector = a.selector, this.context = a.context);
					return e.makeArray(a, this)
				},
				selector: "",
				jquery: "1.6.2",
				length: 0,
				size: function() {
					return this.length
				},
				toArray: function() {
					return F.call(this, 0)
				},
				get: function(a) {
					return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
				},
				pushStack: function(a, b, c) {
					var d = this.constructor();
					e.isArray(a) ? E.apply(d, a) : e.merge(d, a), d.prevObject = this, d.context = this.context, b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")");
					return d
				},
				each: function(a, b) {
					return e.each(this, a, b)
				},
				ready: function(a) {
					e.bindReady(), A.done(a);
					return this
				},
				eq: function(a) {
					return a === -1 ? this.slice(a) : this.slice(a, +a + 1)
				},
				first: function() {
					return this.eq(0)
				},
				last: function() {
					return this.eq(-1)
				},
				slice: function() {
					return this.pushStack(F.apply(this, arguments), "slice", F.call(arguments).join(","))
				},
				map: function(a) {
					return this.pushStack(e.map(this, function(b, c) {
						return a.call(b, c, b)
					}))
				},
				end: function() {
					return this.prevObject || this.constructor(null)
				},
				push: E,
				sort: [].sort,
				splice: [].splice
			}, e.fn.init.prototype = e.fn, e.extend = e.fn.extend = function() {
				var a, c, d, f, g, h, i = arguments[0] || {},
					j = 1,
					k = arguments.length,
					l = !1;
				typeof i == "boolean" && (l = i, i = arguments[1] || {}, j = 2), typeof i != "object" && !e.isFunction(i) && (i = {}), k === j && (i = this, --j);
				for(; j < k; j++) if((a = arguments[j]) != null) for(c in a) {
					d = i[c], f = a[c];
					if(i === f) continue;
					l && f && (e.isPlainObject(f) || (g = e.isArray(f))) ? (g ? (g = !1, h = d && e.isArray(d) ? d : []) : h = d && e.isPlainObject(d) ? d : {}, i[c] = e.extend(l, h, f)) : f !== b && (i[c] = f)
				}
				return i
			}, e.extend({
				noConflict: function(b) {
					a.$ === e && (a.$ = g), b && a.jQuery === e && (a.jQuery = f);
					return e
				},
				isReady: !1,
				readyWait: 1,
				holdReady: function(a) {
					a ? e.readyWait++ : e.ready(!0)
				},
				ready: function(a) {
					if(a === !0 && !--e.readyWait || a !== !0 && !e.isReady) {
						if(!c.body) return setTimeout(e.ready, 1);
						e.isReady = !0;
						if(a !== !0 && --e.readyWait > 0) return;
						A.resolveWith(c, [e]), e.fn.trigger && e(c).trigger("ready").unbind("ready")
					}
				},
				bindReady: function() {
					if(!A) {
						A = e._Deferred();
						if(c.readyState === "complete") return setTimeout(e.ready, 1);
						if(c.addEventListener) c.addEventListener("DOMContentLoaded", B, !1), a.addEventListener("load", e.ready, !1);
						else if(c.attachEvent) {
							c.attachEvent("onreadystatechange", B), a.attachEvent("onload", e.ready);
							var b = !1;
							try {
								b = a.frameElement == null
							} catch(d) {}
							c.documentElement.doScroll && b && J()
						}
					}
				},
				isFunction: function(a) {
					return e.type(a) === "function"
				},
				isArray: Array.isArray ||
				function(a) {
					return e.type(a) === "array"
				},
				isWindow: function(a) {
					return a && typeof a == "object" && "setInterval" in a
				},
				isNaN: function(a) {
					return a == null || !m.test(a) || isNaN(a)
				},
				type: function(a) {
					return a == null ? String(a) : I[C.call(a)] || "object"
				},
				isPlainObject: function(a) {
					if(!a || e.type(a) !== "object" || a.nodeType || e.isWindow(a)) return !1;
					if(a.constructor && !D.call(a, "constructor") && !D.call(a.constructor.prototype, "isPrototypeOf")) return !1;
					var c;
					for(c in a);
					return c === b || D.call(a, c)
				},
				isEmptyObject: function(a) {
					for(var b in a) return !1;
					return !0
				},
				error: function(a) {
					throw a
				},
				parseJSON: function(b) {
					if(typeof b != "string" || !b) return null;
					b = e.trim(b);
					if(a.JSON && a.JSON.parse) return a.JSON.parse(b);
					if(o.test(b.replace(p, "@").replace(q, "]").replace(r, ""))) return(new Function("return " + b))();
					e.error("Invalid JSON: " + b)
				},
				parseXML: function(b, c, d) {
					a.DOMParser ? (d = new DOMParser, c = d.parseFromString(b, "text/xml")) : (c = new ActiveXObject("Microsoft.XMLDOM"), c.async = "false", c.loadXML(b)), d = c.documentElement, (!d || !d.nodeName || d.nodeName === "parsererror") && e.error("Invalid XML: " + b);
					return c
				},
				noop: function() {},
				globalEval: function(b) {
					b && j.test(b) && (a.execScript ||
					function(b) {
						a.eval.call(a, b)
					})(b)
				},
				camelCase: function(a) {
					return a.replace(w, x)
				},
				nodeName: function(a, b) {
					return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
				},
				each: function(a, c, d) {
					var f, g = 0,
						h = a.length,
						i = h === b || e.isFunction(a);
					if(d) {
						if(i) {
							for(f in a) if(c.apply(a[f], d) === !1) break
						} else for(; g < h;) if(c.apply(a[g++], d) === !1) break
					} else if(i) {
						for(f in a) if(c.call(a[f], f, a[f]) === !1) break
					} else for(; g < h;) if(c.call(a[g], g, a[g++]) === !1) break;
					return a
				},
				trim: G ?
				function(a) {
					return a == null ? "" : G.call(a)
				} : function(a) {
					return a == null ? "" : (a + "").replace(k, "").replace(l, "")
				},
				makeArray: function(a, b) {
					var c = b || [];
					if(a != null) {
						var d = e.type(a);
						a.length == null || d === "string" || d === "function" || d === "regexp" || e.isWindow(a) ? E.call(c, a) : e.merge(c, a)
					}
					return c
				},
				inArray: function(a, b) {
					if(H) return H.call(b, a);
					for(var c = 0, d = b.length; c < d; c++) if(b[c] === a) return c;
					return -1
				},
				merge: function(a, c) {
					var d = a.length,
						e = 0;
					if(typeof c.length == "number") for(var f = c.length; e < f; e++) a[d++] = c[e];
					else while(c[e] !== b) a[d++] = c[e++];
					a.length = d;
					return a
				},
				grep: function(a, b, c) {
					var d = [],
						e;
					c = !! c;
					for(var f = 0, g = a.length; f < g; f++) e = !! b(a[f], f), c !== e && d.push(a[f]);
					return d
				},
				map: function(a, c, d) {
					var f, g, h = [],
						i = 0,
						j = a.length,
						k = a instanceof e || j !== b && typeof j == "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || e.isArray(a));
					if(k) for(; i < j; i++) f = c(a[i], i, d), f != null && (h[h.length] = f);
					else for(g in a) f = c(a[g], g, d), f != null && (h[h.length] = f);
					return h.concat.apply([], h)
				},
				guid: 1,
				proxy: function(a, c) {
					if(typeof c == "string") {
						var d = a[c];
						c = a, a = d
					}
					if(!e.isFunction(a)) return b;
					var f = F.call(arguments, 2),
						g = function() {
							return a.apply(c, f.concat(F.call(arguments)))
						};
					g.guid = a.guid = a.guid || g.guid || e.guid++;
					return g
				},
				access: function(a, c, d, f, g, h) {
					var i = a.length;
					if(typeof c == "object") {
						for(var j in c) e.access(a, j, c[j], f, g, d);
						return a
					}
					if(d !== b) {
						f = !h && f && e.isFunction(d);
						for(var k = 0; k < i; k++) g(a[k], c, f ? d.call(a[k], k, g(a[k], c)) : d, h);
						return a
					}
					return i ? g(a[0], c) : b
				},
				now: function() {
					return(new Date).getTime()
				},
				uaMatch: function(a) {
					a = a.toLowerCase();
					var b = s.exec(a) || t.exec(a) || u.exec(a) || a.indexOf("compatible") < 0 && v.exec(a) || [];
					return {
						browser: b[1] || "",
						version: b[2] || "0"
					}
				},
				sub: function() {
					function a(b, c) {
						return new a.fn.init(b, c)
					}
					e.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function(d, f) {
						f && f instanceof e && !(f instanceof a) && (f = a(f));
						return e.fn.init.call(this, d, f, b)
					}, a.fn.init.prototype = a.fn;
					var b = a(c);
					return a
				},
				browser: {}
			}), e.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(a, b) {
				I["[object " + b + "]"] = b.toLowerCase()
			}), z = e.uaMatch(y), z.browser && (e.browser[z.browser] = !0, e.browser.version = z.version), e.browser.webkit && (e.browser.safari = !0), j.test(" ") && (k = /^[\s\xA0]+/, l = /[\s\xA0]+$/), h = e(c), c.addEventListener ? B = function() {
				c.removeEventListener("DOMContentLoaded", B, !1), e.ready()
			} : c.attachEvent && (B = function() {
				c.readyState === "complete" && (c.detachEvent("onreadystatechange", B), e.ready())
			});
			return e
		}(),
		g = "done fail isResolved isRejected promise then always pipe".split(" "),
		h = [].slice;
	f.extend({
		_Deferred: function() {
			var a = [],
				b, c, d, e = {
					done: function() {
						if(!d) {
							var c = arguments,
								g, h, i, j, k;
							b && (k = b, b = 0);
							for(g = 0, h = c.length; g < h; g++) i = c[g], j = f.type(i), j === "array" ? e.done.apply(e, i) : j === "function" && a.push(i);
							k && e.resolveWith(k[0], k[1])
						}
						return this
					},
					resolveWith: function(e, f) {
						if(!d && !b && !c) {
							f = f || [], c = 1;
							try {
								while(a[0]) a.shift().apply(e, f)
							} finally {
								b = [e, f], c = 0
							}
						}
						return this
					},
					resolve: function() {
						e.resolveWith(this, arguments);
						return this
					},
					isResolved: function() {
						return !!c || !! b
					},
					cancel: function() {
						d = 1, a = [];
						return this
					}
				};
			return e
		},
		Deferred: function(a) {
			var b = f._Deferred(),
				c = f._Deferred(),
				d;
			f.extend(b, {
				then: function(a, c) {
					b.done(a).fail(c);
					return this
				},
				always: function() {
					return b.done.apply(b, arguments).fail.apply(this, arguments)
				},
				fail: c.done,
				rejectWith: c.resolveWith,
				reject: c.resolve,
				isRejected: c.isResolved,
				pipe: function(a, c) {
					return f.Deferred(function(d) {
						f.each({
							done: [a, "resolve"],
							fail: [c, "reject"]
						}, function(a, c) {
							var e = c[0],
								g = c[1],
								h;
							f.isFunction(e) ? b[a](function() {
								h = e.apply(this, arguments), h && f.isFunction(h.promise) ? h.promise().then(d.resolve, d.reject) : d[g](h)
							}) : b[a](d[g])
						})
					}).promise()
				},
				promise: function(a) {
					if(a == null) {
						if(d) return d;
						d = a = {}
					}
					var c = g.length;
					while(c--) a[g[c]] = b[g[c]];
					return a
				}
			}), b.done(c.cancel).fail(b.cancel), delete b.cancel, a && a.call(b, b);
			return b
		},
		when: function(a) {
			function i(a) {
				return function(c) {
					b[a] = arguments.length > 1 ? h.call(arguments, 0) : c, --e || g.resolveWith(g, h.call(b, 0))
				}
			}
			var b = arguments,
				c = 0,
				d = b.length,
				e = d,
				g = d <= 1 && a && f.isFunction(a.promise) ? a : f.Deferred();
			if(d > 1) {
				for(; c < d; c++) b[c] && f.isFunction(b[c].promise) ? b[c].promise().then(i(c), g.reject) : --e;
				e || g.resolveWith(g, b)
			} else g !== a && g.resolveWith(g, d ? [a] : []);
			return g.promise()
		}
	}), f.support = function() {
		var a = c.createElement("div"),
			b = c.documentElement,
			d, e, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u;
		a.setAttribute("className", "t"), a.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>", d = a.getElementsByTagName("*"), e = a.getElementsByTagName("a")[0];
		if(!d || !d.length || !e) return {};
		g = c.createElement("select"), h = g.appendChild(c.createElement("option")), i = a.getElementsByTagName("input")[0], k = {
			leadingWhitespace: a.firstChild.nodeType === 3,
			tbody: !a.getElementsByTagName("tbody").length,
			htmlSerialize: !! a.getElementsByTagName("link").length,
			style: /top/.test(e.getAttribute("style")),
			hrefNormalized: e.getAttribute("href") === "/a",
			opacity: /^0.55$/.test(e.style.opacity),
			cssFloat: !! e.style.cssFloat,
			checkOn: i.value === "on",
			optSelected: h.selected,
			getSetAttribute: a.className !== "t",
			submitBubbles: !0,
			changeBubbles: !0,
			focusinBubbles: !1,
			deleteExpando: !0,
			noCloneEvent: !0,
			inlineBlockNeedsLayout: !1,
			shrinkWrapBlocks: !1,
			reliableMarginRight: !0
		}, i.checked = !0, k.noCloneChecked = i.cloneNode(!0).checked, g.disabled = !0, k.optDisabled = !h.disabled;
		try {
			delete a.test
		} catch(v) {
			k.deleteExpando = !1
		}!a.addEventListener && a.attachEvent && a.fireEvent && (a.attachEvent("onclick", function() {
			k.noCloneEvent = !1
		}), a.cloneNode(!0).fireEvent("onclick")), i = c.createElement("input"), i.value = "t", i.setAttribute("type", "radio"), k.radioValue = i.value === "t", i.setAttribute("checked", "checked"), a.appendChild(i), l = c.createDocumentFragment(), l.appendChild(a.firstChild), k.checkClone = l.cloneNode(!0).cloneNode(!0).lastChild.checked, a.innerHTML = "", a.style.width = a.style.paddingLeft = "1px", m = c.getElementsByTagName("body")[0], o = c.createElement(m ? "div" : "body"), p = {
			visibility: "hidden",
			width: 0,
			height: 0,
			border: 0,
			margin: 0
		}, m && f.extend(p, {
			position: "absolute",
			left: -1e3,
			top: -1e3
		});
		for(t in p) o.style[t] = p[t];
		o.appendChild(a), n = m || b, n.insertBefore(o, n.firstChild), k.appendChecked = i.checked, k.boxModel = a.offsetWidth === 2, "zoom" in a.style && (a.style.display = "inline", a.style.zoom = 1, k.inlineBlockNeedsLayout = a.offsetWidth === 2, a.style.display = "", a.innerHTML = "<div style='width:4px;'></div>", k.shrinkWrapBlocks = a.offsetWidth !== 2), a.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>", q = a.getElementsByTagName("td"), u = q[0].offsetHeight === 0, q[0].style.display = "", q[1].style.display = "none", k.reliableHiddenOffsets = u && q[0].offsetHeight === 0, a.innerHTML = "", c.defaultView && c.defaultView.getComputedStyle && (j = c.createElement("div"), j.style.width = "0", j.style.marginRight = "0", a.appendChild(j), k.reliableMarginRight = (parseInt((c.defaultView.getComputedStyle(j, null) || {
			marginRight: 0
		}).marginRight, 10) || 0) === 0), o.innerHTML = "", n.removeChild(o);
		if(a.attachEvent) for(t in {
			submit: 1,
			change: 1,
			focusin: 1
		}) s = "on" + t, u = s in a, u || (a.setAttribute(s, "return;"), u = typeof a[s] == "function"), k[t + "Bubbles"] = u;
		o = l = g = h = m = j = a = i = null;
		return k
	}(), f.boxModel = f.support.boxModel;
	var i = /^(?:\{.*\}|\[.*\])$/,
		j = /([a-z])([A-Z])/g;
	f.extend({
		cache: {},
		uuid: 0,
		expando: "jQuery" + (f.fn.jquery + Math.random()).replace(/\D/g, ""),
		noData: {
			embed: !0,
			object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
			applet: !0
		},
		hasData: function(a) {
			a = a.nodeType ? f.cache[a[f.expando]] : a[f.expando];
			return !!a && !l(a)
		},
		data: function(a, c, d, e) {
			if( !! f.acceptData(a)) {
				var g = f.expando,
					h = typeof c == "string",
					i, j = a.nodeType,
					k = j ? f.cache : a,
					l = j ? a[f.expando] : a[f.expando] && f.expando;
				if((!l || e && l && !k[l][g]) && h && d === b) return;
				l || (j ? a[f.expando] = l = ++f.uuid : l = f.expando), k[l] || (k[l] = {}, j || (k[l].toJSON = f.noop));
				if(typeof c == "object" || typeof c == "function") e ? k[l][g] = f.extend(k[l][g], c) : k[l] = f.extend(k[l], c);
				i = k[l], e && (i[g] || (i[g] = {}), i = i[g]), d !== b && (i[f.camelCase(c)] = d);
				if(c === "events" && !i[c]) return i[g] && i[g].events;
				return h ? i[f.camelCase(c)] || i[c] : i
			}
		},
		removeData: function(b, c, d) {
			if( !! f.acceptData(b)) {
				var e = f.expando,
					g = b.nodeType,
					h = g ? f.cache : b,
					i = g ? b[f.expando] : f.expando;
				if(!h[i]) return;
				if(c) {
					var j = d ? h[i][e] : h[i];
					if(j) {
						delete j[c];
						if(!l(j)) return
					}
				}
				if(d) {
					delete h[i][e];
					if(!l(h[i])) return
				}
				var k = h[i][e];
				f.support.deleteExpando || h != a ? delete h[i] : h[i] = null, k ? (h[i] = {}, g || (h[i].toJSON = f.noop), h[i][e] = k) : g && (f.support.deleteExpando ? delete b[f.expando] : b.removeAttribute ? b.removeAttribute(f.expando) : b[f.expando] = null)
			}
		},
		_data: function(a, b, c) {
			return f.data(a, b, c, !0)
		},
		acceptData: function(a) {
			if(a.nodeName) {
				var b = f.noData[a.nodeName.toLowerCase()];
				if(b) return b !== !0 && a.getAttribute("classid") === b
			}
			return !0
		}
	}), f.fn.extend({
		data: function(a, c) {
			var d = null;
			if(typeof a == "undefined") {
				if(this.length) {
					d = f.data(this[0]);
					if(this[0].nodeType === 1) {
						var e = this[0].attributes,
							g;
						for(var h = 0, i = e.length; h < i; h++) g = e[h].name, g.indexOf("data-") === 0 && (g = f.camelCase(g.substring(5)), k(this[0], g, d[g]))
					}
				}
				return d
			}
			if(typeof a == "object") return this.each(function() {
				f.data(this, a)
			});
			var j = a.split(".");
			j[1] = j[1] ? "." + j[1] : "";
			if(c === b) {
				d = this.triggerHandler("getData" + j[1] + "!", [j[0]]), d === b && this.length && (d = f.data(this[0], a), d = k(this[0], a, d));
				return d === b && j[1] ? this.data(j[0]) : d
			}
			return this.each(function() {
				var b = f(this),
					d = [j[0], c];
				b.triggerHandler("setData" + j[1] + "!", d), f.data(this, a, c), b.triggerHandler("changeData" + j[1] + "!", d)
			})
		},
		removeData: function(a) {
			return this.each(function() {
				f.removeData(this, a)
			})
		}
	}), f.extend({
		_mark: function(a, c) {
			a && (c = (c || "fx") + "mark", f.data(a, c, (f.data(a, c, b, !0) || 0) + 1, !0))
		},
		_unmark: function(a, c, d) {
			a !== !0 && (d = c, c = a, a = !1);
			if(c) {
				d = d || "fx";
				var e = d + "mark",
					g = a ? 0 : (f.data(c, e, b, !0) || 1) - 1;
				g ? f.data(c, e, g, !0) : (f.removeData(c, e, !0), m(c, d, "mark"))
			}
		},
		queue: function(a, c, d) {
			if(a) {
				c = (c || "fx") + "queue";
				var e = f.data(a, c, b, !0);
				d && (!e || f.isArray(d) ? e = f.data(a, c, f.makeArray(d), !0) : e.push(d));
				return e || []
			}
		},
		dequeue: function(a, b) {
			b = b || "fx";
			var c = f.queue(a, b),
				d = c.shift(),
				e;
			d === "inprogress" && (d = c.shift()), d && (b === "fx" && c.unshift("inprogress"), d.call(a, function() {
				f.dequeue(a, b)
			})), c.length || (f.removeData(a, b + "queue", !0), m(a, b, "queue"))
		}
	}), f.fn.extend({
		queue: function(a, c) {
			typeof a != "string" && (c = a, a = "fx");
			if(c === b) return f.queue(this[0], a);
			return this.each(function() {
				var b = f.queue(this, a, c);
				a === "fx" && b[0] !== "inprogress" && f.dequeue(this, a)
			})
		},
		dequeue: function(a) {
			return this.each(function() {
				f.dequeue(this, a)
			})
		},
		delay: function(a, b) {
			a = f.fx ? f.fx.speeds[a] || a : a, b = b || "fx";
			return this.queue(b, function() {
				var c = this;
				setTimeout(function() {
					f.dequeue(c, b)
				}, a)
			})
		},
		clearQueue: function(a) {
			return this.queue(a || "fx", [])
		},
		promise: function(a, c) {
			function m() {
				--h || d.resolveWith(e, [e])
			}
			typeof a != "string" && (c = a, a = b), a = a || "fx";
			var d = f.Deferred(),
				e = this,
				g = e.length,
				h = 1,
				i = a + "defer",
				j = a + "queue",
				k = a + "mark",
				l;
			while(g--) if(l = f.data(e[g], i, b, !0) || (f.data(e[g], j, b, !0) || f.data(e[g], k, b, !0)) && f.data(e[g], i, f._Deferred(), !0)) h++, l.done(m);
			m();
			return d.promise()
		}
	});
	var n = /[\n\t\r]/g,
		o = /\s+/,
		p = /\r/g,
		q = /^(?:button|input)$/i,
		r = /^(?:button|input|object|select|textarea)$/i,
		s = /^a(?:rea)?$/i,
		t = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
		u = /\:|^on/,
		v, w;
	f.fn.extend({
		attr: function(a, b) {
			return f.access(this, a, b, !0, f.attr)
		},
		removeAttr: function(a) {
			return this.each(function() {
				f.removeAttr(this, a)
			})
		},
		prop: function(a, b) {
			return f.access(this, a, b, !0, f.prop)
		},
		removeProp: function(a) {
			a = f.propFix[a] || a;
			return this.each(function() {
				try {
					this[a] = b, delete this[a]
				} catch(c) {}
			})
		},
		addClass: function(a) {
			var b, c, d, e, g, h, i;
			if(f.isFunction(a)) return this.each(function(b) {
				f(this).addClass(a.call(this, b, this.className))
			});
			if(a && typeof a == "string") {
				b = a.split(o);
				for(c = 0, d = this.length; c < d; c++) {
					e = this[c];
					if(e.nodeType === 1) if(!e.className && b.length === 1) e.className = a;
					else {
						g = " " + e.className + " ";
						for(h = 0, i = b.length; h < i; h++)~g.indexOf(" " + b[h] + " ") || (g += b[h] + " ");
						e.className = f.trim(g)
					}
				}
			}
			return this
		},
		removeClass: function(a) {
			var c, d, e, g, h, i, j;
			if(f.isFunction(a)) return this.each(function(b) {
				f(this).removeClass(a.call(this, b, this.className))
			});
			if(a && typeof a == "string" || a === b) {
				c = (a || "").split(o);
				for(d = 0, e = this.length; d < e; d++) {
					g = this[d];
					if(g.nodeType === 1 && g.className) if(a) {
						h = (" " + g.className + " ").replace(n, " ");
						for(i = 0, j = c.length; i < j; i++) h = h.replace(" " + c[i] + " ", " ");
						g.className = f.trim(h)
					} else g.className = ""
				}
			}
			return this
		},
		toggleClass: function(a, b) {
			var c = typeof a,
				d = typeof b == "boolean";
			if(f.isFunction(a)) return this.each(function(c) {
				f(this).toggleClass(a.call(this, c, this.className, b), b)
			});
			return this.each(function() {
				if(c === "string") {
					var e, g = 0,
						h = f(this),
						i = b,
						j = a.split(o);
					while(e = j[g++]) i = d ? i : !h.hasClass(e), h[i ? "addClass" : "removeClass"](e)
				} else if(c === "undefined" || c === "boolean") this.className && f._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : f._data(this, "__className__") || ""
			})
		},
		hasClass: function(a) {
			var b = " " + a + " ";
			for(var c = 0, d = this.length; c < d; c++) if((" " + this[c].className + " ").replace(n, " ").indexOf(b) > -1) return !0;
			return !1
		},
		val: function(a) {
			var c, d, e = this[0];
			if(!arguments.length) {
				if(e) {
					c = f.valHooks[e.nodeName.toLowerCase()] || f.valHooks[e.type];
					if(c && "get" in c && (d = c.get(e, "value")) !== b) return d;
					d = e.value;
					return typeof d == "string" ? d.replace(p, "") : d == null ? "" : d
				}
				return b
			}
			var g = f.isFunction(a);
			return this.each(function(d) {
				var e = f(this),
					h;
				if(this.nodeType === 1) {
					g ? h = a.call(this, d, e.val()) : h = a, h == null ? h = "" : typeof h == "number" ? h += "" : f.isArray(h) && (h = f.map(h, function(a) {
						return a == null ? "" : a + ""
					})), c = f.valHooks[this.nodeName.toLowerCase()] || f.valHooks[this.type];
					if(!c || !("set" in c) || c.set(this, h, "value") === b) this.value = h
				}
			})
		}
	}), f.extend({
		valHooks: {
			option: {
				get: function(a) {
					var b = a.attributes.value;
					return !b || b.specified ? a.value : a.text
				}
			},
			select: {
				get: function(a) {
					var b, c = a.selectedIndex,
						d = [],
						e = a.options,
						g = a.type === "select-one";
					if(c < 0) return null;
					for(var h = g ? c : 0, i = g ? c + 1 : e.length; h < i; h++) {
						var j = e[h];
						if(j.selected && (f.support.optDisabled ? !j.disabled : j.getAttribute("disabled") === null) && (!j.parentNode.disabled || !f.nodeName(j.parentNode, "optgroup"))) {
							b = f(j).val();
							if(g) return b;
							d.push(b)
						}
					}
					if(g && !d.length && e.length) return f(e[c]).val();
					return d
				},
				set: function(a, b) {
					var c = f.makeArray(b);
					f(a).find("option").each(function() {
						this.selected = f.inArray(f(this).val(), c) >= 0
					}), c.length || (a.selectedIndex = -1);
					return c
				}
			}
		},
		attrFn: {
			val: !0,
			css: !0,
			html: !0,
			text: !0,
			data: !0,
			width: !0,
			height: !0,
			offset: !0
		},
		attrFix: {
			tabindex: "tabIndex"
		},
		attr: function(a, c, d, e) {
			var g = a.nodeType;
			if(!a || g === 3 || g === 8 || g === 2) return b;
			if(e && c in f.attrFn) return f(a)[c](d);
			if(!("getAttribute" in a)) return f.prop(a, c, d);
			var h, i, j = g !== 1 || !f.isXMLDoc(a);
			j && (c = f.attrFix[c] || c, i = f.attrHooks[c], i || (t.test(c) ? i = w : v && c !== "className" && (f.nodeName(a, "form") || u.test(c)) && (i = v)));
			if(d !== b) {
				if(d === null) {
					f.removeAttr(a, c);
					return b
				}
				if(i && "set" in i && j && (h = i.set(a, d, c)) !== b) return h;
				a.setAttribute(c, "" + d);
				return d
			}
			if(i && "get" in i && j && (h = i.get(a, c)) !== null) return h;
			h = a.getAttribute(c);
			return h === null ? b : h
		},
		removeAttr: function(a, b) {
			var c;
			a.nodeType === 1 && (b = f.attrFix[b] || b, f.support.getSetAttribute ? a.removeAttribute(b) : (f.attr(a, b, ""), a.removeAttributeNode(a.getAttributeNode(b))), t.test(b) && (c = f.propFix[b] || b) in a && (a[c] = !1))
		},
		attrHooks: {
			type: {
				set: function(a, b) {
					if(q.test(a.nodeName) && a.parentNode) f.error("type property can't be changed");
					else if(!f.support.radioValue && b === "radio" && f.nodeName(a, "input")) {
						var c = a.value;
						a.setAttribute("type", b), c && (a.value = c);
						return b
					}
				}
			},
			tabIndex: {
				get: function(a) {
					var c = a.getAttributeNode("tabIndex");
					return c && c.specified ? parseInt(c.value, 10) : r.test(a.nodeName) || s.test(a.nodeName) && a.href ? 0 : b
				}
			},
			value: {
				get: function(a, b) {
					if(v && f.nodeName(a, "button")) return v.get(a, b);
					return b in a ? a.value : null
				},
				set: function(a, b, c) {
					if(v && f.nodeName(a, "button")) return v.set(a, b, c);
					a.value = b
				}
			}
		},
		propFix: {
			tabindex: "tabIndex",
			readonly: "readOnly",
			"for": "htmlFor",
			"class": "className",
			maxlength: "maxLength",
			cellspacing: "cellSpacing",
			cellpadding: "cellPadding",
			rowspan: "rowSpan",
			colspan: "colSpan",
			usemap: "useMap",
			frameborder: "frameBorder",
			contenteditable: "contentEditable"
		},
		prop: function(a, c, d) {
			var e = a.nodeType;
			if(!a || e === 3 || e === 8 || e === 2) return b;
			var g, h, i = e !== 1 || !f.isXMLDoc(a);
			i && (c = f.propFix[c] || c, h = f.propHooks[c]);
			return d !== b ? h && "set" in h && (g = h.set(a, d, c)) !== b ? g : a[c] = d : h && "get" in h && (g = h.get(a, c)) !== b ? g : a[c]
		},
		propHooks: {}
	}), w = {
		get: function(a, c) {
			return f.prop(a, c) ? c.toLowerCase() : b
		},
		set: function(a, b, c) {
			var d;
			b === !1 ? f.removeAttr(a, c) : (d = f.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase()));
			return c
		}
	}, f.support.getSetAttribute || (f.attrFix = f.propFix, v = f.attrHooks.name = f.attrHooks.title = f.valHooks.button = {
		get: function(a, c) {
			var d;
			d = a.getAttributeNode(c);
			return d && d.nodeValue !== "" ? d.nodeValue : b
		},
		set: function(a, b, c) {
			var d = a.getAttributeNode(c);
			if(d) {
				d.nodeValue = b;
				return b
			}
		}
	}, f.each(["width", "height"], function(a, b) {
		f.attrHooks[b] = f.extend(f.attrHooks[b], {
			set: function(a, c) {
				if(c === "") {
					a.setAttribute(b, "auto");
					return c
				}
			}
		})
	})), f.support.hrefNormalized || f.each(["href", "src", "width", "height"], function(a, c) {
		f.attrHooks[c] = f.extend(f.attrHooks[c], {
			get: function(a) {
				var d = a.getAttribute(c, 2);
				return d === null ? b : d
			}
		})
	}), f.support.style || (f.attrHooks.style = {
		get: function(a) {
			return a.style.cssText.toLowerCase() || b
		},
		set: function(a, b) {
			return a.style.cssText = "" + b
		}
	}), f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected, {
		get: function(a) {
			var b = a.parentNode;
			b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex)
		}
	})), f.support.checkOn || f.each(["radio", "checkbox"], function() {
		f.valHooks[this] = {
			get: function(a) {
				return a.getAttribute("value") === null ? "on" : a.value
			}
		}
	}), f.each(["radio", "checkbox"], function() {
		f.valHooks[this] = f.extend(f.valHooks[this], {
			set: function(a, b) {
				if(f.isArray(b)) return a.checked = f.inArray(f(a).val(), b) >= 0
			}
		})
	});
	var x = /\.(.*)$/,
		y = /^(?:textarea|input|select)$/i,
		z = /\./g,
		A = / /g,
		B = /[^\w\s.|`]/g,
		C = function(a) {
			return a.replace(B, "\\$&")
		};
	f.event = {
		add: function(a, c, d, e) {
			if(a.nodeType !== 3 && a.nodeType !== 8) {
				if(d === !1) d = D;
				else if(!d) return;
				var g, h;
				d.handler && (g = d, d = g.handler), d.guid || (d.guid = f.guid++);
				var i = f._data(a);
				if(!i) return;
				var j = i.events,
					k = i.handle;
				j || (i.events = j = {}), k || (i.handle = k = function(a) {
					return typeof f != "undefined" && (!a || f.event.triggered !== a.type) ? f.event.handle.apply(k.elem, arguments) : b
				}), k.elem = a, c = c.split(" ");
				var l, m = 0,
					n;
				while(l = c[m++]) {
					h = g ? f.extend({}, g) : {
						handler: d,
						data: e
					}, l.indexOf(".") > -1 ? (n = l.split("."), l = n.shift(), h.namespace = n.slice(0).sort().join(".")) : (n = [], h.namespace = ""), h.type = l, h.guid || (h.guid = d.guid);
					var o = j[l],
						p = f.event.special[l] || {};
					if(!o) {
						o = j[l] = [];
						if(!p.setup || p.setup.call(a, e, n, k) === !1) a.addEventListener ? a.addEventListener(l, k, !1) : a.attachEvent && a.attachEvent("on" + l, k)
					}
					p.add && (p.add.call(a, h), h.handler.guid || (h.handler.guid = d.guid)), o.push(h), f.event.global[l] = !0
				}
				a = null
			}
		},
		global: {},
		remove: function(a, c, d, e) {
			if(a.nodeType !== 3 && a.nodeType !== 8) {
				d === !1 && (d = D);
				var g, h, i, j, k = 0,
					l, m, n, o, p, q, r, s = f.hasData(a) && f._data(a),
					t = s && s.events;
				if(!s || !t) return;
				c && c.type && (d = c.handler, c = c.type);
				if(!c || typeof c == "string" && c.charAt(0) === ".") {
					c = c || "";
					for(h in t) f.event.remove(a, h + c);
					return
				}
				c = c.split(" ");
				while(h = c[k++]) {
					r = h, q = null, l = h.indexOf(".") < 0, m = [], l || (m = h.split("."), h = m.shift(), n = new RegExp("(^|\\.)" + f.map(m.slice(0).sort(), C).join("\\.(?:.*\\.)?") + "(\\.|$)")), p = t[h];
					if(!p) continue;
					if(!d) {
						for(j = 0; j < p.length; j++) {
							q = p[j];
							if(l || n.test(q.namespace)) f.event.remove(a, r, q.handler, j), p.splice(j--, 1)
						}
						continue
					}
					o = f.event.special[h] || {};
					for(j = e || 0; j < p.length; j++) {
						q = p[j];
						if(d.guid === q.guid) {
							if(l || n.test(q.namespace)) e == null && p.splice(j--, 1), o.remove && o.remove.call(a, q);
							if(e != null) break
						}
					}
					if(p.length === 0 || e != null && p.length === 1)(!o.teardown || o.teardown.call(a, m) === !1) && f.removeEvent(a, h, s.handle), g = null, delete t[h]
				}
				if(f.isEmptyObject(t)) {
					var u = s.handle;
					u && (u.elem = null), delete s.events, delete s.handle, f.isEmptyObject(s) && f.removeData(a, b, !0)
				}
			}
		},
		customEvent: {
			getData: !0,
			setData: !0,
			changeData: !0
		},
		trigger: function(c, d, e, g) {
			var h = c.type || c,
				i = [],
				j;
			h.indexOf("!") >= 0 && (h = h.slice(0, -1; this.seajs = {
				_seajs: this.seajs
			}, seajs.version = "1.3.0", seajs._util = {}, seajs._config = {
				debug: "%DEBUG%",
				preload: []
			}, function(a) {
				var b, c, d = Object.prototype.toString,
					e = Array.prototype;
				a.isString = function(a) {
					return d.call(a) === "[object String]"
				}, a.isFunction = function(a) {
					return d.call(a) === "[object Function]"
				}, a.isRegExp = function(a) {
					return d.call(a) === "[object RegExp]"
				}, a.isObject = function(a) {
					return a === Object(a)
				}, a.isArray = Array.isArray ||
				function(a) {
					return d.call(a) === "[object Array]"
				}, a.indexOf = e.indexOf ?
				function(a, b) {
					return a.indexOf(b)
				} : function(a, b) {
					var c;
					for(c = 0; c < a.length; c++) if(a[c] === b) return c;
					return -1
				}, b = a.forEach = e.forEach ?
				function(a, b) {
					a.forEach(b)
				} : function(a, b) {
					for(var c = 0; c < a.length; c++) b(a[c], c, a)
				}, a.map = e.map ?
				function(a, b) {
					return a.map(b)
				} : function(a, c) {
					var d = [];
					return b(a, function(a, b, e) {
						d.push(c(a, b, e))
					}), d
				}, a.filter = e.filter ?
				function(a, b) {
					return a.filter(b)
				} : function(a, c) {
					var d = [];
					return b(a, function(a, b, e) {
						c(a, b, e) && d.push(a)
					}), d
				}, c = a.keys = Object.keys ||
				function(a) {
					var b = [];
					for(var c in a) a.hasOwnProperty(c) && b.push(c);
					return b
				}, a.unique = function(a) {
					var d = {};
					return b(a, function(a) {
						d[a] = 1
					}), c(d)
				}, a.now = Date.now ||
				function() {
					return(new Date).getTime()
				}
			}(seajs._util), function(a, b) {
				a.log = function() {
					var a, c, d, e;
					if(typeof console == "undefined" || !(b.isDebug || b.debug && b.debug != "%DEBUG%")) return;
					a = Array.prototype.slice.call(arguments), c = "log", d = a[a.length - 1], console[d] && (c = a.pop());
					if(c === "log" && !seajs.debug) return;
					if(console[c].apply) {
						console[c].apply(console, a);
						return
					}
					e = a.length, e === 1 ? console[c](a[0]) : e === 2 ? console[c](a[0], a[1]) : e === 3 ? console[c](a[0], a[1], a[2]) : console[c](a.join(" "))
				}
			}(seajs._util, seajs._config), function(a, b, c) {
				function k(a) {
					var b = a.match(g);
					return(b ? b[0] : ".") + "/"
				}
				function l(a) {
					var b, c, d, e;
					h.lastIndex = 0, h.test(a) && (a = a.replace(h, "$1/"));
					if(a.indexOf(".") === -1) return a;
					b = a.split("/"), c = [];
					for(e = 0; e < b.length; e++) {
						d = b[e];
						if(d === "..") {
							if(c.length === 0) throw new Error("The path is invalid: " + a);
							c.pop()
						} else d !== "." && c.push(d)
					}
					return c.join("/")
				}
				function m(a) {
					var c, d, e;
					return a = l(a), c = a.charAt(a.length - 1), c === "/" ? a : (d = b.version, c === "#" ? a = a.slice(0, -1) : a.indexOf("?") === -1 && !i.test(a) && (e = (new RegExp("[?&]?" + d + "$")).test(a), e || (a += ".js")), a.indexOf(":80/") > 0 && (a = a.replace(":80/", "/")), d && !e && (a += (~a.indexOf("?") ? "&" : "?") + d), a)
				}
				function n(a) {
					var c, d, e;
					return a.charAt(0) === "#" ? a.substring(1) : (c = b.alias, c && u(a) && (d = a.split("/"), e = d[0], c.hasOwnProperty(e) && (d[0] = c[e], a = d.join("/"))), a)
				}
				function o(c) {
					var e, g, h, i, j = b.map || [];
					if(!j.length) return c;
					e = c;
					for(g = 0; g < j.length; g++) {
						h = j[g];
						if(a.isArray(h) && h.length === 2) {
							i = h[0];
							if(a.isString(i) && e.indexOf(i) > -1 || a.isRegExp(i) && i.test(e)) e = e.replace(i, h[1])
						} else a.isFunction(h) && (e = h(e))
					}
					return r(e) || (e = l(k(f) + e)), e !== c && (d[e] = c), e
				}
				function p(a) {
					return d[a] || a
				}
				function q(a, c) {
					var d;
					return a ? (a = n(a), c || (c = f), r(a) ? d = a : s(a) ? (a.indexOf("./") === 0 && (a = a.substring(2)), d = k(c) + a) : t(a) ? d = c.match(j)[1] + a : d = b.base + "/" + a, m(d)) : ""
				}
				function r(a) {
					return a.indexOf("://") > 0 || a.indexOf("//") === 0
				}
				function s(a) {
					return a.indexOf("./") === 0 || a.indexOf("../") === 0
				}
				function t(a) {
					return a.charAt(0) === "/" && a.charAt(1) !== "/"
				}
				function u(a) {
					var b = a.charAt(0);
					return a.indexOf("://") === -1 && b !== "." && b !== "/"
				}
				function v(a) {
					return a.charAt(0) !== "/" && (a = "/" + a), a
				}
				var d, e, f, g = /.*(?=\/.*$)/,
					h = /([^:\/])\/\/+/g,
					i = /\.(?:css|js)$/,
					j = /^(.*?\w)(?:\/|$)/;
				d = {}, e = c.location, f = e.protocol + "//" + e.host + v(e.pathname), f.indexOf("\\") > 0 && (f = f.replace(/\\/g, "/")), a.dirname = k, a.realpath = l, a.normalize = m, a.parseAlias = n, a.parseMap = o, a.unParseMap = p, a.id2Uri = q, a.isAbsolute = r, a.isRoot = t, a.isTopLevel = u, a.pageUri = f
			}(seajs._util, seajs._config, this), function(a, b) {
				function m(a, b) {
					a.nodeName === "SCRIPT" ? n(a, b) : o(a, b)
				}
				function n(a, c) {
					a.onload = a.onerror = a.onreadystatechange = function() {
						l.test(a.readyState) && (a.onload = a.onerror = a.onreadystatechange = null, a.parentNode && !b.debug && i.removeChild(a), a = undefined, c())
					}
				}
				function o(b, c) {
					f || g ? (a.log("Start poll to fetch css"), setTimeout(function() {
						p(b, c)
					}, 1)) : b.onload = b.onerror = function() {
						b.onload = b.onerror = null, b = undefined, c()
					}
				}
				function p(a, b) {
					var c;
					if(f) a.sheet && (c = !0);
					else if(a.sheet) try {
						a.sheet.cssRules && (c = !0)
					} catch(d) {
						d.name === "NS_ERROR_DOM_SECURITY_ERR" && (c = !0)
					}
					setTimeout(function() {
						c ? b() : p(a, b)
					}, 1)
				}
				function q() {}
				var c, d, e, f, g, h = document,
					i = h.head || h.getElementsByTagName("head")[0] || h.documentElement,
					j = i.getElementsByTagName("base")[0],
					k = /\.css(?:\?|$)/i,
					l = /loaded|complete|undefined/;
				a.fetch = function(b, d, e) {
					var f, g = k.test(b),
						h = document.createElement(g ? "link" : "script");
					e && (f = a.isFunction(e) ? e(b) : e, f && (h.charset = f)), m(h, d || q), g ? (h.rel = "stylesheet", h.href = b) : (h.async = "async", h.src = b), c = h, j ? i.insertBefore(h, j) : i.appendChild(h), c = null
				}, a.getCurrentScript = function() {
					var a, b, e;
					if(c) return c;
					if(d && d.readyState === "interactive") return d;
					a = i.getElementsByTagName("script");
					for(b = 0; b < a.length; b++) {
						e = a[b];
						if(e.readyState === "interactive") return d = e, e
					}
				}, a.getScriptAbsoluteSrc = function(a) {
					return a.hasAttribute ? a.src : a.getAttribute("src", 4)
				}, a.importStyle = function(a, b) {
					var c;
					if(b && h.getElementById(b)) return;
					c = h.createElement("style"), b && (c.id = b), i.appendChild(c), c.styleSheet ? c.styleSheet.cssText = a : c.appendChild(h.createTextNode(a))
				}, e = navigator.userAgent, f = Number(e.replace(/.*AppleWebKit\/(\d+)\..*/, "$1")) < 536, g = e.indexOf("Firefox") > 0 && !("onload" in document.createElement("link"))
			}(seajs._util, seajs._config, this), function(a) {
				function c(a) {
					return a.replace(/^\s*\/\*[\s\S]*?\*\/\s*$/mg, "").replace(/^\s*\/\/.*$/mg, "")
				}
				var b = /(?:^|[^.$])\brequire\s*\(\s*(["'])([^"'\s\)]+)\1\s*\)/g;
				a.parseDependencies = function(d) {
					var e, f = [];
					d = c(d), b.lastIndex = 0;
					while(e = b.exec(d)) e[2] && f.push(e[2]);
					return a.unique(f)
				}
			}(seajs._util), function(a, b, c) {
				function o(a, b) {
					this.uri = a, this.status = b || 0
				}
				function p(a, c) {
					return b.isString(a) ? o._resolve(a, c) : b.map(a, function(a) {
						return p(a, c)
					})
				}
				function q(a, i) {
					var j = b.parseMap(a);
					if(e[j]) {
						k[a] = k[j], i();
						return
					}
					if(d[j]) {
						f[j].push(i);
						return
					}
					d[j] = !0, f[j] = [i], o._fetch(j, function() {
						var c, i;
						e[j] = !0, c = k[a], c.status === n.FETCHING && (c.status = n.FETCHED), g && (o._save(a, g), g = null), h && c.status === n.FETCHED && (k[a] = h, h.realUri = a), h = null, d[j] && delete d[j], i = f[j], i && (delete f[j], b.forEach(i, function(a) {
							a()
						}))
					}, c.charset)
				}
				function r(a, c) {
					var d = k[a] || (k[a] = new o(a));
					return d.status < n.SAVED && (d.id = c.id || a, d.dependencies = p(b.filter(c.dependencies || [], function(a) {
						return !!a
					}), a), d.factory = c.factory, d.status = n.SAVED), d
				}
				function s(a, b) {
					var c = a(b.require, b.exports, b);
					c !== undefined && (b.exports = c)
				}
				function t(a) {
					return !!l[a.realUri || a.uri]
				}
				function u(a) {
					var c = a.realUri || a.uri,
						d = l[c];
					d && (b.forEach(d, function(b) {
						s(b, a)
					}), delete l[c])
				}
				function v(a) {
					var c = a.uri;
					return b.filter(a.dependencies, function(a) {
						var b;
						return i = [c], b = w(k[a]), b && (i.push(c), x(i)), !b
					})
				}
				function w(a) {
					var b, c;
					if(!a || a.status !== n.SAVED) return !1;
					i.push(a.uri), b = a.dependencies;
					if(b.length) {
						if(y(b, i)) return !0;
						for(c = 0; c < b.length; c++) if(w(k[b[c]])) return !0
					}
					return i.pop(), !1
				}
				function x(a, c) {
					b.log("Found circular dependencies:", a.join(" --> "), c)
				}
				function y(a, c) {
					var d = a.concat(c);
					return d.length > b.unique(d).length
				}
				function z(a) {
					var b = c.preload.slice();
					c.preload = [], b.length ? j._use(b, a) : a()
				}
				var d, e, f, g, h, i, j, k = {},
					l = {},
					m = [],
					n = {
						FETCHING: 1,
						FETCHED: 2,
						SAVED: 3,
						READY: 4,
						COMPILING: 5,
						COMPILED: 6
					};
				o.prototype._use = function(a, c) {
					var d;
					b.isString(a) && (a = [a]), d = p(a, this.uri), this._load(d, function() {
						z(function() {
							var a = b.map(d, function(a) {
								return a ? k[a]._compile() : null
							});
							c && c.apply(null, a)
						})
					})
				}, o.prototype._load = function(a, c) {
					function h(a) {
						(a || {}).status < n.READY && (a.status = n.READY), --d === 0 && c()
					}
					var d, e, f = b.filter(a, function(a) {
						return a && (!k[a] || k[a].status < n.READY)
					}),
						g = f.length;
					if(g === 0) {
						c();
						return
					}
					d = g;
					for(e = 0; e < g; e++)(function(a) {
						function c() {
							var c;
							b = k[a], b.status >= n.SAVED ? (c = v(b), c.length ? o.prototype._load(c, function() {
								h(b)
							}) : h(b)) : h()
						}
						var b = k[a] || (k[a] = new o(a, n.FETCHING));
						b.status >= n.FETCHED ? c() : q(a, c)
					})(f[e])
				}, o.prototype._compile = function() {
					function require(a) {
						var b = p(a, c.uri),
							d = k[b];
						return d ? d.status === n.COMPILING ? d.exports : (d.parent = c, d._compile()) : null
					}
					var a, c = this;
					return c.status === n.COMPILED ? c.exports : c.status < n.SAVED && !t(c) ? null : (c.status = n.COMPILING, require.async = function(a, b) {
						c._use(a, b)
					}, require.resolve = function(a) {
						return p(a, c.uri)
					}, require.cache = k, c.require = require, c.exports = {}, a = c.factory, b.isFunction(a) ? (m.push(c), s(a, c), m.pop()) : a !== undefined && (c.exports = a), c.status = n.COMPILED, u(c), c.exports)
				}, o._define = function(a, c, d) {
					var e, f, i, j, l, m, q = arguments.length;
					q === 1 ? (d = a, a = undefined) : q === 2 && (d = c, c = undefined, b.isArray(a) && (c = a, a = undefined)), !b.isArray(c) && b.isFunction(d) && (c = b.parseDependencies(d.toString())), e = {
						id: a,
						dependencies: c,
						factory: d
					}, document.attachEvent && (i = b.getCurrentScript(), i && (f = b.unParseMap(b.getScriptAbsoluteSrc(i))), f || b.log("Failed to derive URI from interactive script for:", d.toString(), "warn")), j = a ? p(a) : f, j ? (j === f && (l = k[f], l && l.realUri && l.status === n.SAVED && (k[f] = null)), m = o._save(j, e), f ? (k[f] || {}).status === n.FETCHING && (k[f] = m, m.realUri = f) : h || (h = m)) : g = e
				}, o._getCompilingModule = function() {
					return m[m.length - 1]
				}, o._find = function(a) {
					var c = [];
					return b.forEach(b.keys(k), function(d) {
						var e;
						if(b.isString(a) && d.indexOf(a) > -1 || b.isRegExp(a) && a.test(d)) e = k[d], e.exports && c.push(e.exports)
					}), c
				}, o._modify = function(b, c) {
					var d = p(b),
						e = k[d];
					return e && e.status === n.COMPILED ? s(c, e) : (l[d] || (l[d] = []), l[d].push(c)), a
				}, o.STATUS = n, o._resolve = b.id2Uri, o._fetch = b.fetch, o._save = r, d = {}, e = {}, f = {}, g = null, h = null, i = [], j = new o(b.pageUri, n.COMPILED), a.use = function(b, c) {
					return z(function() {
						j._use(b, c)
					}), a
				}, a.define = o._define, a.cache = o.cache = k, a.find = o._find, a.modify = o._modify, o.fetchedList = e, a.pluginSDK = {
					Module: o,
					util: b,
					config: c
				}
			}(seajs, seajs._util, seajs._config), function(a, b, c) {
				function k() {
					c.debug && (a.debug = !! c.debug)
				}
				function l(a) {
					var c, d, e;
					return a.indexOf("??") === -1 ? a : (c = a.split("??"), d = c[0], e = b.filter(c[1].split(","), function(a) {
						return a.indexOf("sea.js") !== -1
					}), d + e[0])
				}
				function m(a, c, d) {
					a && a !== c && b.log("The alias config is conflicted:", "key =", '"' + d + '"', "previous =", '"' + a + '"', "current =", '"' + c + '"', "warn")
				}
				var d, e, f, g, h = "seajs-ts=",
					i = h + b.now(),
					j = document.getElementById("seajsnode");
				j || (d = document.getElementsByTagName("script"), j = d[d.length - 1]), e = j && b.getScriptAbsoluteSrc(j) || b.pageUri, f = b.dirname(l(e)), b.loaderDir = f, g = f.match(/^(.+\/)seajs\/[\.\d]+(?:-dev)?\/$/), g && (f = g[1]), c.base = f, c.main = j && j.getAttribute("data-main"), c.charset = "utf-8", a.config = function(d) {
					var e, f, g, j, l, n, o;
					for(e in d) {
						if(!d.hasOwnProperty(e)) continue;
						f = c[e], g = d[e];
						if(f && e === "alias") for(j in g) g.hasOwnProperty(j) && (l = f[j], n = g[j], /^\d+\.\d+\.\d+$/.test(n) && (n = j + "/" + n + "/" + j), m(l, n, j), f[j] = n);
						else !f || e !== "map" && e !== "preload" ? c[e] = g : (b.isString(g) && (g = [g]), b.forEach(g, function(a) {
							a && f.push(a)
						}))
					}
					return o = c.base, o && !b.isAbsolute(o) && (c.base = b.id2Uri((b.isRoot(o) ? "" : "./") + o + "/")), c.debug === 2 && (c.debug = 1, a.config({
						map: [
							[/^.*$/, function(a) {
								return a.indexOf(h) === -1 && (a += (a.indexOf("?") === -1 ? "?" : "&") + i), a
							}]
						]
					})), k(), this
				}, k()
			}(seajs, seajs._util, seajs._config), function(a, b, c) {
				function d() {
					var a = [],
						d = c.location.search;
					return d = d.replace(/(seajs-\w+)(&|$)/g, "$1=1$2"), d += " " + document.cookie, d.replace(/seajs-(\w+)=[1-9]/g, function(b, c) {
						a.push(c)
					}), b.unique(a)
				}
				a.log = b.log, a.importStyle = b.importStyle, a.config({
					alias: {
						seajs: b.loaderDir
					}
				}), b.forEach(d(), function(b) {
					a.use("seajs/plugin-" + b), b === "debug" && (a._use = a.use, a._useArgs = [], a.use = function() {
						return a._useArgs.push(arguments), a
					})
				})
			}(seajs, seajs._util, this), function(a, b, c) {
				var d = a._seajs;
				if(d && !d.args) {
					c.seajs = a._seajs;
					return
				}
				c.define = a.define, b.main && a.use(b.main), function(b) {
					var c, d;
					if(b) {
						c = {
							0: "config",
							1: "use",
							2: "define"
						};
						for(d = 0; d < b.length; d += 2) a[c[b[d]]].apply(a, b[d + 1])
					}
				}((d || 0).args), c.define.cmd = {}, delete a.define, delete a._util, delete a._config, delete a._seajs
			}(seajs, seajs._config, this)