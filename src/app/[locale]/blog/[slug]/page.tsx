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
        featured_Image: true,
      },
      pLevel: 4,
    },
    false
  );

  const blogPost = response?.data?.[0] as BlogPost;

  const seo = {
    metaTitle: blogPost?.title,
    metaDescription: blogPost?.content?.split("\n")[0] || "",
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
