// public/theme-switcher.js
(() => {
  const THEME_KEY = 'theme';
  const MODE_KEY = 'mode';
  const DEFAULT_THEME = 'neobrutalist';
  const DEFAULT_MODE = 'light';
  const VALID_THEMES = ['neobrutalist', 'square', 'liquid-glass', 'tech-hacker'];
  const VALID_MODES = ['light', 'dark'];
  const LEGACY_THEME_FALLBACK = 'tech-hacker';

  function normalizeTheme(theme) {
    return VALID_THEMES.includes(theme) ? theme : LEGACY_THEME_FALLBACK;
  }

  function normalizeMode(mode) {
    return VALID_MODES.includes(mode) ? mode : DEFAULT_MODE;
  }

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

  function setSwitcherState(container, open) {
    container.setAttribute('data-state', open ? 'open' : 'closed');
    container.querySelector('.theme-switcher-trigger')?.setAttribute('aria-expanded', String(open));
    container.querySelector('.theme-options')?.setAttribute('aria-hidden', String(!open));
  }

  const savedTheme = normalizeTheme((typeof localStorage !== 'undefined' && localStorage.getItem(THEME_KEY)) || DEFAULT_THEME);
  const savedMode  = normalizeMode((typeof localStorage !== 'undefined' && localStorage.getItem(MODE_KEY))  || DEFAULT_MODE);
  applyTheme(savedTheme, savedMode);
  savePreferences(savedTheme, savedMode);

  function attachEventListeners() {
    // Toggle modo claro/oscuro
    document.querySelectorAll('.mode-toggle').forEach((toggle) => {
      if (toggle.dataset.themeSwitcherBound === 'true') return;
      toggle.dataset.themeSwitcherBound = 'true';

      toggle.addEventListener('click', () => {
        const currentTheme = normalizeTheme(document.documentElement.getAttribute('data-theme') || DEFAULT_THEME);
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
      if (trigger.dataset.themeSwitcherBound === 'true') return;
      trigger.dataset.themeSwitcherBound = 'true';

      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        setSwitcherState(container, container.getAttribute('data-state') !== 'open');
      });

      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          setSwitcherState(container, false);
          trigger.focus();
        }
      });

      optionsPanel.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-theme-button]');
        if (!btn) return;

        const newTheme = normalizeTheme(btn.getAttribute('data-theme-button'));
        const currentMode = normalizeMode(document.documentElement.getAttribute('data-mode') || DEFAULT_MODE);
        if (!newTheme) return;

        applyTheme(newTheme, currentMode);
        savePreferences(newTheme, currentMode);
        updateTriggerIcons(newTheme);
        setSwitcherState(container, false);
      });

      optionsPanel.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          setSwitcherState(container, false);
          trigger.focus();
        }
      });

      document.addEventListener('click', (e) => {
        if (!container.contains(e.target)) {
          setSwitcherState(container, false);
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
