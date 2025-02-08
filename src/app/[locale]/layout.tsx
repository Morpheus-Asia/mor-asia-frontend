import Navbar from "morpheus-asia/components/Navbar";
import fetchContentType from "morpheus-asia/utils/strapi/fetchContentTypes";
import { ReactNode } from "react";

type LocaleLayoutProps = {
  children: ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout(args: LocaleLayoutProps) {
  const { children, params } = args;
  // =============== VARIABLES
  const { locale } = await params;

  // =============== API
  const pageData = await fetchContentType(
    "global",
    { filters: { locale }, pLevel: 5 },
    true
  );

  // =============== VARIABLES
  const navbarItems = {
    leftNavBarItems: pageData?.left_navbar_items,
    rightNavBarItems: pageData?.right_navbar_items,
    navBarLogo: pageData?.navbar_logo,
  };

  return (
    <html>
      <body>
        <Navbar data={navbarItems} locale={locale} />
        {children}
      </body>
    </html>
  );
}
