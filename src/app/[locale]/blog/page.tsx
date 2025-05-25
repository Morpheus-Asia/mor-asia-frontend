import fetchContentType from "morpheus-asia/utils/strapi/fetchContentTypes";
import { Metadata } from "next";
import { generateMetadataObject } from "morpheus-asia/utils/strapi";
import BlogScreen from "morpheus-asia/app/screens/BlogScreen";
import ClientSlugHandler from "morpheus-asia/components/ClientSlugHandler";

/**
 * ===========================
 * MAIN
 * ===========================
 */

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { locale } = await params;
  const pageData = await fetchContentType(
    "blog-page",
    {
      filters: { locale },
      pLevel: 4,
    },
    true
  );

  const seo = pageData?.seo;
  const metadata = generateMetadataObject(seo, locale);
  return metadata;
}

export default async function Page({ params }: any) {
  // ============== VARIABLES
  const { locale } = await params;
  const blogPage = await fetchContentType(
    "blog-page",
    {
      filters: { locale },
      pLevel: 4,
    },
    true
  );

  // Debug log to check localizations
  console.log('BLOG PAGE LOCALIZATIONS:', blogPage?.localizations, 'CURRENT LOCALE:', locale);

  const localizedSlugs = blogPage?.localizations?.reduce(
    (acc: Record<string, string>, localization: any) => {
      if (localization.locale === "zh-Hans") {
        acc["cn"] = "";
        return acc;
      }
      acc[localization.locale] = "";
      return acc;
    },
    { [locale]: "" }
  );

  // ================ VIEWS
  return (
    <>
      <ClientSlugHandler localizedSlugs={localizedSlugs} />
      <BlogScreen locale={locale} blogPage={blogPage} />
    </>
  );
} 