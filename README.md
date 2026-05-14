# 🌿 Gheras | غِراس 

**Gheras** (Arabic for "Seedlings") is a minimalist, soul-soothing web application built with **Angular** to track 24 daily spiritual remembrances. Developed as a personal milestone for my 24th birthday, it blends modern frontend performance with a premium spiritual aesthetic.

---

## ✨ Features
- 🌍 **Bilingual Support:** Seamless real-time switching between Arabic and English.
- 🎨 **Premium Dark UI:** Modern "Deep Purple & Gold" theme inspired by spiritual mindfulness and v0 aesthetics.
- ⚡ **Signals-Powered:** Built using **Angular Signals** for high-performance, fine-grained reactivity.
- 📱 **Fully Responsive:** Optimized for all devices using Bootstrap 5 and custom CSS.
- 🎯 **Progress Tracking:** Interactive SVG circular progress bar to visualize your journey.
- ✅ **Authentic Content:** Verified English translations from "Fortress of the Muslim" (Hisn al-Muslim).

---

## 🚀 Technical Stack
- **Framework:** Angular 18+
- **State Management:** Angular Signals (Zoneless-ready logic).
- **Styling:** Bootstrap 5, Custom CSS (Glassmorphism & Glow Effects).
- **Icons & Effects:** Canvas-Confetti for milestone celebrations.
- **Typography:** Amiri & Cairo (Arabic) | Inter (English) via Google Fonts.

---

## 🛠️ Architecture
The project follows a clean **Service-Pattern** architecture to ensure separation of concerns:

- **`GherasService`**: Centralized state management using Signals. It handles:
  - Language switching logic and side effects (Document Direction).
  - Progress counting and 24-limit logic.
  - Content mapping for bilingual remembrances.
- **`AppComponent`**: A lightweight entry point that injects the service and renders the reactive UI using the new Angular Control Flow (`@if`).

---

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/rewanabdelaziz/Gheras.git](https://github.com/rewanabdelaziz/Gheras.git)

2.  **Development server:**

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.


