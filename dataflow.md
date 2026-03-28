# 📊 Data Flow & Navigation Architecture

## Social Boost / ViralKik — React SMM Application

> **Tech Stack:** Vite + React + Tailwind CSS + React Router + Framer Motion

---

## 1. Application Bootstrap Flow

```
index.html
  └── main.jsx
        ├── window.error handlers
        ├── ReactDOM.createRoot(#root)
        │     └── <React.StrictMode>
        │           └── <ErrorBoundary>
        │                 └── <App>
        │                       ├── <BrowserRouter>
        │                       ├── <ClickSpark> (global click effect)
        │                       ├── <Navbar /> (always visible)
        │                       ├── <AppRoutes /> (page content)
        │                       └── <Footer /> (always visible)
```

---

## 2. Complete Route Map

| # | Route Path | Page Component | Feature Group | Access | Description |
|---|------------|---------------|---------------|--------|-------------|
| 1 | `/` | `HomePage` | home | 🌐 Public | Landing page |
| 2 | `/free-trial` | `FreeTrialPage` | home | 🌐 Public | Free TikTok generators |
| 3 | `/free-service` | `FreeServicePage` | home | 🌐 Public | Free coin-based trial |
| 4 | `/login` | `LoginPage` | auth | 🌐 Public | User login |
| 5 | `/register` | `RegisterPage` | auth | 🌐 Public | User registration |
| 6 | `/instagram` | `InstagramPage` | platforms | 🌐 Public | Instagram search |
| 7 | `/youtube` | `YouTubePage` | platforms | 🌐 Public | YouTube search |
| 8 | `/facebook` | `FacebookPage` | platforms | 🌐 Public | Facebook search |
| 9 | `/tiktok` | `TikTokPage` | platforms | 🌐 Public | TikTok search |
| 10 | `/about` | `AboutUsPage` | company | 🌐 Public | About company |
| 11 | `/about-us` | `AboutUsPage` | company | 🌐 Public | Alias for about |
| 12 | `/contact` | `ContactPage` | company | 🌐 Public | Contact form |
| 13 | `/privacy` | `PrivacyPolicyPage` | legal | 🌐 Public | Privacy policy |
| 14 | `/privacy-policy` | `PrivacyPolicyPage` | legal | 🌐 Public | Alias |
| 15 | `/terms` | `TermsOfServicePage` | legal | 🌐 Public | Terms of service |
| 16 | `/terms-of-service` | `TermsOfServicePage` | legal | 🌐 Public | Alias |
| 17 | `/help` | `HelpCenterPage` | support | 🌐 Public | Help center |
| 18 | `/help-center` | `HelpCenterPage` | support | 🌐 Public | Alias |
| 19 | `/faq` | `FAQPage` | support | 🌐 Public | FAQ page |
| 20 | `/refund` | `RefundPolicyPage` | support | 🌐 Public | Refund policy |
| 21 | `/refund-policy` | `RefundPolicyPage` | support | 🌐 Public | Alias |
| 22 | `/refer-friend` | `ReferFriendPage` | referral | 🌐 Public | Referral program |
| 23 | `/referral` | `ReferFriendPage` | referral | 🌐 Public | Alias |
| 24 | `/profile` | `ProfilePage` | user | 🔒 Protected | User profile |
| 25 | `/account` | `AccountSettingsPage` | user | 🔒 Protected | Account settings |
| 26 | `/password` | `ChangePasswordPage` | user | 🔒 Protected | Change password |
| 27 | `/orders` | `OrdersHistoryPage` | orders | 🔒 Protected | Orders list |
| 28 | `/my-orders` | `OrdersHistoryPage` | orders | 🔒 Protected | Alias |
| 29 | `/profile-overview` | `SocialProfileOverviewPage` | orders | 🔒 Protected | Profile services |
| 30 | `/posts-selection` | `PostSelectionPage` | orders | 🔒 Protected | Post selector |
| 31 | `/quantity-pricing` | `ServicePricingPage` | orders | 🔒 Protected | Quantity/pricing |
| 32 | `/payment` | `PaymentPage` | orders | 🔒 Protected | Payment selection |
| 33 | `/processing` | `OrderProcessingPage` | orders | 🔒 Protected | Order processing |
| 34 | `/complete` | `OrderCompletePage` | orders | 🔒 Protected | Order confirmation |
| 35 | `/track` | `OrderTrackingPage` | orders | 🔒 Protected | Order tracking |
| 36 | `/error` | `ErrorPage` | shared | 🌐 Public | Error display |
| 37 | `/success` | `SuccessPage` | shared | 🌐 Public | Success display |
| 38 | `*` | `404 Fallback` | shared | 🌐 Public | Page not found |

---

## 3. Primary User Journey — Order Flow

```
┌─────────────┐     ┌──────────────────┐     ┌────────────────────┐
│  PLATFORM   │     │  PROFILE         │     │  SERVICE           │
│  SEARCH     │────►│  OVERVIEW        │────►│  SELECTION         │
│             │     │                  │     │                    │
│ /instagram  │     │ /profile-overview│     │  Path A:           │
│ /youtube    │     │                  │     │  /posts-selection  │
│ /facebook   │     │ Shows profile    │     │  (for post-level)  │
│ /tiktok     │     │ stats + 6        │     │                    │
│             │     │ services         │     │  Path B:           │
│ Search with │     │                  │     │  /quantity-pricing │
│ ApiService  │     │ Navigate to      │     │  (for profile-level│
└─────────────┘     │ service page     │     │   directly)        │
                    └──────────────────┘     └─────────┬──────────┘
                                                       │
                                                       ▼
                    ┌──────────────────┐     ┌────────────────────┐
                    │  PAYMENT         │     │  QUANTITY &        │
                    │                  │◄────│  PRICING           │
                    │ /payment         │     │                    │
                    │                  │     │ /quantity-pricing  │
                    │ Select Stripe or │     │                    │
                    │ Razorpay         │     │ Slider, packages,  │
                    │                  │     │ coupons, price     │
                    │ Order summary    │     │ calculator         │
                    └────────┬─────────┘     └────────────────────┘
                             │
                             ▼
                    ┌──────────────────┐     ┌────────────────────┐
                    │  PROCESSING      │     │  COMPLETE          │
                    │                  │────►│                    │
                    │ /processing      │     │ /complete          │
                    │                  │     │                    │
                    │ Animated spinner │     │ Order ID, details, │
                    │ 0→100% progress  │     │ ETA, track button  │
                    └──────────────────┘     └────────┬───────────┘
                                                       │
                                                       ▼
                                              ┌────────────────────┐
                                              │  ORDER TRACKING    │
                                              │                    │
                                              │ /track             │
                                              │                    │
                                              │ 4-step timeline    │
                                              │ auto-advancing     │
                                              └────────────────────┘
```

---

## 4. Navigation Link Matrix

### 🔗 Navbar Links

| Source | Links To |
|--------|----------|
| Navbar — Logo | `/` |
| Navbar — TikTok | `/tiktok` |
| Navbar — Instagram | `/instagram` |
| Navbar — Facebook | `/facebook` |
| Navbar — YouTube | `/youtube` |
| Navbar — Refer Friend | `/refer-friend` |
| Navbar — Profile (logged in) | `/profile` |
| Navbar — My Orders (logged in) | `/my-orders` |
| Navbar — Login (not logged in) | `/login` |

### 🔗 Footer Links

| Source | Links To |
|--------|----------|
| Footer — TikTok | `/tiktok` |
| Footer — Instagram | `/instagram` |
| Footer — Facebook | `/facebook` |
| Footer — YouTube | `/youtube` |
| Footer — About | `/about` |
| Footer — Contact | `/contact` |
| Footer — Privacy | `/privacy` |
| Footer — Terms | `/terms` |
| Footer — Help | `/help` |
| Footer — FAQ | `/faq` |
| Footer — Refund | `/refund` |

### 🔗 Home Page Sections

| Source | Links To |
|--------|----------|
| HeroSection | `/register` |
| ServicesSection | `/tiktok`, `/instagram`, `/youtube`, `/facebook` |
| WhyChooseSection | `/register` |

### 🔗 Free Trial & Services

| Source | Links To |
|--------|----------|
| FreeTrialPage | `/tiktok` (via platform) |
| FreeServicePage | `/${platform}` (back to platform page) |

### 🔗 Auth Pages

| Source | Links To |
|--------|----------|
| LoginPage | `/register`, `/` (on success) |
| RegisterPage | `/login` (on success) |

### 🔗 Platform Pages

| Source | Links To |
|--------|----------|
| InstagramPage | `/profile-overview` (success), `/error` (failure) |
| YouTubePage | `/profile-overview` (success), `/error` (failure) |
| FacebookPage | `/profile-overview` (success), `/error` (failure) |
| TikTokPage | `/profile-overview` (success), `/error` (failure) |

### 🔗 Order Flow Pages

| Source | Links To |
|--------|----------|
| SocialProfileOverviewPage | `/quantity-pricing` (profile services), `/posts-selection` (post services) |
| PostSelectionPage | `/quantity-pricing` |
| ServicePricingPage | `/payment` |
| PaymentPage | `/processing` |
| OrderProcessingPage | `/` (if no orderId), `/complete` (on finish) |
| OrderCompletePage | `/` (another order), `/track` |
| OrderTrackingPage | `/`, `navigate(-1)` |

### 🔗 User Pages

| Source | Links To |
|--------|----------|
| ProfilePage | `/my-orders`, `/password`, `/login` (if not auth) |
| ChangePasswordPage | `/profile` |
| AccountSettingsPage | `/profile-overview` |

### 🔗 Support Pages

| Source | Links To |
|--------|----------|
| ContactPage | `/faq`, `/help-center`, `/refund-policy` |
| HelpCenterPage | `/contact`, `/faq` |
| FAQPage | `/contact`, `/help-center` |

### 🔗 Referral & Shared Pages

| Source | Links To |
|--------|----------|
| ReferFriendPage | `/login`, `/register` (if not auth), external social shares |
| ErrorPage | `/${platform}`, `/` (retry/home) |
| SuccessPage | `nextRoute` (configurable), `/` |

---

## 5. Data Flow Diagrams

### A) API Service Flow

```
Platform Pages (Instagram, YouTube, Facebook, TikTok)
  │
  │  username/channelName
  ▼
PlatformSearchSection (shared component)
  │
  │  onSearch(username)
  ▼
ApiService (shared/services/api.js)
  │
  │  searchInstagram() / searchYoutube() / searchFacebook() / searchTiktok()
  │
  │  ├──► Backend API (if available)
  │  │      GET /api/social/instagram/{username}
  │  │      GET /api/social/youtube/{channelName}
  │  │      GET /api/social/facebook/{pageName}
  │  │      GET /api/social/tiktok/{username}
  │  │
  │  └──► Mock Data (fallback if backend unavailable)
  │
  ▼
Profile Data Object
  │
  │  navigate('/profile-overview', { state: { username, platform, profileData } })
  ▼
SocialProfileOverviewPage
  │
  │  User selects service → navigates with state
  ▼
PostSelectionPage / ServicePricingPage → PaymentPage → OrderProcessingPage → OrderCompletePage
```

### B) Authentication Data Flow

```
LoginPage
  │
  │  formData { email, password }
  │  simulated auth (setTimeout)
  ▼
localStorage.setItem('user', userData)
  │
  ▼
Navbar (checks getFromStorage('user'))
  │
  ├──► Logged in: Shows profile dropdown (/profile, /my-orders, /login)
  └──► Not logged in: Shows Login button (/login)

ProfilePage
  │
  │  getFromStorage('user')
  │  If no user → redirect to /login
  ▼
  Display/edit user data (name, email)

ReferFriendPage
  │
  │  getFromStorage('user')
  │  If no user → show login/register links
  ▼
  Show referral code, stats, invite form
```

### C) Location State Flow

> How pages pass data via React Router's `location.state`.

```
Search Pages ──────────────────────────────► /profile-overview
  state: { username, platform, profileData }

Profile Overview ──────────────────────────► /posts-selection
  state: { username, platform, selectedService, profileData }

Profile Overview ──────────────────────────► /quantity-pricing
  state: { username, platform, selectedService, profileData, isProfileService }

Posts Selection ───────────────────────────► /quantity-pricing
  state: { username, platform, selectedService, profileData, selectedPosts }

Quantity Pricing ──────────────────────────► /payment
  state: { username, platform, selectedService, quantity, totalPrice, selectedPosts, profileData }

Payment ───────────────────────────────────► /processing
  state: { orderId, username, platform, selectedService, quantity, totalPrice }

Processing ────────────────────────────────► /complete
  state: { orderId, username, platform, service, quantity, price }

Complete ──────────────────────────────────► /track
  state: { orderId, username, platform, service, quantity }

Error Page ◄─────────────────────────────── Any Page
  state: { title, message, platform, username, errorCode, canRetry }

Success Page ◄───────────────────────────── Any Page
  state: { title, message, nextAction, nextRoute, platform, username, autoRedirect }
```

---

## 6. Component Reuse Map

### `Button.jsx`

| Consumer |
|----------|
| `LoginPage` |
| `RegisterPage` |
| `ProfilePage` |
| `ChangePasswordPage` |
| `FreeServicePage` |
| `OrdersHistoryPage` |
| `ReferFriendPage` |
| `WhyChooseSection` (via navigate) |

### `PlatformSearchSection.jsx`

| Consumer |
|----------|
| `InstagramPage` |
| `YouTubePage` |
| `FacebookPage` |
| `TikTokPage` |

### `SocialPlatformIcon.jsx`

| Consumer |
|----------|
| `Navbar` |
| `PlatformSearchSection` |

### `useScrollToTop.js`

| Consumer |
|----------|
| `InstagramPage`, `YouTubePage`, `FacebookPage`, `TikTokPage` |
| `AboutUsPage`, `ContactPage` |
| `PrivacyPolicyPage`, `TermsOfServicePage` |
| `HelpCenterPage`, `FAQPage`, `RefundPolicyPage` |
| `SocialProfileOverviewPage`, `PostSelectionPage`, `ServicePricingPage`, `PaymentPage` |

### `getFromStorage` (storage.js)

| Consumer |
|----------|
| `ProfilePage` |
| `ReferFriendPage` |

### `ApiService` (services/api.js)

| Consumer | Method |
|----------|--------|
| `InstagramPage` | `searchInstagram` |
| `YouTubePage` | `searchYoutube` |
| `FacebookPage` | `searchFacebook` |
| `TikTokPage` | `searchTiktok` |

### `framer-motion`

| Consumer | APIs Used |
|----------|-----------|
| `Navbar` | `AnimatePresence`, `motion` |
| `ReferFriendPage` | `motion` |

---

## 7. State Management Overview

```
┌──────────────────────────────────────────────────────┐
│              STATE MANAGEMENT (Current)              │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ┌─────────────────┐    ┌──────────────────────┐    │
│  │  LOCAL STATE     │    │  LOCATION STATE       │    │
│  │  (useState)      │    │  (React Router)       │    │
│  │                  │    │                       │    │
│  │ • Form data      │    │ • username            │    │
│  │ • Loading flags  │    │ • platform            │    │
│  │ • Error/success  │    │ • profileData         │    │
│  │ • UI state       │    │ • selectedService     │    │
│  │   (open/close,   │    │ • selectedPosts       │    │
│  │    selected,     │    │ • quantity/price      │    │
│  │    filter,       │    │ • orderId             │    │
│  │    countdown)    │    │ • error details       │    │
│  └─────────────────┘    └──────────────────────┘    │
│                                                      │
│  ┌─────────────────┐    ┌──────────────────────┐    │
│  │  LOCAL STORAGE   │    │  API SERVICE          │    │
│  │  (browser)       │    │  (Fetch API)          │    │
│  │                  │    │                       │    │
│  │ • user data      │    │ • Platform search     │    │
│  │   (auth token)   │    │ • Mock fallbacks      │    │
│  │                  │    │ • Config-based URL    │    │
│  └─────────────────┘    └──────────────────────┘    │
│                                                      │
│  ⚠️  NO GLOBAL STATE MANAGEMENT (Context/Redux)      │
│  📝 TODO: Add auth context, global state             │
└──────────────────────────────────────────────────────┘
```

---

## 8. Platform Services Data

| Platform | Service 1 | Service 2 | Service 3 | Service 4 | Service 5 | Service 6 |
|----------|-----------|-----------|-----------|-----------|-----------|-----------|
| TikTok | Followers | Likes | Views | Comments | Shares | Saves |
| Instagram | Followers | Likes | Views | Comments | Reels Views | Story Views |
| YouTube | Subscribers | Views | Likes | Comments | Watch Hours | Live Viewers |
| Facebook | Page Likes | Post Likes | Video Views | Comments | Followers | Shares |

---

## 9. Error Handling Flow

```
Any Page Error
  │
  ├──► ErrorBoundary (catches React errors)
  │      Shows fallback UI with refresh button
  │
  ├──► navigate('/error', { state: { title, message, platform, ... } })
  │      ErrorPage with countdown → retry or home
  │
  └──► ApiService failure
         Falls back to mock data
         Platform pages → /error on complete failure
```

---

## 10. File Structure Reference

```
src/
├── main.jsx                          # Entry point, error handlers
├── App.jsx                           # Root: BrowserRouter + layout
├── routes/
│   └── AppRoutes.jsx                 # All <Route> definitions
├── pages/
│   ├── home/
│   │   ├── HomePage.jsx
│   │   ├── FreeTrialPage.jsx
│   │   └── FreeServicePage.jsx
│   ├── auth/
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   ├── platforms/
│   │   ├── InstagramPage.jsx
│   │   ├── YouTubePage.jsx
│   │   ├── FacebookPage.jsx
│   │   └── TikTokPage.jsx
│   ├── company/
│   │   ├── AboutUsPage.jsx
│   │   └── ContactPage.jsx
│   ├── legal/
│   │   ├── PrivacyPolicyPage.jsx
│   │   └── TermsOfServicePage.jsx
│   ├── support/
│   │   ├── HelpCenterPage.jsx
│   │   ├── FAQPage.jsx
│   │   └── RefundPolicyPage.jsx
│   ├── referral/
│   │   └── ReferFriendPage.jsx
│   ├── user/
│   │   ├── ProfilePage.jsx
│   │   ├── AccountSettingsPage.jsx
│   │   └── ChangePasswordPage.jsx
│   ├── orders/
│   │   ├── OrdersHistoryPage.jsx
│   │   ├── SocialProfileOverviewPage.jsx
│   │   ├── PostSelectionPage.jsx
│   │   ├── ServicePricingPage.jsx
│   │   ├── PaymentPage.jsx
│   │   ├── OrderProcessingPage.jsx
│   │   ├── OrderCompletePage.jsx
│   │   └── OrderTrackingPage.jsx
│   └── shared/
│       ├── ErrorPage.jsx
│       ├── SuccessPage.jsx
│       └── NotFoundPage.jsx
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── shared/
│   │   ├── Button.jsx
│   │   ├── PlatformSearchSection.jsx
│   │   ├── SocialPlatformIcon.jsx
│   │   └── ClickSpark.jsx
│   ├── home/
│   │   ├── HeroSection.jsx
│   │   ├── ServicesSection.jsx
│   │   └── WhyChooseSection.jsx
│   └── ErrorBoundary.jsx
├── services/
│   └── api.js                        # ApiService with mock fallbacks
├── utils/
│   └── storage.js                    # getFromStorage / setToStorage
└── hooks/
    └── useScrollToTop.js
```

---

*Generated for Social Boost / ViralKik — React SMM Application*
