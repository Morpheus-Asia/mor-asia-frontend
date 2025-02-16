"use client";

import { useEffect, useState } from "react";
import { VStack } from "@chakra-ui/react";
import { get } from "lodash";
import fetchContentType from "morpheus-asia/utils/strapi/fetchContentTypes";
import ClientSlugHandler from "morpheus-asia/components/ClientSlugHandler";
import { Renderer } from "morpheus-asia/Renderer";
import FullPageLoader from "morpheus-asia/components/FullPageLoader";
import { ReCaptchaProvider } from "next-recaptcha-v3";

export const PageData: React.FC<any> = (props) => {
  const { locale, slug } = props;
  // =============== HOOKS
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState<any>(null);

  // =============== EFFECTS
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchContentType(
          "pages",
          {
            filters: {
              slug,
              locale,
            },
            pLevel: 6,
          },
          true
        );
        setPageData(data);
      } catch (error) {
        console.error("Error fetching page data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locale, slug]);

  // =============== VARIABLES
  const sections = get(pageData, "sections", []);
  const localizedSlugs = pageData?.localizations?.reduce(
    (acc: Record<string, string>, localization: any) => {
      if (localization.locale === "zh-Hans") {
        acc["cn"] = "";
      } else {
        acc[localization.locale] = "";
      }
      return acc;
    },
    { [locale]: "" }
  );

  // =============== RENDER FUNCTIONS
  if (loading) return <FullPageLoader />;

  return (
    <VStack pt={"4rem"}>
      <ReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      >
        <ClientSlugHandler localizedSlugs={localizedSlugs} />
        <Renderer items={sections} locale={locale} />
      </ReCaptchaProvider>
    </VStack>
  );
};
