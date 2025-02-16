"use client";

import { useEffect, useState } from "react";
import { VStack } from "@chakra-ui/react";
import { get } from "lodash";
import fetchContentType from "morpheus-asia/utils/strapi/fetchContentTypes";
import ClientSlugHandler from "../ClientSlugHandler";
import { Renderer } from "morpheus-asia/Renderer";

export const TestLoading: React.FC<any> = (props) => {
  const { locale } = props;
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
              slug: "homepage",
              locale,
            },
            pLevel: 5,
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
  }, []);

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
  if (loading) return null;

  return (
    <VStack pt={"4rem"}>
      <ClientSlugHandler localizedSlugs={localizedSlugs} />
      <Renderer items={sections} locale={locale} />
    </VStack>
  );
};
