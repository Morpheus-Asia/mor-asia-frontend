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

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
    const imageUrl = ideaBank.Image?.url
      ? (ideaBank.Image.url.startsWith('http')
          ? ideaBank.Image.url
          : `${baseUrl}${ideaBank.Image.url}`)
      : '/ma-logo-dark-2.png';

    const description = ideaBank.Summary 
      ? ideaBank.Summary.substring(0, 160) 
      : `${ideaBank.Title} - An idea from the Morpheus Asia community`;

    return {
      title: `${ideaBank.Title} | Morpheus Asia Idea Bank`,
      description,
      openGraph: {
        title: ideaBank.Title,
        description,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: ideaBank.Title,
          },
        ],
        type: 'article',
      },
      twitter: {
        card: "summary_large_image",
        title: ideaBank.Title,
        description,
        images: [imageUrl],
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
