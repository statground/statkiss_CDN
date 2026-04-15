// StatKISS Cookie Utility (Global)
// - text/babel compatible (no ESM/CJS export)
// - optimized: single regex scan, no split loop

(function (global) {
  "use strict";

  function escapeRegExp(str) {
    // Escape regexp special chars
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function getCookie(name) {
    if (!name || typeof document === "undefined") return null;

    // Match: start or "; " + name=VALUE until next ";"
    var re = new RegExp("(?:^|; )" + escapeRegExp(name) + "=([^;]*)");
    var match = document.cookie.match(re);
    return match ? decodeURIComponent(match[1]) : null;
  }

  // Expose globally
  global.getCookie = getCookie;

  // (Optional) namespaced export to avoid global collisions
  global.StatKISS = global.StatKISS || {};
  global.StatKISS.getCookie = getCookie;
})(window);