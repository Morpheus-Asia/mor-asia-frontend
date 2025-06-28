import fetchContentType from "morpheus-asia/utils/strapi/fetchContentTypes";
import { Metadata } from "next";
import { generateMetadataObject } from "morpheus-asia/utils/strapi";
import ClientSlugHandler from "morpheus-asia/components/ClientSlugHandler";
import { BlogPost } from "morpheus-asia/@types/blog";
import BlogPostContainer from "morpheus-asia/containers/BlogPostContainer";

// @TODO
// Refactor to a separate container file
// use MarkdownRender for content rendering
// tags to be clickable

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { locale, slug } = await params;

  const response = await fetchContentType(
    "blog-posts",
    {
      filters: {
        locale,
        slug,
      },
      populate: {
        author: {
          populate: ["avatar"],
        },
        tags: true,
        featured_image: true,
      },
      pLevel: 4,
    },
    false
  );

  if (!response || !response.data || response.data.length === 0) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const blogPost = response?.data?.[0] as BlogPost;

  const title = blogPost?.title;
  const baseUrl = "https://www.morpheus.asia";
  const content = blogPost?.summary;
  const image = blogPost?.featured_image;
  const imageUrl = blogPost?.featured_image?.url;
  const url = `${baseUrl}/${locale}/blog/${slug}`;

  const seo = {
    metaTitle: title,
    metaDescription: content,
    metaImage: image ? { url: imageUrl } : null,
    canonicalURL: url,
    opengraph: {
      title,
      description: content,
      url,
      image: image ? { url: imageUrl } : null,
      siteName: "Morpheus Asia",
      type: "article",
    },
    metaSocial: [
      {
        title,
        description: content,
        socialNetwork: "Twitter",
        image: image ? { url: imageUrl } : null,
      },
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: title,
      description: content,
      author: {
        "@type": "Person",
        name: blogPost.author?.name || "Unknown",
      },
      datePublished: blogPost.publishedAt,
      dateModified: blogPost.updatedAt,
      mainEntityOfPage: url,
      image: imageUrl,
    },
  };

  const metadata = generateMetadataObject(seo, locale);
  return metadata;
}

export default async function BlogPostPage({ params }: any) {
  const { locale, slug } = await params;
  const response = await fetchContentType(
    "blog-posts",
    {
      filters: {
        locale,
        slug,
      },
      populate: {
        author: {
          populate: ["avatar"],
        },
        tags: true,
        featured_image: true,
      },
      pLevel: 4,
    },
    false
  );

  const blogPost = response?.data?.[0] as BlogPost;

  // Build localizedSlugs with actual slug values from localizations
  const localizedSlugs = blogPost?.localizations?.reduce(
    (acc: Record<string, string>, localization: any) => {
      if (localization.locale === "zh-Hans") {
        acc["cn"] = "";
        return acc;
      }
      acc[localization.locale] = "";
      return acc;
    },
    { [locale]: "" }
  ) as Record<string, string>;

  return (
    <>
      <ClientSlugHandler localizedSlugs={localizedSlugs} />
      <BlogPostContainer blogPost={blogPost} locale={locale} />
    </>
  );
}
