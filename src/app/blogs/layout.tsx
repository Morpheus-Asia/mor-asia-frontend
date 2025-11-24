import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Blog | Morpheus Asia",
  description: "Insights, tutorials, and updates from the Morpheus Asia community. Stay informed about the latest developments in decentralized AI.",
  openGraph: {
    title: "Blog | Morpheus Asia",
    description: "Insights, tutorials, and updates from the Morpheus Asia community. Stay informed about the latest developments in decentralized AI.",
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
    title: "Blog | Morpheus Asia",
    description: "Insights, tutorials, and updates from the Morpheus Asia community. Stay informed about the latest developments in decentralized AI.",
    images: ["/ma-logo-dark-2.png"],
  },
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

