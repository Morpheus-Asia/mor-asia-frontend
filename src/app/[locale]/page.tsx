// import { VStack } from "@chakra-ui/react";
import fetchContentType from "morpheus-asia/utils/strapi/fetchContentTypes";
// import { get } from "lodash";
// import { Renderer } from "morpheus-asia/Renderer";
// import ClientSlugHandler from "morpheus-asia/components/ClientSlugHandler";
import { Metadata } from "next";
import { generateMetadataObject } from "morpheus-asia/utils/strapi";
import { TestLoading } from "morpheus-asia/components/Test";

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

export default async function HomePage({ params }: any) {
  // =============== VARIABLES
  const { locale } = await params;
  // =============== API
  // const pageData = await fetchContentType(
  //   "pages",
  //   {
  //     filters: {
  //       slug: "homepage",
  //       locale,
  //     },
  //     pLevel: 5,
  //   },
  //   true
  // );

  // console.log("page--------->", pageData);
  // // =============== VARIABLES
  // const sections = get(pageData, "sections", []);

  // // =============== UTILS
  // // get localized slugs from strapi
  // const localizedSlugs = pageData?.localizations?.reduce(
  //   (acc: Record<string, string>, localization: any) => {
  //     if (localization.locale === "zh-Hans") {
  //       acc["cn"] = "";
  //       return acc;
  //     }
  //     acc[localization.locale] = "";
  //     return acc;
  //   },
  //   { [locale]: "" }
  // );

  // =============== VIEWS
  return <TestLoading locale={locale} />;
}
