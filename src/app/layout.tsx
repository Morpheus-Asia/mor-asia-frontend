import { i18n } from "../../i18n.config";
import { ChakraProvider } from "morpheus-asia/containers/ChakraProvider";

import { SlugProvider } from "morpheus-asia/containers/SlugProvider";
import "./globals.css";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({ children, params }: any) {
  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ChakraProvider>
          <SlugProvider>{children}</SlugProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
