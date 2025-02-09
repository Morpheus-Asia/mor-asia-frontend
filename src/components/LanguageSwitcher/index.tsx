import { Box, HStack, Text } from "@chakra-ui/react";
import { useSlugContext } from "morpheus-asia/containers/SlugProvider";
import { usePathname } from "next/navigation";
import { map } from "lodash";
import Link from "next/link";
import { Props } from "./props";

const localeMapper: Record<string, string> = {
  en: "EN",
  cn: "中文简体",
};

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const LanguageSwitcher: React.FC<Props> = (props) => {
  const { currentLocale, showBackground } = props;

  // =============== HOOKS
  const { state } = useSlugContext();
  const pathname = usePathname(); // Current path

  // =============== VARIABLES
  const { localizedSlugs } = state;
  const segments = pathname.split("/"); // Split path into segments

  // =============== UTILS
  const generateLocalizedPath = (locale: string): string => {
    if (!pathname) return `/${locale}`; // Default to root path for the locale

    // Handle homepage (e.g., "/en" -> "/cn")
    if (segments.length <= 2) {
      return `/${locale}`;
    }

    // Handle dynamic paths (e.g., "/en/blog/[slug]")
    if (localizedSlugs[locale]) {
      segments[1] = locale; // Replace the locale
      segments[segments.length - 1] = localizedSlugs[locale]; // Replace slug if available
      return segments.join("/");
    }

    // Fallback to replace only the locale
    segments[1] = locale;
    return segments.join("/");
  };

  // =============== RENDER FUNCTIONS
  const renderLocalization = () => {
    return map(Object.keys(localizedSlugs), (locale) => {
      const isCurrentLocale = locale === currentLocale;
      const background =
        isCurrentLocale && !showBackground ? "primary.400" : "transparent";
      const textDecoration =
        isCurrentLocale && showBackground ? "underline" : "none";
      return (
        <Link
          href={generateLocalizedPath(locale)}
          key={locale}
          style={{
            border: "none",
            outline: "none",
          }}
          passHref
        >
          <Box
            background={background}
            px={4}
            py={2}
            borderRadius={8}
            cursor={"pointer"}
            textDecoration={textDecoration}
            style={{
              transition: "all 0.3s ease-in-out",
              textUnderlineOffset: "3px",
            }}
            _hover={{
              background: showBackground ? "transparent" : "primary.400",
              textDecoration: showBackground ? "underline" : "none",
            }}
          >
            <Text>{localeMapper[locale]}</Text>
          </Box>
        </Link>
      );
    });
  };

  // =============== VIEWS
  return <HStack color="white">{renderLocalization()}</HStack>;
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default LanguageSwitcher;
