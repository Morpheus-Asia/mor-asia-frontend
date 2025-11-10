/**
 * Reusable Strapi API functions
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/**
 * Generic fetch function for Strapi API
 */
export async function fetchStrapi<T>(
  path: string,
  options: RequestInit = {}
): Promise<StrapiResponse<T>> {
  const url = `${STRAPI_URL}${path}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Strapi API error details:', errorText);
      throw new Error(`Strapi API error: ${response.status} ${response.statusText} - ${errorText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    throw error;
  }
}

/**
 * Fetch all blog posts with relations
 */
export async function getBlogPosts() {
  return fetchStrapi('/api/blog-posts?populate=*&sort[0]=date:desc');
}

/**
 * Fetch a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string) {
  const response = await fetchStrapi<any[]>(`/api/blog-posts?filters[slug][$eq]=${slug}&populate=*`);
  
  // Strapi returns an array, so we need to get the first item
  if (response.data && response.data.length > 0) {
    return {
      data: response.data[0],
      meta: response.meta,
    };
  }
  
  throw new Error('Blog post not found');
}

/**
 * Fetch blog posts by tag
 */
export async function getBlogPostsByTag(tagSlug: string) {
  return fetchStrapi(`/api/blog-posts?filters[tags][slug][$eq]=${tagSlug}&populate=*&sort[0]=date:desc`);
}

/**
 * Fetch all tags
 */
export async function getTags() {
  return fetchStrapi('/api/tags');
}

/**
 * Fetch all authors
 */
export async function getAuthors() {
  return fetchStrapi('/api/authors');
}

/**
 * Fetch all events with relations
 */
export async function getEvents() {
  return fetchStrapi('/api/events?populate=*&sort[0]=Date:asc');
}
