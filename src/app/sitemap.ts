import { MetadataRoute } from 'next'
import { i18n } from '../../i18n.config'
import fetchContentType from '../utils/strapi/fetchContentTypes'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://morpheus.asia'
  const locales = i18n.locales
  
  const sitemapEntries: MetadataRoute.Sitemap = []
  
  // Static routes
  const staticRoutes = [
    '', // Home page
    '/blog',
    '/metrics',
  ]
  
  // Add static routes for each locale
  locales.forEach(locale => {
    staticRoutes.forEach(route => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: route === '' ? 1 : 0.8,
      })
    })
  })
  
  // Fetch all dynamic pages from Strapi
  try {
    for (const locale of locales) {
      const pages = await fetchContentType('pages', {
        filters: { locale },
        pagination: { limit: 100 }, // Adjust based on your needs
      })
      
      if (pages?.data) {
        pages.data.forEach((page: any) => {
          // Skip homepage as it's already included in static routes
          if (page.slug !== 'homepage') {
            sitemapEntries.push({
              url: `${baseUrl}/${locale}/${page.slug}`,
              lastModified: new Date(page.updatedAt || page.createdAt),
              changeFrequency: 'weekly',
              priority: 0.7,
            })
          }
        })
      }
    }
  } catch (error) {
    console.error('Error fetching pages for sitemap:', error)
  }
  
  // Fetch all blog posts from Strapi
  try {
    for (const locale of locales) {
      const blogPosts = await fetchContentType('blog-posts', {
        filters: { locale },
        pagination: { limit: 100 }, // Adjust based on your needs
      })
      
      if (blogPosts?.data) {
        blogPosts.data.forEach((post: any) => {
          sitemapEntries.push({
            url: `${baseUrl}/${locale}/blog/${post.slug}`,
            lastModified: new Date(post.updatedAt || post.createdAt),
            changeFrequency: 'monthly',
            priority: 0.6,
          })
        })
      }
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
  }
  
  return sitemapEntries
} 