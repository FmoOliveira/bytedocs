## 2024-05-22 - Misleading Color Variable Names
**Learning:** The CSS variable `--white` resolves to `#232b33` (a dark color), not white. This can lead to severe contrast issues if used expecting white text/backgrounds.
**Action:** Always verify CSS variable values in `css/dark.css` before using them, do not assume based on name.
