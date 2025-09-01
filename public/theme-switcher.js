// public/theme-switcher.js
(() => {
  const THEME_KEY = 'theme';
  const MODE_KEY = 'mode';
  const DEFAULT_THEME = 'neobrutalist';
  const DEFAULT_MODE = 'light';

  function applyTheme(theme, mode) {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-mode', mode);
  }

  function savePreferences(theme, mode) {
    try {
      localStorage.setItem(THEME_KEY, theme);
      localStorage.setItem(MODE_KEY, mode);
    } catch {}
  }

  function updateTriggerIcons(activeTheme) {
    document.querySelectorAll('[data-icon-for]').forEach((icon) => {
      const iconTheme = icon.getAttribute('data-icon-for');
      icon.setAttribute('data-active', iconTheme === activeTheme ? 'true' : 'false');
    });
  }

  const savedTheme = (typeof localStorage !== 'undefined' && localStorage.getItem(THEME_KEY)) || DEFAULT_THEME;
  const savedMode  = (typeof localStorage !== 'undefined' && localStorage.getItem(MODE_KEY))  || DEFAULT_MODE;
  applyTheme(savedTheme, savedMode);

  function attachEventListeners() {
    // Toggle modo claro/oscuro
    document.querySelectorAll('.mode-toggle').forEach((toggle) => {
      toggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || DEFAULT_THEME;
        const newMode = document.documentElement.getAttribute('data-mode') === 'dark' ? 'light' : 'dark';
        applyTheme(currentTheme, newMode);
        savePreferences(currentTheme, newMode);
      });
    });

    // Dropdown de temas
    document.querySelectorAll('.theme-switcher-container').forEach((container) => {
      const trigger = container.querySelector('.theme-switcher-trigger');
      const optionsPanel = container.querySelector('.theme-options');
      if (!trigger || !optionsPanel) return;

      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const currentState = container.getAttribute('data-state');
        container.setAttribute('data-state', currentState === 'closed' ? 'open' : 'closed');
      });

      optionsPanel.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-theme-button]');
        if (!btn) return;

        const newTheme = btn.getAttribute('data-theme-button');
        const currentMode = document.documentElement.getAttribute('data-mode') || DEFAULT_MODE;
        if (!newTheme) return;

        applyTheme(newTheme, currentMode);
        savePreferences(newTheme, currentMode);
        updateTriggerIcons(newTheme);
        container.setAttribute('data-state', 'closed');
      });

      document.addEventListener('click', (e) => {
        if (!container.contains(e.target)) {
          container.setAttribute('data-state', 'closed');
        }
      });
    });

    updateTriggerIcons(savedTheme);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachEventListeners);
  } else {
    attachEventListeners();
  }
})();
