import { Metadata } from 'next';
import { Box, Container } from "@chakra-ui/react";
import { LearnLayoutClient } from "./layout-client";
import { getDocSections, DocSection } from "morpheus-asia/lib/strapi";
import { NavItem } from "morpheus-asia/components/learn-sidebar";

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

// Transform Strapi doc sections to nav items
function transformToNavItems(sections: DocSection[]): NavItem[] {
  const navItems: NavItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      href: '/learn',
    },
  ];

  sections.forEach((section) => {
    const sectionItem: NavItem = {
      id: section.Slug || section.documentId,
      label: section.Title,
      href: `/learn/${section.Slug}`,
    };

    // Add child docs if they exist
    if (section.docs && section.docs.length > 0) {
      sectionItem.children = section.docs.map((doc) => ({
        id: doc.Slug || doc.documentId,
        label: doc.Title,
        href: `/learn/${section.Slug}/${doc.Slug}`,
      }));
    }

    navItems.push(sectionItem);
  });

  return navItems;
}

export default async function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let navItems: NavItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      href: '/learn',
    },
  ];

  try {
    const response = await getDocSections();
    if (response.data) {
      navItems = transformToNavItems(response.data);
    }
  } catch (error) {
    console.error('Error fetching doc sections:', error);
    // Fall back to default nav items
  }

  return (
    <Box as="main" position="relative" minH="100vh" pt={{ base: "1rem", md: "1.5rem" }} pb="4rem">
      <Container maxW="100%" px={{ base: "1rem", md: "2rem", lg: "3rem" }}>
        <LearnLayoutClient navItems={navItems}>
          {children}
        </LearnLayoutClient>
      </Container>
    </Box>
  );
}
