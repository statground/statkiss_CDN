window.tailwind = window.tailwind || {};
window.tailwind.config = (function (existingConfig) {
    var config = existingConfig && typeof existingConfig === 'object' ? existingConfig : {};
    config.darkMode = 'class';
    config.theme = config.theme && typeof config.theme === 'object' ? config.theme : {};
    config.theme.extend = config.theme.extend && typeof config.theme.extend === 'object' ? config.theme.extend : {};
    return config;
})(window.tailwind.config);