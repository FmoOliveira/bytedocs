## 2024-05-22 - Misleading Color Variable Names
**Learning:** The CSS variable `--white` resolves to `#232b33` (a dark color), not white. This can lead to severe contrast issues if used expecting white text/backgrounds.
**Action:** Always verify CSS variable values in `css/dark.css` before using them, do not assume based on name.
## 2025-02-18 - Skip Link for Keyboard Navigation
**Learning:** Adding a "Skip to content" link is a critical accessibility feature that is often overlooked. It allows keyboard and screen reader users to bypass repetitive navigation links and jump directly to the main content, significantly improving the navigation efficiency.
**Action:** Always check for and implement a skip link in the base layout of any site. Ensure it is the first focusable element in the DOM.
## 2025-05-15 - [Ghost Features]
**Learning:** Found fully implemented `readingTime` filter in `.eleventy.js` and `.reading-time` CSS class, but unused in `post.njk`.
**Action:** Always audit `.eleventy.js` filters and CSS files for "ghost features" before implementing new ones from scratch.
## 2025-05-20 - Dynamic Search Accessibility
**Learning:** Adding `aria-live="polite"` to the search results container allows screen readers to announce updates without moving focus, which is critical for instant-search interfaces.
**Action:** Ensure all dynamic content areas updated via JavaScript have an appropriate `aria-live` attribute.
