# Social Boost (ViralKik) — Project File Structure

![React](https://img.shields.io/badge/React-18.x-blue?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38BDF8?logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6.x-CA4245?logo=reactrouter&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.x-0055FF?logo=framer&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2020+-F7DF1E?logo=javascript&logoColor=black)

---

## Table of Contents

- [Complete File Tree](#-complete-file-tree)
- [Architecture Mind Map](#-architecture-mind-map)
- [Feature Group Table](#-feature-group-table)
- [File Purpose Registry](#-file-purpose-registry)
- [Dependency Graph](#-dependency-graph)
- [Tech Stack Summary](#-tech-stack-summary)

---

## 📁 Complete File Tree

```
SMM/
├── .env.example
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── README.md
├── SYSTEM_ARCHITECTURE_DFD.md
├── public/
│   ├── favicon.ico
│   ├── placeholder.svg
│   ├── pwa-192x192.png
│   ├── pwa-512x512.png
│   └── robots.txt
├── dist/
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── index.css
    ├── ErrorBoundary.jsx
    ├── routes/
    │   └── index.jsx
    ├── features/
    │   ├── auth/
    │   │   └── pages/
    │   │       ├── LoginPage.jsx
    │   │       └── RegisterPage.jsx
    │   ├── company/
    │   │   └── pages/
    │   │       ├── AboutUsPage.jsx
    │   │       └── ContactPage.jsx
    │   ├── home/
    │   │   ├── components/
    │   │   │   ├── CTASection.jsx
    │   │   │   ├── FAQSection.jsx
    │   │   │   ├── HeroSection.jsx
    │   │   │   ├── OrderStepsSection.jsx
    │   │   │   ├── PricingSection.jsx
    │   │   │   ├── ServicesSection.jsx
    │   │   │   ├── TargetAudienceSection.jsx
    │   │   │   ├── TestimonialsSection.jsx
    │   │   │   └── WhyChooseSection.jsx
    │   │   └── pages/
    │   │       ├── FreeServicePage.jsx
    │   │       ├── FreeTrialPage.jsx
    │   │       └── HomePage.jsx
    │   ├── legal/
    │   │   └── pages/
    │   │       ├── PrivacyPolicyPage.jsx
    │   │       └── TermsOfServicePage.jsx
    │   ├── orders/
    │   │   └── pages/
    │   │       ├── OrderCompletePage.jsx
    │   │       ├── OrderProcessingPage.jsx
    │   │       ├── OrdersHistoryPage.jsx
    │   │       ├── OrderTrackingPage.jsx
    │   │       ├── PaymentPage.jsx
    │   │       ├── PostSelectionPage.jsx
    │   │       ├── ServicePricingPage.jsx
    │   │       └── SocialProfileOverviewPage.jsx
    │   ├── platforms/
    │   │   ├── components/
    │   │   │   └── PlatformSearchSection.jsx
    │   │   └── pages/
    │   │       ├── FacebookPage.jsx
    │   │       ├── InstagramPage.jsx
    │   │       ├── TikTokPage.jsx
    │   │       └── YouTubePage.jsx
    │   ├── referral/
    │   │   └── pages/
    │   │       └── ReferFriendPage.jsx
    │   ├── shared/
    │   │   └── pages/
    │   │       ├── ErrorPage.jsx
    │   │       └── SuccessPage.jsx
    │   ├── support/
    │   │   └── pages/
    │   │       ├── FAQPage.jsx
    │   │       ├── HelpCenterPage.jsx
    │   │       └── RefundPolicyPage.jsx
    │   └── user/
    │       └── pages/
    │           ├── AccountSettingsPage.jsx
    │           ├── ChangePasswordPage.jsx
    │           └── ProfilePage.jsx
    └── shared/
        ├── assets/
        │   ├── icons/
        │   │   ├── fb.png
        │   │   ├── insta.png
        │   │   ├── snap.png
        │   │   ├── tiktok.png
        │   │   └── yt.png
        │   └── images/
        │       ├── 1.png
        │       ├── 2.png
        │       ├── 3.png
        │       ├── 4.png
        │       ├── 5.png
        │       ├── content creator.png
        │       └── mobile.png
        ├── components/
        │   ├── layout/
        │   │   ├── Footer.jsx
        │   │   └── Navbar.jsx
        │   └── ui/
        │       ├── Button.jsx
        │       ├── ClickSpark.jsx
        │       └── SocialPlatformIcon.jsx
        ├── constants/
        │   ├── api.js
        │   ├── colors.js
        │   └── config.js
        ├── hooks/
        │   └── useScrollToTop.js
        ├── services/
        │   └── api.js
        └── utils/
            └── storage.js
```

**Total Files: ~75** (config, assets, components, pages, services)

---

## 🧠 Architecture Mind Map

```
                    ┌─────────────────────────────────┐
                    │      SOCIAL BOOST (ViralKik)     │
                    │    React + Vite + Tailwind CSS   │
                    └───────────────┬─────────────────┘
                                    │
            ┌───────────────────────┼───────────────────────┐
            │                       │                       │
   ┌────────▼────────┐    ┌────────▼────────┐    ┌────────▼────────┐
   │   ENTRY POINTS  │    │    FEATURES     │    │   SHARED CORE   │
   │                 │    │                 │    │                 │
   │ • main.jsx      │    │ • auth          │    │ • components/   │
   │ • App.jsx       │    │ • company       │    │ • constants/    │
   │ • routes/       │    │ • home          │    │ • hooks/        │
   │ • ErrorBoundary │    │ • legal         │    │ • services/     │
   │ • index.css     │    │ • orders        │    │ • utils/        │
   │ • App.css       │    │ • platforms     │    │ • assets/       │
   └─────────────────┘    │ • referral      │    └─────────────────┘
                          │ • shared        │
                          │ • support       │
                          │ • user          │
                          └─────────────────┘
```

### Feature-Based Architecture Pattern

The project follows a **feature-based architecture** where each feature is a self-contained domain with its own `pages/` and optional `components/` directories. Shared utilities, UI primitives, and services live in the `shared/` directory, accessible by all features via relative imports.

```
┌──────────────────────────────────────────────────────────────────┐
│                        src/features/                             │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  auth/           ── Login & Registration flows                   │
│  ├── pages/      ── LoginPage.jsx, RegisterPage.jsx              │
│                                                                  │
│  company/        ── Corporate info pages                         │
│  ├── pages/      ── AboutUsPage.jsx, ContactPage.jsx            │
│                                                                  │
│  home/           ── Landing page with reusable sections          │
│  ├── components/ ── 9 section components (Hero, Services...)     │
│  ├── pages/      ── HomePage.jsx, FreeTrialPage.jsx...           │
│                                                                  │
│  legal/          ── Legal/compliance pages                       │
│  ├── pages/      ── PrivacyPolicyPage.jsx, TermsOfServicePage   │
│                                                                  │
│  orders/         ── Full order lifecycle (8 pages)               │
│  ├── pages/      ── Profile → Posts → Pricing → Payment → Track │
│                                                                  │
│  platforms/      ── Social platform integrations                 │
│  ├── components/ ── PlatformSearchSection.jsx (shared search)    │
│  ├── pages/      ── Instagram, YouTube, Facebook, TikTok         │
│                                                                  │
│  referral/       ── Referral program                             │
│  ├── pages/      ── ReferFriendPage.jsx                          │
│                                                                  │
│  shared/         ── Cross-feature shared pages                   │
│  ├── pages/      ── ErrorPage.jsx, SuccessPage.jsx              │
│                                                                  │
│  support/        ── Help & support content                       │
│  ├── pages/      ── HelpCenterPage.jsx, FAQPage.jsx...           │
│                                                                  │
│  user/           ── User account management                      │
│  ├── pages/      ── ProfilePage.jsx, AccountSettingsPage...      │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 📊 Feature Group Table

| Feature Group | Location | Files | Purpose |
|---|---|---|---|
| **Auth** | `src/features/auth/pages/` | 2 | User authentication — login and registration flows with form validation and simulated auth |
| **Company** | `src/features/company/pages/` | 2 | Corporate information — about us page with mission/values/stats and contact form |
| **Home** | `src/features/home/` | 12 | Landing page — hero section, service cards, pricing grid, testimonials carousel, FAQ accordion, and free trial pages |
| **Legal** | `src/features/legal/pages/` | 2 | Compliance — static privacy policy and terms of service pages |
| **Orders** | `src/features/orders/pages/` | 8 | Order lifecycle — profile overview, post selection, pricing, payment, processing, confirmation, tracking, and history |
| **Platforms** | `src/features/platforms/` | 5 | Social platform integrations — search UI for Instagram, YouTube, Facebook, TikTok with shared search component |
| **Referral** | `src/features/referral/pages/` | 1 | Referral program — stats dashboard, shareable code, email invites, social sharing |
| **Shared (Pages)** | `src/features/shared/pages/` | 2 | Cross-feature pages — error display with countdown redirect and success confirmation |
| **Support** | `src/features/support/pages/` | 3 | Help & support — help center with search, FAQ with accordion, and refund policy |
| **User** | `src/features/user/pages/` | 3 | Account management — profile display/edit, account settings verification, password change |
| **Shared Core** | `src/shared/` | 20 | Reusable foundation — UI components, layout, constants, hooks, services, utilities, and assets |
| **Entry/Config** | `src/` + root | 15 | App bootstrap — entry points, routing, error boundary, global styles, and build configuration |

---

## 📋 File Purpose Registry

### Entry Points & Root Configuration

| File | Purpose |
|---|---|
| `index.html` | HTML entry point with PWA meta tags and root div mount |
| `package.json` | Project dependencies, scripts, and metadata |
| `package-lock.json` | Locked dependency tree for reproducible builds |
| `vite.config.js` | Vite build configuration with React plugin |
| `tailwind.config.js` | Tailwind CSS theme customization and content paths |
| `postcss.config.js` | PostCSS plugin chain (Tailwind + Autoprefixer) |
| `eslint.config.js` | ESLint flat config for React + hooks linting rules |
| `.env.example` | Template for environment variables (API keys, URLs) |
| `.gitignore` | Git ignore rules for node_modules, dist, env files |
| `README.md` | Project documentation and setup instructions |
| `SYSTEM_ARCHITECTURE_DFD.md` | System architecture data flow diagrams |

### `public/` — Static Assets

| File | Purpose |
|---|---|
| `public/favicon.ico` | Browser tab icon |
| `public/placeholder.svg` | Placeholder image for missing content |
| `public/pwa-192x192.png` | PWA manifest icon (192×192) |
| `public/pwa-512x512.png` | PWA manifest icon (512×512) |
| `public/robots.txt` | Search engine crawler directives |

### `src/` — Application Entry

| File | Purpose |
|---|---|
| `src/main.jsx` | React entry point, renders App inside ErrorBoundary and StrictMode |
| `src/App.jsx` | Root component with BrowserRouter, Navbar, Footer, ClickSpark wrapper, and AppRoutes |
| `src/App.css` | Legacy CSS styles for logo animation and card layout |
| `src/index.css` | Tailwind base imports, CSS variables for theming, custom animations (float, drift, wave, border effects), slider styles |
| `src/ErrorBoundary.jsx` | React error boundary class component with fallback UI and error logging |

### `src/routes/` — Routing

| File | Purpose |
|---|---|
| `src/routes/index.jsx` | All 40+ route definitions organized by public/protected/error categories |

### `src/features/auth/pages/` — Authentication

| File | Purpose |
|---|---|
| `src/features/auth/pages/LoginPage.jsx` | Login form with email/password, simulated auth, redirects to home |
| `src/features/auth/pages/RegisterPage.jsx` | Registration form with validation, redirects to login |

### `src/features/company/pages/` — Company Info

| File | Purpose |
|---|---|
| `src/features/company/pages/AboutUsPage.jsx` | Static about page with company mission, values, impact stats |
| `src/features/company/pages/ContactPage.jsx` | Contact form with company info and quick help links |

### `src/features/home/pages/` — Home Landing Pages

| File | Purpose |
|---|---|
| `src/features/home/pages/HomePage.jsx` | Landing page composing all home sections (hero, services, pricing, etc.) |
| `src/features/home/pages/FreeTrialPage.jsx` | Free TikTok generator services display (likes, followers, views) |
| `src/features/home/pages/FreeServicePage.jsx` | Free trial coin-based service selection page |

### `src/features/home/components/` — Home Page Sections

| File | Purpose |
|---|---|
| `src/features/home/components/HeroSection.jsx` | Full-screen hero with confetti, parallax icons, profile showcase |
| `src/features/home/components/ServicesSection.jsx` | 4 platform service cards with phone mockup styling |
| `src/features/home/components/WhyChooseSection.jsx` | 8 feature cards in masonry grid layout |
| `src/features/home/components/TestimonialsSection.jsx` | Auto-scrolling carousel of customer testimonials |
| `src/features/home/components/PricingSection.jsx` | 4-column pricing grid with 8 service packages |
| `src/features/home/components/FAQSection.jsx` | Accordion FAQ with 5 Q&A items |
| `src/features/home/components/CTASection.jsx` | Call-to-action section with decorative blur elements |
| `src/features/home/components/OrderStepsSection.jsx` | 4-step how-to-order timeline with alternating layout |
| `src/features/home/components/TargetAudienceSection.jsx` | 6 beneficiary cards with hover tilt animation |

### `src/features/legal/pages/` — Legal Compliance

| File | Purpose |
|---|---|
| `src/features/legal/pages/PrivacyPolicyPage.jsx` | Static privacy policy content |
| `src/features/legal/pages/TermsOfServicePage.jsx` | Static terms of service content |

### `src/features/orders/pages/` — Order Lifecycle

| File | Purpose |
|---|---|
| `src/features/orders/pages/OrdersHistoryPage.jsx` | Orders list with status filter tabs |
| `src/features/orders/pages/SocialProfileOverviewPage.jsx` | Profile display with 6 services per platform |
| `src/features/orders/pages/PostSelectionPage.jsx` | Post grid selector with 12 mock images |
| `src/features/orders/pages/ServicePricingPage.jsx` | Quantity slider, packages, coupon system, price calculator |
| `src/features/orders/pages/PaymentPage.jsx` | Payment method selection (Stripe/Razorpay) with order summary |
| `src/features/orders/pages/OrderProcessingPage.jsx` | Animated progress spinner (0-100%) |
| `src/features/orders/pages/OrderCompletePage.jsx` | Order confirmation with ID, details, and ETA |
| `src/features/orders/pages/OrderTrackingPage.jsx` | 4-step timeline with auto-advancing progress |

### `src/features/platforms/` — Social Platform Integrations

| File | Purpose |
|---|---|
| `src/features/platforms/pages/InstagramPage.jsx` | Instagram profile search via ApiService |
| `src/features/platforms/pages/YouTubePage.jsx` | YouTube channel search via ApiService |
| `src/features/platforms/pages/FacebookPage.jsx` | Facebook page search via ApiService |
| `src/features/platforms/pages/TikTokPage.jsx` | TikTok profile search via ApiService |
| `src/features/platforms/components/PlatformSearchSection.jsx` | Reusable platform search UI with config per platform |

### `src/features/referral/pages/` — Referral Program

| File | Purpose |
|---|---|
| `src/features/referral/pages/ReferFriendPage.jsx` | Referral program with stats, code, email invite, social sharing |

### `src/features/shared/pages/` — Shared Feature Pages

| File | Purpose |
|---|---|
| `src/features/shared/pages/ErrorPage.jsx` | Error display with countdown redirect and retry |
| `src/features/shared/pages/SuccessPage.jsx` | Success display with configurable redirect |

### `src/features/support/pages/` — Help & Support

| File | Purpose |
|---|---|
| `src/features/support/pages/HelpCenterPage.jsx` | Help center with search, categories, articles |
| `src/features/support/pages/FAQPage.jsx` | FAQ with search and accordion across 5 categories |
| `src/features/support/pages/RefundPolicyPage.jsx` | Static refund policy with eligibility and process |

### `src/features/user/pages/` — User Account

| File | Purpose |
|---|---|
| `src/features/user/pages/ProfilePage.jsx` | User profile display/edit with localStorage auth check |
| `src/features/user/pages/AccountSettingsPage.jsx` | Account verification confirmation page |
| `src/features/user/pages/ChangePasswordPage.jsx` | Password change form with validation |

### `src/shared/components/layout/` — Layout Components

| File | Purpose |
|---|---|
| `src/shared/components/layout/Navbar.jsx` | Sticky responsive navbar with platform dropdowns and auth state |
| `src/shared/components/layout/Footer.jsx` | Site footer with links organized in 3 columns |

### `src/shared/components/ui/` — UI Primitives

| File | Purpose |
|---|---|
| `src/shared/components/ui/Button.jsx` | Reusable button with variant/size/fullWidth props |
| `src/shared/components/ui/ClickSpark.jsx` | Canvas spark effect wrapper on click events |
| `src/shared/components/ui/SocialPlatformIcon.jsx` | Platform icon renderer with size options |

### `src/shared/constants/` — App Constants

| File | Purpose |
|---|---|
| `src/shared/constants/api.js` | API config with base URL, endpoints, timeout, environment configs |
| `src/shared/constants/colors.js` | Comprehensive color theme with variants and platform gradients |
| `src/shared/constants/config.js` | App constants (name, platforms, services, routes, storage keys) |

### `src/shared/hooks/` — Custom Hooks

| File | Purpose |
|---|---|
| `src/shared/hooks/useScrollToTop.js` | Hook that scrolls to top on route change |

### `src/shared/services/` — API Services

| File | Purpose |
|---|---|
| `src/shared/services/api.js` | ApiService class with search/create/auth methods and mock fallbacks |

### `src/shared/utils/` — Utilities

| File | Purpose |
|---|---|
| `src/shared/utils/storage.js` | localStorage wrapper with error handling and availability check |

### `src/shared/assets/` — Static Assets

| File | Purpose |
|---|---|
| `src/shared/assets/icons/fb.png` | Facebook platform icon |
| `src/shared/assets/icons/insta.png` | Instagram platform icon |
| `src/shared/assets/icons/snap.png` | Snapchat platform icon |
| `src/shared/assets/icons/tiktok.png` | TikTok platform icon |
| `src/shared/assets/icons/yt.png` | YouTube platform icon |
| `src/shared/assets/images/1.png` through `5.png` | Profile mockup images for hero/testimonials |
| `src/shared/assets/images/content creator.png` | Content creator promotional image |
| `src/shared/assets/images/mobile.png` | Mobile device mockup image |

---

## 🔗 Dependency Graph

### Application Bootstrap Chain

```
main.jsx
  └── App.jsx
        ├── routes/index.jsx ──► ALL feature pages (40+ routes)
        ├── shared/components/layout/Navbar.jsx
        │     ├── shared/components/ui/Button.jsx
        │     ├── shared/components/ui/SocialPlatformIcon.jsx
        │     ├── shared/utils/storage.js
        │     └── shared/assets/icons/*.png
        ├── shared/components/layout/Footer.jsx
        │     └── shared/assets/icons/*.png
        └── shared/components/ui/ClickSpark.jsx
```

### Feature Pages — Shared Dependencies

```
Feature Pages import from:
  ├── shared/components/ui/Button.jsx          ← auth, user, orders, referral
  ├── shared/components/ui/SocialPlatformIcon.jsx ← via PlatformSearchSection
  ├── shared/components/ui/PlatformSearchSection.jsx ← platforms
  ├── shared/services/api.js                   ← platforms
  ├── shared/hooks/useScrollToTop.js           ← platforms, company, legal, support, orders
  ├── shared/utils/storage.js                  ← user, referral
  └── framer-motion                            ← referral, navbar
```

### Order Flow Dependency Chain

```
SocialProfileOverviewPage
  └── PostSelectionPage
        └── ServicePricingPage
              └── PaymentPage
                    └── OrderProcessingPage
                          └── OrderCompletePage
                                └── OrderTrackingPage
                                      └── OrdersHistoryPage
```

### Platform Pages — Shared Search Pattern

```
InstagramPage / YouTubePage / FacebookPage / TikTokPage
  └── PlatformSearchSection.jsx (reusable search component)
        ├── ApiService (shared/services/api.js)
        ├── PlatformConfig (passed as props)
        └── Button.jsx (shared/components/ui/)
```

---

## 🛠 Tech Stack Summary

| Technology | Version | Purpose |
|---|---|---|
| **React** | 18.x | UI component library with concurrent features |
| **Vite** | 5.x | Fast build tool with HMR and optimized production builds |
| **Tailwind CSS** | 3.x | Utility-first CSS framework for rapid UI development |
| **React Router** | 6.x | Client-side routing with nested routes and lazy loading |
| **Framer Motion** | 11.x | Declarative animations and gesture handling |
| **PostCSS** | 8.x | CSS transformation pipeline (Autoprefixer, Tailwind) |
| **ESLint** | 9.x | Code linting with React Hooks rules |
| **Node.js** | 18+ | Runtime environment for build tooling |

---

## 📈 Project Statistics

| Metric | Count |
|---|---|
| Total Pages | 32 |
| Feature Groups | 10 |
| Shared UI Components | 3 |
| Layout Components | 2 |
| Home Section Components | 9 |
| Custom Hooks | 1 |
| Service Classes | 1 |
| Asset Files | 12 |
| Config Files | 8 |
| Route Definitions | 40+ |
