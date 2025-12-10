import { Metadata } from 'next';
import { Box } from "@chakra-ui/react";
import { LearnLayoutClient } from "./layout-client";

export const metadata: Metadata = {
  title: "Learn | Morpheus Asia",
  description: "Learn the foundational Morpheus concepts, access documentation, API guides, and resources for building on the decentralized AI network.",
  openGraph: {
    title: "Learn | Morpheus Asia",
    description: "Learn the foundational Morpheus concepts, access documentation, API guides, and resources for building on the decentralized AI network.",
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
    title: "Learn | Morpheus Asia",
    description: "Learn the foundational Morpheus concepts, access documentation, API guides, and resources for building on the decentralized AI network.",
    images: ["/ma-logo-dark-2.png"],
  },
};

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box as="main" position="relative" minH="100vh" pb="4rem" px={{ base: "1rem"}}>
      <LearnLayoutClient>
        {children}
      </LearnLayoutClient>
    </Box>
  );
}
