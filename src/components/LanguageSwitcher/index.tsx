import { Box, IconButton, Text } from "@chakra-ui/react";
import { MenuRoot, MenuTrigger, MenuContent, MenuItem } from "../ui/menu";
import { AiOutlineGlobal } from "react-icons/ai";
import { IoChevronDownOutline } from "react-icons/io5";
import { useSlugContext } from "morpheus-asia/containers/SlugProvider";
import { usePathname } from "next/navigation";
import { map, upperCase } from "lodash";
import Link from "next/link";
import { Props } from "./props";

const localeMapper: Record<string, string> = {
  en: "English",
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
      return (
        <Link
          href={generateLocalizedPath(locale)}
          key={locale}
          style={{
            border: "none",
            outline: "none",
          }}
        >
          <MenuItem
            value={locale}
            color={"white"}
            py={2}
            cursor={"pointer"}
            focusRing={"none"}
            _hover={{
              background: "rgba(255, 255, 255, 0.04)",
            }}
          >
            {localeMapper[locale]}
          </MenuItem>
        </Link>
      );
    });
  };

  const renderCurrentLocale = (locale: string) => {
    if (locale === "en") return upperCase(locale);
    if (locale === "cn") return "中文简体";
    return "";
  };

  // =============== VIEWS
  return (
    <Box cursor={"pointer"}>
      <MenuRoot size={"md"}>
        <MenuTrigger asChild>
          <IconButton
            background={"transparent"}
            border={"none"}
            focusRing={"none"}
            px={4}
            py={5}
            _hover={{
              background: "primary.400",
            }}
          >
            <AiOutlineGlobal />
            <Text color="white" fontWeight={"bold"} fontSize={"1rem"}>
              {renderCurrentLocale(currentLocale)}
            </Text>
            <IoChevronDownOutline />
          </IconButton>
        </MenuTrigger>
        <MenuContent
          background={"primary.400"}
          borderRadius={8}
          top={!showBackground ? 0 : 12}
        >
          {renderLocalization()}
        </MenuContent>
      </MenuRoot>
    </Box>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default LanguageSwitcher;
