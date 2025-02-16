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
        slug: slug,
        locale: locale,
      },
      populate: "seo.metaImage",
    },
    true
  );

  const seo = pageData?.seo;
  const metadata = generateMetadataObject(seo);
  return metadata;
}

export default async function Page({ params }: any) {
  // =============== VARIABLES
  // const { locale, slug } = (await params) || {};
  const { locale, slug } = await params;

  // =============== VIEWS
  return <PageData slug={slug} locale={locale} />;
}
