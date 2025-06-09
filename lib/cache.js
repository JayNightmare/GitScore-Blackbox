/**
 * Caching utilities for repository scores
 * Handles localStorage caching for client-side persistence and build-time caching
 */

const CACHE_KEY = 'github-scorer-cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export function getCachedScore(owner, repo) {
  if (typeof window === 'undefined') return null;
  
  try {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    const key = `${owner}/${repo}`;
    const cached = cache[key];
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
    
    return null;
  } catch (error) {
    console.error('Error reading from cache:', error);
    return null;
  }
}

export function setCachedScore(owner, repo, data) {
  if (typeof window === 'undefined') return;
  
  try {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    const key = `${owner}/${repo}`;
    
    cache[key] = {
      data,
      timestamp: Date.now(),
    };
    
    // Keep only the last 50 entries to prevent localStorage bloat
    const entries = Object.entries(cache);
    if (entries.length > 50) {
      const sorted = entries.sort((a, b) => b[1].timestamp - a[1].timestamp);
      const trimmed = Object.fromEntries(sorted.slice(0, 50));
      localStorage.setItem(CACHE_KEY, JSON.stringify(trimmed));
    } else {
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    }
  } catch (error) {
    console.error('Error writing to cache:', error);
  }
}

export function clearCache() {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
}

export function getCacheStats() {
  if (typeof window === 'undefined') return { count: 0, size: 0 };
  
  try {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    const count = Object.keys(cache).length;
    const size = new Blob([JSON.stringify(cache)]).size;
    
    return { count, size };
  } catch (error) {
    return { count: 0, size: 0 };
  }
}
