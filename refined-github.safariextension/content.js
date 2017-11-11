!function(modules) {
 function __webpack_require__(moduleId) {
  if (installedModules[moduleId]) return installedModules[moduleId].exports;
  var module = installedModules[moduleId] = {
   i: moduleId,
   l: !1,
   exports: {}
  };
  return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
  module.l = !0, module.exports;
 }
 var installedModules = {};
 __webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.d = function(exports, name, getter) {
  __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
   configurable: !1,
   enumerable: !0,
   get: getter
  });
 }, __webpack_require__.n = function(module) {
  var getter = module && module.__esModule ? function() {
   return module.default;
  } : function() {
   return module;
  };
  return __webpack_require__.d(getter, "a", getter), getter;
 }, __webpack_require__.o = function(object, property) {
  return Object.prototype.hasOwnProperty.call(object, property);
 }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 9);
}([ function(module, exports, __webpack_require__) {
 "use strict";
 function select(selector, parent) {
  return (parent || document).querySelector(selector);
 }
 select.exists = function(selector, parent) {
  return Boolean(select(selector, parent));
 }, select.all = function(selector, parent) {
  if (!parent || "function" == typeof parent.querySelectorAll) return Array.apply(null, (parent || document).querySelectorAll(selector));
  var current, i, ii, all = [];
  for (i = 0; i < parent.length; i++) for (current = parent[i].querySelectorAll(selector), 
  ii = 0; ii < current.length; ii++) all.indexOf(current[ii]) < 0 && all.push(current[ii]);
  return all;
 }, module.exports = select;
}, function(module, exports, __webpack_require__) {
 "use strict";
 const svgTagNames = __webpack_require__(12), flatten = __webpack_require__(13), IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i, excludeSvgTags = [ "a", "audio", "canvas", "iframe", "script", "video" ], svgTags = svgTagNames.filter(name => -1 === excludeSvgTags.indexOf(name)), setAttribute = (el, name, value) => {
  /^xlink[AHRST]/.test(name) ? el.setAttributeNS("http://www.w3.org/1999/xlink", name, value) : el.setAttribute(name, value);
 }, build = (tagName, attrs, children) => {
  const el = (tagName => (tagName => svgTags.indexOf(tagName) >= 0)(tagName) ? document.createElementNS("http://www.w3.org/2000/svg", tagName) : document.createElement(tagName))(tagName);
  return Object.keys(attrs).forEach(name => {
   const value = attrs[name];
   if ("class" === name || "className" === name) setAttribute(el, "class", value); else if ("style" === name) ((el, style) => {
    Object.keys(style).forEach(name => {
     let value = style[name];
     "number" != typeof value || IS_NON_DIMENSIONAL.test(name) || (value += "px"), el.style.setProperty(name, value);
    });
   })(el, value); else if (0 === name.indexOf("on")) {
    const eventName = name.substr(2).toLowerCase();
    el.addEventListener(eventName, value);
   } else "dangerouslySetInnerHTML" === name ? el.innerHTML = value.__html : "key" !== name && setAttribute(el, name, value);
  }), attrs.dangerouslySetInnerHTML || el.appendChild(children), el;
 };
 exports.h = function(tagName, attrs) {
  const childrenArgs = [].slice.apply(arguments, [ 2 ]), children = document.createDocumentFragment();
  return flatten(childrenArgs).forEach(child => {
   child instanceof Element ? children.appendChild(child) : "boolean" != typeof child && null !== child && children.appendChild(document.createTextNode(child));
  }), build(tagName, attrs || {}, children);
 };
}, function(module, exports, __webpack_require__) {
 "use strict";
 module.exports = (cb => {
  if (!cb) throw new Error("Missing argument callback");
  if ("function" != typeof cb) throw new TypeError("Callback is not a function");
  document.addEventListener("pjax:end", cb), cb();
 });
}, function(module, exports) {
 module.exports = [ "400", "401", "402", "403", "404", "405", "406", "407", "408", "409", "410", "411", "412", "413", "414", "415", "416", "417", "418", "419", "420", "421", "422", "423", "424", "425", "426", "427", "428", "429", "430", "431", "500", "501", "502", "503", "504", "505", "506", "507", "508", "509", "510", "511", "about", "access", "account", "admin", "anonymous", "api", "apps", "auth", "billing", "blog", "business", "c", "cache", "categories", "changelog", "codereview", "collections", "comments", "community", "compare", "contact", "dashboard", "design", "developer", "docs", "downloads", "editor", "edu", "enterprise", "events", "explore", "features", "files", "gist", "gists", "graphs", "help", "home", "hosting", "images", "info", "integrations", "issues", "jobs", "join", "languages", "legal", "linux", "lists", "login", "logout", "mac", "maintenance", "marketplace", "mine", "mirrors", "mobile", "navigation", "network", "new", "news", "notifications", "oauth", "offer", "open-source", "organizations", "orgs", "pages", "payments", "personal", "plans", "plugins", "popular", "posts", "press", "pricing", "projects", "pulls", "readme", "releases", "repositories", "search", "security", "services", "sessions", "settings", "shop", "showcases", "signin", "signup", "site", "ssh", "staff", "stars", "static", "status", "store", "stories", "styleguide", "subscriptions", "support", "talks", "teams", "terms", "tos", "tour", "translations", "trending", "updates", "username", "users", "w", "watching", "wiki", "windows", "works-with", "www0", "www1", "www2", "www3", "www4", "www5", "www6", "www7", "www8", "www9" ];
}, function(module, exports, __webpack_require__) {
 "use strict";
 module.exports = new Promise(resolve => {
  "interactive" === document.readyState || "complete" === document.readyState ? resolve() : document.addEventListener("DOMContentLoaded", () => {
   resolve();
  }, {
   capture: !0,
   once: !0,
   passive: !0
  });
 });
}, function(module, exports, __webpack_require__) {
 "use strict";
 module.exports = ((to, from) => {
  for (const prop of Object.getOwnPropertyNames(from).concat(Object.getOwnPropertySymbols(from))) Object.defineProperty(to, prop, Object.getOwnPropertyDescriptor(from, prop));
 });
}, function(module, exports, __webpack_require__) {
 "use strict";
 const mimicFn = __webpack_require__(5);
 module.exports = ((fn, options) => {
  if ("function" != typeof fn) throw new TypeError(`Expected the first argument to be a function, got \`${typeof fn}\``);
  options = options || {};
  let timeout, result;
  const debounced = function() {
   const context = this, args = arguments, callNow = options.immediate && !timeout;
   return clearTimeout(timeout), timeout = setTimeout(() => {
    timeout = null, options.immediate || (result = fn.apply(context, args));
   }, options.wait || 0), callNow && (result = fn.apply(context, args)), result;
  };
  return mimicFn(debounced, fn), debounced.cancel = (() => {
   timeout && (clearTimeout(timeout), timeout = null);
  }), debounced;
 });
}, function(module, exports, __webpack_require__) {
 "use strict";
 const stringifyAttributes = __webpack_require__(20), htmlTags = __webpack_require__(22), voidHtmlTags = new Set(htmlTags);
 module.exports = (options => {
  let ret = `<${(options = Object.assign({
   name: "div",
   attributes: {},
   value: ""
  }, options)).name}${stringifyAttributes(options.attributes)}>`;
  return voidHtmlTags.has(options.name) || (ret += `${options.value}</${options.name}>`), 
  ret;
 });
}, function(module, exports, __webpack_require__) {
 "use strict";
 const issueRegex = __webpack_require__(24), createHtmlElement = __webpack_require__(7), groupedIssueRegex = new RegExp(`(${issueRegex().source})`, "g"), linkify = (match, options) => {
  let url = `${options.baseUrl}/`;
  if (match.includes("/")) {
   const parts = match.split("#");
   url += `${parts[0]}/issues/${parts[1]}`;
  } else url += `${options.user}/${options.repo}/issues/${match.slice(1)}`;
  return createHtmlElement({
   name: "a",
   attributes: Object.assign({
    href: ""
   }, options.attributes, {
    href: url
   }),
   value: match
  });
 };
 module.exports = ((input, options) => {
  if (!(options = Object.assign({
   attributes: {},
   baseUrl: "https://github.com",
   type: "string"
  }, options)).user || !options.repo) throw new Error("Missing required `user` and `repo` options");
  if ("string" === options.type) return ((input, options) => input.replace(groupedIssueRegex, match => linkify(match, options)))(input, options);
  if ("dom" === options.type) return ((input, options) => input.split(groupedIssueRegex).reduce((frag, text, index) => (index % 2 ? frag.appendChild((html => document.createRange().createContextualFragment(html))(linkify(text, options))) : text.length > 0 && frag.appendChild(document.createTextNode(text)), 
  frag), document.createDocumentFragment()))(input, options);
  throw new Error("The type option must be either dom or string");
 });
}, function(module, __webpack_exports__, __webpack_require__) {
 "use strict";
 function stripHash(url) {
  return url.replace(/#.+$/, "");
 }
 function markRead(url) {
  const unreadNotifications = storage.get();
  unreadNotifications.forEach((notification, index) => {
   notification.url === url && unreadNotifications.splice(index, 1);
  });
  for (const a of select_dom_default.a.all(`a.js-notification-target[href="${url}"]`)) {
   const li = a.closest("li.js-notification");
   li.classList.remove("unread"), li.classList.add("read");
  }
  storage.set(unreadNotifications);
 }
 function markUnread() {
  const participants = select_dom_default.a.all(".participant-avatar").map(el => ({
   username: el.getAttribute("aria-label"),
   avatar: el.querySelector("img").src
  })), {ownerName: ownerName, repoName: repoName} = getOwnerAndRepo(), repository = `${ownerName}/${repoName}`, title = select_dom_default()(".js-issue-title").textContent.trim(), type = isPR() ? "pull-request" : "issue", url = stripHash(location.href), stateLabel = select_dom_default()(".gh-header-meta .State");
  let state;
  stateLabel.classList.contains("State--green") ? state = "open" : stateLabel.classList.contains("State--purple") ? state = "merged" : stateLabel.classList.contains("State--red") && (state = "closed");
  const lastCommentTime = select_dom_default.a.all(".timeline-comment-header relative-time").pop(), dateTitle = lastCommentTime.title, date = lastCommentTime.getAttribute("datetime"), unreadNotifications = storage.get();
  unreadNotifications.push({
   participants: participants,
   repository: repository,
   title: title,
   state: state,
   type: type,
   dateTitle: dateTitle,
   date: date,
   url: url
  }), storage.set(unreadNotifications), updateUnreadIndicator(), this.setAttribute("disabled", "disabled"), 
  this.textContent = "Marked as unread";
 }
 function renderNotifications() {
  const myUserName = getUsername(), unreadNotifications = storage.get().filter(notification => !function(url) {
   return select_dom_default.a.exists(`a.js-notification-target[href^="${stripHash(url)}"]`);
  }(notification.url)).filter(notification => !/\/notifications\/participating/.test(location.pathname) || isParticipatingNotification(notification, myUserName));
  0 !== unreadNotifications.length && (select_dom_default.a.exists(".blankslate") && (select_dom_default()(".blankslate").remove(), 
  select_dom_default()(".js-navigation-container").append(Object(dom_chef.h)("div", {
   class: "notifications-list"
  }))), unreadNotifications.forEach(notification => {
   const {participants: participants, repository: repository, title: title, state: state, type: type, dateTitle: dateTitle, date: date, url: url} = notification;
   let icon;
   "issue" === type && ("open" === state && (icon = openIssue()), "closed" === state && (icon = closedIssue())), 
   "pull-request" === type && ("open" === state && (icon = openPullRequest()), "merged" === state && (icon = mergedPullRequest()), 
   "closed" === state && (icon = closedPullRequest()));
   if (!select_dom_default.a.exists(`a.notifications-repo-link[title="${repository}"]`)) {
    const list = Object(dom_chef.h)("div", {
     class: "boxed-group flush"
    }, Object(dom_chef.h)("form", {
     class: "boxed-group-action"
    }, Object(dom_chef.h)("button", {
     class: "mark-all-as-read css-truncate js-mark-all-read"
    }, check())), Object(dom_chef.h)("h3", null, Object(dom_chef.h)("a", {
     href: "/" + repository,
     class: "css-truncate css-truncate-target notifications-repo-link",
     title: repository
    }, repository)), Object(dom_chef.h)("ul", {
     class: "boxed-group-inner list-group notifications"
    }));
    $(".notifications-list").prepend(list);
   }
   const list = $(`a.notifications-repo-link[title="${repository}"]`).parent().siblings("ul.notifications"), usernames = participants.map(participant => participant.username).join(", "), avatars = participants.map(participant => Object(dom_chef.h)("img", {
    alt: `@${participant.username}`,
    class: "avatar from-avatar",
    src: participant.avatar,
    width: 39,
    height: 39
   })), item = Object(dom_chef.h)("li", {
    class: `list-group-item js-notification js-navigation-item unread ${type}-notification`
   }, Object(dom_chef.h)("span", {
    class: "list-group-item-name css-truncate"
   }, icon, Object(dom_chef.h)("a", {
    href: url,
    class: "css-truncate-target js-notification-target js-navigation-open list-group-item-link"
   }, title)), Object(dom_chef.h)("ul", {
    class: "notification-actions"
   }, Object(dom_chef.h)("li", {
    class: "delete"
   }, Object(dom_chef.h)("button", {
    class: "btn-link delete-note js-mark-read"
   }, check())), Object(dom_chef.h)("li", {
    class: "mute"
   }, Object(dom_chef.h)("button", {
    style: {
     opacity: 0,
     pointerEvents: "none"
    }
   }, mute())), Object(dom_chef.h)("li", {
    class: "age"
   }, Object(dom_chef.h)("relative-time", {
    datetime: date,
    title: dateTitle
   })), Object(dom_chef.h)("li", {
    class: "tooltipped tooltipped-s",
    "aria-label": usernames
   }, Object(dom_chef.h)("div", {
    class: "avatar-stack clearfix"
   }, avatars))));
   list.prepend(item);
  }), $('.boxed-group:has(".unread")').prependTo(".notifications-list"));
 }
 function isParticipatingNotification(notification, myUserName) {
  const {participants: participants} = notification;
  return participants.filter(participant => participant.username === myUserName).length > 0;
 }
 function updateUnreadIndicator() {
  const icon = select_dom_default()(".notification-indicator");
  if (!icon) return;
  const statusMark = icon.querySelector(".mail-status"), hasUnread = icon.matches('[data-ga-click$=":unread"]') || storage.get().length > 0, label = hasUnread ? "You have unread notifications" : "You have no unread notifications";
  icon.setAttribute("aria-label", label), statusMark.classList.toggle("unread", hasUnread);
 }
 function markNotificationRead(e) {
  markRead(e.target.closest("li.js-notification").querySelector("a.js-notification-target").href), 
  updateUnreadIndicator();
 }
 function markAllNotificationsRead(e) {
  e.preventDefault();
  const repoGroup = e.target.closest(".boxed-group");
  for (const a of repoGroup.querySelectorAll("a.js-notification-target")) markRead(a.href);
  updateUnreadIndicator();
 }
 async function setup() {
  storage = await new SynchronousStorage(() => new Promise((resolve, reject) => {
   try {
    resolve(JSON.parse(localStorage.unreadNotifications || "[]"));
   } catch (err) {
    reject(err);
   }
  }), unreadNotifications => new Promise((resolve, reject) => {
   try {
    localStorage.unreadNotifications = JSON.stringify(unreadNotifications), resolve();
   } catch (err) {
    reject(err);
   }
  })), github_injection_default()(() => {
   destroy(), localStorage.removeItem("_unreadNotifications_migrated"), localStorage.removeItem("unreadNotifications"), 
   isNotifications() ? (renderNotifications(), select_dom_default.a.exists('#notification-center a[href="#mark_as_read_confirm_box"]') || 0 === storage.get().length || ($("#notification-center .tabnav-tabs:first").append(Object(dom_chef.h)("div", {
    class: "float-right"
   }, Object(dom_chef.h)("a", {
    href: "#mark_as_read_confirm_box",
    class: "btn btn-sm",
    rel: "facebox"
   }, "Mark all as read"), Object(dom_chef.h)("div", {
    id: "mark_as_read_confirm_box",
    style: {
     display: "none"
    }
   }, Object(dom_chef.h)("h2", {
    class: "facebox-header",
    "data-facebox-id": "facebox-header"
   }, "Are you sure?"), Object(dom_chef.h)("p", {
    "data-facebox-id": "facebox-description"
   }, "Are you sure you want to mark all unread notifications as read?"), Object(dom_chef.h)("div", {
    class: "full-button"
   }, Object(dom_chef.h)("button", {
    id: "clear-local-notification",
    class: "btn btn-block"
   }, "Mark all notifications as read"))))), $(document).on("click", "#clear-local-notification", () => {
    storage.set([]), location.reload();
   })), function() {
    const unreadCount = select_dom_default()('#notification-center .filter-list a[href="/notifications"] .count'), githubNotificationsCount = Number(unreadCount.textContent), localNotifications = storage.get();
    localNotifications.length > 0 && (unreadCount.textContent = githubNotificationsCount + localNotifications.length);
   }(), function() {
    const unreadCount = select_dom_default()('#notification-center .filter-list a[href="/notifications/participating"] .count'), githubNotificationsCount = Number(unreadCount.textContent), myUserName = getUsername(), participatingNotifications = storage.get().filter(notification => isParticipatingNotification(notification, myUserName));
    participatingNotifications.length > 0 && (unreadCount.textContent = githubNotificationsCount + participatingNotifications.length);
   }(), $(document).on("click", ".js-mark-read", markNotificationRead), $(document).on("click", ".js-mark-all-read", markAllNotificationsRead), 
   $(document).on("click", ".js-delete-notification button", updateUnreadIndicator), 
   $(document).on("click", 'form[action="/notifications/mark"] button', () => {
    storage.set([]);
   })) : (isPR() || isIssue()) && (markRead(location.href), function() {
    const container = select_dom_default()(".js-thread-subscription-status");
    if (container) {
     const button = Object(dom_chef.h)("button", {
      class: "btn btn-sm btn-mark-unread js-mark-unread"
     }, "Mark as unread");
     button.addEventListener("click", markUnread, {
      once: !0
     }), container.append(button);
    }
   }()), updateUnreadIndicator();
  });
 }
 function destroy() {
  $(document).off("click", ".js-mark-unread", markUnread), $(".js-mark-unread").remove();
 }
 function triggerUploadUI({target: target}) {
  target.closest(".js-previewable-comment-form").querySelector(".js-manual-file-chooser").click();
 }
 function handleKeydown(event) {
  event[metaKey] && "u" === event.key && (triggerUploadUI(event), event.preventDefault());
 }
 function getParticipants(container) {
  const currentUser = getUsername();
  return container.getAttribute("aria-label").replace(/ reacted with.*/, "").replace(/,? and /, ", ").replace(/, \d+ more/, "").split(", ").filter(username => username !== currentUser).map(username => ({
   container: container,
   username: username
  }));
 }
 function add() {
  for (const list of select_dom_default.a.all(".has-reactions .comment-reactions-options:not(.rgh-reactions)")) {
   const avatarLimit = arbitraryAvatarLimit - list.children.length * approximateHeaderLength, participantByReaction = [].map.call(list.children, getParticipants), flatParticipants = flatZip(participantByReaction, avatarLimit);
   for (const participant of flatParticipants) participant.container.append(Object(dom_chef.h)("a", {
    href: `/${participant.username}`
   }, Object(dom_chef.h)("img", {
    src: `/${participant.username}.png?size=${20 * window.devicePixelRatio}`
   })));
   list.classList.add("rgh-reactions"), flatParticipants.length > .9 * avatarLimit && list.classList.add("rgh-reactions-near-limit");
  }
 }
 function addFilePathCopyBtn() {
  for (const file of select_dom_default.a.all("#files .file-header:not(.rgh-copy-file-path)")) {
   file.classList.add("rgh-copy-file-path", "js-zeroclipboard-container"), select_dom_default()(".file-info a", file).classList.add("js-zeroclipboard-target");
   const group = Object(dom_chef.h)("div", {
    class: "BtnGroup"
   }, Object(dom_chef.h)("button", {
    "aria-label": "Copy file path to clipboard",
    class: "js-zeroclipboard btn btn-sm BtnGroup-item tooltipped tooltipped-s",
    "data-copied-hint": "Copied!",
    type: "button"
   }, "Copy path")), viewButton = select_dom_default()('[aria-label^="View"]', file);
   viewButton.classList.add("BtnGroup-item"), viewButton.replaceWith(group), group.append(viewButton);
  }
 }
 function appendReleasesCount(count) {
  count && select_dom_default()(".reponav-releases").append(Object(dom_chef.h)("span", {
   class: "Counter"
  }, count));
 }
 function removeDiffSigns() {
  for (const line of select_dom_default.a.all(".diff-table tr:not(.refined-github-diff-signs)")) {
   line.classList.add("refined-github-diff-signs");
   for (const code of select_dom_default.a.all(".blob-code-inner", line)) code.firstChild.textContent = code.firstChild.textContent.slice(1), 
   0 === code.textContent.length && code.prepend(" ");
  }
 }
 function removeDiffSignsAndWatchExpansions() {
  !function() {
   for (const commentBtn of select_dom_default.a.all(".add-line-comment")) for (const node of commentBtn.childNodes) node.nodeType === Node.TEXT_NODE && node.remove();
  }(), removeDiffSigns();
  for (const file of $(".diff-table:not(.rgh-watching-lines)").has(".diff-expander")) file.classList.add("rgh-watching-lines"), 
  observeEl(file.tBodies[0], removeDiffSigns);
 }
 function inPR() {
  let deletedBranch = !1;
  const lastBranchAction = select_dom_default.a.all("\n\t\t.discussion-item-head_ref_deleted .head-ref,\n\t\t.discussion-item-head_ref_restored .head-ref\n\t").pop();
  lastBranchAction && lastBranchAction.closest(".discussion-item-head_ref_deleted") && (deletedBranch = lastBranchAction.title);
  for (const el of select_dom_default.a.all(".commit-ref[title], .base-ref[title], .head-ref[title]")) {
   if ("unknown repository" === el.textContent) continue;
   if (el.title === deletedBranch) {
    el.title = "Deleted: " + el.title, el.style.textDecoration = "line-through";
    continue;
   }
   const branchUrl = "/" + el.title.replace(":", "/tree/");
   $(el).closest(".commit-ref").wrap(Object(dom_chef.h)("a", {
    href: branchUrl
   }));
  }
 }
 function inQuickPR() {
  safeElementReady(".branch-name").then(el => {
   if (!el) return;
   const {ownerName: ownerName, repoName: repoName} = getOwnerAndRepo(), branchUrl = `/${ownerName}/${repoName}/tree/${el.textContent}`;
   $(el).closest(".branch-name").wrap(Object(dom_chef.h)("a", {
    href: branchUrl
   }));
  });
 }
 function onDomReady() {
  safely(mark_unread.setup), safely(add_profile_hotkey), isGist() || safely(move_marketplace_link_to_profile_dropdown), 
  isGist() && safely(copy_file), isDashboard() && (safely(hide_own_stars), safely(auto_load_more_news)), 
  github_injection_default()(ajaxedPagesHandler);
 }
 function ajaxedPagesHandler() {
  safely(hide_empty_meta), safely(remove_upload_files_button), safely(add_title_to_emojis), 
  safely(copy_on_y.destroy), safely(() => {
   for (const a of select_dom_default.a.all("a[href]")) Object(shorten_repo_url.applyToLink)(a, location.href);
  }), safely(linkify_urls_in_code), (isIssueSearch() || isPRSearch()) && safely(add_yours_menu_item), 
  isMilestone() && safely(add_milestone_navigation), isRepo() && (safely(more_dropdown), 
  safely(add_releases_tab), safely(remove_projects_tab), safely(add_readme_buttons), 
  safely(add_diff_view_without_whitespace_option), safely(remove_diff_signs), safely(add_ci_link), 
  safely(sort_milestones_by_closest_due_date)), isPR() && (safely(scroll_to_top_on_collapse), 
  safely(inPR), safely(add_delete_fork_link), safely(fix_squash_and_merge_title), 
  safely(open_ci_details_in_new_tab)), isQuickPR() && safely(inQuickPR), (isPR() || isIssue()) && (safely(linkify_issues_in_titles), 
  safely(upload_button), observeEl(".new-discussion-timeline", () => {
   safely(op_labels), safely(add_time_machine_links_to_comments);
  })), (isPRList() || isIssueList()) && (safely(add_filter_comments_by_you), safely(show_recently_pushed_branches)), 
  isCommit() && safely(add_patch_diff_links), (isPR() || isIssue() || isCommit()) && (safely(reactions_avatars), 
  safely(show_names)), isCommitList() && safely(mark_merge_commits_in_list), (isPRFiles() || isPRCommit()) && (safely(copy_file_path), 
  safely(preserve_whitespace_option_in_nav)), isSingleFile() && (safely(copy_file), 
  safely(copy_on_y.setup)), isRepoSettings() && safely(add_project_new_link);
 }
 Object.defineProperty(__webpack_exports__, "__esModule", {
  value: !0
 });
 var github_injection = __webpack_require__(2), github_injection_default = __webpack_require__.n(github_injection), shorten_repo_url = __webpack_require__(10), select_dom = __webpack_require__(0), select_dom_default = __webpack_require__.n(select_dom), dom_loaded = __webpack_require__(4), dom_loaded_default = __webpack_require__.n(dom_loaded), dom_chef = __webpack_require__(1);
 class SynchronousStorage {
  constructor(get, set) {
   return this._get = get, this._set = set, get().then(value => (this._cache = value, 
   this));
  }
  get() {
   return this._cache;
  }
  set(value) {
   return this._cache = value, this._set(value);
  }
 }
 const check = () => Object(dom_chef.h)("svg", {
  "aria-hidden": "true",
  class: "octicon octicon-check",
  height: "16",
  version: "1.1",
  viewBox: "0 0 12 16",
  width: "12"
 }, Object(dom_chef.h)("path", {
  d: "M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z"
 })), mute = () => Object(dom_chef.h)("svg", {
  "aria-hidden": "true",
  class: "octicon octicon-mute",
  height: "16",
  version: "1.1",
  viewBox: "0 0 16 16",
  width: "16"
 }, Object(dom_chef.h)("path", {
  d: "M8 2.81v10.38c0 .67-.81 1-1.28.53L3 10H1c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1h2l3.72-3.72C7.19 1.81 8 2.14 8 2.81zm7.53 3.22l-1.06-1.06-1.97 1.97-1.97-1.97-1.06 1.06L11.44 8 9.47 9.97l1.06 1.06 1.97-1.97 1.97 1.97 1.06-1.06L13.56 8l1.97-1.97z"
 })), openIssue = () => Object(dom_chef.h)("svg", {
  "aria-label": "issues",
  class: "octicon octicon-issue-opened type-icon type-icon-state-open",
  height: "16",
  role: "img",
  version: "1.1",
  viewBox: "0 0 14 16",
  width: "14"
 }, Object(dom_chef.h)("path", {
  d: "M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"
 })), closedIssue = () => Object(dom_chef.h)("svg", {
  "aria-label": "issues",
  class: "octicon octicon-issue-closed type-icon type-icon-state-closed",
  height: "16",
  role: "img",
  version: "1.1",
  viewBox: "0 0 16 16",
  width: "16"
 }, Object(dom_chef.h)("path", {
  d: "M7 10h2v2H7v-2zm2-6H7v5h2V4zm1.5 1.5l-1 1L12 9l4-4.5-1-1L12 7l-1.5-1.5zM8 13.7A5.71 5.71 0 0 1 2.3 8c0-3.14 2.56-5.7 5.7-5.7 1.83 0 3.45.88 4.5 2.2l.92-.92A6.947 6.947 0 0 0 8 1C4.14 1 1 4.14 1 8s3.14 7 7 7 7-3.14 7-7l-1.52 1.52c-.66 2.41-2.86 4.19-5.48 4.19v-.01z"
 })), openPullRequest = () => Object(dom_chef.h)("svg", {
  "aria-label": "pull request",
  class: "octicon octicon-git-pull-request type-icon type-icon-state-open",
  height: "16",
  role: "img",
  version: "1.1",
  viewBox: "0 0 12 16",
  width: "12"
 }, Object(dom_chef.h)("path", {
  d: "M11 11.28V5c-.03-.78-.34-1.47-.94-2.06C9.46 2.35 8.78 2.03 8 2H7V0L4 3l3 3V4h1c.27.02.48.11.69.31.21.2.3.42.31.69v6.28A1.993 1.993 0 0 0 10 15a1.993 1.993 0 0 0 1-3.72zm-1 2.92c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zM4 3c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v6.56A1.993 1.993 0 0 0 2 15a1.993 1.993 0 0 0 1-3.72V4.72c.59-.34 1-.98 1-1.72zm-.8 10c0 .66-.55 1.2-1.2 1.2-.65 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"
 })), closedPullRequest = () => Object(dom_chef.h)("svg", {
  "aria-label": "pull request",
  class: "octicon octicon-git-pull-request type-icon type-icon-state-closed",
  height: "16",
  role: "img",
  version: "1.1",
  viewBox: "0 0 12 16",
  width: "12"
 }, Object(dom_chef.h)("path", {
  d: "M11 11.28V5c-.03-.78-.34-1.47-.94-2.06C9.46 2.35 8.78 2.03 8 2H7V0L4 3l3 3V4h1c.27.02.48.11.69.31.21.2.3.42.31.69v6.28A1.993 1.993 0 0 0 10 15a1.993 1.993 0 0 0 1-3.72zm-1 2.92c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zM4 3c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v6.56A1.993 1.993 0 0 0 2 15a1.993 1.993 0 0 0 1-3.72V4.72c.59-.34 1-.98 1-1.72zm-.8 10c0 .66-.55 1.2-1.2 1.2-.65 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"
 })), mergedPullRequest = () => Object(dom_chef.h)("svg", {
  "aria-label": "pull request",
  class: "octicon octicon-git-pull-request type-icon type-icon-state-merged",
  height: "16",
  role: "img",
  version: "1.1",
  viewBox: "0 0 12 16",
  width: "12"
 }, Object(dom_chef.h)("path", {
  d: "M11 11.28V5c-.03-.78-.34-1.47-.94-2.06C9.46 2.35 8.78 2.03 8 2H7V0L4 3l3 3V4h1c.27.02.48.11.69.31.21.2.3.42.31.69v6.28A1.993 1.993 0 0 0 10 15a1.993 1.993 0 0 0 1-3.72zm-1 2.92c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zM4 3c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v6.56A1.993 1.993 0 0 0 2 15a1.993 1.993 0 0 0 1-3.72V4.72c.59-.34 1-.98 1-1.72zm-.8 10c0 .66-.55 1.2-1.2 1.2-.65 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"
 })), tag = () => Object(dom_chef.h)("svg", {
  class: "octicon octicon-tag",
  height: "16",
  version: "1.1",
  viewBox: "0 0 14 16",
  width: "14"
 }, Object(dom_chef.h)("path", {
  d: "M6.73 2.73c-0.47-0.47-1.11-0.73-1.77-0.73H2.5C1.13 2 0 3.13 0 4.5v2.47c0 0.66 0.27 1.3 0.73 1.77l6.06 6.06c0.39 0.39 1.02 0.39 1.41 0l4.59-4.59c0.39-0.39 0.39-1.02 0-1.41L6.73 2.73zM1.38 8.09c-0.31-0.3-0.47-0.7-0.47-1.13V4.5c0-0.88 0.72-1.59 1.59-1.59h2.47c0.42 0 0.83 0.16 1.13 0.47l6.14 6.13-4.73 4.73L1.38 8.09z m0.63-4.09h2v2H2V4z"
 })), cloudUpload = () => Object(dom_chef.h)("svg", {
  "aria-hidden": "true",
  class: "octicon octicon-cloud-upload",
  height: "16",
  role: "img",
  version: "1.1",
  viewBox: "0 0 16 16",
  width: "16"
 }, Object(dom_chef.h)("path", {
  "fill-rule": "evenodd",
  d: "M7 9H5l3-3 3 3H9v5H7V9zm5-4c0-.44-.91-3-4.5-3C5.08 2 3 3.92 3 6 1.02 6 0 7.52 0 9c0 1.53 1 3 3 3h3v-1.3H3c-1.62 0-1.7-1.42-1.7-1.7 0-.17.05-1.7 1.7-1.7h1.3V6c0-1.39 1.56-2.7 3.2-2.7 2.55 0 3.13 1.55 3.2 1.8v1.2H12c.81 0 2.7.22 2.7 2.2 0 2.09-2.25 2.2-2.7 2.2h-2V12h2c2.08 0 4-1.16 4-3.5C16 6.06 14.08 5 12 5z"
 })), icons_code = () => Object(dom_chef.h)("svg", {
  class: "octicon octicon-code",
  viewBox: "0 0 14 16",
  version: "1.1",
  width: "14",
  height: "16",
  "aria-hidden": "true"
 }, Object(dom_chef.h)("path", {
  "fill-rule": "evenodd",
  d: "M9.5 3L8 4.5 11.5 8 8 11.5 9.5 13 14 8 9.5 3zm-5 0L0 8l4.5 5L6 11.5 2.5 8 6 4.5 4.5 3z"
 }));
 var github_reserved_names = __webpack_require__(14);
 const getCleanPathname = () => location.pathname.replace(/^[/]|[/]$/g, ""), getRepoPath = () => {
  if (!isRepo()) return !1;
  const match = /^[^/]+[/][^/]+[/]?(.*)$/.exec(getCleanPathname());
  return match && match[1];
 }, getRepoURL = () => location.pathname.slice(1).split("/", 2).join("/"), getOwnerAndRepo = () => {
  const [, ownerName, repoName] = location.pathname.split("/");
  return {
   ownerName: ownerName,
   repoName: repoName
  };
 }, isCommit = () => isSingleCommit() || isPRCommit(), isCommitList = () => /^commits\//.test(getRepoPath()), isDashboard = () => /^((orgs[/][^/]+[/])?dashboard([/]index[/]\d+)?)?$/.test(getCleanPathname()), isGist = () => location.hostname.startsWith("gist.") || location.pathname.startsWith("gist/"), isIssue = () => /^issues\/\d+/.test(getRepoPath()), isIssueList = () => /^issues\/?$/.test(getRepoPath()), isIssueSearch = () => location.pathname.startsWith("/issues"), isMilestone = () => /^milestone\/\d+/.test(getRepoPath()), isNotifications = () => /^([^/]+[/][^/]+\/)?notifications/.test(getCleanPathname()), isPR = () => /^pull\/\d+/.test(getRepoPath()), isPRCommit = () => /^pull\/\d+\/commits\/[0-9a-f]{5,40}/.test(getRepoPath()), isPRFiles = () => /^pull\/\d+\/files/.test(getRepoPath()), isPRList = () => /^pulls\/?$/.test(getRepoPath()), isPRSearch = () => location.pathname.startsWith("/pulls"), isQuickPR = () => /^compare/.test(getRepoPath()) && /[?&]quick_pull=1(&|$)/.test(location.search), isRepo = () => /^[^/]+\/[^/]+/.test(getCleanPathname()) && !Object(github_reserved_names.check)(getOwnerAndRepo().ownerName) && !isNotifications() && !isDashboard() && !isGist(), isRepoRoot = () => /^(tree[/][^/]+)?$/.test(getRepoPath()), isRepoSettings = () => /^settings/.test(getRepoPath()), isSingleCommit = () => /^commit\/[0-9a-f]{5,40}/.test(getRepoPath()), isSingleFile = () => /^blob\//.test(getRepoPath()), isTrending = () => location.pathname.startsWith("/trending");
 var element_ready = __webpack_require__(15), element_ready_default = __webpack_require__.n(element_ready);
 const safely = async fn => fn(), getUsername = () => select_dom_default()('meta[name="user-login"]').getAttribute("content"), safeElementReady = selector => {
  const waiting = element_ready_default()(selector);
  return dom_loaded_default.a.then(() => requestAnimationFrame(() => waiting.cancel())), 
  waiting.catch(() => null);
 }, observeEl = (el, listener, options = {
  childList: !0
 }) => {
  if ("string" == typeof el && (el = select_dom_default()(el)), !el) return;
  listener([]);
  const observer = new MutationObserver(listener);
  return observer.observe(el, options), observer;
 }, flatZip = (table, limit = 1 / 0) => {
  const maxColumns = Math.max(...table.map(row => row.length)), zipped = [];
  for (let col = 0; col < maxColumns; col++) for (const row of table) if (row[col] && (zipped.push(row[col]), 
  limit !== 1 / 0 && zipped.length === limit)) return zipped;
  return zipped;
 }, metaKey = /Mac/.test(window.navigator.platform) ? "metaKey" : "ctrlKey", groupButtons = buttons => {
  $(buttons).addClass("BtnGroup-item");
  let group = buttons[0].closest(".BtnGroup");
  return group || (group = Object(dom_chef.h)("div", {
   class: "BtnGroup"
  }), $(buttons).wrapAll(group)), group;
 };
 let storage;
 var mark_unread = {
  setup: setup,
  destroy: destroy
 }, onetime = __webpack_require__(17);
 const listenOnce = __webpack_require__.n(onetime)()(() => {
  $(document).on("keydown", ".rgh-has-upload-field", handleKeydown), $(document).on("click", ".rgh-upload-btn", triggerUploadUI);
 });
 var upload_button = function() {
  $(".js-previewable-comment-form:not(.rgh-has-upload-field)").has(".js-manual-file-chooser[type=file]").addClass("rgh-has-upload-field").find(".js-saved-reply-container").after(Object(dom_chef.h)("button", {
   type: "button",
   class: "toolbar-item rgh-upload-btn"
  }, cloudUpload())), listenOnce();
 }, copy_text_to_clipboard = __webpack_require__(18), copy_text_to_clipboard_default = __webpack_require__.n(copy_text_to_clipboard);
 const handler = ({keyCode: keyCode, target: target}) => {
  if (89 === keyCode && "INPUT" !== target.nodeName) {
   const commitIsh = select_dom_default()(".commit-tease-sha").textContent.trim(), uri = location.href.replace(/\/blob\/[\w-]+\//, `/blob/${commitIsh}/`);
   copy_text_to_clipboard_default()(uri);
  }
 };
 var copy_on_y = {
  setup: () => {
   window.addEventListener("keyup", handler);
  },
  destroy: () => {
   window.removeEventListener("keyup", handler);
  }
 }, debounce_fn = __webpack_require__(6), debounce_fn_default = __webpack_require__.n(debounce_fn);
 const arbitraryAvatarLimit = 36, approximateHeaderLength = 3;
 var reactions_avatars = () => {
  add(), document.addEventListener("socket:message", debounce_fn_default()(add, {
   wait: 100
  }));
 }, domify = html => {
  const template = document.createElement("template");
  return template.innerHTML = html, template.content;
 };
 var show_names = async () => {
  const myUsername = getUsername(), cache = await (async () => {
   const cachedUsers = localStorage.getItem("cachedNames");
   return cachedUsers ? JSON.parse(cachedUsers) : {};
  })(), usersOnPage = ((array, grouper) => array.reduce((map, item) => {
   const key = grouper(item);
   return map[key] = map[key] || [], map[key].push(item), map;
  }, {}))(select_dom_default.a.all(".js-discussion .author:not(.refined-github-fullname)"), el => el.textContent), fetches = Object.keys(usersOnPage).map(async username => {
   void 0 === cache[username] && username !== myUsername && (cache[username] = await (async username => {
    const pageHTML = await fetch(`${location.origin}/${username}/following`).then(res => res.text()), el = domify(pageHTML).querySelector("h1 strong"), fullname = el && el.textContent.slice(1, -1);
    return !(!fullname || fullname === username) && fullname;
   })(username));
   for (const usernameEl of usersOnPage[username]) {
    const commentedNode = usernameEl.parentNode.nextSibling;
    commentedNode && commentedNode.textContent.includes("commented") && commentedNode.remove(), 
    usernameEl.classList.add("refined-github-fullname"), cache[username] && username !== myUsername && ("STRONG" === usernameEl.parentNode.tagName ? usernameEl.parentNode : usernameEl).after(" (", Object(dom_chef.h)("bdo", null, cache[username]), ") ");
   }
  });
  await Promise.all(fetches), localStorage.setItem("cachedNames", JSON.stringify(cache));
 }, copy_file_path = () => {
  observeEl("#files", addFilePathCopyBtn, {
   childList: !0,
   subtree: !0
  });
 }, copy_file = function() {
  for (const code of select_dom_default.a.all(".file .blob-wrapper > .highlight:not(.rgh-copy-file)")) {
   code.classList.add("rgh-copy-file");
   const file = code.closest(".file");
   file.classList.add("js-zeroclipboard-container"), code.classList.add("js-zeroclipboard-target");
   const firstAction = select_dom_default()(".file-actions .btn", file);
   firstAction.before(Object(dom_chef.h)("button", {
    class: "btn btn-sm copy-btn js-zeroclipboard tooltipped tooltipped-n",
    "aria-label": "Copy file to clipboard",
    "data-copied-hint": "Copied!",
    type: "button"
   }, "Copy")), groupButtons(firstAction.parentNode.children);
  }
 }, linkify_urls = __webpack_require__(19), linkify_urls_default = __webpack_require__.n(linkify_urls), linkify_issues = __webpack_require__(8), linkify_issues_default = __webpack_require__.n(linkify_issues);
 const {ownerName: linkify_urls_in_code_ownerName, repoName: linkify_urls_in_code_repoName} = getOwnerAndRepo(), linkify_urls_in_code_options = {
  user: linkify_urls_in_code_ownerName,
  repo: linkify_urls_in_code_repoName,
  type: "dom",
  baseUrl: "",
  attrs: {
   target: "_blank"
  }
 }, editTextNodes = (fn, el) => {
  for (const textNode of [ ...(el => {
   const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
   return walker[Symbol.iterator] = (() => ({
    next: () => {
     const value = walker.nextNode();
     return {
      value: value,
      done: !value
     };
    }
   })), walker;
  })(el) ]) {
   if (fn === linkify_urls_default.a && textNode.textContent.length < 11) continue;
   const linkified = fn(textNode.textContent, linkify_urls_in_code_options);
   linkified.children.length > 0 && textNode.replaceWith(linkified);
  }
 };
 var linkify_urls_in_code = () => {
  const wrappers = select_dom_default.a.all(".highlight:not(.refined-github-linkified-code)");
  if (0 !== wrappers.length) {
   for (const el of select_dom_default.a.all(".blob-code-inner, pre", wrappers)) editTextNodes(linkify_urls_default.a, el);
   for (const el of select_dom_default.a.all("span.pl-c", wrappers)) editTextNodes(linkify_issues_default.a, el);
   for (const el of wrappers) el.classList.add("refined-github-linkified-code");
  }
 };
 let auto_load_more_news_btn, newsfeedObserver;
 const loadMore = debounce_fn_default()(() => {
  auto_load_more_news_btn.click(), auto_load_more_news_btn.disabled || loadMore();
 }, {
  wait: 200
 });
 var auto_load_more_news = () => {
  const form = select_dom_default()(".ajax-pagination-form");
  form && (form.addEventListener("submit", e => e.preventDefault()), newsfeedObserver = observeEl("#dashboard .news", () => {
   auto_load_more_news_btn && document.contains(auto_load_more_news_btn) || (auto_load_more_news_btn = select_dom_default()(".ajax-pagination-btn")) || newsfeedObserver.disconnect();
  }));
 }, op_labels = () => {
  let op;
  if (isPR()) {
   [, op] = /^(?:.+) by (\S+) · Pull Request #(\d+)/.exec(document.title) || [];
  } else op = select_dom_default()(".timeline-comment-header-text .author").textContent;
  let newComments = $(".js-comment:not(.refined-github-op)").has(`strong .author[href="/${op}"]`).get();
  if (isPRFiles() || (newComments = newComments.slice(1)), 0 === newComments.length) return;
  const type = isPR() ? "pull request" : "issue", tooltip = `${op === getUsername() ? "You" : "This user"} submitted this ${type}.`, placeholders = select_dom_default.a.all("\n\t\t.timeline-comment .timeline-comment-header-text,\n\t\t.review-comment .comment-body\n\t", newComments);
  for (const placeholder of placeholders) placeholder.before(Object(dom_chef.h)("span", {
   class: "timeline-comment-label tooltipped tooltipped-multiline tooltipped-s rgh-tooltipped",
   "aria-label": tooltip
  }, "Original Poster"));
  for (const el of newComments) el.classList.add("refined-github-op");
 };
 const repoUrl = getRepoURL();
 var more_dropdown = function() {
  if (select_dom_default.a.exists(".refined-github-more")) return;
  select_dom_default.a.all('.reponav-item:not([href$="settings"])').pop().after(Object(dom_chef.h)("div", {
   class: "reponav-dropdown js-menu-container refined-github-more"
  }, Object(dom_chef.h)("button", {
   type: "button",
   class: "btn-link reponav-item reponav-dropdown js-menu-target ",
   "data-no-toggle": !0,
   "aria-expanded": "false",
   "aria-haspopup": "true"
  }, "More ", Object(dom_chef.h)("svg", {
   "aria-hidden": "true",
   class: "octicon octicon-triangle-down v-align-middle text-y",
   height: "11",
   version: "1.1",
   viewBox: "0 0 12 16",
   width: "8"
  }, Object(dom_chef.h)("path", {
   "fill-rule": "evenodd",
   d: "M0 5l6 6 6-6z"
  }))), Object(dom_chef.h)("div", {
   class: "dropdown-menu-content js-menu-content"
  }, Object(dom_chef.h)("div", {
   class: "dropdown-menu dropdown-menu-sw"
  }, Object(dom_chef.h)("a", {
   href: `/${repoUrl}/compare`,
   class: "dropdown-item",
   "data-skip-pjax": !0
  }, Object(dom_chef.h)("svg", {
   xmlns: "http://www.w3.org/2000/svg",
   class: "octicon octicon-diff",
   height: "16",
   viewBox: "0 0 13 16",
   width: "15"
  }, Object(dom_chef.h)("path", {
   d: "M6 7h2v1H6v2H5V8H3V7h2V5h1zm-3 6h5v-1H3zM7.5 2L11 5.5V15c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1zm1-2H3v1h5l4 4v8h1V4.5z",
   "fill-rule": "evenodd"
  })), Object(dom_chef.h)("span", {
   itemprop: "name"
  }, " Compare")), "github.com" !== location.hostname && "gist.github.com" !== location.hostname ? "" : Object(dom_chef.h)("a", {
   href: `/${repoUrl}/network/dependencies`,
   class: "dropdown-item rgh-dependency-graph",
   "data-skip-pjax": !0
  }, Object(dom_chef.h)("svg", {
   class: "octicon octicon-package",
   viewBox: "0 0 16 16",
   version: "1.1",
   width: "16",
   height: "16",
   "aria-hidden": "true"
  }, Object(dom_chef.h)("path", {
   "fill-rule": "evenodd",
   d: "M1 4.27v7.47c0 .45.3.84.75.97l6.5 1.73c.16.05.34.05.5 0l6.5-1.73c.45-.13.75-.52.75-.97V4.27c0-.45-.3-.84-.75-.97l-6.5-1.74a1.4 1.4 0 0 0-.5 0L1.75 3.3c-.45.13-.75.52-.75.97zm7 9.09l-6-1.59V5l6 1.61v6.75zM2 4l2.5-.67L11 5.06l-2.5.67L2 4zm13 7.77l-6 1.59V6.61l2-.55V8.5l2-.53V5.53L15 5v6.77zm-2-7.24L6.5 2.8l2-.53L15 4l-2 .53z"
  })), Object(dom_chef.h)("span", {
   itemprop: "name"
  }, " Dependencies")), Object(dom_chef.h)("a", {
   href: `/${repoUrl}/pulse`,
   class: "dropdown-item",
   "data-skip-pjax": !0
  }, Object(dom_chef.h)("svg", {
   "aria-hidden": "true",
   class: "octicon octicon-graph",
   height: "16",
   version: "1.1",
   viewBox: "0 0 16 16",
   width: "16"
  }, Object(dom_chef.h)("path", {
   "fill-rule": "evenodd",
   d: "M16 14v1H0V0h1v14h15zM5 13H3V8h2v5zm4 0H7V3h2v10zm4 0h-2V6h2v7z"
  })), Object(dom_chef.h)("span", {
   itemprop: "name"
  }, " Insights"))))));
  const insightsTab = select_dom_default()('[data-selected-links~="pulse"]');
  insightsTab && insightsTab.remove();
 };
 const add_releases_tab_repoUrl = getRepoURL();
 var add_releases_tab = () => {
  if (select_dom_default.a.exists(".reponav-releases")) return;
  const releasesTab = Object(dom_chef.h)("a", {
   href: `/${add_releases_tab_repoUrl}/releases`,
   class: "reponav-item reponav-releases",
   "data-hotkey": "g r"
  }, tag(), Object(dom_chef.h)("span", null, " Releases "));
  select_dom_default()(".reponav-dropdown").before(releasesTab), async function() {
   const releasesCountCacheKey = `${add_releases_tab_repoUrl}-releases-count`;
   if (isRepoRoot()) {
    const releasesCount = select_dom_default()('.numbers-summary a[href$="/releases"] .num').textContent.trim();
    appendReleasesCount(releasesCount), localStorage.setItem(releasesCountCacheKey, releasesCount);
   } else appendReleasesCount(localStorage.getItem(releasesCountCacheKey)[releasesCountCacheKey]);
  }(), /^(releases|tags)/.test(getRepoPath()) && (releasesTab.classList.add("js-selected-navigation-item", "selected"), 
  select_dom_default()(".reponav-item.selected").classList.remove("js-selected-navigation-item", "selected"));
 }, add_time_machine_links_to_comments = async () => {
  const comments = select_dom_default.a.all(".timeline-comment-header:not(.rgh-timestamp-tree-link)");
  for (const comment of comments) {
   const timestampEl = select_dom_default()("relative-time", comment), timestamp = timestampEl.attributes.datetime.value, href = `/${getRepoURL()}/tree/HEAD@{${timestamp}}`;
   timestampEl.parentNode.after(Object(dom_chef.h)("span", null, " ", Object(dom_chef.h)("a", {
    href: href,
    class: "timeline-comment-action btn-link rgh-timestamp-button tooltipped tooltipped-n rgh-tooltipped",
    "aria-label": "View repo at the time of this comment"
   }, icons_code()))), comment.classList.add("rgh-timestamp-tree-link");
  }
 };
 const remove_upload_files_button_repoUrl = getRepoURL();
 var remove_upload_files_button = () => {
  if (isRepoRoot()) {
   const uploadFilesButton = select_dom_default()(`.file-navigation a[href^="/${remove_upload_files_button_repoUrl}/upload"]`);
   uploadFilesButton && uploadFilesButton.remove();
  }
 }, scroll_to_top_on_collapse = () => {
  const toolbar = select_dom_default()(".pr-toolbar");
  $(".js-diff-progressive-container").on("details:toggled", ".file", ({target: target}) => {
   const elOffset = target.getBoundingClientRect().top, toolbarHeight = toolbar.getBoundingClientRect().top;
   elOffset < toolbarHeight && window.scrollBy(0, elOffset - toolbarHeight);
  });
 }, remove_diff_signs = function() {
  const diffElements = select_dom_default()(".js-discussion, #files");
  diffElements && observeEl(diffElements, removeDiffSignsAndWatchExpansions, {
   childList: !0,
   subtree: !0
  });
 }, hide_empty_meta = function() {
  if (isRepoRoot()) {
   const meta = select_dom_default()(".repository-meta");
   select_dom_default.a.exists("em", meta) && !select_dom_default.a.exists(".js-edit-repo-meta-button") && (meta.style.display = "none");
  }
 }, hide_own_stars = async function() {
  const {hideStarsOwnRepos: hideStarsOwnRepos} = safari.extension.settings;
  if (hideStarsOwnRepos) {
   const username = getUsername();
   observeEl("#dashboard .news", () => {
    $("#dashboard .news .watch_started, #dashboard .news .fork").has(`a[href^="/${username}"]`).css("display", "none");
   });
  }
 }, move_marketplace_link_to_profile_dropdown = function() {
  const lastDivider = select_dom_default.a.all(".user-nav .dropdown-divider").pop();
  if (!lastDivider) return;
  const marketplaceLink = Object(dom_chef.h)("a", {
   class: "dropdown-item",
   href: "/marketplace"
  }, "Marketplace"), divider = Object(dom_chef.h)("div", {
   class: "dropdown-divider"
  });
  lastDivider.before(divider), lastDivider.before(marketplaceLink);
 }, add_trending_menu_item = async function() {
  const selectedClass = isTrending() ? "selected" : "", issuesLink = await safeElementReady('.HeaderNavlink[href="/issues"], .header-nav-link[href="/issues"]');
  if (issuesLink && (issuesLink.parentNode.after(Object(dom_chef.h)("li", {
   class: "header-nav-item"
  }, Object(dom_chef.h)("a", {
   href: "/trending",
   class: `js-selected-navigation-item HeaderNavlink header-nav-link px-2 ${selectedClass}`,
   "data-hotkey": "g t"
  }, "Trending"))), isTrending())) {
   const exploreLink = await safeElementReady('a[href="/explore"]');
   exploreLink && exploreLink.classList.remove("selected");
  }
 }, add_profile_hotkey = function() {
  const menuItem = select_dom_default()(`#user-links a.dropdown-item[href="/${getUsername()}"]`);
  menuItem && menuItem.setAttribute("data-hotkey", "g m");
 }, add_yours_menu_item = function() {
  const pageName = isIssueSearch() ? "issues" : "pulls", username = getUsername();
  if (select_dom_default.a.exists(".refined-github-yours")) return;
  const yoursMenuItem = Object(dom_chef.h)("a", {
   href: `/${pageName}?q=is%3Aopen+is%3Aissue+user%3A${username}`,
   class: "subnav-item refined-github-yours"
  }, "Yours");
  if (!select_dom_default.a.exists(".subnav-links .selected") && location.search.includes(`user%3A${username}`)) {
   yoursMenuItem.classList.add("selected");
   for (const tab of select_dom_default.a.all(`.subnav-links a[href*="user%3A${username}"]`)) tab.href = tab.href.replace(`user%3A${username}`, "");
  }
  select_dom_default()(".subnav-links").append(yoursMenuItem);
 }, to_semver = __webpack_require__(25), to_semver_default = __webpack_require__.n(to_semver);
 const add_readme_buttons_repoUrl = getRepoURL();
 var add_readme_buttons = function() {
  const readmeContainer = select_dom_default()(".repository-content > #readme");
  if (!readmeContainer) return;
  const buttons = Object(dom_chef.h)("div", {
   id: "refined-github-readme-buttons"
  }), tags = select_dom_default.a.all('.branch-select-menu [data-tab-filter="tags"] .select-menu-item').map(element => [ element.getAttribute("data-name"), element.getAttribute("href") ]), releases = new Map(tags), [latestRelease] = to_semver_default()([ ...releases.keys() ], {
   clean: !1
  });
  if (latestRelease && buttons.appendChild(Object(dom_chef.h)("a", {
   class: "tooltipped tooltipped-nw rgh-tooltipped",
   href: `${releases.get(latestRelease)}#readme`,
   "aria-label": `View this file at the latest version (${latestRelease})`
  }, tag())), "Branch:" === select_dom_default()(".branch-select-menu i").textContent) {
   const readmeName = select_dom_default()("#readme > h3").textContent.trim(), path = select_dom_default()(".breadcrumb").textContent.trim().split("/").slice(1).join("/"), currentBranch = select_dom_default()(".branch-select-menu .select-menu-item.selected").textContent.trim();
   buttons.appendChild(Object(dom_chef.h)("a", {
    href: `/${add_readme_buttons_repoUrl}/edit/${currentBranch}/${path}${readmeName}`
   }, Object(dom_chef.h)("svg", {
    class: "octicon octicon-pencil",
    height: "16",
    version: "1.1",
    viewBox: "0 0 14 16",
    width: "14"
   }, Object(dom_chef.h)("path", {
    d: "M0 12v3h3l8-8-3-3L0 12z m3 2H1V12h1v1h1v1z m10.3-9.3l-1.3 1.3-3-3 1.3-1.3c0.39-0.39 1.02-0.39 1.41 0l1.59 1.59c0.39 0.39 0.39 1.02 0 1.41z"
   }))));
  }
  readmeContainer.appendChild(buttons);
 };
 const add_delete_fork_link_repoUrl = getRepoURL();
 var add_delete_fork_link = function() {
  const postMergeDescription = select_dom_default()("#partial-pull-merging .merge-branch-description");
  if (postMergeDescription) {
   const currentBranch = postMergeDescription.querySelector(".commit-ref"), forkPath = currentBranch ? currentBranch.title.split(":")[0] : null;
   forkPath && forkPath !== add_delete_fork_link_repoUrl && postMergeDescription.append(Object(dom_chef.h)("a", {
    id: "refined-github-delete-fork-link",
    href: `/${forkPath}/settings`
   }, "Delete fork"));
  }
 }, linkify_issues_in_titles = function() {
  observeEl(select_dom_default()("#partial-discussion-header").parentNode, () => {
   const title = select_dom_default()(".js-issue-title:not(.refined-linkified-title)");
   title && (title.classList.add("refined-linkified-title"), editTextNodes(linkify_issues_default.a, title));
  });
 }, add_patch_diff_links = function() {
  if (select_dom_default.a.exists(".sha-block.patch-diff-links")) return;
  let commitUrl = location.pathname.replace(/\/$/, "");
  isPRCommit() && (commitUrl = commitUrl.replace(/\/pull\/\d+\/commits/, "/commit")), 
  select_dom_default()(".commit-meta span.float-right").append(Object(dom_chef.h)("span", {
   class: "sha-block patch-diff-links"
  }, Object(dom_chef.h)("a", {
   href: `${commitUrl}.patch`,
   class: "sha"
  }, "patch"), " ", Object(dom_chef.h)("a", {
   href: `${commitUrl}.diff`,
   class: "sha"
  }, "diff")));
 }, mark_merge_commits_in_list = function() {
  for (const commit of select_dom_default.a.all(".commits-list-item:not(.refined-github-merge-commit)")) select_dom_default.a.exists('[title^="Merge pull request"]', commit) && (commit.classList.add("refined-github-merge-commit"), 
  commit.querySelector(".commit-avatar-cell").prepend(mergedPullRequest()), commit.querySelector(".avatar").classList.add("avatar-child"));
 };
 const show_recently_pushed_branches_repoUrl = getRepoURL();
 var show_recently_pushed_branches = async function() {
  if (select_dom_default.a.exists("[data-url$=recently_touched_branches_list]")) return;
  const codeTabURL = select_dom_default()('[data-hotkey="g c"]').href, fragmentURL = `/${show_recently_pushed_branches_repoUrl}/show_partial?partial=tree%2Frecently_touched_branches_list`;
  (await fetch(codeTabURL, {
   credentials: "include"
  }).then(res => res.text())).includes(fragmentURL) && select_dom_default()(".repository-content").prepend(Object(dom_chef.h)("include-fragment", {
   src: fragmentURL
  }));
 }, add_diff_view_without_whitespace_option = function() {
  const container = select_dom_default()([ ".table-of-contents.Details .BtnGroup", ".pr-review-tools > .diffbar-item" ].join(","));
  if (!container || select_dom_default.a.exists(".refined-github-toggle-whitespace")) return;
  const url = new URL(location.href), hidingWhitespace = "1" === url.searchParams.get("w");
  hidingWhitespace ? url.searchParams.delete("w") : url.searchParams.set("w", 1), 
  container.after(Object(dom_chef.h)("div", {
   class: "diffbar-item refined-github-toggle-whitespace"
  }, Object(dom_chef.h)("a", {
   href: url,
   "data-hotkey": "d w",
   class: `btn btn-sm btn-outline BtnGroup-item tooltipped tooltipped-s rgh-tooltipped ${hidingWhitespace ? "bg-gray-light text-gray-light" : ""}`,
   "aria-label": `${hidingWhitespace ? "Show" : "Hide"} whitespace in diffs`
  }, hidingWhitespace ? check() : "", " ", "No Whitespace"))), select_dom_default()('[data-hotkey="c"]').firstChild.remove();
 }, preserve_whitespace_option_in_nav = function() {
  const navLinks = select_dom_default.a.all(".commit > .BtnGroup.float-right > a.BtnGroup-item");
  if (0 === navLinks.length) return;
  if ("1" === new URL(location.href).searchParams.get("w")) for (const a of navLinks) {
   const linkUrl = new URL(a.href);
   linkUrl.searchParams.set("w", "1"), a.href = linkUrl;
  }
 };
 const add_milestone_navigation_repoUrl = getRepoURL();
 var add_milestone_navigation = function() {
  select_dom_default()(".repository-content").before(Object(dom_chef.h)("div", {
   class: "subnav"
  }, Object(dom_chef.h)("div", {
   class: "subnav-links float-left",
   role: "navigation"
  }, Object(dom_chef.h)("a", {
   href: `/${add_milestone_navigation_repoUrl}/labels`,
   class: "subnav-item"
  }, "Labels"), Object(dom_chef.h)("a", {
   href: `/${add_milestone_navigation_repoUrl}/milestones`,
   class: "subnav-item"
  }, "Milestones"))));
 };
 const add_filter_comments_by_you_repoUrl = getRepoURL();
 var add_filter_comments_by_you = function() {
  select_dom_default.a.exists(".refined-github-filter") || select_dom_default()(".subnav-search-context .js-navigation-item:last-child").before(Object(dom_chef.h)("a", {
   href: `/${add_filter_comments_by_you_repoUrl}/issues?q=is%3Aopen+commenter:${getUsername()}`,
   class: "select-menu-item js-navigation-item refined-github-filter"
  }, Object(dom_chef.h)("div", {
   class: "select-menu-item-text"
  }, "Everything commented by you")));
 };
 const add_project_new_link_repoUrl = getRepoURL();
 var add_project_new_link = function() {
  select_dom_default.a.exists("#projects-feature:checked") && !select_dom_default.a.exists("#refined-github-project-new-link") && select_dom_default()("#projects-feature ~ p.note").after(Object(dom_chef.h)("a", {
   href: `/${add_project_new_link_repoUrl}/projects/new`,
   class: "btn btn-sm",
   id: "refined-github-project-new-link"
  }, "Add a project"));
 }, remove_projects_tab = function() {
  const projectsTab = select_dom_default()('.js-repo-nav .reponav-item[data-selected-links^="repo_projects"]');
  projectsTab && "0" === projectsTab.querySelector(".Counter, .counter").textContent && projectsTab.remove();
 }, fix_squash_and_merge_title = function() {
  const btn = select_dom_default()(".merge-message .btn-group-squash [type=submit]");
  btn && btn.addEventListener("click", () => {
   const title = select_dom_default()(".js-issue-title").textContent, number = select_dom_default()(".gh-header-number").textContent;
   select_dom_default()("#merge_title_field").value = `${title.trim()} (${number})`;
  });
 }, add_title_to_emojis = function() {
  for (const emoji of select_dom_default.a.all("g-emoji")) emoji.setAttribute("title", `:${emoji.getAttribute("alias")}:`);
 }, sort_milestones_by_closest_due_date = function() {
  for (const a of select_dom_default.a.all('a[href$="/milestones"], a[href*="/milestones?"]')) {
   const url = new URL(a.href);
   url.searchParams.get("direction") || url.searchParams.get("sort") || (url.searchParams.set("direction", "asc"), 
   url.searchParams.set("sort", "due_date"), a.href = url);
  }
 }, move_account_switcher_to_sidebar = function() {
  safeElementReady(".dashboard-sidebar").then(sidebar => {
   const switcher = select_dom_default()(".account-switcher");
   sidebar && switcher && sidebar.prepend(switcher);
  });
 }, open_ci_details_in_new_tab = function() {
  const CIDetailsLinks = select_dom_default.a.all("a.status-actions");
  for (const link of CIDetailsLinks) link.setAttribute("target", "_blank"), link.setAttribute("rel", "noopener");
 }, focus_confirmation_buttons = function() {
  window.addEventListener("facebox:reveal", () => {
   select_dom_default()(".facebox-content button").focus();
  });
 }, add_keyboard_shortcuts_to_comment_fields = function() {
  $(document).on("keydown", ".js-comment-field", event => {
   const field = event.target;
   if ("Tab" === event.key && !event.shiftKey) {
    if (select_dom_default.a.exists(".suggester.active")) return;
    return function(el, size = 4) {
     const selection = window.getSelection().toString(), {selectionStart: selectionStart, selectionEnd: selectionEnd, value: value} = el, isMultiLine = /\n/.test(selection), firstLineStart = value.lastIndexOf("\n", selectionStart) + 1;
     if (el.focus(), isMultiLine) {
      const indexes = value.substring(firstLineStart, selectionEnd).split("\n").map(line => line.length);
      indexes.unshift(firstLineStart), indexes.pop();
      for (let i = 1; i < indexes.length; i++) indexes[i] += indexes[i - 1] + 1;
      for (let i = indexes.length - 1; i >= 0; i--) el.setSelectionRange(indexes[i], indexes[i]), 
      document.execCommand("insertText", !1, " ".repeat(size));
      el.setSelectionRange(selectionStart + size, selectionEnd + size * indexes.length);
     } else {
      const indentSize = size - (selectionEnd - firstLineStart) % size || size;
      document.execCommand("insertText", !1, " ".repeat(indentSize));
     }
    }(field), !1;
   }
   if ("Enter" === event.key && event.shiftKey) {
    const singleCommentButton = select_dom_default()(".review-simple-reply-button", field.form);
    if (singleCommentButton) return singleCommentButton.click(), !1;
   } else if ("Escape" === event.key) {
    const cancelButton = select_dom_default()(".js-hide-inline-comment-form", field.form);
    if ("" !== field.value && cancelButton) return cancelButton.click(), !1;
   }
  });
 }, add_confirmation_to_comment_cancellation = function() {
  $(document).on("click", ".js-hide-inline-comment-form", event => {
   "" !== event.target.closest(".js-inline-comment-form").querySelector(".js-comment-field").value && !1 === window.confirm("Are you sure you want to discard your unsaved changes?") && (event.stopPropagation(), 
   event.stopImmediatePropagation());
  });
 };
 let request;
 var add_ci_link = async function() {
  if (!1 !== request && !select_dom_default.a.exists(".rgh-ci-link")) try {
   request ? (await request).style.animation = "none" : request = async function() {
    const url = `${location.origin}/${getRepoURL()}/commits/`, dom = await fetch(url, {
     credentials: "include"
    }).then(r => r.text()).then(domify), icon = select_dom_default()(".commit-build-statuses", dom);
    return icon.classList.add("rgh-ci-link"), icon;
   }(), select_dom_default()(".pagehead h1").append(await request);
  } catch (err) {
   request = !1;
  }
 };
 window.$ = $, window.select = select_dom_default.a, async function() {
  await safeElementReady("body"), document.body.classList.contains("logged-out") || (select_dom_default.a.exists("html.refined-github") ? console.error("\n❤️💛💚💙💜❤️💛💚💙💜❤️💛💚💙💜❤️💛💚💙💜\nMinor bug in Refined GitHub, but we need your help to fix it:\nhttps://github.com/sindresorhus/refined-github/issues/565\n\nWe'll need to know:\n\n1. Are you running two extensions at once? Chrome Web Store + development. If so, just disable one of them.\n2. Are you on GitHub Enteprise?\n3. The content of the console of this page.\n4. The content of the console of the background page after enabling the Developer mode in the Extensions page: https://i.imgur.com/zjIngb4.png\n\nThank you! 🎉\n❤️💛💚💙💜❤️💛💚💙💜❤️💛💚💙💜❤️💛💚💙💜") : (document.documentElement.classList.add("refined-github"), 
  isGist() || safely(add_trending_menu_item), isDashboard() && safely(move_account_switcher_to_sidebar), 
  safely(focus_confirmation_buttons), safely(add_keyboard_shortcuts_to_comment_fields), 
  safely(add_confirmation_to_comment_cancellation), dom_loaded_default.a.then(onDomReady)));
 }();
}, function(module, exports, __webpack_require__) {
 function joinValues(array, delimiter = "/") {
  return array.filter(s => s).join(delimiter);
 }
 function shortenURL(href, currentUrl = "https://github.com") {
  if (!href) return;
  const currentRepo = (currentUrl = new URL(currentUrl)).pathname.slice(1).split("/", 2).join("/"), {origin: origin, pathname: pathname, search: search, hash: hash} = new URL(href), isRaw = [ "https://raw.githubusercontent.com", "https://cdn.rawgit.com", "https://rawgit.com" ].includes(origin);
  let [user, repo, type, revision, ...filePath] = pathname.substr(1).split("/");
  isRaw && ([user, repo, revision, ...filePath] = pathname.substr(1).split("/"), type = "raw"), 
  revision = function(revision) {
   if (revision) return revision = revision.replace(patchDiffRegex, ""), /^[0-9a-f]{40}$/.test(revision) && (revision = revision.substr(0, 7)), 
   `<code>${revision}</code>`;
  }(revision), filePath = filePath.join("/");
  const isLocal = origin === currentUrl.origin, isThisRepo = (isLocal || isRaw) && currentRepo === `${user}/${repo}`, isReserved = reservedPaths.includes(user), [, diffOrPatch] = pathname.match(patchDiffRegex) || [], [, release] = pathname.match(releaseRegex) || [], [, releaseTag, releaseTagExt] = pathname.match(releaseArchiveRegex) || [], [, downloadTag, downloadFilename] = pathname.match(releaseDownloadRegex) || [], [, label] = pathname.match(labelRegex) || [], isFileOrDir = revision && [ "raw", "tree", "blob", "blame", "commits" ].includes(type), repoUrl = isThisRepo ? "" : `${user}/${repo}`;
  if (isReserved || "/" === pathname || !isLocal && !isRaw) return href.replace(/^https:[/][/]/, "").replace(/^www[.]/, "").replace(/[/]$/, "");
  if (user && !repo) return `@${user}${search}${hash}`;
  if (isFileOrDir) {
   const partial = `${joinValues([ `${repoUrl}${filePath ? repoUrl ? ":" : "/" : ""}${filePath}`, revision ], "@")}${search}${hash}`;
   return "blob" !== type && "tree" !== type ? `${partial} (${type})` : partial;
  }
  if (diffOrPatch) {
   return `${joinValues([ repoUrl, revision ], "@")}.${diffOrPatch}${search}${hash}`;
  }
  if (release) {
   return `${joinValues([ repoUrl, `<code>${release}</code>` ], "@")}${search}${hash} (release)`;
  }
  if (releaseTagExt) {
   return `${joinValues([ repoUrl, `<code>${releaseTag}</code>` ], "@")}${releaseTagExt}${search}${hash}`;
  }
  if (downloadFilename) {
   return `${joinValues([ repoUrl, `<code>${downloadTag}</code>` ], "@")} ${downloadFilename}${search}${hash} (download)`;
  }
  return label ? joinValues([ repoUrl, label ]) + `${search}${hash} (label)` : `${pathname.replace(/^[/]|[/]$/g, "")}${search}${hash}`;
 }
 const {URL: URL} = __webpack_require__(11), reservedPaths = __webpack_require__(3), patchDiffRegex = /[.](patch|diff)$/, releaseRegex = /releases[/]tag[/]([^/]+)/, labelRegex = /labels[/]([^/]+)/, releaseArchiveRegex = /archive[/](.+)([.]zip|[.]tar[.]gz)/, releaseDownloadRegex = /releases[/]download[/]([^/]+)[/](.+)/;
 module.exports = shortenURL, module.exports.applyToLink = function(a, currentUrl) {
  if (a.href === a.textContent || a.href === `${a.textContent}/`) {
   const shortened = shortenURL(a.href, currentUrl);
   if (shortened !== a.textContent) return a.innerHTML = shortened, !0;
  }
  return !1;
 };
}, function(module, exports) {
 module.exports.URL = URL;
}, function(module, exports) {
 module.exports = [ "a", "altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "animation", "audio", "canvas", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "discard", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignObject", "g", "glyph", "glyphRef", "handler", "hatch", "hatchpath", "hkern", "iframe", "image", "line", "linearGradient", "listener", "marker", "mask", "mesh", "meshgradient", "meshpatch", "meshrow", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "prefetch", "radialGradient", "rect", "script", "set", "solidColor", "solidcolor", "stop", "style", "svg", "switch", "symbol", "tbreak", "text", "textArea", "textPath", "title", "tref", "tspan", "unknown", "use", "video", "view", "vkern" ];
}, function(module, exports, __webpack_require__) {
 "use strict";
 function flat(arr, acc) {
  for (var len = arr.length, idx = -1; ++idx < len; ) {
   var cur = arr[idx];
   Array.isArray(cur) ? flat(cur, acc) : acc.push(cur);
  }
  return acc;
 }
 /*!
 * arr-flatten <https://github.com/jonschlinkert/arr-flatten>
 *
 * Copyright (c) 2014-2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */
 module.exports = function(arr) {
  return flat(arr, []);
 };
}, function(module, exports, __webpack_require__) {
 "use strict";
 const reservedNames = __webpack_require__(3);
 exports.all = reservedNames, exports.check = (name => (name = (name || "").toString().toLowerCase(), 
 reservedNames.includes(name)));
}, function(module, exports, __webpack_require__) {
 "use strict";
 const PCancelable = __webpack_require__(16), selectorCache = new Map();
 module.exports = ((selector, options) => {
  if (options = Object.assign({
   target: document
  }, options), selectorCache.has(selector)) return selectorCache.get(selector);
  const promise = new PCancelable((onCancel, resolve) => {
   let raf;
   onCancel(() => {
    cancelAnimationFrame(raf);
   }), function check() {
    const el = options.target.querySelector(selector);
    el ? (resolve(el), selectorCache.delete(selector)) : raf = requestAnimationFrame(check);
   }();
  });
  return selectorCache.set(selector, promise), promise;
 });
}, function(module, exports, __webpack_require__) {
 "use strict";
 class CancelError extends Error {
  constructor() {
   super("Promise was canceled"), this.name = "CancelError";
  }
 }
 class PCancelable {
  static fn(fn) {
   return function() {
    const args = [].slice.apply(arguments);
    return new PCancelable((onCancel, resolve, reject) => {
     args.unshift(onCancel), fn.apply(null, args).then(resolve, reject);
    });
   };
  }
  constructor(executor) {
   this._pending = !0, this._canceled = !1, this._promise = new Promise((resolve, reject) => (this._reject = reject, 
   executor(fn => {
    this._cancel = fn;
   }, val => {
    this._pending = !1, resolve(val);
   }, err => {
    this._pending = !1, reject(err);
   })));
  }
  then() {
   return this._promise.then.apply(this._promise, arguments);
  }
  catch() {
   return this._promise.catch.apply(this._promise, arguments);
  }
  cancel() {
   if (this._pending && !this._canceled) {
    if ("function" == typeof this._cancel) try {
     this._cancel();
    } catch (err) {
     this._reject(err);
    }
    this._canceled = !0, this._reject(new CancelError());
   }
  }
  get canceled() {
   return this._canceled;
  }
 }
 Object.setPrototypeOf(PCancelable.prototype, Promise.prototype), module.exports = PCancelable, 
 module.exports.CancelError = CancelError;
}, function(module, exports, __webpack_require__) {
 "use strict";
 const mimicFn = __webpack_require__(5);
 module.exports = ((fn, opts) => {
  if (!0 === opts) throw new TypeError("The second argument is now an options object");
  if ("function" != typeof fn) throw new TypeError("Expected a function");
  opts = opts || {};
  let ret, called = !1;
  const fnName = fn.displayName || fn.name || "<anonymous>", onetime = function() {
   if (called) {
    if (!0 === opts.throw) throw new Error(`Function \`${fnName}\` can only be called once`);
    return ret;
   }
   return called = !0, ret = fn.apply(this, arguments), fn = null, ret;
  };
  return mimicFn(onetime, fn), onetime;
 });
}, function(module, exports, __webpack_require__) {
 "use strict";
 module.exports = (input => {
  const el = document.createElement("textarea");
  el.value = input, el.setAttribute("readonly", ""), el.style.contain = "strict", 
  el.style.position = "absolute", el.style.left = "-9999px", el.style.fontSize = "12pt";
  const selection = getSelection();
  let originalRange = !1;
  selection.rangeCount > 0 && (originalRange = selection.getRangeAt(0)), document.body.appendChild(el), 
  el.select(), el.selectionStart = 0, el.selectionEnd = input.length;
  let success = !1;
  try {
   success = document.execCommand("copy");
  } catch (err) {}
  return document.body.removeChild(el), originalRange && (selection.removeAllRanges(), 
  selection.addRange(originalRange)), success;
 });
}, function(module, exports, __webpack_require__) {
 "use strict";
 const createHtmlElement = __webpack_require__(7), linkify = (href, options) => createHtmlElement({
  name: "a",
  attributes: Object.assign({
   href: ""
  }, options.attributes, {
   href: href
  }),
  value: href
 });
 module.exports = ((input, options) => {
  if ("string" === (options = Object.assign({
   attributes: {},
   type: "string"
  }, options)).type) return ((input, options) => input.replace(/((?:https?(?::\/\/))(?:www\.)?[a-zA-Z0-9-_.]+(?:\.[a-zA-Z0-9]{2,})(?:[-a-zA-Z0-9:%_+.~#?&//=@]*))/g, match => linkify(match, options)))(input, options);
  if ("dom" === options.type) return ((input, options) => input.split(/((?:https?(?::\/\/))(?:www\.)?[a-zA-Z0-9-_.]+(?:\.[a-zA-Z0-9]{2,})(?:[-a-zA-Z0-9:%_+.~#?&//=@]*))/g).reduce((frag, text, index) => (index % 2 ? frag.appendChild((html => document.createRange().createContextualFragment(html))(linkify(text, options))) : text.length > 0 && frag.appendChild(document.createTextNode(text)), 
  frag), document.createDocumentFragment()))(input, options);
  throw new Error("The type option must be either dom or string");
 });
}, function(module, exports, __webpack_require__) {
 "use strict";
 const escapeGoat = __webpack_require__(21);
 module.exports = (input => {
  const attributes = [];
  for (const key of Object.keys(input)) {
   let value = input[key];
   if (!1 === value) continue;
   Array.isArray(value) && (value = value.join(" "));
   let attribute = escapeGoat.escape(key);
   !0 !== value && (attribute += `="${escapeGoat.escape(String(value))}"`), attributes.push(attribute);
  }
  return attributes.length > 0 ? " " + attributes.join(" ") : "";
 });
}, function(module, exports, __webpack_require__) {
 "use strict";
 exports.escape = (input => input.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;")), 
 exports.unescape = (input => input.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">"));
}, function(module, exports, __webpack_require__) {
 "use strict";
 module.exports = __webpack_require__(23);
}, function(module, exports) {
 module.exports = [ "area", "base", "br", "col", "embed", "hr", "img", "input", "link", "menuitem", "meta", "param", "source", "track", "wbr" ];
}, function(module, exports, __webpack_require__) {
 "use strict";
 module.exports = (() => /(?:[\w-.]+\/[\w-.]+)?#[1-9]\d*/g);
}, function(module, exports, __webpack_require__) {
 "use strict";
 const semver = __webpack_require__(26);
 module.exports = ((versions, options) => {
  options = Object.assign({
   includePrereleases: !0,
   clean: !0
  }, options);
  let sortedVersions = versions.filter(x => semver.valid(x)).sort(semver.rcompare);
  return options.includePrereleases || (sortedVersions = sortedVersions.filter(x => null === semver.prerelease(x))), 
  options.clean && (sortedVersions = sortedVersions.map(x => semver.clean(x))), sortedVersions;
 });
}, function(module, exports, __webpack_require__) {
 function parse(version, loose) {
  if (version instanceof SemVer) return version;
  if ("string" != typeof version) return null;
  if (version.length > MAX_LENGTH) return null;
  if (!(loose ? re[LOOSE] : re[FULL]).test(version)) return null;
  try {
   return new SemVer(version, loose);
  } catch (er) {
   return null;
  }
 }
 function SemVer(version, loose) {
  if (version instanceof SemVer) {
   if (version.loose === loose) return version;
   version = version.version;
  } else if ("string" != typeof version) throw new TypeError("Invalid Version: " + version);
  if (version.length > MAX_LENGTH) throw new TypeError("version is longer than " + MAX_LENGTH + " characters");
  if (!(this instanceof SemVer)) return new SemVer(version, loose);
  debug("SemVer", version, loose), this.loose = loose;
  var m = version.trim().match(loose ? re[LOOSE] : re[FULL]);
  if (!m) throw new TypeError("Invalid Version: " + version);
  if (this.raw = version, this.major = +m[1], this.minor = +m[2], this.patch = +m[3], 
  this.major > MAX_SAFE_INTEGER || this.major < 0) throw new TypeError("Invalid major version");
  if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) throw new TypeError("Invalid minor version");
  if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) throw new TypeError("Invalid patch version");
  m[4] ? this.prerelease = m[4].split(".").map(function(id) {
   if (/^[0-9]+$/.test(id)) {
    var num = +id;
    if (num >= 0 && num < MAX_SAFE_INTEGER) return num;
   }
   return id;
  }) : this.prerelease = [], this.build = m[5] ? m[5].split(".") : [], this.format();
 }
 function compareIdentifiers(a, b) {
  var anum = numeric.test(a), bnum = numeric.test(b);
  return anum && bnum && (a = +a, b = +b), anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : a > b ? 1 : 0;
 }
 function compare(a, b, loose) {
  return new SemVer(a, loose).compare(b);
 }
 function rcompare(a, b, loose) {
  return compare(b, a, loose);
 }
 function gt(a, b, loose) {
  return compare(a, b, loose) > 0;
 }
 function lt(a, b, loose) {
  return compare(a, b, loose) < 0;
 }
 function eq(a, b, loose) {
  return 0 === compare(a, b, loose);
 }
 function neq(a, b, loose) {
  return 0 !== compare(a, b, loose);
 }
 function gte(a, b, loose) {
  return compare(a, b, loose) >= 0;
 }
 function lte(a, b, loose) {
  return compare(a, b, loose) <= 0;
 }
 function cmp(a, op, b, loose) {
  var ret;
  switch (op) {
  case "===":
   "object" == typeof a && (a = a.version), "object" == typeof b && (b = b.version), 
   ret = a === b;
   break;

  case "!==":
   "object" == typeof a && (a = a.version), "object" == typeof b && (b = b.version), 
   ret = a !== b;
   break;

  case "":
  case "=":
  case "==":
   ret = eq(a, b, loose);
   break;

  case "!=":
   ret = neq(a, b, loose);
   break;

  case ">":
   ret = gt(a, b, loose);
   break;

  case ">=":
   ret = gte(a, b, loose);
   break;

  case "<":
   ret = lt(a, b, loose);
   break;

  case "<=":
   ret = lte(a, b, loose);
   break;

  default:
   throw new TypeError("Invalid operator: " + op);
  }
  return ret;
 }
 function Comparator(comp, loose) {
  if (comp instanceof Comparator) {
   if (comp.loose === loose) return comp;
   comp = comp.value;
  }
  if (!(this instanceof Comparator)) return new Comparator(comp, loose);
  debug("comparator", comp, loose), this.loose = loose, this.parse(comp), this.semver === ANY ? this.value = "" : this.value = this.operator + this.semver.version, 
  debug("comp", this);
 }
 function Range(range, loose) {
  if (range instanceof Range && range.loose === loose) return range;
  if (!(this instanceof Range)) return new Range(range, loose);
  if (this.loose = loose, this.raw = range, this.set = range.split(/\s*\|\|\s*/).map(function(range) {
   return this.parseRange(range.trim());
  }, this).filter(function(c) {
   return c.length;
  }), !this.set.length) throw new TypeError("Invalid SemVer Range: " + range);
  this.format();
 }
 function parseComparator(comp, loose) {
  return debug("comp", comp), comp = function(comp, loose) {
   return comp.trim().split(/\s+/).map(function(comp) {
    return function(comp, loose) {
     debug("caret", comp, loose);
     var r = loose ? re[CARETLOOSE] : re[CARET];
     return comp.replace(r, function(_, M, m, p, pr) {
      debug("caret", comp, _, M, m, p, pr);
      var ret;
      return isX(M) ? ret = "" : isX(m) ? ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0" : isX(p) ? ret = "0" === M ? ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0" : ">=" + M + "." + m + ".0 <" + (+M + 1) + ".0.0" : pr ? (debug("replaceCaret pr", pr), 
      "-" !== pr.charAt(0) && (pr = "-" + pr), ret = "0" === M ? "0" === m ? ">=" + M + "." + m + "." + p + pr + " <" + M + "." + m + "." + (+p + 1) : ">=" + M + "." + m + "." + p + pr + " <" + M + "." + (+m + 1) + ".0" : ">=" + M + "." + m + "." + p + pr + " <" + (+M + 1) + ".0.0") : (debug("no pr"), 
      ret = "0" === M ? "0" === m ? ">=" + M + "." + m + "." + p + " <" + M + "." + m + "." + (+p + 1) : ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0" : ">=" + M + "." + m + "." + p + " <" + (+M + 1) + ".0.0"), 
      debug("caret return", ret), ret;
     });
    }(comp, loose);
   }).join(" ");
  }(comp, loose), debug("caret", comp), comp = function(comp, loose) {
   return comp.trim().split(/\s+/).map(function(comp) {
    return function(comp, loose) {
     var r = loose ? re[TILDELOOSE] : re[TILDE];
     return comp.replace(r, function(_, M, m, p, pr) {
      debug("tilde", comp, _, M, m, p, pr);
      var ret;
      return isX(M) ? ret = "" : isX(m) ? ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0" : isX(p) ? ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0" : pr ? (debug("replaceTilde pr", pr), 
      "-" !== pr.charAt(0) && (pr = "-" + pr), ret = ">=" + M + "." + m + "." + p + pr + " <" + M + "." + (+m + 1) + ".0") : ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0", 
      debug("tilde return", ret), ret;
     });
    }(comp, loose);
   }).join(" ");
  }(comp, loose), debug("tildes", comp), comp = function(comp, loose) {
   return debug("replaceXRanges", comp, loose), comp.split(/\s+/).map(function(comp) {
    return function(comp, loose) {
     comp = comp.trim();
     var r = loose ? re[XRANGELOOSE] : re[XRANGE];
     return comp.replace(r, function(ret, gtlt, M, m, p, pr) {
      debug("xRange", comp, ret, gtlt, M, m, p, pr);
      var xM = isX(M), xm = xM || isX(m), xp = xm || isX(p), anyX = xp;
      return "=" === gtlt && anyX && (gtlt = ""), xM ? ret = ">" === gtlt || "<" === gtlt ? "<0.0.0" : "*" : gtlt && anyX ? (xm && (m = 0), 
      xp && (p = 0), ">" === gtlt ? (gtlt = ">=", xm ? (M = +M + 1, m = 0, p = 0) : xp && (m = +m + 1, 
      p = 0)) : "<=" === gtlt && (gtlt = "<", xm ? M = +M + 1 : m = +m + 1), ret = gtlt + M + "." + m + "." + p) : xm ? ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0" : xp && (ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0"), 
      debug("xRange return", ret), ret;
     });
    }(comp, loose);
   }).join(" ");
  }(comp, loose), debug("xrange", comp), comp = function(comp, loose) {
   return debug("replaceStars", comp, loose), comp.trim().replace(re[STAR], "");
  }(comp, loose), debug("stars", comp), comp;
 }
 function isX(id) {
  return !id || "x" === id.toLowerCase() || "*" === id;
 }
 function hyphenReplace($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) {
  return from = isX(fM) ? "" : isX(fm) ? ">=" + fM + ".0.0" : isX(fp) ? ">=" + fM + "." + fm + ".0" : ">=" + from, 
  to = isX(tM) ? "" : isX(tm) ? "<" + (+tM + 1) + ".0.0" : isX(tp) ? "<" + tM + "." + (+tm + 1) + ".0" : tpr ? "<=" + tM + "." + tm + "." + tp + "-" + tpr : "<=" + to, 
  (from + " " + to).trim();
 }
 function satisfies(version, range, loose) {
  try {
   range = new Range(range, loose);
  } catch (er) {
   return !1;
  }
  return range.test(version);
 }
 function outside(version, range, hilo, loose) {
  version = new SemVer(version, loose), range = new Range(range, loose);
  var gtfn, ltefn, ltfn, comp, ecomp;
  switch (hilo) {
  case ">":
   gtfn = gt, ltefn = lte, ltfn = lt, comp = ">", ecomp = ">=";
   break;

  case "<":
   gtfn = lt, ltefn = gte, ltfn = gt, comp = "<", ecomp = "<=";
   break;

  default:
   throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (satisfies(version, range, loose)) return !1;
  for (var i = 0; i < range.set.length; ++i) {
   var high = null, low = null;
   if (range.set[i].forEach(function(comparator) {
    comparator.semver === ANY && (comparator = new Comparator(">=0.0.0")), high = high || comparator, 
    low = low || comparator, gtfn(comparator.semver, high.semver, loose) ? high = comparator : ltfn(comparator.semver, low.semver, loose) && (low = comparator);
   }), high.operator === comp || high.operator === ecomp) return !1;
   if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) return !1;
   if (low.operator === ecomp && ltfn(version, low.semver)) return !1;
  }
  return !0;
 }
 exports = module.exports = SemVer;
 var debug;
 debug = function() {}, exports.SEMVER_SPEC_VERSION = "2.0.0";
 var MAX_LENGTH = 256, MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991, re = exports.re = [], src = exports.src = [], R = 0, NUMERICIDENTIFIER = R++;
 src[NUMERICIDENTIFIER] = "0|[1-9]\\d*";
 var NUMERICIDENTIFIERLOOSE = R++;
 src[NUMERICIDENTIFIERLOOSE] = "[0-9]+";
 var NONNUMERICIDENTIFIER = R++;
 src[NONNUMERICIDENTIFIER] = "\\d*[a-zA-Z-][a-zA-Z0-9-]*";
 var MAINVERSION = R++;
 src[MAINVERSION] = "(" + src[NUMERICIDENTIFIER] + ")\\.(" + src[NUMERICIDENTIFIER] + ")\\.(" + src[NUMERICIDENTIFIER] + ")";
 var MAINVERSIONLOOSE = R++;
 src[MAINVERSIONLOOSE] = "(" + src[NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[NUMERICIDENTIFIERLOOSE] + ")";
 var PRERELEASEIDENTIFIER = R++;
 src[PRERELEASEIDENTIFIER] = "(?:" + src[NUMERICIDENTIFIER] + "|" + src[NONNUMERICIDENTIFIER] + ")";
 var PRERELEASEIDENTIFIERLOOSE = R++;
 src[PRERELEASEIDENTIFIERLOOSE] = "(?:" + src[NUMERICIDENTIFIERLOOSE] + "|" + src[NONNUMERICIDENTIFIER] + ")";
 var PRERELEASE = R++;
 src[PRERELEASE] = "(?:-(" + src[PRERELEASEIDENTIFIER] + "(?:\\." + src[PRERELEASEIDENTIFIER] + ")*))";
 var PRERELEASELOOSE = R++;
 src[PRERELEASELOOSE] = "(?:-?(" + src[PRERELEASEIDENTIFIERLOOSE] + "(?:\\." + src[PRERELEASEIDENTIFIERLOOSE] + ")*))";
 var BUILDIDENTIFIER = R++;
 src[BUILDIDENTIFIER] = "[0-9A-Za-z-]+";
 var BUILD = R++;
 src[BUILD] = "(?:\\+(" + src[BUILDIDENTIFIER] + "(?:\\." + src[BUILDIDENTIFIER] + ")*))";
 var FULL = R++, FULLPLAIN = "v?" + src[MAINVERSION] + src[PRERELEASE] + "?" + src[BUILD] + "?";
 src[FULL] = "^" + FULLPLAIN + "$";
 var LOOSEPLAIN = "[v=\\s]*" + src[MAINVERSIONLOOSE] + src[PRERELEASELOOSE] + "?" + src[BUILD] + "?", LOOSE = R++;
 src[LOOSE] = "^" + LOOSEPLAIN + "$";
 var GTLT = R++;
 src[GTLT] = "((?:<|>)?=?)";
 var XRANGEIDENTIFIERLOOSE = R++;
 src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + "|x|X|\\*";
 var XRANGEIDENTIFIER = R++;
 src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + "|x|X|\\*";
 var XRANGEPLAIN = R++;
 src[XRANGEPLAIN] = "[v=\\s]*(" + src[XRANGEIDENTIFIER] + ")(?:\\.(" + src[XRANGEIDENTIFIER] + ")(?:\\.(" + src[XRANGEIDENTIFIER] + ")(?:" + src[PRERELEASE] + ")?" + src[BUILD] + "?)?)?";
 var XRANGEPLAINLOOSE = R++;
 src[XRANGEPLAINLOOSE] = "[v=\\s]*(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:" + src[PRERELEASELOOSE] + ")?" + src[BUILD] + "?)?)?";
 var XRANGE = R++;
 src[XRANGE] = "^" + src[GTLT] + "\\s*" + src[XRANGEPLAIN] + "$";
 var XRANGELOOSE = R++;
 src[XRANGELOOSE] = "^" + src[GTLT] + "\\s*" + src[XRANGEPLAINLOOSE] + "$";
 var LONETILDE = R++;
 src[LONETILDE] = "(?:~>?)";
 var TILDETRIM = R++;
 src[TILDETRIM] = "(\\s*)" + src[LONETILDE] + "\\s+", re[TILDETRIM] = new RegExp(src[TILDETRIM], "g");
 var TILDE = R++;
 src[TILDE] = "^" + src[LONETILDE] + src[XRANGEPLAIN] + "$";
 var TILDELOOSE = R++;
 src[TILDELOOSE] = "^" + src[LONETILDE] + src[XRANGEPLAINLOOSE] + "$";
 var LONECARET = R++;
 src[LONECARET] = "(?:\\^)";
 var CARETTRIM = R++;
 src[CARETTRIM] = "(\\s*)" + src[LONECARET] + "\\s+", re[CARETTRIM] = new RegExp(src[CARETTRIM], "g");
 var CARET = R++;
 src[CARET] = "^" + src[LONECARET] + src[XRANGEPLAIN] + "$";
 var CARETLOOSE = R++;
 src[CARETLOOSE] = "^" + src[LONECARET] + src[XRANGEPLAINLOOSE] + "$";
 var COMPARATORLOOSE = R++;
 src[COMPARATORLOOSE] = "^" + src[GTLT] + "\\s*(" + LOOSEPLAIN + ")$|^$";
 var COMPARATOR = R++;
 src[COMPARATOR] = "^" + src[GTLT] + "\\s*(" + FULLPLAIN + ")$|^$";
 var COMPARATORTRIM = R++;
 src[COMPARATORTRIM] = "(\\s*)" + src[GTLT] + "\\s*(" + LOOSEPLAIN + "|" + src[XRANGEPLAIN] + ")", 
 re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], "g");
 var HYPHENRANGE = R++;
 src[HYPHENRANGE] = "^\\s*(" + src[XRANGEPLAIN] + ")\\s+-\\s+(" + src[XRANGEPLAIN] + ")\\s*$";
 var HYPHENRANGELOOSE = R++;
 src[HYPHENRANGELOOSE] = "^\\s*(" + src[XRANGEPLAINLOOSE] + ")\\s+-\\s+(" + src[XRANGEPLAINLOOSE] + ")\\s*$";
 var STAR = R++;
 src[STAR] = "(<|>)?=?\\s*\\*";
 for (var i = 0; i < R; i++) debug(i, src[i]), re[i] || (re[i] = new RegExp(src[i]));
 exports.parse = parse, exports.valid = function(version, loose) {
  var v = parse(version, loose);
  return v ? v.version : null;
 }, exports.clean = function(version, loose) {
  var s = parse(version.trim().replace(/^[=v]+/, ""), loose);
  return s ? s.version : null;
 }, exports.SemVer = SemVer, SemVer.prototype.format = function() {
  return this.version = this.major + "." + this.minor + "." + this.patch, this.prerelease.length && (this.version += "-" + this.prerelease.join(".")), 
  this.version;
 }, SemVer.prototype.toString = function() {
  return this.version;
 }, SemVer.prototype.compare = function(other) {
  return debug("SemVer.compare", this.version, this.loose, other), other instanceof SemVer || (other = new SemVer(other, this.loose)), 
  this.compareMain(other) || this.comparePre(other);
 }, SemVer.prototype.compareMain = function(other) {
  return other instanceof SemVer || (other = new SemVer(other, this.loose)), compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
 }, SemVer.prototype.comparePre = function(other) {
  if (other instanceof SemVer || (other = new SemVer(other, this.loose)), this.prerelease.length && !other.prerelease.length) return -1;
  if (!this.prerelease.length && other.prerelease.length) return 1;
  if (!this.prerelease.length && !other.prerelease.length) return 0;
  var i = 0;
  do {
   var a = this.prerelease[i], b = other.prerelease[i];
   if (debug("prerelease compare", i, a, b), void 0 === a && void 0 === b) return 0;
   if (void 0 === b) return 1;
   if (void 0 === a) return -1;
   if (a !== b) return compareIdentifiers(a, b);
  } while (++i);
 }, SemVer.prototype.inc = function(release, identifier) {
  switch (release) {
  case "premajor":
   this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", identifier);
   break;

  case "preminor":
   this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", identifier);
   break;

  case "prepatch":
   this.prerelease.length = 0, this.inc("patch", identifier), this.inc("pre", identifier);
   break;

  case "prerelease":
   0 === this.prerelease.length && this.inc("patch", identifier), this.inc("pre", identifier);
   break;

  case "major":
   0 === this.minor && 0 === this.patch && 0 !== this.prerelease.length || this.major++, 
   this.minor = 0, this.patch = 0, this.prerelease = [];
   break;

  case "minor":
   0 === this.patch && 0 !== this.prerelease.length || this.minor++, this.patch = 0, 
   this.prerelease = [];
   break;

  case "patch":
   0 === this.prerelease.length && this.patch++, this.prerelease = [];
   break;

  case "pre":
   if (0 === this.prerelease.length) this.prerelease = [ 0 ]; else {
    for (var i = this.prerelease.length; --i >= 0; ) "number" == typeof this.prerelease[i] && (this.prerelease[i]++, 
    i = -2);
    -1 === i && this.prerelease.push(0);
   }
   identifier && (this.prerelease[0] === identifier ? isNaN(this.prerelease[1]) && (this.prerelease = [ identifier, 0 ]) : this.prerelease = [ identifier, 0 ]);
   break;

  default:
   throw new Error("invalid increment argument: " + release);
  }
  return this.format(), this.raw = this.version, this;
 }, exports.inc = function(version, release, loose, identifier) {
  "string" == typeof loose && (identifier = loose, loose = void 0);
  try {
   return new SemVer(version, loose).inc(release, identifier).version;
  } catch (er) {
   return null;
  }
 }, exports.diff = function(version1, version2) {
  if (eq(version1, version2)) return null;
  var v1 = parse(version1), v2 = parse(version2);
  if (v1.prerelease.length || v2.prerelease.length) {
   for (var key in v1) if (("major" === key || "minor" === key || "patch" === key) && v1[key] !== v2[key]) return "pre" + key;
   return "prerelease";
  }
  for (var key in v1) if (("major" === key || "minor" === key || "patch" === key) && v1[key] !== v2[key]) return key;
 }, exports.compareIdentifiers = compareIdentifiers;
 var numeric = /^[0-9]+$/;
 exports.rcompareIdentifiers = function(a, b) {
  return compareIdentifiers(b, a);
 }, exports.major = function(a, loose) {
  return new SemVer(a, loose).major;
 }, exports.minor = function(a, loose) {
  return new SemVer(a, loose).minor;
 }, exports.patch = function(a, loose) {
  return new SemVer(a, loose).patch;
 }, exports.compare = compare, exports.compareLoose = function(a, b) {
  return compare(a, b, !0);
 }, exports.rcompare = rcompare, exports.sort = function(list, loose) {
  return list.sort(function(a, b) {
   return exports.compare(a, b, loose);
  });
 }, exports.rsort = function(list, loose) {
  return list.sort(function(a, b) {
   return exports.rcompare(a, b, loose);
  });
 }, exports.gt = gt, exports.lt = lt, exports.eq = eq, exports.neq = neq, exports.gte = gte, 
 exports.lte = lte, exports.cmp = cmp, exports.Comparator = Comparator;
 var ANY = {};
 Comparator.prototype.parse = function(comp) {
  var r = this.loose ? re[COMPARATORLOOSE] : re[COMPARATOR], m = comp.match(r);
  if (!m) throw new TypeError("Invalid comparator: " + comp);
  this.operator = m[1], "=" === this.operator && (this.operator = ""), m[2] ? this.semver = new SemVer(m[2], this.loose) : this.semver = ANY;
 }, Comparator.prototype.toString = function() {
  return this.value;
 }, Comparator.prototype.test = function(version) {
  return debug("Comparator.test", version, this.loose), this.semver === ANY || ("string" == typeof version && (version = new SemVer(version, this.loose)), 
  cmp(version, this.operator, this.semver, this.loose));
 }, exports.Range = Range, Range.prototype.format = function() {
  return this.range = this.set.map(function(comps) {
   return comps.join(" ").trim();
  }).join("||").trim(), this.range;
 }, Range.prototype.toString = function() {
  return this.range;
 }, Range.prototype.parseRange = function(range) {
  var loose = this.loose;
  range = range.trim(), debug("range", range, loose);
  var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
  range = range.replace(hr, hyphenReplace), debug("hyphen replace", range), range = range.replace(re[COMPARATORTRIM], "$1$2$3"), 
  debug("comparator trim", range, re[COMPARATORTRIM]), range = (range = (range = range.replace(re[TILDETRIM], "$1~")).replace(re[CARETTRIM], "$1^")).split(/\s+/).join(" ");
  var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR], set = range.split(" ").map(function(comp) {
   return parseComparator(comp, loose);
  }).join(" ").split(/\s+/);
  return this.loose && (set = set.filter(function(comp) {
   return !!comp.match(compRe);
  })), set = set.map(function(comp) {
   return new Comparator(comp, loose);
  });
 }, exports.toComparators = function(range, loose) {
  return new Range(range, loose).set.map(function(comp) {
   return comp.map(function(c) {
    return c.value;
   }).join(" ").trim().split(" ");
  });
 }, Range.prototype.test = function(version) {
  if (!version) return !1;
  "string" == typeof version && (version = new SemVer(version, this.loose));
  for (var i = 0; i < this.set.length; i++) if (function(set, version) {
   for (i = 0; i < set.length; i++) if (!set[i].test(version)) return !1;
   if (version.prerelease.length) {
    for (var i = 0; i < set.length; i++) if (debug(set[i].semver), set[i].semver !== ANY && set[i].semver.prerelease.length > 0) {
     var allowed = set[i].semver;
     if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) return !0;
    }
    return !1;
   }
   return !0;
  }(this.set[i], version)) return !0;
  return !1;
 }, exports.satisfies = satisfies, exports.maxSatisfying = function(versions, range, loose) {
  return versions.filter(function(version) {
   return satisfies(version, range, loose);
  }).sort(function(a, b) {
   return rcompare(a, b, loose);
  })[0] || null;
 }, exports.minSatisfying = function(versions, range, loose) {
  return versions.filter(function(version) {
   return satisfies(version, range, loose);
  }).sort(function(a, b) {
   return compare(a, b, loose);
  })[0] || null;
 }, exports.validRange = function(range, loose) {
  try {
   return new Range(range, loose).range || "*";
  } catch (er) {
   return null;
  }
 }, exports.ltr = function(version, range, loose) {
  return outside(version, range, "<", loose);
 }, exports.gtr = function(version, range, loose) {
  return outside(version, range, ">", loose);
 }, exports.outside = outside, exports.prerelease = function(version, loose) {
  var parsed = parse(version, loose);
  return parsed && parsed.prerelease.length ? parsed.prerelease : null;
 };
} ]);