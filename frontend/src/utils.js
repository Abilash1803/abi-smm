// ============================================
// STORAGE UTILITIES
// ============================================

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Storage error:', error);
    return false;
  }
}

export function getFromStorage(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Storage error:', error);
    return null;
  }
}

export function removeFromStorage(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
}


// ============================================
// VALIDATION UTILITIES
// ============================================

export function validateEmail(email) {
  if (!email) return { valid: false, message: 'Email is required' };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return { valid: false, message: 'Invalid email' };
  return { valid: true };
}

export function validatePassword(password) {
  if (!password) return { valid: false, message: 'Password is required' };
  if (password.length < 6) return { valid: false, message: 'Password must be 6+ characters' };
  return { valid: true };
}

export function validateName(name) {
  if (!name || name.trim().length === 0) return { valid: false, message: 'Name is required' };
  if (name.length < 2) return { valid: false, message: 'Name must be 2+ characters' };
  return { valid: true };
}

export function validatePhone(phone) {
  if (!phone) return { valid: false, message: 'Phone is required' };
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(phone)) return { valid: false, message: 'Invalid phone number' };
  return { valid: true };
}

export function validateQuantity(quantity, min = 100, max = 100000) {
  if (!quantity) return { valid: false, message: 'Quantity is required' };
  const num = parseInt(quantity);
  if (isNaN(num)) return { valid: false, message: 'Must be a number' };
  if (num < min) return { valid: false, message: `Minimum: ${min}` };
  if (num > max) return { valid: false, message: `Maximum: ${max}` };
  return { valid: true };
}


// ============================================
// HELPER UTILITIES
// ============================================

export function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-IN', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function formatDateShort(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-IN', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric'
  });
}

export function getRelativeTime(date) {
  if (!date) return '';
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now - past) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;
  return formatDateShort(date);
}

export function truncateText(text, maxLength = 50) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function generateOrderId() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `ORD${timestamp}${random}`;
}

export function debounce(func, wait = 300) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function copyToClipboard(text) {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  }
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return Promise.resolve();
  } catch (err) {
    document.body.removeChild(textArea);
    return Promise.reject(err);
  }
}


// ============================================
// PRICING UTILITIES
// ============================================

export const PRICING = {
  tiktok: {
    views: { base: 50, per1000: 50 },
    followers: { base: 100, per1000: 100 },
    likes: { base: 40, per1000: 40 },
    comments: { base: 150, per1000: 150 }
  },
  instagram: {
    views: { base: 45, per1000: 45 },
    followers: { base: 95, per1000: 95 },
    likes: { base: 35, per1000: 35 },
    comments: { base: 140, per1000: 140 }
  },
  facebook: {
    views: { base: 40, per1000: 40 },
    followers: { base: 90, per1000: 90 },
    likes: { base: 30, per1000: 30 },
    comments: { base: 130, per1000: 130 }
  },
  youtube: {
    views: { base: 60, per1000: 60 },
    subscribers: { base: 120, per1000: 120 },
    likes: { base: 50, per1000: 50 },
    comments: { base: 160, per1000: 160 }
  }
};

export function calculatePrice(platform, service, quantity) {
  const pricing = PRICING[platform]?.[service];
  if (!pricing) return 0;
  const units = Math.ceil(quantity / 1000);
  return units * pricing.per1000;
}

export function formatPrice(price) {
  return `₹${price.toLocaleString('en-IN')}`;
}


// ============================================
// SOCIAL MEDIA UTILITIES
// ============================================

export const PLATFORMS = {
  tiktok: {
    name: 'TikTok',
    icon: '🎵',
    color: '#000000',
    services: ['views', 'followers', 'likes', 'comments']
  },
  instagram: {
    name: 'Instagram',
    icon: '📷',
    color: '#E4405F',
    services: ['views', 'followers', 'likes', 'comments']
  },
  facebook: {
    name: 'Facebook',
    icon: '👍',
    color: '#1877F2',
    services: ['views', 'followers', 'likes', 'comments']
  },
  youtube: {
    name: 'YouTube',
    icon: '▶️',
    color: '#FF0000',
    services: ['views', 'subscribers', 'likes', 'comments']
  }
};

export const SERVICE_LABELS = {
  views: 'Views',
  followers: 'Followers',
  subscribers: 'Subscribers',
  likes: 'Likes',
  comments: 'Comments'
};

export function getPlatformInfo(platform) {
  return PLATFORMS[platform] || null;
}

export function getServiceLabel(service) {
  return SERVICE_LABELS[service] || service;
}

export function validateUsername(username) {
  if (!username || username.trim().length === 0) {
    return { valid: false, message: 'Username is required' };
  }
  if (username.length < 3) {
    return { valid: false, message: 'Username must be 3+ characters' };
  }
  if (username.length > 30) {
    return { valid: false, message: 'Username must be less than 30 characters' };
  }
  const usernameRegex = /^[a-zA-Z0-9._]+$/;
  if (!usernameRegex.test(username)) {
    return { valid: false, message: 'Only letters, numbers, dots and underscores allowed' };
  }
  return { valid: true };
}

export function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}
