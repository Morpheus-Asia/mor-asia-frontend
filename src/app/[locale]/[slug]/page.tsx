import fetchContentType from "morpheus-asia/utils/strapi/fetchContentTypes";
import { Metadata } from "next";
import { generateMetadataObject } from "morpheus-asia/utils/strapi";
import { PageData } from "morpheus-asia/containers/PageData";

/**
 * ===========================
 * MAIN
 * ===========================
 */

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { locale, slug } = await params;
  const pageData = await fetchContentType(
    "pages",
    {
      filters: {
        slug,
        locale,
      },
      pLevel: 4,
    },
    true
  );

  const seo = pageData?.seo;
  const metadata = generateMetadataObject(seo, locale);
  return metadata;
}

export default async function Page({ params }: any) {
  // =============== VARIABLES
  // const { locale, slug } = (await params) || {};
  const { locale, slug } = await params;

  // =============== VIEWS
  return <PageData slug={slug} locale={locale} />;
}
