// import Navbar from "morpheus-asia/components/Navbar";
// import fetchContentType from "morpheus-asia/utils/strapi/fetchContentTypes";
// import { ReactNode } from "react";
import "../globals.css";
// import Footer from "morpheus-asia/components/Footer";

// type LocaleLayoutProps = {
//   children: ReactNode;
//   params: { locale: any };
// };

export default async function LocaleLayout(args: any) {
  const { children } = args;
  // // =============== VARIABLES
  // const { locale } = await params;

  // // =============== API
  // const pageData = await fetchContentType(
  //   "global",
  //   { filters: { locale }, pLevel: 10 },
  //   true
  // );

  // // =============== VARIABLES
  // const navbarItems = {
  //   leftNavBarItems: pageData?.left_navbar_items,
  //   rightNavBarItems: pageData?.right_navbar_items,
  //   navBarLogo: pageData?.navbar_logo,
  // };

  return (
    <html>
      <body>
        {/* <Navbar data={navbarItems} locale={locale} /> */}
        {children}
        {/* <Footer data={pageData?.footer} /> */}
      </body>
    </html>
  );
}
