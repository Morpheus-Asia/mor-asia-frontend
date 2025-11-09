import "./globals.css";
import { Providers } from "morpheus-asia/components/providers";
import { AnimatedHeader } from "morpheus-asia/components/animated-header";
import { Footer } from "morpheus-asia/components/footer";

export const metadata = {
  title: "Morpheus Asia",
  description: "Welcome to Morpheus Asia",
  openGraph: {
    title: "Morpheus Asia",
    description: "Welcome to Morpheus Asia",
    images: [
      {
        url: "/ma-logo-dark-2.png",
        width: 512,
        height: 512,
        alt: "Morpheus Asia Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Morpheus Asia",
    description: "Welcome to Morpheus Asia",
    images: ["/ma-logo-dark-2.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ position: 'relative', minHeight: '100vh', margin: 0 }}>
        <Providers>
          <AnimatedHeader />
          <div style={{ position: 'relative', zIndex: 1 }}>
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
