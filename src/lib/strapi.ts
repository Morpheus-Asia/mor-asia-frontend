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

/**
 * Fetch a single event by slug
 */
export async function getEventBySlug(slug: string) {
  const response = await fetchStrapi<any[]>(`/api/events?filters[slug][$eq]=${slug}&populate=*`);
  
  // Strapi returns an array, so we need to get the first item
  if (response.data && response.data.length > 0) {
    return {
      data: response.data[0],
      meta: response.meta,
    };
  }
  
  throw new Error('Event not found');
}

/**
 * Fetch all clubs with relations
 */
export async function getClubs() {
  return fetchStrapi('/api/clubs?populate=*&sort[0]=Region:asc');
}

/**
 * Fetch a single club by slug
 */
export async function getClubBySlug(slug: string) {
  const response = await fetchStrapi<any[]>(`/api/clubs?filters[slug][$eq]=${slug}&populate=*`);
  
  // Strapi returns an array, so we need to get the first item
  if (response.data && response.data.length > 0) {
    return {
      data: response.data[0],
      meta: response.meta,
    };
  }
  
  throw new Error('Club not found');
}

/**
 * Fetch all idea banks with relations
 */
export async function getIdeaBanks() {
  return fetchStrapi('/api/idea-banks?populate=*&sort[0]=createdAt:desc');
}

/**
 * Fetch a single idea bank by slug
 */
export async function getIdeaBankBySlug(slug: string) {
  const response = await fetchStrapi<any[]>(`/api/idea-banks?filters[slug][$eq]=${slug}&populate=*`);
  
  // Strapi returns an array, so we need to get the first item
  if (response.data && response.data.length > 0) {
    return {
      data: response.data[0],
      meta: response.meta,
    };
  }
  
  throw new Error('Idea bank not found');
}

/**
 * Fetch all doc sections with their related docs
 */
export async function getDocSections() {
  return fetchStrapi<DocSection[]>('/api/doc-sections?populate[docs][populate]=*');
}

/**
 * Fetch a single doc section by slug
 */
export async function getDocSectionBySlug(slug: string) {
  const response = await fetchStrapi<DocSection[]>(`/api/doc-sections?filters[Slug][$eq]=${slug}&populate[docs][populate]=*`);
  
  if (response.data && response.data.length > 0) {
    return {
      data: response.data[0],
      meta: response.meta,
    };
  }
  
  throw new Error('Doc section not found');
}

/**
 * Fetch all docs
 */
export async function getDocs() {
  return fetchStrapi<Doc[]>('/api/docs?populate=*');
}

/**
 * Fetch a single doc by slug
 */
export async function getDocBySlug(slug: string) {
  const response = await fetchStrapi<Doc[]>(`/api/docs?filters[Slug][$eq]=${slug}&populate=*`);
  
  if (response.data && response.data.length > 0) {
    return {
      data: response.data[0],
      meta: response.meta,
    };
  }
  
  throw new Error('Doc not found');
}

/**
 * Fetch learn page single type
 */
export async function getLearnPage() {
  return fetchStrapi<LearnPage>('/api/learn-page');
}

// Types for Doc Sections and Docs
export interface Doc {
  id: number;
  documentId: string;
  Title: string;
  Slug: string;
  Content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface DocSection {
  id: number;
  documentId: string;
  Title: string;
  Slug: string;
  Position?: number;
  docs?: Doc[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface LearnPage {
  id: number;
  documentId: string;
  Title: string;
  Content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Types for Forms
export interface QuestionBoolean {
  id: number;
  documentId: string;
  Question: string;
  Order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface QuestionMcq {
  id: number;
  documentId: string;
  Question: string;
  Order: number;
  a?: string;
  b?: string;
  c?: string;
  d?: string;
  e?: string;
  f?: string;
  g?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface QuestionSubjective {
  id: number;
  documentId: string;
  Question: string;
  Order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Submission {
  id: number;
  documentId: string;
  DateTime: string;
  Content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Form {
  id: number;
  documentId: string;
  Name: string;
  Slug: string;
  question_booleans?: QuestionBoolean[];
  question_mcqs?: QuestionMcq[];
  question_subjectives?: QuestionSubjective[];
  submissions?: Submission[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

/**
 * Fetch all forms
 */
export async function getForms() {
  return fetchStrapi<Form[]>('/api/forms?populate=*');
}

/**
 * Fetch a single form by slug with all question relations
 */
export async function getFormBySlug(slug: string) {
  const response = await fetchStrapi<Form[]>(
    `/api/forms?filters[Slug][$eq]=${slug}&populate[question_booleans][populate]=*&populate[question_mcqs][populate]=*&populate[question_subjectives][populate]=*`
  );
  
  if (response.data && response.data.length > 0) {
    return {
      data: response.data[0],
      meta: response.meta,
    };
  }
  
  throw new Error('Form not found');
}

/**
 * Create a form submission
 */
export async function createSubmission(formDocumentId: string, content: string) {
  const url = `${STRAPI_URL}/api/submissions`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        DateTime: new Date().toISOString(),
        Content: content,
        form: formDocumentId,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Strapi API error details:', errorText);
    throw new Error(`Failed to create submission: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
