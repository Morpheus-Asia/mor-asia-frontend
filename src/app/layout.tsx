import { i18n } from "../../i18n.config";
import { ChakraProvider } from "morpheus-asia/containers/ChakraProvider";
import { GoogleAnalytics } from "@next/third-parties/google";

import { SlugProvider } from "morpheus-asia/containers/SlugProvider";
import "./globals.css";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({ children, params }: any) {
  return (
    <html lang={params.lang} suppressHydrationWarning>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      <body suppressHydrationWarning>
        <ChakraProvider>
          <SlugProvider>{children}</SlugProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
