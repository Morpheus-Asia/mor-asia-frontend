import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { Providers } from "morpheus-asia/components/providers";
import { AnimatedHeader } from "morpheus-asia/components/animated-header";

export const metadata = {
  title: "Morpheus Asia",
  description: "Welcome to Morpheus Asia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ position: 'relative', minHeight: '100vh' }}>
        <Providers>
          <AnimatedHeader />
          <div style={{ position: 'relative', zIndex: 1 }}>
            {children}
          </div>
          <footer style={{
            position: 'relative',
            zIndex: 10,
            padding: '3rem 2rem',
            marginTop: '4rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3rem',
              flexWrap: 'wrap',
            }}>
              <Link href="/events" style={{ color: "white", textDecoration: "none", fontSize: "1rem", fontFamily: 'MOS, sans-serif' }}>
                Events
              </Link>
              <Link href="/invest" style={{ color: "white", textDecoration: "none", fontSize: "1rem", fontFamily: 'MOS, sans-serif' }}>
                Invest
              </Link>
              <Link href="/learn" style={{ color: "white", textDecoration: "none", fontSize: "1rem", fontFamily: 'MOS, sans-serif' }}>
                Learn
              </Link>
              <Link href="/blog" style={{ color: "white", textDecoration: "none", fontSize: "1rem", fontFamily: 'MOS, sans-serif' }}>
                Blog
              </Link>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
            }}>
              <Image
                src="/ma-logo-dark-2.png"
                alt="Morpheus Asia Logo"
                width={40}
                height={40}
              />
              <p style={{ 
                fontSize: '0.875rem', 
                color: 'rgba(255, 255, 255, 0.7)',
                fontFamily: 'Roboto, sans-serif',
              }}>
                © {new Date().getFullYear()} Morpheus Asia. All rights reserved.
              </p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
