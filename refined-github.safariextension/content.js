(function (modules) {
	var installedModules = {};
	function __webpack_require__(moduleId) {
		if (installedModules[moduleId]) {
			return installedModules[moduleId].exports;
		}
		var module = installedModules[moduleId] = { i: moduleId,
			l: !1,
			exports: {}
		};
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
		module.l = !0;
		return module.exports;
	}
	__webpack_require__.m = modules;
	__webpack_require__.c = installedModules;
	__webpack_require__.d = function (exports, name, getter) {
		if (!__webpack_require__.o(exports, name)) {
			Object.defineProperty(exports, name, { configurable: !1,
				enumerable: !0,
				get: getter
			});
		}
	};
	__webpack_require__.n = function (module) {
		var getter = module && module.__esModule ? function () {
			return module['default'];
		} : function () {
			return module;
		};
		__webpack_require__.d(getter, 'a', getter);
		return getter;
	};
	__webpack_require__.o = function (object, property) {
		return Object.prototype.hasOwnProperty.call(object, property);
	};
	__webpack_require__.p = "";
	return __webpack_require__(__webpack_require__.s = 9);
})([function (module) {

	"use strict";

	function select(selector, parent) {
		return (parent || document).querySelector(selector);
	}

	select.exists = function (selector, parent) {
		return !!select(selector, parent);
	};

	select.all = function (selector, parent) {
		if (!parent || 'function' == typeof parent.querySelectorAll) {
			return Array.apply(null, (parent || document).querySelectorAll(selector));
		}

		var all = [],
		    current,
		    i,
		    ii;

		for (i = 0; i < parent.length; i++) {
			current = parent[i].querySelectorAll(selector);
			for (ii = 0; ii < current.length; ii++) {
				if (0 > all.indexOf(current[ii])) {
					all.push(current[ii]);
				}
			}
		}
		return all;
	};

	module.exports = select;
}, function (module, exports, __webpack_require__) {

	"use strict";

	const svgTagNames = __webpack_require__(21),
	      classnames = __webpack_require__(22),
	      flatten = __webpack_require__(23),
	      omit = __webpack_require__(24),
	      IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
	      excludeSvgTags = ['a', 'audio', 'canvas', 'iframe', 'script', 'video'],
	      svgTags = svgTagNames.filter(name => -1 === excludeSvgTags.indexOf(name)),
	      isSVG = tagName => 0 <= svgTags.indexOf(tagName),
	      cloneNode = node => {
		const clone = node.cloneNode(!0);

		for (const key in node) {
			if (0 === key.indexOf('on') && 'function' == typeof node[key]) {
				clone[key] = node[key];
			}
		}

		return clone;
	},
	      getCSSProps = attrs => {
		return Object.keys(attrs.style || {}).map(name => {
			let value = attrs.style[name];

			if ('number' == typeof value && !IS_NON_DIMENSIONAL.test(name)) {
				value += 'px';
			}

			return { name, value };
		});
	},
	      getHTMLProps = attrs => {
		const allProps = omit(attrs, ['class', 'className', 'style', 'key', 'dangerouslySetInnerHTML']);

		return Object.keys(allProps).filter(name => 0 !== name.indexOf('on')).map(name => ({
			name,
			value: attrs[name]
		}));
	},
	      getEventListeners = attrs => {
		return Object.keys(attrs).filter(name => 0 === name.indexOf('on')).map(name => ({
			name: name.toLowerCase(),
			listener: attrs[name]
		}));
	},
	      createElement = tagName => {
		if (isSVG(tagName)) {
			return document.createElementNS('http://www.w3.org/2000/svg', tagName);
		}

		return document.createElement(tagName);
	},
	      setAttribute = (tagName, el, name, value) => {
		if (isSVG(tagName)) {
			el.setAttribute(name, value);
		} else {
			el.setAttributeNS(null, name, value);
		}
	},
	      build = (tagName, attrs, children) => {
		const el = createElement(tagName),
		      className = attrs.class || attrs.className;

		if (className) {
			setAttribute(tagName, el, 'class', classnames(className));
		}

		getCSSProps(attrs).forEach(prop => {
			el.style.setProperty(prop.name, prop.value);
		});

		getHTMLProps(attrs).forEach(prop => {
			setAttribute(tagName, el, prop.name, prop.value);
		});

		getEventListeners(attrs).forEach(event => {
			el[event.name] = event.listener;
		});

		const setHTML = attrs.dangerouslySetInnerHTML;
		if (setHTML && setHTML.__html) {
			el.innerHTML = setHTML.__html;
		} else {
			children.forEach(child => {
				el.appendChild(child);
			});
		}

		return el;
	};


	exports.h = function (tagName, attrs) {
		attrs = attrs || {};

		const childrenArgs = [].slice.call(arguments, 2),
		      children = flatten(childrenArgs).map(child => {
			if (child instanceof Element) {
				return cloneNode(child);
			}

			if ('boolean' == typeof child || null === child) {
				child = '';
			}

			return document.createTextNode(child);
		});


		return build(tagName, attrs, children);
	};
}, function (module) {

	"use strict";

	module.exports = input => {
		const el = document.createElement('textarea');

		el.value = input;

		el.setAttribute('readonly', '');

		el.style.contain = 'strict';
		el.style.position = 'absolute';
		el.style.left = '-9999px';
		el.style.fontSize = '12pt';

		const selection = getSelection();
		let originalRange = !1;
		if (0 < selection.rangeCount) {
			originalRange = selection.getRangeAt(0);
		}

		document.body.appendChild(el);
		el.select();

		let success = !1;
		try {
			success = document.execCommand('copy');
		} catch (err) {}

		document.body.removeChild(el);

		if (originalRange) {
			selection.removeAllRanges();
			selection.addRange(originalRange);
		}

		return success;
	};
}, function (module, exports, __webpack_require__) {

	"use strict";

	const PCancelable = __webpack_require__(10),
	      selectorCache = new Map();

	module.exports = selector => {
		if (selectorCache.has(selector)) {
			return selectorCache.get(selector);
		}

		const promise = new PCancelable((onCancel, resolve) => {
			let raf;
			onCancel(() => {
				cancelAnimationFrame(raf);
			});

			(function check() {
				const el = document.querySelector(selector);

				if (el) {
					resolve(el);
					selectorCache.delete(selector);
				} else {
					raf = requestAnimationFrame(check);
				}
			})();
		});

		selectorCache.set(selector, promise);

		return promise;
	};
}, function (module, exports) {

	"use strict";

	var gitHubInjection = function (global, cb) {
		if (!global) {
			throw new Error('Missing argument global');
		}

		if (!global.document || !global.document.getElementById) {
			throw new Error('The given argument global is not a valid window object');
		}

		if (!cb) {
			throw new Error('Missing argument callback');
		}

		if ('function' != typeof cb) {
			throw new Error('Callback is not a function');
		}

		var domElement = global.document.getElementById('js-repo-pjax-container') || global.document.getElementById('js-pjax-container');
		if (!domElement || !global.MutationObserver) {
			return cb(null);
		}

		var viewSpy = new global.MutationObserver(function (mutations) {
			mutations.forEach(function (mutation) {
				if ('childList' === mutation.type && mutation.addedNodes.length) {
					cb(null);
				}
			});
		});

		viewSpy.observe(domElement, {
			attributes: !0,
			childList: !0,
			characterData: !0
		});

		cb(null);
	};

	if ('undefined' != typeof module && module.exports) {
		exports = module.exports = gitHubInjection;
	}
	exports.gitHubInjection = gitHubInjection;
}, function (module, exports, __webpack_require__) {

	"use strict";

	const issueRegex = __webpack_require__(16),
	      createHtmlElement = __webpack_require__(6),
	      groupedIssueRegex = new RegExp(`(${issueRegex().source})`, 'g'),
	      linkify = (match, options) => {
		let url = `${options.baseUrl}/`;
		if (match.includes('/')) {
			const parts = match.split('#');
			url += `${parts[0]}/issues/${parts[1]}`;
		} else {
			url += `${options.user}/${options.repo}/issues/${match.slice(1)}`;
		}

		return createHtmlElement({
			name: 'a',
			attributes: Object.assign({ href: '' }, options.attributes, { href: url }),
			value: match
		});
	},
	      domify = html => document.createRange().createContextualFragment(html),
	      getAsString = (input, options) => {
		return input.replace(groupedIssueRegex, match => linkify(match, options));
	},
	      getAsDocumentFragment = (input, options) => {
		return input.split(groupedIssueRegex).reduce((frag, text, index) => {
			if (index % 2) {
				frag.appendChild(domify(linkify(text, options)));
			} else if (0 < text.length) {
				frag.appendChild(document.createTextNode(text));
			}

			return frag;
		}, document.createDocumentFragment());
	};


	module.exports = (input, options) => {
		options = Object.assign({
			attributes: {},
			baseUrl: 'https://github.com',
			type: 'string'
		}, options);

		if (!(options.user && options.repo)) {
			throw new Error('Missing required `user` and `repo` options');
		}

		if ('string' === options.type) {
			return getAsString(input, options);
		}

		if ('dom' === options.type) {
			return getAsDocumentFragment(input, options);
		}

		throw new Error('The type option must be either dom or string');
	};
}, function (module, exports, __webpack_require__) {

	"use strict";

	const stringifyAttributes = __webpack_require__(17),
	      htmlTags = __webpack_require__(19),
	      voidHtmlTags = new Set(htmlTags);


	module.exports = options => {
		options = Object.assign({
			name: 'div',
			attributes: {},
			value: ''
		}, options);

		let ret = `<${options.name}${stringifyAttributes(options.attributes)}>`;

		if (!voidHtmlTags.has(options.name)) {
			ret += `${options.value}</${options.name}>`;
		}

		return ret;
	};
}, function (module) {

	"use strict";

	module.exports = new Promise(resolve => {
		if ('interactive' === document.readyState || 'complete' === document.readyState) {
			resolve();
		} else {
			document.addEventListener('DOMContentLoaded', () => {
				resolve();
			}, {
				capture: !0,
				once: !0,
				passive: !0
			});
		}
	});
}, function (module, exports, __webpack_require__) {

	"use strict";

	const mimicFn = __webpack_require__(28);

	module.exports = (fn, options) => {
		if ('function' != typeof fn) {
			throw new TypeError(`Expected the first argument to be a function, got \`${typeof fn}\``);
		}

		options = options || {};

		let timeout, result;


		const debounced = function () {
			const context = this,
			      args = arguments,
			      callNow = options.immediate && !timeout;

			clearTimeout(timeout);
			timeout = setTimeout(() => {
				timeout = null;
				if (!options.immediate) {
					result = fn.apply(context, args);
				}
			}, options.wait || 0);

			if (callNow) {
				result = fn.apply(context, args);
			}

			return result;
		};

		mimicFn(debounced, fn);

		debounced.cancel = () => {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
		};

		return debounced;
	};
}, function (module, __webpack_exports__, __webpack_require__) {

	"use strict";

	Object.defineProperty(__webpack_exports__, "__esModule", { value: !0 });

	var __WEBPACK_IMPORTED_MODULE_0_dom_chef__ = __webpack_require__(1),
	    __WEBPACK_IMPORTED_MODULE_0_dom_chef___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_dom_chef__);


	const check = Object(__WEBPACK_IMPORTED_MODULE_0_dom_chef__.h)("svg", { "aria-hidden": "true", class: "octicon octicon-check", height: "16", version: "1.1", viewBox: "0 0 12 16", width: "12" }, Object(__WEBPACK_IMPORTED_MODULE_0_dom_chef__.h)("path", { d: "M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z" })),
	      mute = Object(__WEBPACK_IMPORTED_MODULE_0_dom_chef__.h)("svg", { "aria-hidden": "true", class: "octicon octicon-mute", height: "16", version: "1.1", viewBox: "0 0 16 16", width: "16" }, Object(__WEBPACK_IMPORTED_MODULE_0_dom_chef__.h)("path", { d: "M8 2.81v10.38c0 .67-.81 1-1.28.53L3 10H1c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1h2l3.72-3.72C7.19 1.81 8 2.14 8 2.81zm7.53 3.22l-1.06-1.06-1.97 1.97-1.97-1.97-1.06 1.06L11.44 8 9.47 9.97l1.06 1.06 1.97-1.97 1.97 1.97 1.06-1.06L13.56 8l1.97-1.97z" })),
	      edit = Object(__WEBPACK_IMPORTED_MODULE_0_dom_chef__.h)("svg", { class: "octicon octicon-pencil", height: "16", version: "1.1", viewBox: "0 0 14 16", width: "14" }, Object(__WEBPACK_IMPORTED_MODULE_0_dom_chef__.h)("path", { d: "M0 12v3h3l8-8-3-3L0 12z m3 2H1V12h1v1h1v1z m10.3-9.3l-1.3 1.3-3-3 1.3-1.3c0.39-0.39 1.02-0.39 1.41 0l1.59 1.59c0.39 0.39 0.39 1.02 0 1.41z" })),
	      openIssue = Object(__WEBPACK_IMPORTED_MODULE_0_dom_chef__.h)("svg", { "aria-label": "issues", class: "octicon octicon-issue-opened type-icon type-icon-state-open", height: "16", role: "img", version: "1.1", viewBox: "0 0 14 16", width: "14" }, Object(__WEBPACK_IMPORTED_MODULE_0_dom_chef__.h)("path", { d: "M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z" })),
	      closedIssue = Object(__WEBPACK_IMPORTED_MODULE_0_dom_chef__.h)("svg", { "aria-label": "issues", class: "octicon octicon-issue-closed type-icon type-icon-state-closed", height: "16", role: "img", version: "1.1", viewBox: "0 0 16 16", width: "16" }, Object(__WEBPACK_IMPORTED_MODULE_0_dom_chef__.h)("path", { d: "M7 10h2v2H7v-2zm2-6H7v5h2V4zm1.5 1.5l-1 1L12 9l4-4.5-1-1L12 7l-1.5-1.5zM8 13.7A5.71 5.71 0 0 1 2.3 8c0-3.14 2.56-5.7 5.7-5.7 1.83 0 3.45.88 4.5 2.2l.92-.92A6.947 6.947 0 0 0 8 1C4.14 1 1 4.14 1 8s3.14 7 7 7 7-3.14 7-7l-1.52 1.52c-.66 2.41-2.86 4.19-5.48 4.19v-.01z" })),
	      openPullRequest = Object(__WEBPACK_IMPORTED_MODULE_0_dom_chef__.h)("svg", { "aria-label": "pull request", class: "octicon octicon-git-pull-request type-icon type-icon-state-open", height: "16", role: "img", version: "1.1", viewBox: "0 0 12 16", width: "12" }, Object(__WEBPACK_IMPORTED_MODULE_0_dom_chef__.h)("path", { d: "M11 11.28V5c-.03-.78-.34-1.47-.94-2.06C9.46 2.35 8.78 2.03 8 2H7V0L4 3l3 3V4h1c.27.02.48.11.69.31.21.2.3.42.31.69v6.28A1.993 1.993 0 0 0 10 15a1.993 1.993 0 0 0 1-3.72zm-1 2.92c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zM4 3c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v6.56A1.993 1.993 0 0 0 2 15a1.993 1.993 0 0 0 1-3.72V4.72c.59-.34 1-.98 1-1.72zm-.8 10c0 .66-.55 1.2-1.2 1.2-.65 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z" })),
	      closedPullRequest = Object(__WEBPACK_IMPORTED_MODULE_0_dom_chef__.h)("svg", { "aria-label": "pull request", class: "octicon octicon-git-pull-request type-icon type-icon-state-closed", height: "16", role: "img", version: "1.1", viewBox: "0 0 12 16", width: "12" }, Object(__WEBPACK_IMPORTED_MODULE_0_dom_chef__.h)("path", { d: "M11 11.28V5c-.03-.78-.34-1.47-.94-2.06C9.46 2.35 8.78 2.03 8 2H7V0L4 3l3 3V4h1c.27.02.48.11.69.31.21.2.3.42.31.69v6.28A1.993 1.993 0 0 0 10 15a1.993 1.993 0 0 0 1-3.72zm-1 2.92c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zM4 3c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v6.56A1.993 1.993 0 0 0 2 15a1.993 1.993 0 0 0 1-3.72V4.72c.59-.34 1-.98 1-1.72zm-.8 10c0 .66-.55 1.2-1.2 1.2-.65 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z" })),
	      mergedPullRequest = Object(__WEBPACK_IMPORTED_MODULE_0_dom_chef__.h)("svg", { "aria-label": "pull request", class: "octicon octicon-git-pull-request type-icon type-icon-state-merged", height: "16", role: "img", version: "1.1", viewBox: "0 0 12 16", width: "12" }, Object(__WEBPACK_IMPORTED_MODULE_0_dom_chef__.h)("path", { d: "M11 11.28V5c-.03-.78-.34-1.47-.94-2.06C9.46 2.35 8.78 2.03 8 2H7V0L4 3l3 3V4h1c.27.02.48.11.69.31.21.2.3.42.31.69v6.28A1.993 1.993 0 0 0 10 15a1.993 1.993 0 0 0 1-3.72zm-1 2.92c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zM4 3c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v6.56A1.993 1.993 0 0 0 2 15a1.993 1.993 0 0 0 1-3.72V4.72c.59-.34 1-.98 1-1.72zm-.8 10c0 .66-.55 1.2-1.2 1.2-.65 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z" })),
	      tag = Object(__WEBPACK_IMPORTED_MODULE_0_dom_chef__.h)("svg", { class: "octicon octicon-tag", height: "16", version: "1.1", viewBox: "0 0 14 16", width: "14" }, Object(__WEBPACK_IMPORTED_MODULE_0_dom_chef__.h)("path", { d: "M6.73 2.73c-0.47-0.47-1.11-0.73-1.77-0.73H2.5C1.13 2 0 3.13 0 4.5v2.47c0 0.66 0.27 1.3 0.73 1.77l6.06 6.06c0.39 0.39 1.02 0.39 1.41 0l4.59-4.59c0.39-0.39 0.39-1.02 0-1.41L6.73 2.73zM1.38 8.09c-0.31-0.3-0.47-0.7-0.47-1.13V4.5c0-0.88 0.72-1.59 1.59-1.59h2.47c0.42 0 0.83 0.16 1.13 0.47l6.14 6.13-4.73 4.73L1.38 8.09z m0.63-4.09h2v2H2V4z" })),
	      fork = Object(__WEBPACK_IMPORTED_MODULE_0_dom_chef__.h)("svg", { "aria-hidden": "true", class: "octicon octicon-repo-forked", height: "16", role: "img", version: "1.1", viewBox: "0 0 10 16", width: "10" }, Object(__WEBPACK_IMPORTED_MODULE_0_dom_chef__.h)("path", { d: "M8 1c-1.11 0-2 0.89-2 2 0 0.73 0.41 1.38 1 1.72v1.28L5 8 3 6v-1.28c0.59-0.34 1-0.98 1-1.72 0-1.11-0.89-2-2-2S0 1.89 0 3c0 0.73 0.41 1.38 1 1.72v1.78l3 3v1.78c-0.59 0.34-1 0.98-1 1.72 0 1.11 0.89 2 2 2s2-0.89 2-2c0-0.73-0.41-1.38-1-1.72V9.5l3-3V4.72c0.59-0.34 1-0.98 1-1.72 0-1.11-0.89-2-2-2zM2 4.2c-0.66 0-1.2-0.55-1.2-1.2s0.55-1.2 1.2-1.2 1.2 0.55 1.2 1.2-0.55 1.2-1.2 1.2z m3 10c-0.66 0-1.2-0.55-1.2-1.2s0.55-1.2 1.2-1.2 1.2 0.55 1.2 1.2-0.55 1.2-1.2 1.2z m3-10c-0.66 0-1.2-0.55-1.2-1.2s0.55-1.2 1.2-1.2 1.2 0.55 1.2 1.2-0.55 1.2-1.2 1.2z" })),
	      cloudUpload = Object(__WEBPACK_IMPORTED_MODULE_0_dom_chef__.h)("svg", { "aria-hidden": "true", class: "octicon octicon-cloud-upload", height: "16", role: "img", version: "1.1", viewBox: "0 0 16 16", width: "16" }, Object(__WEBPACK_IMPORTED_MODULE_0_dom_chef__.h)("path", { "fill-rule": "evenodd", d: "M7 9H5l3-3 3 3H9v5H7V9zm5-4c0-.44-.91-3-4.5-3C5.08 2 3 3.92 3 6 1.02 6 0 7.52 0 9c0 1.53 1 3 3 3h3v-1.3H3c-1.62 0-1.7-1.42-1.7-1.7 0-.17.05-1.7 1.7-1.7h1.3V6c0-1.39 1.56-2.7 3.2-2.7 2.55 0 3.13 1.55 3.2 1.8v1.2H12c.81 0 2.7.22 2.7 2.2 0 2.09-2.25 2.2-2.7 2.2h-2V12h2c2.08 0 4-1.16 4-3.5C16 6.06 14.08 5 12 5z" })),
	      darkCompare = Object(__WEBPACK_IMPORTED_MODULE_0_dom_chef__.h)("svg", { xmlns: "http://www.w3.org/2000/svg", class: "octicon octicon-diff", height: "16", viewBox: "0 0 13 16", width: "13" }, Object(__WEBPACK_IMPORTED_MODULE_0_dom_chef__.h)("path", { d: "M6 7h2v1H6v2H5V8H3V7h2V5h1zm-3 6h5v-1H3zM7.5 2L11 5.5V15c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1zm1-2H3v1h5l4 4v8h1V4.5z", "fill-rule": "evenodd" }));

	var __WEBPACK_IMPORTED_MODULE_0_select_dom__ = __webpack_require__(0),
	    __WEBPACK_IMPORTED_MODULE_0_select_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_select_dom__);


	const isGist = () => location.hostname.startsWith('gist.') || location.pathname.startsWith('gist/'),
	      isDashboard = () => '/' === location.pathname || /^(\/orgs\/[^/]+)?\/dashboard/.test(location.pathname),
	      isRepo = () => !isGist() && /^\/[^/]+\/[^/]+/.test(location.pathname),
	      getRepoPath = () => location.pathname.replace(/^\/[^/]+\/[^/]+/, ''),
	      isRepoRoot = () => isRepo() && /^(\/?$|\/tree\/)/.test(getRepoPath()) && __WEBPACK_IMPORTED_MODULE_0_select_dom___default.a.exists('.repository-meta-content'),
	      isIssueSearch = () => location.pathname.startsWith('/issues'),
	      isIssueList = () => isRepo() && /^\/issues\/?$/.test(getRepoPath()),
	      isIssue = () => isRepo() && /^\/issues\/\d+/.test(getRepoPath()),
	      isPRSearch = () => location.pathname.startsWith('/pulls'),
	      isPRList = () => isRepo() && /^\/pulls\/?$/.test(getRepoPath()),
	      isPR = () => isRepo() && /^\/pull\/\d+/.test(getRepoPath()),
	      isPRFiles = () => isRepo() && /^\/pull\/\d+\/files/.test(getRepoPath()),
	      isPRCommit = () => isRepo() && /^\/pull\/\d+\/commits\/[0-9a-f]{5,40}/.test(getRepoPath()),
	      isMilestone = () => isRepo() && /^\/milestone\/\d+/.test(getRepoPath()),
	      isCommitList = () => isRepo() && /^\/commits\//.test(getRepoPath()),
	      isSingleCommit = () => isRepo() && /^\/commit\/[0-9a-f]{5,40}/.test(getRepoPath()),
	      isCommit = () => isSingleCommit() || isPRCommit() || isPRFiles() && __WEBPACK_IMPORTED_MODULE_0_select_dom___default.a.exists('.full-commit'),
	      isCompare = () => isRepo() && /^\/compare/.test(getRepoPath()),
	      hasCode = () => isRepo() && __WEBPACK_IMPORTED_MODULE_0_select_dom___default.a.exists('.highlight'),
	      hasDiff = () => isRepo() && (isSingleCommit() || isPRCommit() || isPRFiles() || isCompare() || isPR() && __WEBPACK_IMPORTED_MODULE_0_select_dom___default.a.exists('.diff-table')),
	      isReleases = () => isRepo() && /^\/(releases|tags)/.test(getRepoPath()),
	      isNotifications = () => location.pathname.startsWith('/notifications'),
	      isRepoSettings = () => isRepo() && /^\/settings/.test(getRepoPath()),
	      getOwnerAndRepo = () => {
		const [, ownerName, repoName] = location.pathname.split('/');

		return {
			ownerName,
			repoName
		};
	},
	      isSingleFile = () => {
		const { ownerName, repoName } = getOwnerAndRepo(),
		      blobPattern = new RegExp(`/${ownerName}/${repoName}/blob/`);

		return isRepo() && blobPattern.test(location.href);
	},
	      hasCommentForm = () => __WEBPACK_IMPORTED_MODULE_0_select_dom___default.a.exists('.js-previewable-comment-form');

	var __WEBPACK_IMPORTED_MODULE_0_github_injection__ = __webpack_require__(4),
	    __WEBPACK_IMPORTED_MODULE_0_github_injection___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_github_injection__),
	    __WEBPACK_IMPORTED_MODULE_1_select_dom__ = __webpack_require__(0),
	    __WEBPACK_IMPORTED_MODULE_1_select_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_select_dom__),
	    __WEBPACK_IMPORTED_MODULE_2_dom_chef__ = __webpack_require__(1),
	    __WEBPACK_IMPORTED_MODULE_2_dom_chef___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_dom_chef__);


	function loadNotifications() {
		return JSON.parse(localStorage.getItem('unreadNotifications') || '[]');
	}

	function storeNotifications(unreadNotifications) {
		localStorage.setItem('unreadNotifications', JSON.stringify(unreadNotifications || '[]'));
	}

	function stripHash(url) {
		return url.replace(/#.+$/, '');
	}

	function addMarkUnreadButton() {
		const container = __WEBPACK_IMPORTED_MODULE_1_select_dom___default()('.js-thread-subscription-status');
		if (container) {
			const button = Object(__WEBPACK_IMPORTED_MODULE_2_dom_chef__.h)('button', {
				class: 'btn btn-sm btn-mark-unread js-mark-unread'
			}, 'Mark as unread');
			button.addEventListener('click', markUnread, {
				once: !0
			});
			container.append(button);
		}
	}

	function markRead(url) {
		const unreadNotifications = loadNotifications();
		unreadNotifications.forEach((notification, index) => {
			if (notification.url === url) {
				unreadNotifications.splice(index, 1);
			}
		});

		for (const a of __WEBPACK_IMPORTED_MODULE_1_select_dom___default.a.all(`a.js-notification-target[href="${url}"]`)) {
			const li = a.closest('li.js-notification');
			li.classList.remove('unread');
			li.classList.add('read');
		}

		storeNotifications(unreadNotifications);
	}

	function markUnread() {
		const participants = __WEBPACK_IMPORTED_MODULE_1_select_dom___default.a.all('.participant-avatar').map(el => ({
			username: el.getAttribute('aria-label'),
			avatar: el.querySelector('img').src
		})),
		      { ownerName, repoName } = getOwnerAndRepo(),
		      repository = `${ownerName}/${repoName}`,
		      title = __WEBPACK_IMPORTED_MODULE_1_select_dom___default()('.js-issue-title').textContent.trim(),
		      type = isPR() ? 'pull-request' : 'issue',
		      url = stripHash(location.href),
		      stateLabel = __WEBPACK_IMPORTED_MODULE_1_select_dom___default()('.gh-header-meta .State');

		let state;

		if (stateLabel.classList.contains('State--green')) {
			state = 'open';
		} else if (stateLabel.classList.contains('State--purple')) {
			state = 'merged';
		} else if (stateLabel.classList.contains('State--red')) {
			state = 'closed';
		}

		const lastCommentTime = __WEBPACK_IMPORTED_MODULE_1_select_dom___default.a.all('.timeline-comment-header relative-time').pop(),
		      dateTitle = lastCommentTime.title,
		      date = lastCommentTime.getAttribute('datetime'),
		      unreadNotifications = loadNotifications();


		unreadNotifications.push({
			participants,
			repository,
			title,
			state,
			type,
			dateTitle,
			date,
			url
		});

		storeNotifications(unreadNotifications);
		updateUnreadIndicator();

		this.setAttribute('disabled', 'disabled');
		this.textContent = 'Marked as unread';
	}

	function renderNotifications() {
		const unreadNotifications = loadNotifications().filter(notification => !isNotificationExist(notification.url)).filter(notification => {
			if (!isParticipatingPage()) {
				return !0;
			}

			const { participants } = notification,
			      myUserName = getUserName();


			return 0 < participants.filter(participant => participant.username === myUserName).length;
		});

		if (0 === unreadNotifications.length) {
			return;
		}

		if (isEmptyPage()) {
			__WEBPACK_IMPORTED_MODULE_1_select_dom___default()('.blankslate').remove();
			__WEBPACK_IMPORTED_MODULE_1_select_dom___default()('.js-navigation-container').append(Object(__WEBPACK_IMPORTED_MODULE_2_dom_chef__.h)('div', {
				class: 'notifications-list'
			}));
		}

		unreadNotifications.forEach(notification => {
			const {
				participants,
				repository,
				title,
				state,
				type,
				dateTitle,
				date,
				url
			} = notification;

			let icon;

			if ('issue' === type) {
				if ('open' === state) {
					icon = openIssue;
				}

				if ('closed' === state) {
					icon = closedIssue;
				}
			}

			if ('pull-request' === type) {
				if ('open' === state) {
					icon = openPullRequest;
				}

				if ('merged' === state) {
					icon = mergedPullRequest;
				}

				if ('closed' === state) {
					icon = closedPullRequest;
				}
			}

			const hasList = __WEBPACK_IMPORTED_MODULE_1_select_dom___default.a.exists(`a.notifications-repo-link[title="${repository}"]`);
			if (!hasList) {
				const list = Object(__WEBPACK_IMPORTED_MODULE_2_dom_chef__.h)('div', {
					class: 'boxed-group flush'
				}, Object(__WEBPACK_IMPORTED_MODULE_2_dom_chef__.h)('form', {
					class: 'boxed-group-action'
				}, Object(__WEBPACK_IMPORTED_MODULE_2_dom_chef__.h)('button', {
					class: 'mark-all-as-read css-truncate tooltipped tooltipped-w js-mark-all-read',
					"aria-label": 'Mark all notifications as read'
				}, check)), Object(__WEBPACK_IMPORTED_MODULE_2_dom_chef__.h)('h3', null, Object(__WEBPACK_IMPORTED_MODULE_2_dom_chef__.h)('a', { href: '/' + repository, class: 'css-truncate css-truncate-target notifications-repo-link', title: repository }, repository)), Object(__WEBPACK_IMPORTED_MODULE_2_dom_chef__.h)('ul', {
					class: 'boxed-group-inner list-group notifications'
				}));

				$('.notifications-list').prepend(list);
			}

			const list = $(`a.notifications-repo-link[title="${repository}"]`).parent().siblings('ul.notifications'),
			      usernames = participants.map(participant => participant.username).join(', '),
			      avatars = participants.map(participant => {
				return Object(__WEBPACK_IMPORTED_MODULE_2_dom_chef__.h)('img', { alt: `@${participant.username}`, class: 'avatar from-avatar', src: participant.avatar, width: 39, height: 39 });
			}),
			      item = Object(__WEBPACK_IMPORTED_MODULE_2_dom_chef__.h)('li', { class: `list-group-item js-notification js-navigation-item unread ${type}-notification` }, Object(__WEBPACK_IMPORTED_MODULE_2_dom_chef__.h)('span', {
				class: 'list-group-item-name css-truncate'
			}, icon, Object(__WEBPACK_IMPORTED_MODULE_2_dom_chef__.h)('a', { href: url, class: 'css-truncate-target js-notification-target js-navigation-open list-group-item-link' }, title)), Object(__WEBPACK_IMPORTED_MODULE_2_dom_chef__.h)('ul', {
				class: 'notification-actions'
			}, Object(__WEBPACK_IMPORTED_MODULE_2_dom_chef__.h)('li', {
				class: 'delete'
			}, Object(__WEBPACK_IMPORTED_MODULE_2_dom_chef__.h)('button', {
				"aria-label": 'Mark as read',
				class: 'btn-link delete-note tooltipped tooltipped-w js-mark-read'
			}, check)), Object(__WEBPACK_IMPORTED_MODULE_2_dom_chef__.h)('li', {
				class: 'mute'
			}, Object(__WEBPACK_IMPORTED_MODULE_2_dom_chef__.h)('button', { style: { opacity: 0, pointerEvents: 'none' } }, mute)), Object(__WEBPACK_IMPORTED_MODULE_2_dom_chef__.h)('li', {
				class: 'age'
			}, Object(__WEBPACK_IMPORTED_MODULE_2_dom_chef__.h)('relative-time', { datetime: date, title: dateTitle })), Object(__WEBPACK_IMPORTED_MODULE_2_dom_chef__.h)('li', { class: 'tooltipped tooltipped-s', "aria-label": usernames }, Object(__WEBPACK_IMPORTED_MODULE_2_dom_chef__.h)('div', {
				class: 'avatar-stack clearfix'
			}, avatars))));

			list.prepend(item);
		});

		$('.boxed-group:has(".unread")').prependTo('.notifications-list');
	}

	function isNotificationExist(url) {
		return __WEBPACK_IMPORTED_MODULE_1_select_dom___default.a.exists(`a.js-notification-target[href^="${stripHash(url)}"]`);
	}

	function isEmptyPage() {
		return __WEBPACK_IMPORTED_MODULE_1_select_dom___default.a.exists('.blankslate');
	}

	function isParticipatingPage() {
		return (/\/notifications\/participating/.test(location.pathname)
		);
	}

	function getUserName() {
		return __WEBPACK_IMPORTED_MODULE_1_select_dom___default()('#user-links a.name img').getAttribute('alt').slice(1);
	}

	function updateUnreadIndicator() {
		const icon = __WEBPACK_IMPORTED_MODULE_1_select_dom___default()('.notification-indicator');
		if (!icon) {
			return;
		}
		const statusMark = icon.querySelector('.mail-status'),
		      hasRealNotifications = icon.matches('[data-ga-click$=":unread"]'),
		      hasUnread = hasRealNotifications || 0 < loadNotifications().length,
		      label = hasUnread ? 'You have unread notifications' : 'You have no unread notifications';


		icon.setAttribute('aria-label', label);
		statusMark.classList.toggle('unread', hasUnread);
	}

	function markNotificationRead(e) {
		const notification = e.target.closest('li.js-notification'),
		      a = notification.querySelector('a.js-notification-target');

		markRead(a.href);
		updateUnreadIndicator();
	}

	function markAllNotificationsRead(e) {
		e.preventDefault();
		const repoGroup = e.target.closest('.boxed-group');
		for (const a of repoGroup.querySelectorAll('a.js-notification-target')) {
			markRead(a.href);
		}
		updateUnreadIndicator();
	}

	function addCustomAllReadBtn() {
		const hasMarkAllReadBtnExists = __WEBPACK_IMPORTED_MODULE_1_select_dom___default.a.exists('#notification-center a[href="#mark_as_read_confirm_box"]');
		if (hasMarkAllReadBtnExists || 0 === loadNotifications().length) {
			return;
		}

		$('#notification-center .tabnav-tabs:first').append(Object(__WEBPACK_IMPORTED_MODULE_2_dom_chef__.h)('div', {
			class: 'float-right'
		}, Object(__WEBPACK_IMPORTED_MODULE_2_dom_chef__.h)('a', { href: '#mark_as_read_confirm_box', class: 'btn btn-sm', rel: 'facebox' }, 'Mark all as read'), Object(__WEBPACK_IMPORTED_MODULE_2_dom_chef__.h)('div', { id: 'mark_as_read_confirm_box', style: { display: 'none' } }, Object(__WEBPACK_IMPORTED_MODULE_2_dom_chef__.h)('h2', {
			class: 'facebox-header',
			"data-facebox-id": 'facebox-header'
		}, 'Are you sure?'), Object(__WEBPACK_IMPORTED_MODULE_2_dom_chef__.h)('p', {
			"data-facebox-id": 'facebox-description'
		}, 'Are you sure you want to mark all unread notifications as read?'), Object(__WEBPACK_IMPORTED_MODULE_2_dom_chef__.h)('div', {
			class: 'full-button'
		}, Object(__WEBPACK_IMPORTED_MODULE_2_dom_chef__.h)('button', { id: 'clear-local-notification', class: 'btn btn-block' }, 'Mark all notifications as read')))));

		$(document).on('click', '#clear-local-notification', () => {
			storeNotifications([]);
			location.reload();
		});
	}

	function updateLocalNotificationsCount() {
		const unreadCount = __WEBPACK_IMPORTED_MODULE_1_select_dom___default()('#notification-center .filter-list a[href="/notifications"] .count'),
		      githubNotificationsCount = +unreadCount.textContent,
		      localNotifications = loadNotifications();


		if (localNotifications) {
			unreadCount.textContent = githubNotificationsCount + localNotifications.length;
		}
	}

	function destroy() {
		$(document).off('click', '.js-mark-unread', markUnread);
		$('.js-mark-unread').remove();
	}

	var mark_unread_defaultExport = {
		setup: function () {
			__WEBPACK_IMPORTED_MODULE_0_github_injection___default()(window, () => {
				destroy();

				if (isNotifications()) {
					renderNotifications();
					addCustomAllReadBtn();
					updateLocalNotificationsCount();
					$(document).on('click', '.js-mark-read', markNotificationRead);
					$(document).on('click', '.js-mark-all-read', markAllNotificationsRead);
					$(document).on('click', '.js-delete-notification button', updateUnreadIndicator);
					$(document).on('click', 'form[action="/notifications/mark"] button', () => {
						storeNotifications([]);
					});
				} else if (isPR() || isIssue()) {
					markRead(location.href);
					addMarkUnreadButton();
				}

				updateUnreadIndicator();
			});
		},
		destroy
	},
	    __WEBPACK_IMPORTED_MODULE_0_copy_text_to_clipboard__ = __webpack_require__(2),
	    __WEBPACK_IMPORTED_MODULE_0_copy_text_to_clipboard___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_copy_text_to_clipboard__),
	    copy_gist___WEBPACK_IMPORTED_MODULE_1_select_dom__ = __webpack_require__(0),
	    copy_gist___WEBPACK_IMPORTED_MODULE_1_select_dom___default = __webpack_require__.n(copy_gist___WEBPACK_IMPORTED_MODULE_1_select_dom__),
	    copy_gist___WEBPACK_IMPORTED_MODULE_2_dom_chef__ = __webpack_require__(1),
	    copy_gist___WEBPACK_IMPORTED_MODULE_2_dom_chef___default = __webpack_require__.n(copy_gist___WEBPACK_IMPORTED_MODULE_2_dom_chef__),
	    copy_gist_defaultExport = () => {
		if (copy_gist___WEBPACK_IMPORTED_MODULE_1_select_dom___default.a.exists('.copy-btn')) {
			return;
		}

		$('.blob-wrapper').each((i, blob) => {
			const actionsParent = blob.parentNode.querySelector('.file-actions'),
			      $btn = $(Object(copy_gist___WEBPACK_IMPORTED_MODULE_2_dom_chef__.h)('button', {
				class: 'btn btn-sm copy-btn gist-copy-btn'
			}, 'Copy'));

			$btn.data('blob', blob);
			$btn.prependTo(actionsParent);
		});

		$(document).on('click', '.copy-btn', e => {
			e.preventDefault();
			const fileContents = $(e.currentTarget).data('blob').innerText;
			__WEBPACK_IMPORTED_MODULE_0_copy_text_to_clipboard___default()(fileContents);
		});
	},
	    upload_button___WEBPACK_IMPORTED_MODULE_0_dom_chef__ = __webpack_require__(1),
	    upload_button___WEBPACK_IMPORTED_MODULE_0_dom_chef___default = __webpack_require__.n(upload_button___WEBPACK_IMPORTED_MODULE_0_dom_chef__);


	const isMac = /Mac/.test(window.navigator.platform);

	var upload_button_defaultExport = () => {
		if (hasCommentForm()) {
			$('.js-previewable-comment-form').each((index, element) => {
				const $element = $(element);
				if (!$element.hasClass('refined-github-has-upload-btn')) {
					const uploadBtn = Object(upload_button___WEBPACK_IMPORTED_MODULE_0_dom_chef__.h)('label', { for: `refined-github-upload-btn-${index}`, class: 'toolbar-item tooltipped tooltipped-nw refined-github-upload-btn', "aria-label": 'Upload a file' }, cloudUpload);

					$('.comment-form-head .toolbar-commenting .toolbar-group:last-child', element).append(uploadBtn);

					const keydownHandler = event => {
						if (85 === event.which && (isMac ? event.metaKey : event.ctrlKey)) {
							event.preventDefault();
							uploadBtn.click();
						}
					};
					$element.find('.js-comment-field').focus(() => $(document).on('keydown', keydownHandler)).blur(() => $(document).off('keydown', keydownHandler));

					$element.find('.js-write-bucket .drag-and-drop .default .js-manual-file-chooser').attr('id', `refined-github-upload-btn-${index}`);
					$element.addClass('refined-github-has-upload-btn');
				}
			});
		}
	},
	    __WEBPACK_IMPORTED_MODULE_0_debounce_fn__ = __webpack_require__(8),
	    __WEBPACK_IMPORTED_MODULE_0_debounce_fn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_debounce_fn__),
	    diffheader___WEBPACK_IMPORTED_MODULE_1_select_dom__ = __webpack_require__(0),
	    diffheader___WEBPACK_IMPORTED_MODULE_1_select_dom___default = __webpack_require__.n(diffheader___WEBPACK_IMPORTED_MODULE_1_select_dom__),
	    diffheader___WEBPACK_IMPORTED_MODULE_2_dom_chef__ = __webpack_require__(1),
	    diffheader___WEBPACK_IMPORTED_MODULE_2_dom_chef___default = __webpack_require__.n(diffheader___WEBPACK_IMPORTED_MODULE_2_dom_chef__);


	const diffFile = (() => {
		let lastFile;

		return {
			hasChanged: nextFile => {
				if (nextFile !== lastFile) {
					lastFile = nextFile;
					return !0;
				}

				return !1;
			},
			reset: () => {
				lastFile = '';
			}
		};
	})(),
	      maxPixelsAvailable = () => {
		const filenameLeftOffset = diffheader___WEBPACK_IMPORTED_MODULE_1_select_dom___default()('.diff-toolbar-filename').getBoundingClientRect().left,
		      diffStatLeftOffset = diffheader___WEBPACK_IMPORTED_MODULE_1_select_dom___default()('.diffbar > .diffstat').getBoundingClientRect().left;


		return diffStatLeftOffset - filenameLeftOffset;
	},
	      parseFileDetails = filename => {
		const folderCount = (filename.match(/\//g) || []).length,
		      [, basename] = filename.match(/(?:\/)([\w.-]+)$/) || [],
		      [, topDir] = filename.match(/^([\w.-]+)\//) || [];


		return {
			folderCount,
			basename,
			topDir
		};
	},
	      updateFileLabel = val => {
		const $target = $('.diff-toolbar-filename');
		$target.addClass('filename-width-check').text(val);

		const maxPixels = maxPixelsAvailable(),
		      doesOverflow = () => $target.get(0).getBoundingClientRect().width > maxPixels,
		      { basename, topDir, folderCount } = parseFileDetails(val);


		if (doesOverflow() && 1 < folderCount) {
			$target.text(`${topDir}/.../${basename}`);
		}

		if (doesOverflow()) {
			$target.text(basename);
		}

		$target.removeClass('filename-width-check');
	},
	      getDiffToolbarHeight = () => {
		const el = diffheader___WEBPACK_IMPORTED_MODULE_1_select_dom___default()('.pr-toolbar.is-stuck');
		return el && el.clientHeight || 0;
	},
	      isFilePartlyVisible = (fileEl, offset) => {
		const { bottom } = fileEl.getBoundingClientRect();
		return bottom >= offset;
	},
	      getHighestVisibleDiffFilename = () => {
		const toolbarHeight = getDiffToolbarHeight();
		if (!toolbarHeight) {
			return;
		}

		const files = $('.file.js-details-container').get();
		return files.find(el => isFilePartlyVisible(el, toolbarHeight));
	},
	      diffHeaderFilename = isResize => {
		const targetDiffFile = getHighestVisibleDiffFilename();
		if (!targetDiffFile) {
			return;
		}

		const filename = targetDiffFile.querySelector('.file-header').dataset.path;

		if (!diffFile.hasChanged(filename) && !isResize) {
			return;
		}

		if (isResize) {
			const target = diffheader___WEBPACK_IMPORTED_MODULE_1_select_dom___default()('.diff-toolbar-filename');
			if (target.getBoundingClientRect().width < maxPixelsAvailable()) {
				return;
			}
		}

		updateFileLabel(filename);
	};

	var diffheader_defaultExport = {
		setup: () => {
			$(window).on('scroll.diffheader', () => diffHeaderFilename());
			const onResize = __WEBPACK_IMPORTED_MODULE_0_debounce_fn___default()(() => diffHeaderFilename(!0), { wait: 200 });
			$(window).on('resize.diffheader', onResize);

			$('.diffbar > .diffstat').insertAfter('.pr-review-tools');

			diffheader___WEBPACK_IMPORTED_MODULE_1_select_dom___default()('.toc-select').insertAdjacentElement('afterEnd', Object(diffheader___WEBPACK_IMPORTED_MODULE_2_dom_chef__.h)('span', {
				class: 'diffbar-item diff-toolbar-filename'
			}));
			diffFile.reset();
		},
		destroy: () => {
			$(window).off('scroll.diffheader');
			$(window).off('resize.diffheader');
			$('.diff-toolbar-filename').remove();
		}
	},
	    copy_on_y___WEBPACK_IMPORTED_MODULE_0_copy_text_to_clipboard__ = __webpack_require__(2),
	    copy_on_y___WEBPACK_IMPORTED_MODULE_0_copy_text_to_clipboard___default = __webpack_require__.n(copy_on_y___WEBPACK_IMPORTED_MODULE_0_copy_text_to_clipboard__),
	    copy_on_y___WEBPACK_IMPORTED_MODULE_1_select_dom__ = __webpack_require__(0),
	    copy_on_y___WEBPACK_IMPORTED_MODULE_1_select_dom___default = __webpack_require__.n(copy_on_y___WEBPACK_IMPORTED_MODULE_1_select_dom__);


	const handler = ({ keyCode, target }) => {
		if (keyCode === 89 && 'INPUT' !== target.nodeName) {
			const commitIsh = copy_on_y___WEBPACK_IMPORTED_MODULE_1_select_dom___default()('.commit-tease-sha').textContent.trim(),
			      uri = location.href.replace(/\/blob\/[\w-]+\//, `/blob/${commitIsh}/`);


			copy_on_y___WEBPACK_IMPORTED_MODULE_0_copy_text_to_clipboard___default()(uri);
		}
	};

	var copy_on_y_defaultExport = {
		setup: () => {
			window.addEventListener('keyup', handler);
		},
		destroy: () => {
			window.removeEventListener('keyup', handler);
		}
	},
	    utils___WEBPACK_IMPORTED_MODULE_0_select_dom__ = __webpack_require__(0),
	    utils___WEBPACK_IMPORTED_MODULE_0_select_dom___default = __webpack_require__.n(utils___WEBPACK_IMPORTED_MODULE_0_select_dom__),
	    __WEBPACK_IMPORTED_MODULE_1_element_ready__ = __webpack_require__(3),
	    __WEBPACK_IMPORTED_MODULE_1_element_ready___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_element_ready__),
	    __WEBPACK_IMPORTED_MODULE_2_dom_loaded__ = __webpack_require__(7),
	    __WEBPACK_IMPORTED_MODULE_2_dom_loaded___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_dom_loaded__);


	const getUsername = () => utils___WEBPACK_IMPORTED_MODULE_0_select_dom___default()('meta[name="user-login"]').getAttribute('content'),
	      groupBy = (array, grouper) => array.reduce((map, item) => {
		const key = grouper(item);
		map[key] = map[key] || [];
		map[key].push(item);
		return map;
	}, {}),
	      emptyElement = element => {
		while (element.firstChild) {
			element.firstChild.remove();
		}
	},
	      safeElementReady = selector => {
		const waiting = __WEBPACK_IMPORTED_MODULE_1_element_ready___default()(selector);
		__WEBPACK_IMPORTED_MODULE_2_dom_loaded___default.a.then(() => requestAnimationFrame(() => waiting.cancel()));
		return waiting;
	},
	      observeEl = (el, listener, options = { childList: !0 }) => {
		if ('string' == typeof el) {
			el = utils___WEBPACK_IMPORTED_MODULE_0_select_dom___default()(el);
		}

		listener([]);

		return new MutationObserver(listener).observe(el, options);
	};

	var reactions_avatars___WEBPACK_IMPORTED_MODULE_0_dom_chef__ = __webpack_require__(1),
	    reactions_avatars___WEBPACK_IMPORTED_MODULE_0_dom_chef___default = __webpack_require__.n(reactions_avatars___WEBPACK_IMPORTED_MODULE_0_dom_chef__);


	function add(currentUser) {
		$('.comment-reactions.has-reactions').each((index, reactionsContainer) => {
			const $reactionsContainer = $(reactionsContainer),
			      $reactionButtons = $reactionsContainer.find('.comment-reactions-options .reaction-summary-item[aria-label]');


			$reactionButtons.each((index, element) => {
				const $element = $(element),
				      participantCount = +$element.html().split('/g-emoji>')[1],
				      participants = $element.attr('aria-label').replace(/ reacted with.*/, '').replace(/,? and /, ', ').replace(/, \d+ more/, '').split(', '),
				      userPosition = participants.indexOf(currentUser);

				if (1 == participantCount && -1 < userPosition) {
					return;
				}

				if (!element.querySelector('div.participants-container')) {
					element.append(Object(reactions_avatars___WEBPACK_IMPORTED_MODULE_0_dom_chef__.h)('div', {
						class: 'participants-container'
					}));
				}

				if (-1 < userPosition) {
					participants.splice(userPosition, 1);
				}

				const firstThreeParticipants = participants.slice(0, 3),
				      participantsContainer = element.querySelector('.participants-container');

				emptyElement(participantsContainer);

				for (const participant of firstThreeParticipants) {
					participantsContainer.append(Object(reactions_avatars___WEBPACK_IMPORTED_MODULE_0_dom_chef__.h)('a', { href: `/${participant}` }, Object(reactions_avatars___WEBPACK_IMPORTED_MODULE_0_dom_chef__.h)('img', { src: `/${participant}.png` })));
				}
			});
		});
	}

	function reapply(event, currentUser) {
		if (0 === $(event.target).closest('.add-reactions-options-item, .reaction-summary-item').not('.add-reaction-btn').length) {
			return;
		}

		const applyReactions = setInterval(() => {
			add(currentUser);
			clearInterval(applyReactions);
		}, 500);
	}

	var reactions_avatars_defaultExport = {
		add,
		reapply,
		addListener: function (currentUser) {
			$(document).on('click', event => {
				reapply(event, currentUser);
			});
		}
	},
	    domify_defaultExport = html => {
		const template = document.createElement('template');
		template.innerHTML = html;

		const fragment = template.content;

		if (fragment.firstChild === fragment.lastChild) {
			return fragment.firstChild;
		}

		return fragment;
	},
	    show_names___WEBPACK_IMPORTED_MODULE_0_select_dom__ = __webpack_require__(0),
	    show_names___WEBPACK_IMPORTED_MODULE_0_select_dom___default = __webpack_require__.n(show_names___WEBPACK_IMPORTED_MODULE_0_select_dom__);


	const storageKey = 'cachedNames',
	      getCachedUsers = () => {
		return new Promise(resolve => chrome.storage.local.get(storageKey, resolve));
	},
	      fetchName = async username => {
		const pageHTML = await fetch(`${location.origin}/${username}/following`).then(res => res.text()),
		      el = domify_defaultExport(pageHTML).querySelector('h1 strong'),
		      fullname = el && el.textContent.slice(1, -1);

		if (!fullname || fullname === username) {
			return !1;
		}
		return fullname;
	};

	var show_names_defaultExport = async () => {
		const myUsername = getUsername(),
		      cache = (await getCachedUsers())[storageKey] || {},
		      selector = `.js-discussion .author:not(.refined-github-fullname)`,
		      usersOnPage = groupBy(show_names___WEBPACK_IMPORTED_MODULE_0_select_dom___default.a.all(selector), el => el.textContent),
		      fetches = Object.keys(usersOnPage).map(async username => {
			if ('undefined' == typeof cache[username] && username !== myUsername) {
				cache[username] = await fetchName(username);
			}

			for (const usernameEl of usersOnPage[username]) {
				const commentedNode = usernameEl.parentNode.nextSibling;
				if (commentedNode && commentedNode.textContent.includes('commented')) {
					commentedNode.remove();
				}

				usernameEl.classList.add('refined-github-fullname');

				if (cache[username] && username !== myUsername) {
					const insertionPoint = 'STRONG' === usernameEl.parentNode.tagName ? usernameEl.parentNode : usernameEl;
					insertionPoint.insertAdjacentText('afterend', ` (${cache[username]}) `);
				}
			}
		});

		await Promise.all(fetches);

		chrome.storage.local.set({ [storageKey]: cache });
	},
	    copy_file_path___WEBPACK_IMPORTED_MODULE_0_select_dom__ = __webpack_require__(0),
	    copy_file_path___WEBPACK_IMPORTED_MODULE_0_select_dom___default = __webpack_require__.n(copy_file_path___WEBPACK_IMPORTED_MODULE_0_select_dom__),
	    __WEBPACK_IMPORTED_MODULE_1_dom_chef__ = __webpack_require__(1),
	    __WEBPACK_IMPORTED_MODULE_1_dom_chef___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_dom_chef__);


	function addFilePathCopyBtn() {
		for (const file of copy_file_path___WEBPACK_IMPORTED_MODULE_0_select_dom___default.a.all('#files .file-header:not(.rgh-copy-file-path)')) {
			file.classList.add('rgh-copy-file-path', 'js-zeroclipboard-container');

			copy_file_path___WEBPACK_IMPORTED_MODULE_0_select_dom___default()('.file-info a', file).classList.add('js-zeroclipboard-target');

			const viewButton = copy_file_path___WEBPACK_IMPORTED_MODULE_0_select_dom___default()('[aria-label^="View"]', file);
			viewButton.classList.add('BtnGroup-item');
			viewButton.replaceWith(Object(__WEBPACK_IMPORTED_MODULE_1_dom_chef__.h)('div', {
				class: 'BtnGroup'
			}, Object(__WEBPACK_IMPORTED_MODULE_1_dom_chef__.h)('button', { "aria-label": 'Copy file path to clipboard', class: 'js-zeroclipboard btn btn-sm BtnGroup-item tooltipped tooltipped-s', "data-copied-hint": 'Copied!', type: 'button' }, 'Copy path'), viewButton));
		}
	}

	var copy_file_path_defaultExport = () => {
		observeEl('#files', addFilePathCopyBtn, { childList: !0, subtree: !0 });
	},
	    copy_file___WEBPACK_IMPORTED_MODULE_0_copy_text_to_clipboard__ = __webpack_require__(2),
	    copy_file___WEBPACK_IMPORTED_MODULE_0_copy_text_to_clipboard___default = __webpack_require__.n(copy_file___WEBPACK_IMPORTED_MODULE_0_copy_text_to_clipboard__),
	    copy_file___WEBPACK_IMPORTED_MODULE_1_select_dom__ = __webpack_require__(0),
	    copy_file___WEBPACK_IMPORTED_MODULE_1_select_dom___default = __webpack_require__.n(copy_file___WEBPACK_IMPORTED_MODULE_1_select_dom__),
	    copy_file___WEBPACK_IMPORTED_MODULE_2_dom_chef__ = __webpack_require__(1),
	    copy_file___WEBPACK_IMPORTED_MODULE_2_dom_chef___default = __webpack_require__.n(copy_file___WEBPACK_IMPORTED_MODULE_2_dom_chef__),
	    copy_file_defaultExport = () => {
		if (copy_file___WEBPACK_IMPORTED_MODULE_1_select_dom___default.a.exists('.copy-btn') || !copy_file___WEBPACK_IMPORTED_MODULE_1_select_dom___default.a.exists('[data-line-number="1"]')) {
			return;
		}

		const targetSibling = copy_file___WEBPACK_IMPORTED_MODULE_1_select_dom___default()('#raw-url'),
		      fileUri = targetSibling.getAttribute('href');

		targetSibling.insertAdjacentElement('beforeBegin', Object(copy_file___WEBPACK_IMPORTED_MODULE_2_dom_chef__.h)('a', { href: fileUri, class: 'btn btn-sm BtnGroup-item copy-btn' }, 'Copy'));

		$(document).on('click', '.copy-btn', e => {
			e.preventDefault();
			const fileContents = copy_file___WEBPACK_IMPORTED_MODULE_1_select_dom___default()('.js-file-line-container').innerText;
			copy_file___WEBPACK_IMPORTED_MODULE_0_copy_text_to_clipboard___default()(fileContents);
		});
	},
	    __WEBPACK_IMPORTED_MODULE_0_to_markdown__ = __webpack_require__(29),
	    __WEBPACK_IMPORTED_MODULE_0_to_markdown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_to_markdown__),
	    __WEBPACK_IMPORTED_MODULE_1_copy_text_to_clipboard__ = __webpack_require__(2),
	    __WEBPACK_IMPORTED_MODULE_1_copy_text_to_clipboard___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_copy_text_to_clipboard__);


	const unwrapContent = content => content,
	      unshortenRegex = /^https:[/][/](www[.])?|[/]$/g,
	      converters = [{
		filter: node => node.matches('g-emoji,.handle,input.task-list-item-checkbox'),
		replacement: unwrapContent
	}, {
		filter: node => node.matches('.commit-link,.issue-link') || node.href && node.href.replace(unshortenRegex, '') === node.textContent,
		replacement: (content, element) => element.href
	}, {
		filter: node => 'A' === node.tagName && 1 === node.childNodes.length && 'IMG' === node.firstChild.tagName && node.firstChild.src === node.href,
		replacement: unwrapContent
	}, {
		filter: node => node.matches('img[width],img[height],img[align]'),
		replacement: (content, element) => element.outerHTML
	}],
	      getSmarterMarkdown = html => __WEBPACK_IMPORTED_MODULE_0_to_markdown___default()(html, {
		converters,
		gfm: !0
	});
	var copy_markdown_defaultExport = event => {
		const selection = window.getSelection(),
		      range = selection.getRangeAt(0),
		      container = range.commonAncestorContainer,
		      containerEl = container.closest ? container : container.parentNode;

		if (containerEl.closest('pre') || containerEl.querySelector('.markdown-body')) {
			return;
		}

		const holder = document.createElement('div');
		holder.append(range.cloneContents());

		if ('LI' === holder.firstChild.tagName) {
			const list = document.createElement(containerEl.tagName);
			try {
				const originalLi = range.startContainer.parentNode.closest('li');
				list.start = containerEl.start + [...containerEl.children].indexOf(originalLi);
			} catch (err) {}
			list.append(...holder.childNodes);
			holder.appendChild(list);
		}

		const markdown = getSmarterMarkdown(holder.innerHTML);

		__WEBPACK_IMPORTED_MODULE_1_copy_text_to_clipboard___default()(markdown);

		event.stopImmediatePropagation();
		event.preventDefault();
	},
	    get_text_nodes_defaultExport = el => {
		const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT),
		      next = () => {
			const value = walker.nextNode();
			return {
				value,
				done: !value
			};
		};

		walker[Symbol.iterator] = () => ({ next });
		return walker;
	},
	    linkify_urls_in_code___WEBPACK_IMPORTED_MODULE_0_select_dom__ = __webpack_require__(0),
	    linkify_urls_in_code___WEBPACK_IMPORTED_MODULE_0_select_dom___default = __webpack_require__.n(linkify_urls_in_code___WEBPACK_IMPORTED_MODULE_0_select_dom__),
	    __WEBPACK_IMPORTED_MODULE_1_linkify_urls__ = __webpack_require__(37),
	    __WEBPACK_IMPORTED_MODULE_1_linkify_urls___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_linkify_urls__),
	    __WEBPACK_IMPORTED_MODULE_2_linkify_issues__ = __webpack_require__(5),
	    __WEBPACK_IMPORTED_MODULE_2_linkify_issues___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_linkify_issues__);


	const linkifiedURLClass = 'refined-github-linkified-code',
	      {
		ownerName: linkify_urls_in_code_ownerName,
		repoName: linkify_urls_in_code_repoName
	} = getOwnerAndRepo(),
	      linkify_urls_in_code_options = {
		user: linkify_urls_in_code_ownerName,
		repo: linkify_urls_in_code_repoName,
		type: 'dom',
		attrs: {
			target: '_blank'
		}
	},
	      editTextNodes = (fn, el) => {
		for (const textNode of [...get_text_nodes_defaultExport(el)]) {
			if (fn === __WEBPACK_IMPORTED_MODULE_1_linkify_urls___default.a && 11 > textNode.textContent.length) {
				continue;
			}
			const linkified = fn(textNode.textContent, linkify_urls_in_code_options);
			if (0 < linkified.children.length) {
				textNode.replaceWith(linkified);
			}
		}
	};
	var linkify_urls_in_code_defaultExport = () => {
		const wrappers = linkify_urls_in_code___WEBPACK_IMPORTED_MODULE_0_select_dom___default.a.all(`.highlight:not(.${linkifiedURLClass})`);

		if (0 === wrappers.length) {
			return;
		}

		for (const el of linkify_urls_in_code___WEBPACK_IMPORTED_MODULE_0_select_dom___default.a.all('.blob-code-inner, pre', wrappers)) {
			editTextNodes(__WEBPACK_IMPORTED_MODULE_1_linkify_urls___default.a, el);
		}

		for (const el of linkify_urls_in_code___WEBPACK_IMPORTED_MODULE_0_select_dom___default.a.all('span.pl-c', wrappers)) {
			editTextNodes(__WEBPACK_IMPORTED_MODULE_2_linkify_issues___default.a, el);
		}

		for (const el of wrappers) {
			el.classList.add(linkifiedURLClass);
		}
	};

	const callbacks = new Set(),
	      observer = new MutationObserver(records => {
		for (const cb of callbacks) {
			cb(records, observer);
		}
	});
	var on_feed_update_defaultExport = {
		on(cb) {
			if ('function' != typeof cb) {
				throw new TypeError('cb must be a function');
			}
			if (0 === callbacks.size) {
				observer.observe(document.querySelector('#dashboard .news'), {
					childList: !0
				});
			}
			callbacks.add(cb);
		},
		off(cb) {
			if ('function' != typeof cb) {
				throw new TypeError('cb must be a function');
			}
			callbacks.delete(cb);
			if (0 === callbacks.size) {
				observer.disconnect();
			}
		}
	},
	    auto_load_more_news___WEBPACK_IMPORTED_MODULE_0_select_dom__ = __webpack_require__(0),
	    auto_load_more_news___WEBPACK_IMPORTED_MODULE_0_select_dom___default = __webpack_require__.n(auto_load_more_news___WEBPACK_IMPORTED_MODULE_0_select_dom__),
	    __WEBPACK_IMPORTED_MODULE_1_debounce_fn__ = __webpack_require__(8),
	    __WEBPACK_IMPORTED_MODULE_1_debounce_fn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_debounce_fn__);


	let btn;

	const loadMore = __WEBPACK_IMPORTED_MODULE_1_debounce_fn___default()(() => {
		btn.click();

		if (!btn.disabled) {
			loadMore();
		}
	}, { wait: 200 }),
	      IntersectionObserver = window.IntersectionObserver || class {
		maybeLoadMore() {
			if (window.innerHeight > btn.getBoundingClientRect().top - 500) {
				loadMore();
			}
		}
		observe() {
			window.addEventListener('scroll', this.maybeLoadMore);
			window.addEventListener('resize', this.maybeLoadMore);
			this.maybeLoadMore();
		}
		disconnect() {
			window.removeEventListener('scroll', this.maybeLoadMore);
			window.removeEventListener('resize', this.maybeLoadMore);
		}
	},
	      inView = new IntersectionObserver(([{ isIntersecting }]) => {
		if (isIntersecting) {
			loadMore();
		}
	}, {
		rootMargin: '500px' }),
	      findButton = () => {
		if (btn && document.contains(btn)) {
			return;
		}

		inView.disconnect();

		btn = auto_load_more_news___WEBPACK_IMPORTED_MODULE_0_select_dom___default()('.ajax-pagination-btn');
		if (btn) {
			inView.observe(btn);
		} else {
			on_feed_update_defaultExport.off(findButton);
		}
	};

	var auto_load_more_news_defaultExport = () => {
		const form = auto_load_more_news___WEBPACK_IMPORTED_MODULE_0_select_dom___default()('.ajax-pagination-form');
		if (form) {
			form.addEventListener('submit', e => e.preventDefault());

			on_feed_update_defaultExport.on(findButton);
			findButton();
		}
	},
	    op_labels___WEBPACK_IMPORTED_MODULE_0_select_dom__ = __webpack_require__(0),
	    op_labels___WEBPACK_IMPORTED_MODULE_0_select_dom___default = __webpack_require__.n(op_labels___WEBPACK_IMPORTED_MODULE_0_select_dom__),
	    op_labels___WEBPACK_IMPORTED_MODULE_1_dom_chef__ = __webpack_require__(1),
	    op_labels___WEBPACK_IMPORTED_MODULE_1_dom_chef___default = __webpack_require__.n(op_labels___WEBPACK_IMPORTED_MODULE_1_dom_chef__),
	    op_labels_defaultExport = () => {
		let op;
		if (isPR()) {
			const titleRegex = /^(?:.+) by (\S+) · Pull Request #(\d+)/;
			[, op] = titleRegex.exec(document.title) || [];
		} else {
			op = op_labels___WEBPACK_IMPORTED_MODULE_0_select_dom___default()('.timeline-comment-header-text .author').textContent;
		}

		let newComments = $(`.js-comment:not(.refined-github-op)`).has(`strong .author[href="/${op}"]`).get();

		if (!isPRFiles()) {
			newComments = newComments.slice(1);
		}

		if (0 === newComments.length) {
			return;
		}

		const type = isPR() ? 'pull request' : 'issue',
		      tooltip = `${op === getUsername() ? 'You' : 'This user'} submitted this ${type}.`,
		      placeholders = op_labels___WEBPACK_IMPORTED_MODULE_0_select_dom___default.a.all(`
		.timeline-comment .timeline-comment-header-text,
		.review-comment .comment-body
	`, newComments);


		for (const placeholder of placeholders) {
			placeholder.insertAdjacentElement('beforeBegin', Object(op_labels___WEBPACK_IMPORTED_MODULE_1_dom_chef__.h)('span', { class: 'timeline-comment-label tooltipped tooltipped-multiline tooltipped-s', "aria-label": tooltip }, 'Original\xA0Poster'));
		}

		for (const el of newComments) {
			el.classList.add('refined-github-op');
		}
	},
	    __WEBPACK_IMPORTED_MODULE_0_element_ready__ = __webpack_require__(3),
	    __WEBPACK_IMPORTED_MODULE_0_element_ready___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_element_ready__),
	    __WEBPACK_IMPORTED_MODULE_1_github_injection__ = __webpack_require__(4),
	    __WEBPACK_IMPORTED_MODULE_1_github_injection___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_github_injection__),
	    __WEBPACK_IMPORTED_MODULE_2_shorten_repo_url__ = __webpack_require__(11),
	    __WEBPACK_IMPORTED_MODULE_2_shorten_repo_url___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_shorten_repo_url__),
	    __WEBPACK_IMPORTED_MODULE_3_to_semver__ = __webpack_require__(14),
	    __WEBPACK_IMPORTED_MODULE_3_to_semver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_to_semver__),
	    __WEBPACK_IMPORTED_MODULE_4_linkify_issues__ = __webpack_require__(5),
	    __WEBPACK_IMPORTED_MODULE_4_linkify_issues___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_linkify_issues__),
	    __WEBPACK_IMPORTED_MODULE_5_select_dom__ = __webpack_require__(0),
	    __WEBPACK_IMPORTED_MODULE_5_select_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_select_dom__),
	    __WEBPACK_IMPORTED_MODULE_6_dom_loaded__ = __webpack_require__(7),
	    __WEBPACK_IMPORTED_MODULE_6_dom_loaded___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_dom_loaded__),
	    __WEBPACK_IMPORTED_MODULE_7_dom_chef__ = __webpack_require__(1),
	    __WEBPACK_IMPORTED_MODULE_7_dom_chef___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_dom_chef__);

	window.$ = $;
	window.select = __WEBPACK_IMPORTED_MODULE_5_select_dom___default.a;

	const repoUrl = (() => location.pathname.slice(1).split('/', 2).join('/'))();

	function linkifyBranchRefs() {
		let deletedBranch = !1;
		const lastBranchAction = __WEBPACK_IMPORTED_MODULE_5_select_dom___default.a.all(`
		.discussion-item-head_ref_deleted .head-ref,
		.discussion-item-head_ref_restored .head-ref
	`).pop();
		if (lastBranchAction && lastBranchAction.closest('.discussion-item-head_ref_deleted')) {
			deletedBranch = lastBranchAction.title;
		}

		for (const el of __WEBPACK_IMPORTED_MODULE_5_select_dom___default.a.all('.commit-ref[title], .base-ref[title], .head-ref[title]')) {
			if ('unknown repository' === el.textContent) {
				continue;
			}

			if (el.title === deletedBranch) {
				el.title = 'Deleted: ' + el.title;
				el.style.textDecoration = 'line-through';
				continue;
			}

			const branchUrl = '/' + el.title.replace(':', '/tree/');
			$(el).closest('.commit-ref').wrap(Object(__WEBPACK_IMPORTED_MODULE_7_dom_chef__.h)('a', { href: branchUrl }));
		}
	}

	function appendReleasesCount(count) {
		if (!count) {
			return;
		}

		__WEBPACK_IMPORTED_MODULE_5_select_dom___default()('.reponav-releases').append(Object(__WEBPACK_IMPORTED_MODULE_7_dom_chef__.h)('span', {
			class: 'Counter'
		}, count));
	}

	function cacheReleasesCount() {
		const releasesCountCacheKey = `${repoUrl}-releases-count`;

		if (isRepoRoot()) {
			const releasesCount = __WEBPACK_IMPORTED_MODULE_5_select_dom___default()('.numbers-summary a[href$="/releases"] .num').textContent.trim();
			appendReleasesCount(releasesCount);
			localStorage.setItem([releasesCountCacheKey], JSON.stringify(releasesCount));
		} else {
			try {
				appendReleasesCount(JSON.parse(localStorage.getItem(releasesCountCacheKey)));
			} catch (err) {}
		}
	}

	function addCompareLink() {
		if (__WEBPACK_IMPORTED_MODULE_5_select_dom___default.a.exists('.refined-github-compare-tab')) {
			return;
		}

		__WEBPACK_IMPORTED_MODULE_5_select_dom___default()('.reponav-dropdown .dropdown-menu').prepend(Object(__WEBPACK_IMPORTED_MODULE_7_dom_chef__.h)('a', { href: `/${repoUrl}/compare`, class: 'dropdown-item refined-github-compare-tab', "data-skip-pjax": !0 }, darkCompare, Object(__WEBPACK_IMPORTED_MODULE_7_dom_chef__.h)('span', { itemprop: 'name' }, ' Compare')));
	}

	function renameInsightsDropdown() {
		const dropdown = __WEBPACK_IMPORTED_MODULE_5_select_dom___default()('.reponav-item.reponav-dropdown');
		if (dropdown) {
			dropdown.firstChild.textContent = 'More ';
		} else {
			const moreDropdown = Object(__WEBPACK_IMPORTED_MODULE_7_dom_chef__.h)('div', {
				class: 'reponav-dropdown js-menu-container'
			}, Object(__WEBPACK_IMPORTED_MODULE_7_dom_chef__.h)('button', { type: 'button', class: 'btn-link reponav-item reponav-dropdown js-menu-target ', "data-no-toggle": '', "aria-expanded": 'false', "aria-haspopup": 'true' }, 'More ', Object(__WEBPACK_IMPORTED_MODULE_7_dom_chef__.h)('svg', { "aria-hidden": 'true', class: 'octicon octicon-triangle-down v-align-middle text-y', height: '11', version: '1.1', viewBox: '0 0 12 16', width: '8' }, Object(__WEBPACK_IMPORTED_MODULE_7_dom_chef__.h)('path', { "fill-rule": 'evenodd', d: 'M0 5l6 6 6-6z' }))), Object(__WEBPACK_IMPORTED_MODULE_7_dom_chef__.h)('div', {
				class: 'dropdown-menu-content js-menu-content'
			}, Object(__WEBPACK_IMPORTED_MODULE_7_dom_chef__.h)('div', {
				class: 'dropdown-menu dropdown-menu-sw'
			}))),
			      settingsTab = __WEBPACK_IMPORTED_MODULE_5_select_dom___default()('[data-selected-links~="repo_settings"]');

			if (settingsTab) {
				settingsTab.parentNode.insertBefore(moreDropdown, settingsTab);
			} else {
				__WEBPACK_IMPORTED_MODULE_5_select_dom___default()('.reponav').appendChild(moreDropdown);
			}
		}
	}

	function hideEmptyMeta() {
		if (isRepoRoot()) {
			const meta = __WEBPACK_IMPORTED_MODULE_5_select_dom___default()('.repository-meta');
			if (__WEBPACK_IMPORTED_MODULE_5_select_dom___default.a.exists('em', meta) && !__WEBPACK_IMPORTED_MODULE_5_select_dom___default.a.exists('.js-edit-repo-meta-button')) {
				meta.style.display = 'none';
			}
		}
	}

	function moveMarketplaceLinkToProfileDropdown() {
		const thirdDropdownItem = __WEBPACK_IMPORTED_MODULE_5_select_dom___default()('.dropdown-item[href="/explore"]'),
		      marketplaceLink = Object(__WEBPACK_IMPORTED_MODULE_7_dom_chef__.h)('a', { class: 'dropdown-item', href: '/marketplace' }, 'Marketplace');

		thirdDropdownItem.insertAdjacentElement('afterend', marketplaceLink);
	}

	function addReleasesTab() {
		if (__WEBPACK_IMPORTED_MODULE_5_select_dom___default.a.exists('.reponav-releases')) {
			return;
		}

		const releasesTab = Object(__WEBPACK_IMPORTED_MODULE_7_dom_chef__.h)('a', { href: `/${repoUrl}/releases`, class: 'reponav-item reponav-releases', "data-hotkey": 'g r', "data-selected-links": `repo_releases /${repoUrl}/releases` }, tag, Object(__WEBPACK_IMPORTED_MODULE_7_dom_chef__.h)('span', null, ' Releases '));

		__WEBPACK_IMPORTED_MODULE_5_select_dom___default()('.reponav-dropdown, [data-selected-links~="repo_settings"]').insertAdjacentElement('beforeBegin', releasesTab);

		cacheReleasesCount();

		if (isReleases()) {
			releasesTab.classList.add('js-selected-navigation-item', 'selected');
			__WEBPACK_IMPORTED_MODULE_5_select_dom___default()('.reponav-item.selected').classList.remove('js-selected-navigation-item', 'selected');
		}
	}

	async function addTrendingMenuItem() {
		const secondListItem = await __WEBPACK_IMPORTED_MODULE_0_element_ready___default()('.header-nav.float-left .header-nav-item:nth-child(2)');

		secondListItem.insertAdjacentElement('afterEnd', Object(__WEBPACK_IMPORTED_MODULE_7_dom_chef__.h)('li', {
			class: 'header-nav-item'
		}, Object(__WEBPACK_IMPORTED_MODULE_7_dom_chef__.h)('a', { href: '/trending', class: 'header-nav-link', "data-hotkey": 'g t' }, 'Trending')));
	}

	function addYoursMenuItem() {
		const pageName = isIssueSearch() ? 'issues' : 'pulls',
		      username = getUsername();


		if (__WEBPACK_IMPORTED_MODULE_5_select_dom___default.a.exists('.refined-github-yours')) {
			return;
		}

		const yoursMenuItem = Object(__WEBPACK_IMPORTED_MODULE_7_dom_chef__.h)('a', { href: `/${pageName}?q=is%3Aopen+is%3Aissue+user%3A${username}`, class: 'subnav-item refined-github-yours' }, 'Yours');

		if (!__WEBPACK_IMPORTED_MODULE_5_select_dom___default.a.exists('.subnav-links .selected') && location.search.includes(`user%3A${username}`)) {
			yoursMenuItem.classList.add('selected');
		}

		__WEBPACK_IMPORTED_MODULE_5_select_dom___default()('.subnav-links').append(yoursMenuItem);
	}

	function addReadmeButtons() {
		const readmeContainer = __WEBPACK_IMPORTED_MODULE_5_select_dom___default()('.repository-content > #readme');
		if (!readmeContainer) {
			return;
		}

		const buttons = Object(__WEBPACK_IMPORTED_MODULE_7_dom_chef__.h)('div', { id: 'refined-github-readme-buttons' }),
		      tags = __WEBPACK_IMPORTED_MODULE_5_select_dom___default.a.all('.branch-select-menu [data-tab-filter="tags"] .select-menu-item').map(element => [element.getAttribute('data-name'), element.getAttribute('href')]),
		      releases = new Map(tags),
		      [latestRelease] = __WEBPACK_IMPORTED_MODULE_3_to_semver___default()([...releases.keys()], { clean: !1 });

		if (latestRelease) {
			buttons.appendChild(Object(__WEBPACK_IMPORTED_MODULE_7_dom_chef__.h)('a', {
				class: 'tooltipped tooltipped-nw',
				href: `${releases.get(latestRelease)}#readme`,
				"aria-label": `View this file at the latest version (${latestRelease})` }, tag));
		}

		if ('Branch:' === __WEBPACK_IMPORTED_MODULE_5_select_dom___default()('.branch-select-menu i').textContent) {
			const readmeName = __WEBPACK_IMPORTED_MODULE_5_select_dom___default()('#readme > h3').textContent.trim(),
			      path = __WEBPACK_IMPORTED_MODULE_5_select_dom___default()('.breadcrumb').textContent.trim().split('/').slice(1).join('/'),
			      currentBranch = __WEBPACK_IMPORTED_MODULE_5_select_dom___default()('.branch-select-menu .select-menu-item.selected').textContent.trim();

			buttons.appendChild(Object(__WEBPACK_IMPORTED_MODULE_7_dom_chef__.h)('a', {
				href: `/${repoUrl}/edit/${currentBranch}/${path}${readmeName}`,
				class: 'tooltipped tooltipped-nw',
				"aria-label": 'Edit this file' }, edit));
		}

		readmeContainer.appendChild(buttons);
	}

	function addDeleteForkLink() {
		const postMergeDescription = __WEBPACK_IMPORTED_MODULE_5_select_dom___default()('#partial-pull-merging .merge-branch-description');

		if (postMergeDescription) {
			const currentBranch = postMergeDescription.querySelector('.commit-ref.current-branch'),
			      forkPath = currentBranch ? currentBranch.title.split(':')[0] : null;


			if (forkPath && forkPath !== repoUrl) {
				postMergeDescription.append(Object(__WEBPACK_IMPORTED_MODULE_7_dom_chef__.h)('p', { id: 'refined-github-delete-fork-link' }, Object(__WEBPACK_IMPORTED_MODULE_7_dom_chef__.h)('a', { href: `/${forkPath}/settings` }, fork, 'Delete fork')));
			}
		}
	}

	function linkifyIssuesInTitles() {
		observeEl(__WEBPACK_IMPORTED_MODULE_5_select_dom___default()('#partial-discussion-header').parentNode, () => {
			const title = __WEBPACK_IMPORTED_MODULE_5_select_dom___default()('.js-issue-title:not(.refined-linkified-title)');
			if (title) {
				title.classList.add('refined-linkified-title');
				editTextNodes(__WEBPACK_IMPORTED_MODULE_4_linkify_issues___default.a, title);
			}
		});
	}

	function addPatchDiffLinks() {
		if (__WEBPACK_IMPORTED_MODULE_5_select_dom___default.a.exists('.sha-block.patch-diff-links')) {
			return;
		}

		let commitUrl = location.pathname.replace(/\/$/, '');

		if (isPRCommit()) {
			commitUrl = commitUrl.replace(/\/pull\/\d+\/commits/, '/commit');
		}

		__WEBPACK_IMPORTED_MODULE_5_select_dom___default()('.commit-meta span.float-right').append(Object(__WEBPACK_IMPORTED_MODULE_7_dom_chef__.h)('span', {
			class: 'sha-block patch-diff-links'
		}, Object(__WEBPACK_IMPORTED_MODULE_7_dom_chef__.h)('a', { href: `${commitUrl}.patch`, class: 'sha' }, 'patch'), ' ', Object(__WEBPACK_IMPORTED_MODULE_7_dom_chef__.h)('a', { href: `${commitUrl}.diff`, class: 'sha' }, 'diff')));
	}

	function removeSelectableWhiteSpaceFromDiffs() {
		for (const commentBtn of __WEBPACK_IMPORTED_MODULE_5_select_dom___default.a.all('.add-line-comment')) {
			for (const node of commentBtn.childNodes) {
				if (node.nodeType === Node.TEXT_NODE) {
					node.remove();
				}
			}
		}
	}

	function removeDiffSigns() {
		for (const line of __WEBPACK_IMPORTED_MODULE_5_select_dom___default.a.all('tr:not(.refined-github-diff-signs)')) {
			line.classList.add('refined-github-diff-signs');
			for (const code of __WEBPACK_IMPORTED_MODULE_5_select_dom___default.a.all('.blob-code-inner', line)) {
				code.firstChild.textContent = code.firstChild.textContent.slice(1);

				if (0 === code.textContent.length) {
					code.prepend(new Text(' '));
				}
			}
		}
	}

	function removeDiffSignsAndWatchExpansions() {
		removeSelectableWhiteSpaceFromDiffs();
		removeDiffSigns();
		for (const file of $('.diff-table:not(.rgh-watching-lines)').has('.diff-expander')) {
			file.classList.add('rgh-watching-lines');
			observeEl(file.tBodies[0], removeDiffSigns);
		}
	}

	function markMergeCommitsInList() {
		for (const commit of __WEBPACK_IMPORTED_MODULE_5_select_dom___default.a.all('.commits-list-item:not(.refined-github-merge-commit)')) {
			if (__WEBPACK_IMPORTED_MODULE_5_select_dom___default.a.exists('[title^="Merge pull request"]', commit)) {
				commit.classList.add('refined-github-merge-commit');
				commit.querySelector('.commit-avatar-cell').prepend(mergedPullRequest.cloneNode(!0));
				commit.querySelector('.avatar').classList.add('avatar-child');
			}
		}
	}

	function indentInput(el, size = 4) {
		const selection = window.getSelection().toString(),
		      { selectionStart, selectionEnd, value } = el,
		      isMultiLine = /\n/.test(selection),
		      firstLineStart = value.lastIndexOf('\n', selectionStart) + 1;


		el.focus();

		if (isMultiLine) {
			const selectedLines = value.substring(firstLineStart, selectionEnd),
			      indexes = selectedLines.split('\n').map(line => line.length);

			indexes.unshift(firstLineStart);
			indexes.pop();

			for (let i = 1; i < indexes.length; i++) {
				indexes[i] += indexes[i - 1] + 1;
			}

			for (let i = indexes.length - 1; 0 <= i; i--) {
				el.setSelectionRange(indexes[i], indexes[i]);
				document.execCommand('insertText', !1, ' '.repeat(size));
			}

			el.setSelectionRange(selectionStart + size, selectionEnd + size * indexes.length);
		} else {
			document.execCommand('insertText', !1, ' '.repeat(size - (selectionEnd - firstLineStart) % size || size));
		}
	}

	async function showRecentlyPushedBranches() {
		if (__WEBPACK_IMPORTED_MODULE_5_select_dom___default.a.exists('[data-url$=recently_touched_branches_list]')) {
			return;
		}

		const codeTabURL = __WEBPACK_IMPORTED_MODULE_5_select_dom___default()('[data-hotkey="g c"]').href,
		      fragmentURL = `/${repoUrl}/show_partial?partial=tree%2Frecently_touched_branches_list`,
		      html = await fetch(codeTabURL, {
			credentials: 'include'
		}).then(res => res.text());

		if (html.includes(fragmentURL)) {
			__WEBPACK_IMPORTED_MODULE_5_select_dom___default()('.repository-content').prepend(Object(__WEBPACK_IMPORTED_MODULE_7_dom_chef__.h)('include-fragment', { src: fragmentURL }));
		}
	}

	function addDiffViewWithoutWhitespaceOption() {
		const container = __WEBPACK_IMPORTED_MODULE_5_select_dom___default()('.table-of-contents.Details .BtnGroup,.pr-review-tools > .diffbar-item');

		if (!container || __WEBPACK_IMPORTED_MODULE_5_select_dom___default.a.exists('.refined-github-toggle-whitespace')) {
			return;
		}

		const url = new URL(location.href),
		      hidingWhitespace = '1' === url.searchParams.get('w');


		if (hidingWhitespace) {
			url.searchParams.delete('w');
		} else {
			url.searchParams.set('w', 1);
		}

		container.insertAdjacentElement('afterend', Object(__WEBPACK_IMPORTED_MODULE_7_dom_chef__.h)('div', {
			class: 'diffbar-item refined-github-toggle-whitespace'
		}, Object(__WEBPACK_IMPORTED_MODULE_7_dom_chef__.h)('a', { href: url,
			"data-hotkey": 'd w',
			class: `btn btn-sm btn-outline BtnGroup-item tooltipped tooltipped-s ${hidingWhitespace ? 'bg-gray-light text-gray-light' : ''}`,
			"aria-label": `${hidingWhitespace ? 'Show' : 'Hide'} whitespace in diffs` }, hidingWhitespace ? check : '', ' ', 'No Whitespace')));
	}

	function addMilestoneNavigation() {
		__WEBPACK_IMPORTED_MODULE_5_select_dom___default()('.repository-content').insertAdjacentElement('beforeBegin', Object(__WEBPACK_IMPORTED_MODULE_7_dom_chef__.h)('div', {
			class: 'subnav'
		}, Object(__WEBPACK_IMPORTED_MODULE_7_dom_chef__.h)('div', { class: 'subnav-links float-left', role: 'navigation' }, Object(__WEBPACK_IMPORTED_MODULE_7_dom_chef__.h)('a', { href: `/${repoUrl}/labels`, class: 'subnav-item' }, 'Labels'), Object(__WEBPACK_IMPORTED_MODULE_7_dom_chef__.h)('a', { href: `/${repoUrl}/milestones`, class: 'subnav-item' }, 'Milestones'))));
	}

	function addFilterCommentsByYou() {
		if (__WEBPACK_IMPORTED_MODULE_5_select_dom___default.a.exists('.refined-github-filter')) {
			return;
		}
		__WEBPACK_IMPORTED_MODULE_5_select_dom___default()('.subnav-search-context .js-navigation-item:last-child').insertAdjacentElement('beforeBegin', Object(__WEBPACK_IMPORTED_MODULE_7_dom_chef__.h)('a', {
			href: `/${repoUrl}/issues?q=is%3Aopen+commenter:${getUsername()}`,
			class: 'select-menu-item js-navigation-item refined-github-filter' }, Object(__WEBPACK_IMPORTED_MODULE_7_dom_chef__.h)('div', {
			class: 'select-menu-item-text'
		}, 'Everything commented by you')));
	}

	function addProjectNewLink() {
		if (__WEBPACK_IMPORTED_MODULE_5_select_dom___default.a.exists('#projects-feature:checked') && !__WEBPACK_IMPORTED_MODULE_5_select_dom___default.a.exists('#refined-github-project-new-link')) {
			__WEBPACK_IMPORTED_MODULE_5_select_dom___default()(`#projects-feature ~ p.note`).insertAdjacentElement('afterEnd', Object(__WEBPACK_IMPORTED_MODULE_7_dom_chef__.h)('a', { href: `/${repoUrl}/projects/new`, class: 'btn btn-sm', id: 'refined-github-project-new-link' }, 'Add a project'));
		}
	}

	function removeProjectsTab() {
		const projectsTab = __WEBPACK_IMPORTED_MODULE_5_select_dom___default()('.js-repo-nav .reponav-item[data-selected-links^="repo_projects"]');
		if (projectsTab && '0' === projectsTab.querySelector('.Counter, .counter').textContent) {
			projectsTab.remove();
		}
	}

	function fixSquashAndMergeTitle() {
		const btn = __WEBPACK_IMPORTED_MODULE_5_select_dom___default()('.merge-message .btn-group-squash [type=submit]');
		if (!btn) {
			return;
		}
		btn.addEventListener('click', () => {
			const title = __WEBPACK_IMPORTED_MODULE_5_select_dom___default()('.js-issue-title').textContent,
			      number = __WEBPACK_IMPORTED_MODULE_5_select_dom___default()('.gh-header-number').textContent;

			__WEBPACK_IMPORTED_MODULE_5_select_dom___default()('#merge_title_field').value = `${title.trim()} (${number})`;
		});
	}

	function addTitleToEmojis() {
		for (const emoji of __WEBPACK_IMPORTED_MODULE_5_select_dom___default.a.all('g-emoji')) {
			emoji.setAttribute('title', `:${emoji.getAttribute('alias')}:`);
		}
	}

	function sortMilestonesByClosestDueDate() {
		for (const a of __WEBPACK_IMPORTED_MODULE_5_select_dom___default.a.all('a[href$="/milestones"], a[href*="/milestones?"]')) {
			const url = new URL(a.href);

			if (!url.searchParams.get('direction') && !url.searchParams.get('sort')) {
				url.searchParams.set('direction', 'asc');
				url.searchParams.set('sort', 'due_date');
				a.href = url;
			}
		}
	}

	function moveAccountSwitcherToSidebar() {
		safeElementReady('.dashboard-sidebar').then(sidebar => {
			const switcher = __WEBPACK_IMPORTED_MODULE_5_select_dom___default()('.account-switcher');
			if (switcher) {
				sidebar.prepend(switcher);
			}
		});
	}

	async function onDomReady() {
		await __WEBPACK_IMPORTED_MODULE_6_dom_loaded___default.a;
		const options = safari.extension.settings,
		      username = getUsername();

		mark_unread_defaultExport.setup();

		if (!isGist()) {
			moveMarketplaceLinkToProfileDropdown();
		}

		if (isGist()) {
			copy_gist_defaultExport();
		}

		if (isDashboard()) {
			const hideStarsOwnRepos = () => {
				$('#dashboard .news .watch_started, #dashboard .news .fork').has(`.title a[href^="/${username}"]`).css('display', 'none');
			};

			if (options.hideStarsOwnRepos) {
				hideStarsOwnRepos();
				new MutationObserver(() => hideStarsOwnRepos()).observe(__WEBPACK_IMPORTED_MODULE_5_select_dom___default()('#dashboard .news'), { childList: !0 });
			}

			auto_load_more_news_defaultExport();
		}

		upload_button_defaultExport();
		new MutationObserver(upload_button_defaultExport).observe(__WEBPACK_IMPORTED_MODULE_5_select_dom___default()('div[role=main]'), { childList: !0, subtree: !0 });

		if (isIssueSearch() || isPRSearch()) {
			addYoursMenuItem();
		}

		if (isRepo()) {
			__WEBPACK_IMPORTED_MODULE_1_github_injection___default()(window, () => {
				hideEmptyMeta();
				renameInsightsDropdown();
				addReleasesTab();
				removeProjectsTab();
				addCompareLink();
				addTitleToEmojis();
				addReadmeButtons();

				for (const a of __WEBPACK_IMPORTED_MODULE_5_select_dom___default.a.all('a[href]')) {
					Object(__WEBPACK_IMPORTED_MODULE_2_shorten_repo_url__.applyToLink)(a, location.href);
				}

				diffheader_defaultExport.destroy();
				copy_on_y_defaultExport.destroy();

				if (isPR()) {
					linkifyBranchRefs();
					addDeleteForkLink();
					fixSquashAndMergeTitle();
				}

				if (isPR() || isIssue()) {
					linkifyIssuesInTitles();
					op_labels_defaultExport();
					new MutationObserver(op_labels_defaultExport).observe(__WEBPACK_IMPORTED_MODULE_5_select_dom___default()('.new-discussion-timeline'), { childList: !0, subtree: !0 });
				}

				if (isPRList() || isIssueList()) {
					addFilterCommentsByYou();
					showRecentlyPushedBranches();
				}

				if (isCommit()) {
					addPatchDiffLinks();
				}

				if (hasDiff()) {
					const diffElements = __WEBPACK_IMPORTED_MODULE_5_select_dom___default()('.js-discussion, #files');
					if (diffElements) {
						observeEl(diffElements, removeDiffSignsAndWatchExpansions, { childList: !0, subtree: !0 });
					}
					addDiffViewWithoutWhitespaceOption();
				}

				if (isPR() || isIssue() || isCommit()) {
					reactions_avatars_defaultExport.add(username);
					reactions_avatars_defaultExport.addListener(username);
					show_names_defaultExport();
				}

				if (isCommitList()) {
					markMergeCommitsInList();
				}

				if (isPRFiles() || isPRCommit()) {
					diffheader_defaultExport.setup();
					copy_file_path_defaultExport();
				}

				if (isSingleFile()) {
					copy_file_defaultExport();
					copy_on_y_defaultExport.setup();
				}

				if (isMilestone()) {
					addMilestoneNavigation();
				}

				if (hasCode()) {
					linkify_urls_in_code_defaultExport();
				}

				if (isRepoSettings()) {
					addProjectNewLink();
				}

				sortMilestonesByClosestDueDate();
			});
		}
	}

	(function () {

		if (__WEBPACK_IMPORTED_MODULE_5_select_dom___default.a.exists('html.refined-github')) {
			console.count('Refined GitHub was loaded multiple times: https://github.com/sindresorhus/refined-github/issues/479');
			return;
		}

		document.documentElement.classList.add('refined-github');

		if (!isGist()) {
			addTrendingMenuItem();
		}

		if (isDashboard()) {
			moveAccountSwitcherToSidebar();
		}

		$(document).on('keydown', '.js-comment-field', event => {
			if (9 === event.which && !event.shiftKey) {
				if ($('.suggester').hasClass('active')) {
					return;
				}

				event.preventDefault();
				indentInput(event.target);
				return !1;
			}
		});

		$(document).on('click', '.js-hide-inline-comment-form', event => {
			const textarea = event.target.closest('.js-inline-comment-form').querySelector('.js-comment-field');
			if ('' === textarea.value) {
				return;
			}

			if (!1 === window.confirm('Are you sure you want to discard your unsaved changes?')) {
				event.stopPropagation();
				event.stopImmediatePropagation();
			}
		});

		$(document).on('pjax:end', () => {
			if (isIssueSearch() || isPRSearch()) {
				addYoursMenuItem();
			}
		});

		$(document).on('copy', '.markdown-body', copy_markdown_defaultExport);

		onDomReady();
	})();
}, function (module) {

	"use strict";

	class CancelError extends Error {
		constructor() {
			super('Promise was canceled');
			this.name = 'CancelError';
		}
	}

	class PCancelable extends Promise {
		static fn(fn) {
			return function () {
				const args = [].slice.apply(arguments);
				return new PCancelable((onCancel, resolve, reject) => {
					args.unshift(onCancel);
					fn.apply(null, args).then(resolve, reject);
				});
			};
		}

		constructor(executor) {
			super(resolve => {
				resolve();
			});

			this._pending = !0;
			this._canceled = !1;

			this._promise = new Promise((resolve, reject) => {
				this._reject = reject;

				return executor(fn => {
					this._cancel = fn;
				}, val => {
					this._pending = !1;
					resolve(val);
				}, err => {
					this._pending = !1;
					reject(err);
				});
			});
		}

		then() {
			return this._promise.then.apply(this._promise, arguments);
		}

		catch() {
			return this._promise.catch.apply(this._promise, arguments);
		}

		cancel() {
			if (!this._pending || this._canceled) {
				return;
			}

			if ('function' == typeof this._cancel) {
				try {
					this._cancel();
				} catch (err) {
					this._reject(err);
				}
			}

			this._canceled = !0;
			this._reject(new CancelError());
		}

		get canceled() {
			return this._canceled;
		}
	}

	module.exports = PCancelable;
	module.exports.CancelError = CancelError;
}, function (module, exports, __webpack_require__) {

	const { URL } = __webpack_require__(12),
	      reservedPaths = __webpack_require__(13),
	      patchDiffRegex = /[.](patch|diff)$/,
	      releaseRegex = /releases[/]tag[/]([^/]+)/,
	      labelRegex = /labels[/]([^/]+)/,
	      releaseArchiveRegex = /archive[/](.+)([.]zip|[.]tar[.]gz)/,
	      releaseDownloadRegex = /releases[/]download[/]([^/]+)[/](.+)/;


	function styleRevision(revision) {
		if (!revision) {
			return;
		}
		revision = revision.replace(patchDiffRegex, '');
		if (/^[0-9a-f]{40}$/.test(revision)) {
			revision = revision.substr(0, 7);
		}
		return `<code>${revision}</code>`;
	}

	function joinValues(array, delimiter = '/') {
		return array.filter(s => s).join(delimiter);
	}

	function shortenURL(href, currentUrl = 'https://github.com') {
		if (!href) {
			return;
		}

		currentUrl = new URL(currentUrl);
		const currentRepo = currentUrl.pathname.slice(1).split('/', 2).join('/'),
		      {
			origin,
			pathname,
			search,
			hash
		} = new URL(href),
		      isRaw = ['https://raw.githubusercontent.com', 'https://cdn.rawgit.com', 'https://rawgit.com'].includes(origin);

		let [user, repo, type, revision, ...filePath] = pathname.substr(1).split('/');

		if (isRaw) {
			[user, repo, revision, ...filePath] = pathname.substr(1).split('/');
			type = 'raw';
		}

		revision = styleRevision(revision);
		filePath = filePath.join('/');

		const isLocal = origin === currentUrl.origin,
		      isThisRepo = (isLocal || isRaw) && `${user}/${repo}` === currentRepo,
		      isReserved = reservedPaths.includes(user),
		      [, diffOrPatch] = pathname.match(patchDiffRegex) || [],
		      [, release] = pathname.match(releaseRegex) || [],
		      [, releaseTag, releaseTagExt] = pathname.match(releaseArchiveRegex) || [],
		      [, downloadTag, downloadFilename] = pathname.match(releaseDownloadRegex) || [],
		      [, label] = pathname.match(labelRegex) || [],
		      isFileOrDir = revision && ['raw', 'tree', 'blob', 'blame', 'commits'].includes(type),
		      repoUrl = isThisRepo ? '' : `${user}/${repo}`;


		if (isReserved || '/' === pathname || !isLocal && !isRaw) {
			return href.replace(/^https:[/][/]/, '').replace(/^www[.]/, '').replace(/[/]$/, '');
		}

		if (user && !repo) {
			return `@${user}${search}${hash}`;
		}

		if (isFileOrDir) {
			const file = `${repoUrl}${filePath ? repoUrl ? ':' : '/' : ''}${filePath}`,
			      revisioned = joinValues([file, revision], '@'),
			      partial = `${revisioned}${search}${hash}`;

			if ('blob' !== type && 'tree' !== type) {
				return `${partial} (${type})`;
			}
			return partial;
		}

		if (diffOrPatch) {
			const partial = joinValues([repoUrl, revision], '@');
			return `${partial}.${diffOrPatch}${search}${hash}`;
		}

		if (release) {
			const partial = joinValues([repoUrl, `<code>${release}</code>`], '@');
			return `${partial}${search}${hash} (release)`;
		}

		if (releaseTagExt) {
			const partial = joinValues([repoUrl, `<code>${releaseTag}</code>`], '@');
			return `${partial}${releaseTagExt}${search}${hash}`;
		}

		if (downloadFilename) {
			const partial = joinValues([repoUrl, `<code>${downloadTag}</code>`], '@');
			return `${partial} ${downloadFilename}${search}${hash} (download)`;
		}

		if (label) {
			return joinValues([repoUrl, label]) + `${search}${hash} (label)`;
		}

		return `${pathname.replace(/^[/]|[/]$/g, '')}${search}${hash}`;
	}

	module.exports = shortenURL;
	module.exports.applyToLink = function (a, currentUrl) {
		if (a.href === a.textContent || `${a.textContent}/` === a.href) {
			const shortened = shortenURL(a.href, currentUrl);

			if (shortened !== a.textContent) {
				a.innerHTML = shortened;
				return !0;
			}
		}
		return !1;
	};
}, function (module) {
	module.exports.URL = URL;
}, function (module) {

	module.exports = ['400', '401', '402', '403', '404', '405', '406', '407', '408', '409', '410', '411', '412', '413', '414', '415', '416', '417', '418', '419', '420', '421', '422', '423', '424', '425', '426', '427', '428', '429', '430', '431', '500', '501', '502', '503', '504', '505', '506', '507', '508', '509', '510', '511', 'about', 'access', 'account', 'admin', 'anonymous', 'api', 'apps', 'auth', 'billing', 'blog', 'business', 'cache', 'categories', 'changelog', 'codereview', 'comments', 'community', 'compare', 'contact', 'dashboard', 'design', 'developer', 'docs', 'downloads', 'editor', 'edu', 'enterprise', 'events', 'explore', 'features', 'files', 'gist', 'gists', 'graphs', 'help', 'home', 'hosting', 'images', 'info', 'integrations', 'issues', 'jobs', 'join', 'languages', 'legal', 'linux', 'lists', 'login', 'logout', 'mac', 'maintenance', 'marketplace', 'mine', 'mirrors', 'mobile', 'navigation', 'network', 'new', 'news', 'notifications', 'oauth', 'offer', 'open-source', 'organizations', 'orgs', 'pages', 'payments', 'personal', 'plans', 'plugins', 'popular', 'posts', 'press', 'pricing', 'projects', 'pulls', 'readme', 'releases', 'repositories', 'search', 'security', 'services', 'sessions', 'settings', 'shop', 'showcases', 'signin', 'signup', 'site', 'ssh', 'staff', 'stars', 'static', 'status', 'store', 'stories', 'styleguide', 'subscriptions', 'support', 'talks', 'teams', 'terms', 'tos', 'tour', 'translations', 'trending', 'updates', 'username', 'users', 'watching', 'wiki', 'windows', 'works-with', 'www1', 'www2', 'www3', 'www4', 'www5', 'www6', 'www7', 'www8', 'www9'];
}, function (module, exports, __webpack_require__) {

	"use strict";

	const semver = __webpack_require__(15);

	module.exports = (versions, options) => {
		options = Object.assign({
			includePrereleases: !0,
			clean: !0
		}, options);

		let sortedVersions = versions.filter(x => semver.valid(x)).sort(semver.rcompare);

		if (!options.includePrereleases) {
			sortedVersions = sortedVersions.filter(x => null === semver.prerelease(x));
		}

		if (options.clean) {
			sortedVersions = sortedVersions.map(x => semver.clean(x));
		}

		return sortedVersions;
	};
}, function (module, exports) {

	exports = module.exports = SemVer;

	var debug = function () {},
	    i;

	exports.SEMVER_SPEC_VERSION = '2.0.0';

	var MAX_LENGTH = 256,
	    MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991,
	    re = exports.re = [],
	    src = exports.src = [],
	    R = 0,
	    NUMERICIDENTIFIER = R++;

	src[NUMERICIDENTIFIER] = '0|[1-9]\\d*';
	var NUMERICIDENTIFIERLOOSE = R++;
	src[NUMERICIDENTIFIERLOOSE] = '[0-9]+';

	var NONNUMERICIDENTIFIER = R++;
	src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*';

	var MAINVERSION = R++;
	src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.(' + src[NUMERICIDENTIFIER] + ')\\.(' + src[NUMERICIDENTIFIER] + ')';

	var MAINVERSIONLOOSE = R++;
	src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.(' + src[NUMERICIDENTIFIERLOOSE] + ')';

	var PRERELEASEIDENTIFIER = R++;
	src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] + '|' + src[NONNUMERICIDENTIFIER] + ')';

	var PRERELEASEIDENTIFIERLOOSE = R++;
	src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] + '|' + src[NONNUMERICIDENTIFIER] + ')';

	var PRERELEASE = R++;
	src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] + '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))';

	var PRERELEASELOOSE = R++;
	src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] + '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))';

	var BUILDIDENTIFIER = R++;
	src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+';

	var BUILD = R++;
	src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] + '(?:\\.' + src[BUILDIDENTIFIER] + ')*))';

	var FULL = R++,
	    FULLPLAIN = 'v?' + src[MAINVERSION] + src[PRERELEASE] + '?' + src[BUILD] + '?';


	src[FULL] = '^' + FULLPLAIN + '$';

	var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] + src[PRERELEASELOOSE] + '?' + src[BUILD] + '?',
	    LOOSE = R++;

	src[LOOSE] = '^' + LOOSEPLAIN + '$';

	var GTLT = R++;
	src[GTLT] = '((?:<|>)?=?)';

	var XRANGEIDENTIFIERLOOSE = R++;
	src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*';
	var XRANGEIDENTIFIER = R++;
	src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*';

	var XRANGEPLAIN = R++;
	src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')(?:\\.(' + src[XRANGEIDENTIFIER] + ')(?:\\.(' + src[XRANGEIDENTIFIER] + ')(?:' + src[PRERELEASE] + ')?' + src[BUILD] + '?)?)?';

	var XRANGEPLAINLOOSE = R++;
	src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')(?:' + src[PRERELEASELOOSE] + ')?' + src[BUILD] + '?)?)?';

	var XRANGE = R++;
	src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$';
	var XRANGELOOSE = R++;
	src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$';

	var LONETILDE = R++;
	src[LONETILDE] = '(?:~>?)';

	var TILDETRIM = R++;
	src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+';
	re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g');
	var TILDE = R++;

	src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$';
	var TILDELOOSE = R++;
	src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$';

	var LONECARET = R++;
	src[LONECARET] = '(?:\\^)';

	var CARETTRIM = R++;
	src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+';
	re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g');
	var CARET = R++;

	src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$';
	var CARETLOOSE = R++;
	src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$';

	var COMPARATORLOOSE = R++;
	src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$';
	var COMPARATOR = R++;
	src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$';

	var COMPARATORTRIM = R++;
	src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] + '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')';

	re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g');
	var HYPHENRANGE = R++;

	src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')\\s+-\\s+(' + src[XRANGEPLAIN] + ')\\s*$';

	var HYPHENRANGELOOSE = R++;
	src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')\\s+-\\s+(' + src[XRANGEPLAINLOOSE] + ')\\s*$';

	var STAR = R++;
	src[STAR] = '(<|>)?=?\\s*\\*';

	for (i = 0; i < R; i++) {
		debug(i, src[i]);
		if (!re[i]) re[i] = new RegExp(src[i]);
	}

	exports.parse = parse;
	function parse(version, loose) {
		if (version instanceof SemVer) return version;

		if ('string' != typeof version) return null;

		if (version.length > MAX_LENGTH) return null;

		var r = loose ? re[LOOSE] : re[FULL];
		if (!r.test(version)) return null;

		try {
			return new SemVer(version, loose);
		} catch (er) {
			return null;
		}
	}

	exports.valid = function (version, loose) {
		var v = parse(version, loose);
		return v ? v.version : null;
	};


	exports.clean = function (version, loose) {
		var s = parse(version.trim().replace(/^[=v]+/, ''), loose);
		return s ? s.version : null;
	};


	exports.SemVer = SemVer;

	function SemVer(version, loose) {
		if (version instanceof SemVer) {
			if (version.loose === loose) return version;else version = version.version;
		} else if ('string' != typeof version) {
			throw new TypeError('Invalid Version: ' + version);
		}

		if (version.length > MAX_LENGTH) throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters');

		if (!(this instanceof SemVer)) return new SemVer(version, loose);

		debug('SemVer', version, loose);
		this.loose = loose;
		var m = version.trim().match(loose ? re[LOOSE] : re[FULL]);

		if (!m) throw new TypeError('Invalid Version: ' + version);

		this.raw = version;

		this.major = +m[1];
		this.minor = +m[2];
		this.patch = +m[3];

		if (this.major > MAX_SAFE_INTEGER || 0 > this.major) throw new TypeError('Invalid major version');

		if (this.minor > MAX_SAFE_INTEGER || 0 > this.minor) throw new TypeError('Invalid minor version');

		if (this.patch > MAX_SAFE_INTEGER || 0 > this.patch) throw new TypeError('Invalid patch version');

		if (!m[4]) this.prerelease = [];else this.prerelease = m[4].split('.').map(function (id) {
			var num;

			if (/^[0-9]+$/.test(id)) {
				num = +id;

				if (0 <= num && num < MAX_SAFE_INTEGER) return num;
			}
			return id;
		});

		this.build = m[5] ? m[5].split('.') : [];
		this.format();
	}

	SemVer.prototype.format = function () {
		this.version = this.major + '.' + this.minor + '.' + this.patch;
		if (this.prerelease.length) this.version += '-' + this.prerelease.join('.');
		return this.version;
	};

	SemVer.prototype.toString = function () {
		return this.version;
	};

	SemVer.prototype.compare = function (other) {
		debug('SemVer.compare', this.version, this.loose, other);
		if (!(other instanceof SemVer)) other = new SemVer(other, this.loose);

		return this.compareMain(other) || this.comparePre(other);
	};

	SemVer.prototype.compareMain = function (other) {
		if (!(other instanceof SemVer)) other = new SemVer(other, this.loose);

		return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
	};

	SemVer.prototype.comparePre = function (other) {
		if (!(other instanceof SemVer)) other = new SemVer(other, this.loose);

		if (this.prerelease.length && !other.prerelease.length) return -1;else if (!this.prerelease.length && other.prerelease.length) return 1;else if (!this.prerelease.length && !other.prerelease.length) return 0;

		var i = 0,
		    a,
		    b;
		do {
			a = this.prerelease[i], b = other.prerelease[i];

			debug('prerelease compare', i, a, b);
			if (a === void 0 && b === void 0) return 0;else if (b === void 0) return 1;else if (a === void 0) return -1;else if (a === b) continue;else return compareIdentifiers(a, b);
		} while (++i);
	};

	SemVer.prototype.inc = function (release, identifier) {
		var i;

		switch (release) {
			case 'premajor':
				this.prerelease.length = 0;
				this.patch = 0;
				this.minor = 0;
				this.major++;
				this.inc('pre', identifier);
				break;
			case 'preminor':
				this.prerelease.length = 0;
				this.patch = 0;
				this.minor++;
				this.inc('pre', identifier);
				break;
			case 'prepatch':
				this.prerelease.length = 0;
				this.inc('patch', identifier);
				this.inc('pre', identifier);
				break;

			case 'prerelease':
				if (0 === this.prerelease.length) this.inc('patch', identifier);
				this.inc('pre', identifier);
				break;

			case 'major':
				if (0 !== this.minor || 0 !== this.patch || 0 === this.prerelease.length) this.major++;
				this.minor = 0;
				this.patch = 0;
				this.prerelease = [];
				break;
			case 'minor':
				if (0 !== this.patch || 0 === this.prerelease.length) this.minor++;
				this.patch = 0;
				this.prerelease = [];
				break;
			case 'patch':
				if (0 === this.prerelease.length) this.patch++;
				this.prerelease = [];
				break;

			case 'pre':
				if (0 === this.prerelease.length) this.prerelease = [0];else {
					i = this.prerelease.length;

					while (0 <= --i) {
						if ('number' == typeof this.prerelease[i]) {
							this.prerelease[i]++;
							i = -2;
						}
					}
					if (-1 === i) this.prerelease.push(0);
				}
				if (identifier) {
					if (this.prerelease[0] === identifier) {
						if (isNaN(this.prerelease[1])) this.prerelease = [identifier, 0];
					} else this.prerelease = [identifier, 0];
				}
				break;

			default:
				throw new Error('invalid increment argument: ' + release);
		}
		this.format();
		this.raw = this.version;
		return this;
	};

	exports.inc = function (version, release, loose, identifier) {
		if ('string' == typeof loose) {
			identifier = loose;
			loose = void 0;
		}

		try {
			return new SemVer(version, loose).inc(release, identifier).version;
		} catch (er) {
			return null;
		}
	};


	exports.diff = function (version1, version2) {
		var v1, v2;

		if (eq(version1, version2)) {
			return null;
		} else {
			v1 = parse(version1), v2 = parse(version2);

			if (v1.prerelease.length || v2.prerelease.length) {
				for (var key in v1) {
					if ('major' == key || 'minor' == key || 'patch' == key) {
						if (v1[key] !== v2[key]) {
							return 'pre' + key;
						}
					}
				}
				return 'prerelease';
			}
			for (var key in v1) {
				if ('major' == key || 'minor' == key || 'patch' == key) {
					if (v1[key] !== v2[key]) {
						return key;
					}
				}
			}
		}
	};


	exports.compareIdentifiers = compareIdentifiers;

	var numeric = /^[0-9]+$/;
	function compareIdentifiers(a, b) {
		var anum = numeric.test(a),
		    bnum = numeric.test(b);


		if (anum && bnum) {
			a = +a;
			b = +b;
		}

		return anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : a > b ? 1 : 0;
	}

	exports.rcompareIdentifiers = function (a, b) {
		return compareIdentifiers(b, a);
	};


	exports.major = function (a, loose) {
		return new SemVer(a, loose).major;
	};


	exports.minor = function (a, loose) {
		return new SemVer(a, loose).minor;
	};


	exports.patch = function (a, loose) {
		return new SemVer(a, loose).patch;
	};


	exports.compare = compare;
	function compare(a, b, loose) {
		return new SemVer(a, loose).compare(b);
	}

	exports.compareLoose = function (a, b) {
		return compare(a, b, !0);
	};


	exports.rcompare = rcompare;
	function rcompare(a, b, loose) {
		return compare(b, a, loose);
	}

	exports.sort = function (list, loose) {
		return list.sort(function (a, b) {
			return exports.compare(a, b, loose);
		});
	};


	exports.rsort = function (list, loose) {
		return list.sort(function (a, b) {
			return exports.rcompare(a, b, loose);
		});
	};


	exports.gt = gt;
	function gt(a, b, loose) {
		return 0 < compare(a, b, loose);
	}

	exports.lt = lt;
	function lt(a, b, loose) {
		return 0 > compare(a, b, loose);
	}

	exports.eq = eq;
	function eq(a, b, loose) {
		return 0 === compare(a, b, loose);
	}

	exports.neq = neq;
	function neq(a, b, loose) {
		return 0 !== compare(a, b, loose);
	}

	exports.gte = gte;
	function gte(a, b, loose) {
		return 0 <= compare(a, b, loose);
	}

	exports.lte = lte;
	function lte(a, b, loose) {
		return 0 >= compare(a, b, loose);
	}

	exports.cmp = cmp;
	function cmp(a, op, b, loose) {
		var ret;
		switch (op) {
			case '===':
				if ('object' == typeof a) a = a.version;
				if ('object' == typeof b) b = b.version;
				ret = a === b;
				break;
			case '!==':
				if ('object' == typeof a) a = a.version;
				if ('object' == typeof b) b = b.version;
				ret = a !== b;
				break;
			case '':case '=':case '==':
				ret = eq(a, b, loose);break;
			case '!=':
				ret = neq(a, b, loose);break;
			case '>':
				ret = gt(a, b, loose);break;
			case '>=':
				ret = gte(a, b, loose);break;
			case '<':
				ret = lt(a, b, loose);break;
			case '<=':
				ret = lte(a, b, loose);break;
			default:
				throw new TypeError('Invalid operator: ' + op);
		}
		return ret;
	}

	exports.Comparator = Comparator;
	function Comparator(comp, loose) {
		if (comp instanceof Comparator) {
			if (comp.loose === loose) return comp;else comp = comp.value;
		}

		if (!(this instanceof Comparator)) return new Comparator(comp, loose);

		debug('comparator', comp, loose);
		this.loose = loose;
		this.parse(comp);

		if (this.semver === ANY) this.value = '';else this.value = this.operator + this.semver.version;

		debug('comp', this);
	}

	var ANY = {};
	Comparator.prototype.parse = function (comp) {
		var r = this.loose ? re[COMPARATORLOOSE] : re[COMPARATOR],
		    m = comp.match(r);


		if (!m) throw new TypeError('Invalid comparator: ' + comp);

		this.operator = m[1];
		if ('=' === this.operator) this.operator = '';

		if (!m[2]) this.semver = ANY;else this.semver = new SemVer(m[2], this.loose);
	};

	Comparator.prototype.toString = function () {
		return this.value;
	};

	Comparator.prototype.test = function (version) {
		debug('Comparator.test', version, this.loose);

		if (this.semver === ANY) return !0;

		if ('string' == typeof version) version = new SemVer(version, this.loose);

		return cmp(version, this.operator, this.semver, this.loose);
	};

	exports.Range = Range;
	function Range(range, loose) {
		if (range instanceof Range && range.loose === loose) return range;

		if (!(this instanceof Range)) return new Range(range, loose);

		this.loose = loose;

		this.raw = range;
		this.set = range.split(/\s*\|\|\s*/).map(function (range) {
			return this.parseRange(range.trim());
		}, this).filter(function (c) {
			return c.length;
		});

		if (!this.set.length) {
			throw new TypeError('Invalid SemVer Range: ' + range);
		}

		this.format();
	}

	Range.prototype.format = function () {
		this.range = this.set.map(function (comps) {
			return comps.join(' ').trim();
		}).join('||').trim();
		return this.range;
	};

	Range.prototype.toString = function () {
		return this.range;
	};

	Range.prototype.parseRange = function (range) {
		var loose = this.loose;
		range = range.trim();
		debug('range', range, loose);

		var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
		range = range.replace(hr, hyphenReplace);
		debug('hyphen replace', range);

		range = range.replace(re[COMPARATORTRIM], '$1$2$3');
		debug('comparator trim', range, re[COMPARATORTRIM]);

		range = range.replace(re[TILDETRIM], '$1~');

		range = range.replace(re[CARETTRIM], '$1^');

		range = range.split(/\s+/).join(' ');

		var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR],
		    set = range.split(' ').map(function (comp) {
			return parseComparator(comp, loose);
		}).join(' ').split(/\s+/);

		if (this.loose) {
			set = set.filter(function (comp) {
				return !!comp.match(compRe);
			});
		}
		set = set.map(function (comp) {
			return new Comparator(comp, loose);
		});

		return set;
	};

	exports.toComparators = function (range, loose) {
		return new Range(range, loose).set.map(function (comp) {
			return comp.map(function (c) {
				return c.value;
			}).join(' ').trim().split(' ');
		});
	};

	function parseComparator(comp, loose) {
		debug('comp', comp);
		comp = replaceCarets(comp, loose);
		debug('caret', comp);
		comp = replaceTildes(comp, loose);
		debug('tildes', comp);
		comp = replaceXRanges(comp, loose);
		debug('xrange', comp);
		comp = replaceStars(comp, loose);
		debug('stars', comp);
		return comp;
	}

	function isX(id) {
		return !id || 'x' === id.toLowerCase() || '*' === id;
	}

	function replaceTildes(comp, loose) {
		return comp.trim().split(/\s+/).map(function (comp) {
			return replaceTilde(comp, loose);
		}).join(' ');
	}

	function replaceTilde(comp, loose) {
		var r = loose ? re[TILDELOOSE] : re[TILDE];
		return comp.replace(r, function (_, M, m, p, pr) {
			debug('tilde', comp, _, M, m, p, pr);
			var ret;

			if (isX(M)) ret = '';else if (isX(m)) ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';else if (isX(p)) ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';else if (pr) {
				debug('replaceTilde pr', pr);
				if ('-' !== pr.charAt(0)) pr = '-' + pr;
				ret = '>=' + M + '.' + m + '.' + p + pr + ' <' + M + '.' + (+m + 1) + '.0';
			} else ret = '>=' + M + '.' + m + '.' + p + ' <' + M + '.' + (+m + 1) + '.0';

			debug('tilde return', ret);
			return ret;
		});
	}

	function replaceCarets(comp, loose) {
		return comp.trim().split(/\s+/).map(function (comp) {
			return replaceCaret(comp, loose);
		}).join(' ');
	}

	function replaceCaret(comp, loose) {
		debug('caret', comp, loose);
		var r = loose ? re[CARETLOOSE] : re[CARET];
		return comp.replace(r, function (_, M, m, p, pr) {
			debug('caret', comp, _, M, m, p, pr);
			var ret;

			if (isX(M)) ret = '';else if (isX(m)) ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';else if (isX(p)) {
				if ('0' === M) ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';else ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0';
			} else if (pr) {
				debug('replaceCaret pr', pr);
				if ('-' !== pr.charAt(0)) pr = '-' + pr;
				if ('0' === M) {
					if ('0' === m) ret = '>=' + M + '.' + m + '.' + p + pr + ' <' + M + '.' + m + '.' + (+p + 1);else ret = '>=' + M + '.' + m + '.' + p + pr + ' <' + M + '.' + (+m + 1) + '.0';
				} else ret = '>=' + M + '.' + m + '.' + p + pr + ' <' + (+M + 1) + '.0.0';
			} else {
				debug('no pr');
				if ('0' === M) {
					if ('0' === m) ret = '>=' + M + '.' + m + '.' + p + ' <' + M + '.' + m + '.' + (+p + 1);else ret = '>=' + M + '.' + m + '.' + p + ' <' + M + '.' + (+m + 1) + '.0';
				} else ret = '>=' + M + '.' + m + '.' + p + ' <' + (+M + 1) + '.0.0';
			}

			debug('caret return', ret);
			return ret;
		});
	}

	function replaceXRanges(comp, loose) {
		debug('replaceXRanges', comp, loose);
		return comp.split(/\s+/).map(function (comp) {
			return replaceXRange(comp, loose);
		}).join(' ');
	}

	function replaceXRange(comp, loose) {
		comp = comp.trim();
		var r = loose ? re[XRANGELOOSE] : re[XRANGE];
		return comp.replace(r, function (ret, gtlt, M, m, p, pr) {
			debug('xRange', comp, ret, gtlt, M, m, p, pr);
			var xM = isX(M),
			    xm = xM || isX(m),
			    xp = xm || isX(p),
			    anyX = xp;


			if ('=' === gtlt && anyX) gtlt = '';

			if (xM) {
				if ('>' === gtlt || '<' === gtlt) {
					ret = '<0.0.0';
				} else {
					ret = '*';
				}
			} else if (gtlt && anyX) {
				if (xm) m = 0;
				if (xp) p = 0;

				if ('>' === gtlt) {
					gtlt = '>=';
					if (xm) {
						M = +M + 1;
						m = 0;
						p = 0;
					} else if (xp) {
						m = +m + 1;
						p = 0;
					}
				} else if ('<=' === gtlt) {
					gtlt = '<';
					if (xm) M = +M + 1;else m = +m + 1;
				}

				ret = gtlt + M + '.' + m + '.' + p;
			} else if (xm) {
				ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
			} else if (xp) {
				ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
			}

			debug('xRange return', ret);

			return ret;
		});
	}

	function replaceStars(comp, loose) {
		debug('replaceStars', comp, loose);

		return comp.trim().replace(re[STAR], '');
	}

	function hyphenReplace($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr) {

		if (isX(fM)) from = '';else if (isX(fm)) from = '>=' + fM + '.0.0';else if (isX(fp)) from = '>=' + fM + '.' + fm + '.0';else from = '>=' + from;

		if (isX(tM)) to = '';else if (isX(tm)) to = '<' + (+tM + 1) + '.0.0';else if (isX(tp)) to = '<' + tM + '.' + (+tm + 1) + '.0';else if (tpr) to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr;else to = '<=' + to;

		return (from + ' ' + to).trim();
	}

	Range.prototype.test = function (version) {
		var i;

		if (!version) return !1;

		if ('string' == typeof version) version = new SemVer(version, this.loose);

		for (i = 0; i < this.set.length; i++) {
			if (testSet(this.set[i], version)) return !0;
		}
		return !1;
	};

	function testSet(set, version) {
		var i, allowed;

		for (var i = 0; i < set.length; i++) {
			if (!set[i].test(version)) return !1;
		}

		if (version.prerelease.length) {
			for (i = 0; i < set.length; i++) {
				debug(set[i].semver);
				if (set[i].semver === ANY) continue;

				if (0 < set[i].semver.prerelease.length) {
					allowed = set[i].semver;

					if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) return !0;
				}
			}

			return !1;
		}

		return !0;
	}

	exports.satisfies = satisfies;
	function satisfies(version, range, loose) {
		try {
			range = new Range(range, loose);
		} catch (er) {
			return !1;
		}
		return range.test(version);
	}

	exports.maxSatisfying = function (versions, range, loose) {
		return versions.filter(function (version) {
			return satisfies(version, range, loose);
		}).sort(function (a, b) {
			return rcompare(a, b, loose);
		})[0] || null;
	};


	exports.minSatisfying = function (versions, range, loose) {
		return versions.filter(function (version) {
			return satisfies(version, range, loose);
		}).sort(function (a, b) {
			return compare(a, b, loose);
		})[0] || null;
	};


	exports.validRange = function (range, loose) {
		try {
			return new Range(range, loose).range || '*';
		} catch (er) {
			return null;
		}
	};

	exports.ltr = function (version, range, loose) {
		return outside(version, range, '<', loose);
	};

	exports.gtr = function (version, range, loose) {
		return outside(version, range, '>', loose);
	};


	exports.outside = outside;
	function outside(version, range, hilo, loose) {
		version = new SemVer(version, loose);
		range = new Range(range, loose);

		var gtfn, ltefn, ltfn, comp, ecomp, i, comparators, high, low;
		switch (hilo) {
			case '>':
				gtfn = gt;
				ltefn = lte;
				ltfn = lt;
				comp = '>';
				ecomp = '>=';
				break;
			case '<':
				gtfn = lt;
				ltefn = gte;
				ltfn = gt;
				comp = '<';
				ecomp = '<=';
				break;
			default:
				throw new TypeError('Must provide a hilo val of "<" or ">"');
		}

		if (satisfies(version, range, loose)) {
			return !1;
		}

		for (i = 0; i < range.set.length; ++i) {
			comparators = range.set[i], high = null, low = null;


			comparators.forEach(function (comparator) {
				if (comparator.semver === ANY) {
					comparator = new Comparator('>=0.0.0');
				}
				high = high || comparator;
				low = low || comparator;
				if (gtfn(comparator.semver, high.semver, loose)) {
					high = comparator;
				} else if (ltfn(comparator.semver, low.semver, loose)) {
					low = comparator;
				}
			});

			if (high.operator === comp || high.operator === ecomp) {
				return !1;
			}

			if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
				return !1;
			} else if (low.operator === ecomp && ltfn(version, low.semver)) {
				return !1;
			}
		}
		return !0;
	}

	exports.prerelease = function (version, loose) {
		var parsed = parse(version, loose);
		return parsed && parsed.prerelease.length ? parsed.prerelease : null;
	};
}, function (module) {

	"use strict";

	module.exports = () => /(?:[\w-.]+\/[\w-.]+)?#[1-9]\d*/g;
}, function (module, exports, __webpack_require__) {

	"use strict";

	const escapeGoat = __webpack_require__(18);

	module.exports = input => {
		const attributes = [];

		for (const key of Object.keys(input)) {
			let value = input[key];

			if (!1 === value) {
				continue;
			}

			if (Array.isArray(value)) {
				value = value.join(' ');
			}

			let attribute = escapeGoat.escape(key);

			if (!0 !== value) {
				attribute += `="${escapeGoat.escape(value + '')}"`;
			}

			attributes.push(attribute);
		}

		return 0 < attributes.length ? ' ' + attributes.join(' ') : '';
	};
}, function (module, exports) {

	"use strict";

	exports.escape = input => input.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

	exports.unescape = input => input.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, '\'').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}, function (module, exports, __webpack_require__) {

	"use strict";

	module.exports = __webpack_require__(20);
}, function (module) {

	module.exports = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr'];
}, function (module) {

	module.exports = ['a', 'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor', 'animateMotion', 'animateTransform', 'animation', 'audio', 'canvas', 'circle', 'clipPath', 'color-profile', 'cursor', 'defs', 'desc', 'discard', 'ellipse', 'feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feDropShadow', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence', 'filter', 'font', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri', 'foreignObject', 'g', 'glyph', 'glyphRef', 'handler', 'hatch', 'hatchpath', 'hkern', 'iframe', 'image', 'line', 'linearGradient', 'listener', 'marker', 'mask', 'mesh', 'meshgradient', 'meshpatch', 'meshrow', 'metadata', 'missing-glyph', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'prefetch', 'radialGradient', 'rect', 'script', 'set', 'solidColor', 'solidcolor', 'stop', 'style', 'svg', 'switch', 'symbol', 'tbreak', 'text', 'textArea', 'textPath', 'title', 'tref', 'tspan', 'unknown', 'use', 'video', 'view', 'vkern'];
}, function (module, exports) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames() {
			var classes, i, arg, argType;


			for (classes = [], i = 0; i < arguments.length; i++) {
				arg = arguments[i];

				if (!arg) continue;

				argType = typeof arg;


				if ('string' == argType || 'number' == argType) {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if ('object' == argType) {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if ('undefined' != typeof module && module.exports) {
			module.exports = classNames;
		} else {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), void 0 !== __WEBPACK_AMD_DEFINE_RESULT__ && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}
	})();
}, function (module) {

	"use strict";

	module.exports = function (arr) {
		return flat(arr, []);
	};

	function flat(arr, acc) {
		var len = arr.length,
		    idx = -1,
		    cur;


		while (++idx < len) {
			cur = arr[idx];

			if (Array.isArray(cur)) {
				flat(cur, acc);
			} else {
				acc.push(cur);
			}
		}
		return acc;
	}
}, function (module, exports, __webpack_require__) {

	"use strict";

	var isObject = __webpack_require__(25),
	    forOwn = __webpack_require__(26);


	module.exports = function (obj, keys) {
		if (!isObject(obj)) return {};

		keys = [].concat.apply([], [].slice.call(arguments, 1));
		var last = keys[keys.length - 1],
		    res = {},
		    fn;


		if ('function' == typeof last) {
			fn = keys.pop();
		}

		var isFunction = 'function' == typeof fn;
		if (!keys.length && !isFunction) {
			return obj;
		}

		forOwn(obj, function (value, key) {
			if (-1 === keys.indexOf(key)) {

				if (!isFunction) {
					res[key] = value;
				} else if (fn(value, key, obj)) {
					res[key] = value;
				}
			}
		});
		return res;
	};
}, function (module) {

	"use strict";

	module.exports = function (val) {
		return 'undefined' != typeof val && null !== val && ('object' == typeof val || 'function' == typeof val);
	};
}, function (module, exports, __webpack_require__) {

	"use strict";

	var forIn = __webpack_require__(27),
	    hasOwn = Object.prototype.hasOwnProperty;


	module.exports = function (obj, fn, thisArg) {
		forIn(obj, function (val, key) {
			if (hasOwn.call(obj, key)) {
				return fn.call(thisArg, obj[key], key, obj);
			}
		});
	};
}, function (module) {

	"use strict";

	module.exports = function (obj, fn, thisArg) {
		for (var key in obj) {
			if (!1 === fn.call(thisArg, obj[key], key, obj)) {
				break;
			}
		}
	};
}, function (module) {

	"use strict";

	module.exports = (to, from) => {
		for (const prop of Object.getOwnPropertyNames(from).concat(Object.getOwnPropertySymbols(from))) {
			Object.defineProperty(to, prop, Object.getOwnPropertyDescriptor(from, prop));
		}
	};
}, function (module, exports, __webpack_require__) {

	"use strict";

	var toMarkdown,
	    converters,
	    mdConverters = __webpack_require__(30),
	    gfmConverters = __webpack_require__(31),
	    HtmlParser = __webpack_require__(32),
	    collapse = __webpack_require__(34),
	    blocks = ['address', 'article', 'aside', 'audio', 'blockquote', 'body', 'canvas', 'center', 'dd', 'dir', 'div', 'dl', 'dt', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'hr', 'html', 'isindex', 'li', 'main', 'menu', 'nav', 'noframes', 'noscript', 'ol', 'output', 'p', 'pre', 'section', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'ul'];


	function isBlock(node) {
		return -1 !== blocks.indexOf(node.nodeName.toLowerCase());
	}

	var voids = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

	function isVoid(node) {
		return -1 !== voids.indexOf(node.nodeName.toLowerCase());
	}

	function htmlToDom(string) {
		var tree = new HtmlParser().parseFromString(string, 'text/html');
		collapse(tree.documentElement, isBlock);
		return tree;
	}

	function bfsOrder(node) {
		var inqueue = [node],
		    outqueue = [],
		    elem,
		    children,
		    i;


		while (0 < inqueue.length) {
			elem = inqueue.shift();
			outqueue.push(elem);
			children = elem.childNodes;
			for (i = 0; i < children.length; i++) {
				if (1 === children[i].nodeType) inqueue.push(children[i]);
			}
		}
		outqueue.shift();
		return outqueue;
	}

	function getContent(node) {
		var text, i;

		for (text = '', i = 0; i < node.childNodes.length; i++) {
			if (1 === node.childNodes[i].nodeType) {
				text += node.childNodes[i]._replacement;
			} else if (3 === node.childNodes[i].nodeType) {
				text += node.childNodes[i].data;
			} else continue;
		}
		return text;
	}

	function canConvert(node, filter) {
		if ('string' == typeof filter) {
			return filter === node.nodeName.toLowerCase();
		}
		if (Array.isArray(filter)) {
			return -1 !== filter.indexOf(node.nodeName.toLowerCase());
		} else if ('function' == typeof filter) {
			return filter.call(toMarkdown, node);
		} else {
			throw new TypeError('`filter` needs to be a string, array, or function');
		}
	}

	function isFlankedByWhitespace(side, node) {
		var sibling, regExp, isFlanked;


		if ('left' === side) {
			sibling = node.previousSibling;
			regExp = / $/;
		} else {
			sibling = node.nextSibling;
			regExp = /^ /;
		}

		if (sibling) {
			if (3 === sibling.nodeType) {
				isFlanked = regExp.test(sibling.nodeValue);
			} else if (1 === sibling.nodeType && !isBlock(sibling)) {
				isFlanked = regExp.test(sibling.textContent);
			}
		}
		return isFlanked;
	}

	function flankingWhitespace(node, content) {
		var leading = '',
		    trailing = '',
		    hasLeading,
		    hasTrailing;


		if (!isBlock(node)) {
			hasLeading = /^[ \r\n\t]/.test(content), hasTrailing = /[ \r\n\t]$/.test(content);


			if (hasLeading && !isFlankedByWhitespace('left', node)) {
				leading = ' ';
			}
			if (hasTrailing && !isFlankedByWhitespace('right', node)) {
				trailing = ' ';
			}
		}

		return { leading: leading, trailing: trailing };
	}

	function process(node) {
		var replacement,
		    content = getContent(node),
		    i,
		    converter,
		    whitespace;

		if (!isVoid(node) && !/A|TH|TD/.test(node.nodeName) && /^\s*$/i.test(content)) {
			node._replacement = '';
			return;
		}

		for (i = 0; i < converters.length; i++) {
			converter = converters[i];


			if (canConvert(node, converter.filter)) {
				if ('function' != typeof converter.replacement) {
					throw new TypeError('`replacement` needs to be a function that returns a string');
				}

				whitespace = flankingWhitespace(node, content);


				if (whitespace.leading || whitespace.trailing) {
					content = content.trim();
				}
				replacement = whitespace.leading + converter.replacement.call(toMarkdown, content, node) + whitespace.trailing;
				break;
			}
		}

		node._replacement = replacement;
	}

	toMarkdown = function (input, options) {
		options = options || {};

		if ('string' != typeof input) {
			throw new TypeError(input + ' is not a string');
		}

		if ('' === input) {
			return '';
		}

		input = input.replace(/(\d+)\. /g, '$1\\. ');

		var clone = htmlToDom(input).body,
		    nodes = bfsOrder(clone),
		    output,
		    i;


		converters = mdConverters.slice(0);
		if (options.gfm) {
			converters = gfmConverters.concat(converters);
		}

		if (options.converters) {
			converters = options.converters.concat(converters);
		}

		for (i = nodes.length - 1; 0 <= i; i--) {
			process(nodes[i]);
		}
		output = getContent(clone);

		return output.replace(/^[\t\r\n]+|[\t\r\n\s]+$/g, '').replace(/\n\s+\n/g, '\n\n').replace(/\n{3,}/g, '\n\n');
	};

	toMarkdown.isBlock = isBlock;
	toMarkdown.isVoid = isVoid;
	toMarkdown.outer = function (node, content) {
		return node.cloneNode(!1).outerHTML.replace('><', '>' + content + '<');
	};

	module.exports = toMarkdown;
}, function (module) {

	"use strict";

	module.exports = [{
		filter: 'p',
		replacement: function (content) {
			return '\n\n' + content + '\n\n';
		}
	}, {
		filter: 'br',
		replacement: function () {
			return '  \n';
		}
	}, {
		filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
		replacement: function (content, node) {
			var hLevel, hPrefix, i;

			for (hLevel = node.nodeName.charAt(1), hPrefix = '', i = 0; i < hLevel; i++) {
				hPrefix += '#';
			}
			return '\n\n' + hPrefix + ' ' + content + '\n\n';
		}
	}, {
		filter: 'hr',
		replacement: function () {
			return '\n\n* * *\n\n';
		}
	}, {
		filter: ['em', 'i'],
		replacement: function (content) {
			return '_' + content + '_';
		}
	}, {
		filter: ['strong', 'b'],
		replacement: function (content) {
			return '**' + content + '**';
		}
	}, {
		filter: function (node) {
			var hasSiblings = node.previousSibling || node.nextSibling,
			    isCodeBlock = 'PRE' === node.parentNode.nodeName && !hasSiblings;


			return 'CODE' === node.nodeName && !isCodeBlock;
		},
		replacement: function (content) {
			return '`' + content + '`';
		}
	}, {
		filter: function (node) {
			return 'A' === node.nodeName && node.getAttribute('href');
		},
		replacement: function (content, node) {
			var titlePart = node.title ? ' "' + node.title + '"' : '';
			return '[' + content + '](' + node.getAttribute('href') + titlePart + ')';
		}
	}, {
		filter: 'img',
		replacement: function (content, node) {
			var alt = node.alt || '',
			    src = node.getAttribute('src') || '',
			    title = node.title || '',
			    titlePart = title ? ' "' + title + '"' : '';

			return src ? '![' + alt + '](' + src + titlePart + ')' : '';
		}
	}, {
		filter: function (node) {
			return 'PRE' === node.nodeName && 'CODE' === node.firstChild.nodeName;
		},
		replacement: function (content, node) {
			return '\n\n    ' + node.firstChild.textContent.replace(/\n/g, '\n    ') + '\n\n';
		}
	}, {
		filter: 'blockquote',
		replacement: function (content) {
			content = content.trim();
			content = content.replace(/\n{3,}/g, '\n\n');
			content = content.replace(/^/gm, '> ');
			return '\n\n' + content + '\n\n';
		}
	}, {
		filter: 'li',
		replacement: function (content, node) {
			content = content.replace(/^\s+/, '').replace(/\n/gm, '\n    ');
			var prefix = '*   ',
			    parent = node.parentNode,
			    start,
			    index;

			if ('OL' === parent.nodeName) {
				start = parent.getAttribute('start'), index = Array.prototype.indexOf.call(parent.children, node);

				prefix = (start ? +start + index : index + 1) + '.  ';
			}

			return prefix + content;
		}
	}, {
		filter: ['ul', 'ol'],
		replacement: function (content, node) {
			var strings, i;

			for (strings = [], i = 0; i < node.childNodes.length; i++) {
				strings.push(node.childNodes[i]._replacement);
			}

			if (/li/i.test(node.parentNode.nodeName)) {
				return '\n' + strings.join('\n');
			}
			return '\n\n' + strings.join('\n') + '\n\n';
		}
	}, {
		filter: function (node) {
			return this.isBlock(node);
		},
		replacement: function (content, node) {
			return '\n\n' + this.outer(node, content) + '\n\n';
		}
	}, {
		filter: function () {
			return !0;
		},
		replacement: function (content, node) {
			return this.outer(node, content);
		}
	}];
}, function (module) {

	"use strict";

	function cell(content, node) {
		var index = Array.prototype.indexOf.call(node.parentNode.childNodes, node),
		    prefix = ' ';

		if (0 === index) prefix = '| ';
		return prefix + content + ' |';
	}

	var highlightRegEx = /highlight highlight-(\S+)/;

	module.exports = [{
		filter: 'br',
		replacement: function () {
			return '\n';
		}
	}, {
		filter: ['del', 's', 'strike'],
		replacement: function (content) {
			return '~~' + content + '~~';
		}
	}, {
		filter: function (node) {
			return 'checkbox' === node.type && 'LI' === node.parentNode.nodeName;
		},
		replacement: function (content, node) {
			return (node.checked ? '[x]' : '[ ]') + ' ';
		}
	}, {
		filter: ['th', 'td'],
		replacement: function (content, node) {
			return cell(content, node);
		}
	}, {
		filter: 'tr',
		replacement: function (content, node) {
			var borderCells = '',
			    alignMap = { left: ':--', right: '--:', center: ':-:' },
			    i,
			    align,
			    border;


			if ('THEAD' === node.parentNode.nodeName) {
				for (i = 0; i < node.childNodes.length; i++) {
					align = node.childNodes[i].attributes.align, border = '---';


					if (align) border = alignMap[align.value] || border;

					borderCells += cell(border, node.childNodes[i]);
				}
			}
			return '\n' + content + (borderCells ? '\n' + borderCells : '');
		}
	}, {
		filter: 'table',
		replacement: function (content) {
			return '\n\n' + content + '\n\n';
		}
	}, {
		filter: ['thead', 'tbody', 'tfoot'],
		replacement: function (content) {
			return content;
		}
	}, {
		filter: function (node) {
			return 'PRE' === node.nodeName && node.firstChild && 'CODE' === node.firstChild.nodeName;
		},
		replacement: function (content, node) {
			return '\n\n```\n' + node.firstChild.textContent + '\n```\n\n';
		}
	}, {
		filter: function (node) {
			return 'PRE' === node.nodeName && 'DIV' === node.parentNode.nodeName && highlightRegEx.test(node.parentNode.className);
		},
		replacement: function (content, node) {
			var language = node.parentNode.className.match(highlightRegEx)[1];
			return '\n\n```' + language + '\n' + node.textContent + '\n```\n\n';
		}
	}, {
		filter: function (node) {
			return 'DIV' === node.nodeName && highlightRegEx.test(node.className);
		},
		replacement: function (content) {
			return '\n\n' + content + '\n\n';
		}
	}];
}, function (module, exports, __webpack_require__) {

	var _window = 'undefined' != typeof window ? window : this;

	function shouldUseActiveX() {
		var useActiveX = !1;

		try {
			document.implementation.createHTMLDocument('').open();
		} catch (e) {
			if (window.ActiveXObject) useActiveX = !0;
		}

		return useActiveX;
	}

	module.exports = function () {
		var Parser = _window.DOMParser,
		    canParse = !1;

		try {
			if (new Parser().parseFromString('', 'text/html')) {
				canParse = !0;
			}
		} catch (e) {}

		return canParse;
	}() ? _window.DOMParser : function () {
		var Parser = function () {},
		    jsdom;

		if ('undefined' == typeof document) {
			jsdom = __webpack_require__(33);

			Parser.prototype.parseFromString = function (string) {
				return jsdom.jsdom(string, {
					features: {
						FetchExternalResources: [],
						ProcessExternalResources: !1
					}
				});
			};
		} else {
			if (!shouldUseActiveX()) {
				Parser.prototype.parseFromString = function (string) {
					var doc = document.implementation.createHTMLDocument('');
					doc.open();
					doc.write(string);
					doc.close();
					return doc;
				};
			} else {
				Parser.prototype.parseFromString = function (string) {
					var doc = new window.ActiveXObject('htmlfile');
					doc.designMode = 'on';
					doc.open();
					doc.write(string);
					doc.close();
					return doc;
				};
			}
		}
		return Parser;
	}();
}, function () {}, function (module, exports, __webpack_require__) {

	"use strict";

	var voidElements = __webpack_require__(35);
	Object.keys(voidElements).forEach(function (name) {
		voidElements[name.toUpperCase()] = 1;
	});

	var blockElements = {};
	__webpack_require__(36).forEach(function (name) {
		blockElements[name.toUpperCase()] = 1;
	});

	function isBlockElem(node) {
		return !!(node && blockElements[node.nodeName]);
	}

	function isVoid(node) {
		return !!(node && voidElements[node.nodeName]);
	}

	function remove(node) {
		var next = node.nextSibling || node.parentNode;

		node.parentNode.removeChild(node);

		return next;
	}

	function next(prev, current) {
		if (prev && prev.parentNode === current || 'PRE' === current.nodeName) {
			return current.nextSibling || current.parentNode;
		}

		return current.firstChild || current.nextSibling || current.parentNode;
	}

	module.exports = function (elem, isBlock) {
		if (!elem.firstChild || 'PRE' === elem.nodeName) return;

		if ('function' != typeof isBlock) {
			isBlock = isBlockElem;
		}

		var prevText = null,
		    prevVoid = !1,
		    prev = null,
		    node = next(prev, elem),
		    text,
		    nextNode;


		while (node !== elem) {
			if (3 === node.nodeType) {
				text = node.data.replace(/[ \r\n\t]+/g, ' ');


				if ((!prevText || / $/.test(prevText.data)) && !prevVoid && ' ' === text[0]) {
					text = text.substr(1);
				}

				if (!text) {
					node = remove(node);
					continue;
				}

				node.data = text;
				prevText = node;
			} else if (1 === node.nodeType) {
				if (isBlock(node) || 'BR' === node.nodeName) {
					if (prevText) {
						prevText.data = prevText.data.replace(/ $/, '');
					}

					prevText = null;
					prevVoid = !1;
				} else if (isVoid(node)) {
					prevText = null;
					prevVoid = !0;
				}
			} else {
				node = remove(node);
				continue;
			}

			nextNode = next(prev, node);

			prev = node;
			node = nextNode;
		}

		if (prevText) {
			prevText.data = prevText.data.replace(/ $/, '');
			if (!prevText.data) {
				remove(prevText);
			}
		}
	};
}, function (module) {

	module.exports = {
		area: !0,
		base: !0,
		br: !0,
		col: !0,
		embed: !0,
		hr: !0,
		img: !0,
		input: !0,
		keygen: !0,
		link: !0,
		menuitem: !0,
		meta: !0,
		param: !0,
		source: !0,
		track: !0,
		wbr: !0
	};
}, function (module) {

	module.exports = ['address', 'article', 'aside', 'blockquote', 'canvas', 'dd', 'div', 'dl', 'dt', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'hr', 'li', 'main', 'nav', 'noscript', 'ol', 'output', 'p', 'pre', 'section', 'table', 'tfoot', 'ul', 'video'];
}, function (module, exports, __webpack_require__) {

	"use strict";

	const createHtmlElement = __webpack_require__(6),
	      urlRegex = () => /((?:https?(?::\/\/))(?:www\.)?[a-zA-Z0-9-_.]+(?:\.[a-zA-Z0-9]{2,})(?:[-a-zA-Z0-9:%_+.~#?&//=@]*))/g,
	      linkify = (href, options) => createHtmlElement({
		name: 'a',
		attributes: Object.assign({ href: '' }, options.attributes, { href }),
		value: href
	}),
	      domify = html => document.createRange().createContextualFragment(html),
	      getAsString = (input, options) => {
		return input.replace(urlRegex(), match => linkify(match, options));
	},
	      getAsDocumentFragment = (input, options) => {
		return input.split(urlRegex()).reduce((frag, text, index) => {
			if (index % 2) {
				frag.appendChild(domify(linkify(text, options)));
			} else if (0 < text.length) {
				frag.appendChild(document.createTextNode(text));
			}

			return frag;
		}, document.createDocumentFragment());
	};

	module.exports = (input, options) => {
		options = Object.assign({
			attributes: {},
			type: 'string'
		}, options);

		if ('string' === options.type) {
			return getAsString(input, options);
		}

		if ('dom' === options.type) {
			return getAsDocumentFragment(input, options);
		}

		throw new Error('The type option must be either dom or string');
	};
}]);