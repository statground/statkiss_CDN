// StatKISS Cookie Utility
// CDN: jsDelivr
// Optimized version
// No array split, no loop, single regex scan

const getCookie = (name) => {
  if (!name || typeof document === "undefined") return null;

  const match = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([$?*|{}\]\\/+^])/g, '\\$1') + '=([^;]*)')
  );

  return match ? decodeURIComponent(match[1]) : null;
};

// optional: expose globally (StatKISS policy)
window.getCookie = getCookie;

export default getCookie;