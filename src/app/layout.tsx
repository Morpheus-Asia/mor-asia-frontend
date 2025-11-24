import "./globals.css";
import { Providers } from "morpheus-asia/components/providers";
import { AnimatedHeader } from "morpheus-asia/components/animated-header";
import { Footer } from "morpheus-asia/components/footer";

export const metadata = {
  title: "Morpheus Asia | Join The Asia Layer Of Morpheus",
  description: "Morpheus Asia is a community of the best Smart Agent, DeAI, Personal AI minds in Asia. Join us to build, deploy, and interact with intelligent agents on the decentralized AI network.",
  openGraph: {
    title: "Morpheus Asia | Join The Asia Layer Of Morpheus",
    description: "Morpheus Asia is a community of the best Smart Agent, DeAI, Personal AI minds in Asia. Join us to build, deploy, and interact with intelligent agents on the decentralized AI network.",
    images: [
      {
        url: "/ma-logo-dark-2.png",
        width: 512,
        height: 512,
        alt: "Morpheus Asia Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Morpheus Asia | Join The Asia Layer Of Morpheus",
    description: "Morpheus Asia is a community of the best Smart Agent, DeAI, Personal AI minds in Asia. Join us to build, deploy, and interact with intelligent agents on the decentralized AI network.",
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
