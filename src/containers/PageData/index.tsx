"use client";

import { useEffect, useState } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { get } from "lodash";
import fetchContentType from "morpheus-asia/utils/strapi/fetchContentTypes";
import ClientSlugHandler from "morpheus-asia/components/ClientSlugHandler";
import { Renderer } from "morpheus-asia/Renderer";
import FullPageLoader from "morpheus-asia/components/FullPageLoader";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import Button from "morpheus-asia/components/Button";
import { getDictionary } from "morpheus-asia/i18n";

export const PageData: React.FC<any> = (props) => {
  const { locale, slug } = props;
  // =============== HOOKS
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState<any>(null);

  // =============== VARIABLES
  const localeDictionary = getDictionary(locale)?.notFound;

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
            pLevel: 7,
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

  if (!loading && !pageData)
    return (
      <VStack
        h="100vh"
        justifyContent={"center"}
        alignItems={"center"}
        color="#FFF"
        gap={10}
      >
        <Box textAlign={"center"}>
          <Text fontWeight={"bold"} fontSize={"7xl"}>
            {localeDictionary?.title}
          </Text>
          <Text fontSize={"xl"} textAlign={"center"}>
            {localeDictionary?.description}
          </Text>
        </Box>
        <Button href={`/${locale || "en"}`}>
          {localeDictionary?.backToHome}
        </Button>
      </VStack>
    );

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
