import { Metadata } from 'next';
import { getIdeaBankBySlug } from 'morpheus-asia/lib/strapi';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params;
    const response = await getIdeaBankBySlug(slug);
    const ideaBank = response.data;

    if (!ideaBank) {
      return {
        title: "Idea Bank | Morpheus Asia",
        description: "Explore innovative ideas from the Morpheus community",
      };
    }

    const description = ideaBank.Description
      ? ideaBank.Description.substring(0, 160)
      : `${ideaBank.Name} - An idea from the Morpheus Asia community`;

    return {
      title: `${ideaBank.Name} | Morpheus Asia Idea Bank`,
      description,
      openGraph: {
        title: ideaBank.Name,
        description,
        images: [
          {
            url: '/ma-logo-dark-2.png',
            width: 1200,
            height: 630,
            alt: ideaBank.Name,
          },
        ],
        type: 'article',
      },
      twitter: {
        card: "summary_large_image",
        title: ideaBank.Name,
        description,
        images: ['/ma-logo-dark-2.png'],
      },
    };
  } catch (error) {
    console.error('Error generating metadata for idea bank:', error);
    return {
      title: "Idea Bank | Morpheus Asia",
      description: "Explore innovative ideas from the Morpheus community",
    };
  }
}

export default function IdeaBankLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
