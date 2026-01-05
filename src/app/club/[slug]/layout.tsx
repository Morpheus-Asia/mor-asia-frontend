import { Metadata } from 'next';
import { getClubBySlug } from 'morpheus-asia/lib/strapi';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params;
    const response = await getClubBySlug(slug);
    const club = response.data;

    if (!club) {
      return {
        title: "Club | Morpheus Asia",
        description: "Join a Morpheus Asia club in your region",
      };
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
    const imageUrl = club.Logo?.url
      ? (club.Logo.url.startsWith('http')
          ? club.Logo.url
          : `${baseUrl}${club.Logo.url}`)
      : '/ma-logo-dark-2.png';

    const description = club.Description 
      ? club.Description.replace(/[#*`]/g, '').substring(0, 160) 
      : `${club.Name} - A Morpheus Asia club${club.Region ? ` in ${club.Region}` : ''}`;

    return {
      title: `${club.Name} | Morpheus Asia Clubs`,
      description,
      openGraph: {
        title: club.Name,
        description,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: club.Name,
          },
        ],
        type: 'website',
      },
      twitter: {
        card: "summary_large_image",
        title: club.Name,
        description,
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error('Error generating metadata for club:', error);
    return {
      title: "Club | Morpheus Asia",
      description: "Join a Morpheus Asia club in your region",
    };
  }
}

export default function ClubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

