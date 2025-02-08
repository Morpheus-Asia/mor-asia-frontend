import { Locale, i18n } from "../../i18n.config";
import { ChakraProvider } from "morpheus-asia/containers/ChakraProvider";

import { SlugProvider } from "morpheus-asia/containers/SlugProvider";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
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
