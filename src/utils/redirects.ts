// Redirect configuration for direct URLs to blog posts
export interface RedirectConfig {
  source: string;
  target: string;
  locale?: string;
}

// Static redirect map for known URLs
const staticRedirectMap: Record<string, RedirectConfig> = {
  'futurehack': {
    source: '/futurehack',
    target: '/en/blog/futurehack',
    locale: 'en'
  },
  // Add more static redirects here as needed
  // 'another-post': {
  //   source: '/another-post',
  //   target: '/en/blog/another-post',
  //   locale: 'en'
  // }
};

/**
 * Check if a pathname should be redirected
 * @param pathname - The current pathname
 * @returns RedirectConfig if redirect is needed, null otherwise
 */
export function getRedirectConfig(pathname: string): RedirectConfig | null {
  // Remove leading slash for matching
  const cleanPath = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  
  // Check static redirects
  if (staticRedirectMap[cleanPath]) {
    return staticRedirectMap[cleanPath];
  }
  
  return null;
} 