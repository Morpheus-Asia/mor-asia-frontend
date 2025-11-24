import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "MOR Token | Morpheus Asia",
  description: "Learn about the MOR token, the native utility token powering the Morpheus decentralized AI network. Discover how to earn, stake, and use MOR tokens.",
  openGraph: {
    title: "MOR Token | Morpheus Asia",
    description: "Learn about the MOR token, the native utility token powering the Morpheus decentralized AI network. Discover how to earn, stake, and use MOR tokens.",
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
    title: "MOR Token | Morpheus Asia",
    description: "Learn about the MOR token, the native utility token powering the Morpheus decentralized AI network. Discover how to earn, stake, and use MOR tokens.",
    images: ["/ma-logo-dark-2.png"],
  },
};

export default function MORTokenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

