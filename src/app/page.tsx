import { VStack } from "@chakra-ui/react";
import fetchContentType from "morpheus-asia/utils/strapi/fetchContentTypes";
import { get } from "lodash";
import { Renderer } from "morpheus-asia/Renderer";
import ClientSlugHandler from "morpheus-asia/components/ClientSlugHandler";
import { Metadata } from "next";
import { generateMetadataObject } from "morpheus-asia/utils/strapi";

/**
 * ===========================
 * MAIN
 * ===========================
 */

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchContentType(
    "pages",
    {
      filters: {
        slug: "homepage",
        locale: "en",
      },
      pLevel: 4,
    },
    true
  );

  const seo = pageData?.seo;
  const metadata = generateMetadataObject(seo, "en");
  return metadata;
}

export default async function HomePage() {
  const locale = "en";
  // =============== API
  const pageData = await fetchContentType(
    "pages",
    {
      filters: {
        slug: "homepage",
        locale,
      },
      pLevel: 4,
    },
    true
  );

  // =============== VARIABLES
  const sections = get(pageData, "sections", []);

  // =============== VIEWS
  return (
    <VStack pt={"4rem"}>
      <ClientSlugHandler localizedSlugs={{ en: "", cn: "" }} />
      <Renderer items={sections} locale={locale} />
    </VStack>
  );
}
