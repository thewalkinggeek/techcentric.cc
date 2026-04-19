# techcentric.cc - CSS Animation Showcase & Personal Portfolio

Welcome to the source code for [techcentric.cc](https://www.techcentric.cc/), the personal website and interactive career portfolio of **Jonathan Schoenberger**.

This repository features a comprehensive **CSS Animation Effects Showcase** designed to demonstrate modern, high-performance web animations.

---

## 🎨 CSS Animation Effects Showcase

The `animations.html` page is a dedicated laboratory for web motion. It provides a visual interface to explore, customize, and implement various CSS-only animations.

### Key Features:
*   **Interactive Controls:** Real-time adjustment of animation duration, delay, and iteration counts.
*   **Live Code Generation:** Instant access to the required CSS (Keyframes and Class Rules) for every animation.
*   **Responsive Categories:**
    *   **Element Animations:** Entrance effects like slides, fades, and bounces.
    *   **Hover Effects:** Interactive transformations, flips, and swings for UI elements.
    *   **Text Reveal Effects:** Elegant typography animations for headlines and content.
    *   **Background Effects:** Subtle, non-intrusive motion for section backgrounds.

---

## 🚀 How to Use These Animations

Integrating these effects into your own project is straightforward. Each animation consists of two primary parts:

### 1. The `@keyframes` Definition
This defines the sequence of the motion.
```css
@keyframes slideInLeft {
  0% { transform: translateX(-100%); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}
```

### 2. The CSS Class Rule
This applies the keyframes to your target element.
```css
.my-element.slide-in-left-anim {
  animation: slideInLeft 0.8s ease-out forwards;
}
```

### Implementation Steps:
1.  **Browse the Showcase:** Find the animation that fits your design.
2.  **Customize:** Use the sliders and dropdowns to fine-tune the timing.
3.  **Copy & Paste:** Copy the generated CSS into your global stylesheet.
4.  **Apply Class:** Add the animation class (e.g., `slide-in-left-anim`) to your HTML element.

---

## 💻 Tech Stack

*   **HTML5/CSS3:** Focus on semantic structure and modern CSS (Variables, Grid, Flexbox).
*   **Vanilla JavaScript:** Lightweight DOM manipulation for theme toggling and the animation laboratory.
*   **Intersection Observer API:** Efficiently triggers animations only when elements enter the viewport.
*   **Font Awesome:** Scalable vector icons.

---

## 👤 About the Author

**Jonathan Schoenberger** is a technology specialist with 30 years of IT experience, specializing in bridging the gap between complex technology and practical user solutions.

*   **Portfolio:** [techcentric.cc](https://www.techcentric.cc/)
*   **LinkedIn:** [linkedin.com/in/jonschoenb](https://www.linkedin.com/in/jonschoenb/)

---

*© 2026 Jonathan Schoenberger | Licensed under MIT.*
