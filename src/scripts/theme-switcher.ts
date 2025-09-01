// (() => {
//   const THEME_KEY = 'theme';
//   const MODE_KEY = 'mode';
//   const DEFAULT_THEME = 'neobrutalist';
//   const DEFAULT_MODE = 'light';

//   function applyTheme(theme: string, mode: string) {
//     document.documentElement.setAttribute('data-theme', theme);
//     document.documentElement.setAttribute('data-mode', mode);
//   }

//   function savePreferences(theme: string, mode: string) {
//     localStorage.setItem(THEME_KEY, theme);
//     localStorage.setItem(MODE_KEY, mode);
//   }

//   function updateTriggerIcons(activeTheme: string) {
//     document.querySelectorAll<HTMLElement>('[data-icon-for]').forEach((icon) => {
//       const iconTheme = icon.getAttribute('data-icon-for');
//       icon.setAttribute('data-active', iconTheme === activeTheme ? 'true' : 'false');
//     });
//   }

//   const savedTheme = localStorage.getItem(THEME_KEY) || DEFAULT_THEME;
//   const savedMode = localStorage.getItem(MODE_KEY) || DEFAULT_MODE;
//   applyTheme(savedTheme, savedMode);

//   function attachEventListeners() {
//     document.querySelectorAll<HTMLElement>('.mode-toggle').forEach((toggle) => {
//       toggle.addEventListener('click', () => {
//         const currentTheme = document.documentElement.getAttribute('data-theme') || DEFAULT_THEME;
//         const newMode = document.documentElement.getAttribute('data-mode') === 'dark' ? 'light' : 'dark';
//         applyTheme(currentTheme, newMode);
//         savePreferences(currentTheme, newMode);
//       });
//     });

//     document.querySelectorAll<HTMLElement>('.theme-switcher-container').forEach((container) => {
//       const trigger = container.querySelector<HTMLElement>('.theme-switcher-trigger');
//       const optionsPanel = container.querySelector<HTMLElement>('.theme-options');

//       if (!trigger || !optionsPanel) return;

//       trigger.addEventListener('click', () => {
//         const currentState = container.getAttribute('data-state');
//         container.setAttribute('data-state', currentState === 'closed' ? 'open' : 'closed');
//       });

//       optionsPanel.addEventListener('click', (e) => {
//         const targetButton = (e.target as HTMLElement).closest('[data-theme-button]') as HTMLElement | null;
//         if (!targetButton) return;

//         const newTheme = targetButton.getAttribute('data-theme-button');
//         const currentMode = document.documentElement.getAttribute('data-mode') || DEFAULT_MODE;

//         if (!newTheme) return;

//         applyTheme(newTheme, currentMode);
//         savePreferences(newTheme, currentMode);
//         updateTriggerIcons(newTheme);
//         container.setAttribute('data-state', 'closed');
//       });

//       document.addEventListener('click', (e) => {
//         if (!container.contains(e.target as Node)) {
//           container.setAttribute('data-state', 'closed');
//         }
//       });
//     });

//     updateTriggerIcons(savedTheme);
//   }

//   if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', attachEventListeners);
//   } else {
//     attachEventListeners();
//   }
// })();
