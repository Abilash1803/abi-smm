/**
 * Centralized Color Theme Configuration
 * 
 * This file contains all colors used throughout the SMM application.
 * Change colors here to update them globally across the entire app.
 * 
 * Usage: Import and use these color variables in your components
 * Example: import { COLORS } from '../shared/constants/colors'
 *          className={`bg-gradient-to-r ${COLORS.gradients.primary}`}
 */

export const COLORS = {
  // ===== PRIMARY BRAND COLORS =====
  primary: {
    // Main brand orange/red colors
    main: '#FF6B35',           // Primary orange
    light: '#FFA500',          // Light orange
    dark: '#E55A2B',           // Darker orange
    hover: '#FF7A45',          // Hover state
  },

  // ===== SECONDARY COLORS =====
  secondary: {
    pink: '#FFB3D9',           // Light pink
    purple: '#FF6B9D',         // Pink-purple
    blue: '#4F46E5',           // Indigo blue
    green: '#10B981',          // Success green
    red: '#EF4444',            // Error red
  },

  // ===== BACKGROUND COLORS =====
  backgrounds: {
    // Main page backgrounds
    primary: 'from-[#FFD9E8] to-[#FFF5E6]',     // Main gradient (pink to cream)
    secondary: 'from-[#FFF5E6] to-[#FFE4E1]',   // Alternative gradient
    
    // Platform-specific backgrounds
    instagram: 'from-pink-50 to-purple-50',      // Instagram theme
    youtube: 'from-red-50 to-pink-50',           // YouTube theme
    facebook: 'from-blue-50 to-pink-50',         // Facebook theme
    tiktok: 'from-pink-50 to-rose-50',           // TikTok theme
    
    // Page-specific backgrounds
    auth: 'from-[#FFD9E8] to-[#FFF5E6]',        // Login/Register pages
    support: 'from-indigo-50 to-purple-50',      // Support pages
    legal: 'from-gray-50 to-blue-50',            // Legal pages
    company: 'from-blue-50 to-indigo-50',        // Company pages
    error: 'from-red-50 to-pink-50',             // Error pages
    success: 'from-green-50 to-blue-50',         // Success pages
  },

  // ===== CARD COLORS =====
  cards: {
    // Card backgrounds
    primary: 'bg-white/80',                      // Main card background (semi-transparent white)
    secondary: 'bg-white/60',                    // Secondary card background
    solid: 'bg-white',                           // Solid white cards
    
    // Card borders
    border: 'border-white/40',                   // Card borders
    borderHover: 'border-white/60',              // Card borders on hover
    
    // Card shadows
    shadow: 'shadow-xl',                         // Main card shadow
    shadowHover: 'shadow-2xl',                   // Card shadow on hover
  },

  // ===== BUTTON COLORS =====
  buttons: {
    // Primary buttons
    primary: 'from-[#FF6B35] to-[#FFA500]',     // Main CTA buttons
    primaryHover: 'from-[#E55A2B] to-[#FF8C00]', // Primary button hover
    
    // Secondary buttons
    secondary: 'from-indigo-600 to-purple-600',  // Secondary buttons
    secondaryHover: 'from-indigo-700 to-purple-700', // Secondary button hover
    
    // Platform-specific buttons
    instagram: 'from-pink-500 to-purple-600',    // Instagram buttons
    youtube: 'from-red-500 to-red-600',          // YouTube buttons
    facebook: 'from-blue-600 to-blue-700',       // Facebook buttons
    tiktok: 'from-black to-gray-800',            // TikTok buttons
    
    // Special buttons
    success: 'from-green-500 to-green-600',      // Success buttons
    danger: 'from-red-500 to-red-600',           // Danger buttons
    warning: 'from-yellow-500 to-orange-500',    // Warning buttons
    
    // Button text colors
    textPrimary: 'text-white',                   // Primary button text
    textSecondary: 'text-gray-700',              // Secondary button text
  },

  // ===== TEXT COLORS =====
  text: {
    // Main text colors
    primary: 'text-gray-900',                    // Main headings
    secondary: 'text-gray-600',                  // Secondary text
    muted: 'text-gray-500',                      // Muted text
    light: 'text-gray-400',                      // Light text
    
    // Special text colors
    white: 'text-white',                         // White text
    brand: 'text-[#FF6B35]',                     // Brand colored text
    success: 'text-green-600',                   // Success text
    error: 'text-red-600',                       // Error text
    warning: 'text-yellow-600',                  // Warning text
    
    // Link colors
    link: 'text-blue-600',                       // Links
    linkHover: 'text-blue-700',                  // Link hover
  },

  // ===== FORM COLORS =====
  forms: {
    // Input fields
    inputBg: 'bg-white',                         // Input background
    inputBorder: 'border-gray-300',              // Input border
    inputBorderFocus: 'border-[#FF6B35]',        // Input border on focus
    inputText: 'text-gray-700',                  // Input text
    inputPlaceholder: 'placeholder-gray-400',    // Input placeholder
    
    // Form labels
    label: 'text-gray-700',                      // Form labels
    
    // Form validation
    errorBorder: 'border-red-500',               // Error state border
    successBorder: 'border-green-500',           // Success state border
  },

  // ===== NAVIGATION COLORS =====
  navigation: {
    // Navbar
    navbarBg: 'bg-white/95',                     // Navbar background
    navbarBorder: 'border-gray-200/50',          // Navbar border
    navbarText: 'text-gray-700',                 // Navbar text
    navbarTextHover: 'text-[#FF6B35]',           // Navbar text hover
    
    // Active states
    navActive: 'text-[#FF6B35]',                 // Active navigation item
    navActiveBg: 'bg-[#FF6B35]/10',              // Active navigation background
    
    // Dropdown menus
    dropdownBg: 'bg-white',                      // Dropdown background
    dropdownBorder: 'border-gray-200',           // Dropdown border
    dropdownShadow: 'shadow-xl',                 // Dropdown shadow
  },

  // ===== FOOTER COLORS =====
  footer: {
    background: 'from-[#FFD9E8] to-[#FFF5E6]',  // Footer background
    text: 'text-gray-800',                       // Footer text
    linkText: 'text-gray-700',                   // Footer links
    linkHover: 'text-[#FF6B35]',                 // Footer link hover
    border: 'border-gray-300/50',                // Footer borders
  },

  // ===== PLATFORM SPECIFIC GRADIENTS =====
  platformGradients: {
    // Service card gradients for different platforms
    instagram: {
      followers: 'from-[#FF6B35] to-[#FFA500]',
      likes: 'from-[#FFA500] to-[#FFB3D9]',
      views: 'from-[#FFB3D9] to-[#FF6B9D]',
    },
    youtube: {
      subscribers: 'from-red-500 to-red-600',
      views: 'from-red-600 to-pink-600',
      likes: 'from-pink-600 to-purple-600',
    },
    facebook: {
      likes: 'from-blue-500 to-blue-600',
      followers: 'from-blue-600 to-indigo-600',
      shares: 'from-indigo-600 to-purple-600',
    },
    tiktok: {
      views: 'from-[#FF6B35] to-[#FFA500]',
      followers: 'from-[#FFA500] to-[#FFB3D9]',
      likes: 'from-[#FFB3D9] to-[#FF6B9D]',
    },
  },

  // ===== STATUS COLORS =====
  status: {
    // Order status colors
    pending: 'text-yellow-600 bg-yellow-50',
    processing: 'text-blue-600 bg-blue-50',
    completed: 'text-green-600 bg-green-50',
    failed: 'text-red-600 bg-red-50',
    cancelled: 'text-gray-600 bg-gray-50',
    
    // Badge colors
    badgeSuccess: 'bg-green-100 text-green-800',
    badgeWarning: 'bg-yellow-100 text-yellow-800',
    badgeError: 'bg-red-100 text-red-800',
    badgeInfo: 'bg-blue-100 text-blue-800',
  },

  // ===== SPECIAL EFFECTS =====
  effects: {
    // Backdrop blur effects
    backdropBlur: 'backdrop-blur-sm',            // Light blur
    backdropBlurStrong: 'backdrop-blur-xl',      // Strong blur
    
    // Hover effects
    hoverScale: 'hover:scale-105',               // Scale on hover
    hoverTranslate: 'hover:-translate-y-2',      // Move up on hover
    
    // Transitions
    transition: 'transition-all duration-200',    // Standard transition
    transitionSlow: 'transition-all duration-300', // Slow transition
    
    // Focus effects
    focusRing: 'focus:ring-2 focus:ring-[#FF6B35] focus:ring-opacity-50',
  },

  // ===== UTILITY COLORS =====
  utilities: {
    // Dividers
    divider: 'border-gray-200',                  // Standard divider
    dividerLight: 'border-gray-100',             // Light divider
    
    // Overlays
    overlay: 'bg-black/50',                      // Modal overlay
    overlayLight: 'bg-white/80',                 // Light overlay
    
    // Highlights
    highlight: 'bg-yellow-200',                  // Text highlight
    selection: 'bg-[#FF6B35]/20',                // Selection highlight
  },
}

// ===== QUICK ACCESS SHORTCUTS =====
// These are commonly used color combinations for quick access

export const QUICK_COLORS = {
  // Most used gradients
  PRIMARY_GRADIENT: COLORS.backgrounds.primary,
  BUTTON_GRADIENT: COLORS.buttons.primary,
  CARD_BG: COLORS.cards.primary,
  
  // Most used text colors
  HEADING: COLORS.text.primary,
  BODY_TEXT: COLORS.text.secondary,
  BRAND_TEXT: COLORS.text.brand,
  
  // Most used button styles
  CTA_BUTTON: `bg-gradient-to-r ${COLORS.buttons.primary} ${COLORS.buttons.textPrimary}`,
  SECONDARY_BUTTON: `bg-gradient-to-r ${COLORS.buttons.secondary} ${COLORS.buttons.textPrimary}`,
}

// ===== THEME VARIANTS =====
// Alternative color schemes for different themes

export const THEME_VARIANTS = {
  // Light theme (default)
  light: {
    background: COLORS.backgrounds.primary,
    cardBg: COLORS.cards.primary,
    textPrimary: COLORS.text.primary,
    textSecondary: COLORS.text.secondary,
  },
  
  // Dark theme (for future implementation)
  dark: {
    background: 'from-gray-900 to-gray-800',
    cardBg: 'bg-gray-800/80',
    textPrimary: 'text-white',
    textSecondary: 'text-gray-300',
  },
  
  // High contrast theme (for accessibility)
  highContrast: {
    background: 'from-white to-gray-100',
    cardBg: 'bg-white',
    textPrimary: 'text-black',
    textSecondary: 'text-gray-800',
  },
}

export default COLORS