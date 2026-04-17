(function (global) {
  'use strict';

  global.tailwind = global.tailwind || {};
  global.tailwind.config = Object.assign({}, global.tailwind.config || {}, {
    darkMode: 'class',
    theme: Object.assign({}, (global.tailwind.config && global.tailwind.config.theme) || {}, {
      extend: Object.assign({}, ((global.tailwind.config && global.tailwind.config.theme && global.tailwind.config.theme.extend) || {}))
    })
  });
})(window);
