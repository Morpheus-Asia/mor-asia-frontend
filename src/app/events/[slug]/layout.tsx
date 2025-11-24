import { Metadata } from 'next';
import { getEventBySlug } from 'morpheus-asia/lib/strapi';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params;
    const response = await getEventBySlug(slug);
    const event = response.data;

    if (!event) {
      return {
        title: "Event | Morpheus Asia",
        description: "Join us for this exciting event from Morpheus Asia",
      };
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
    const imageUrl = event.Cover?.url
      ? (event.Cover.url.startsWith('http')
          ? event.Cover.url
          : `${baseUrl}${event.Cover.url}`)
      : '/ma-logo-dark-2.png';

    const formattedDate = event.Date
      ? new Date(event.Date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : 'TBA';

    const description = event.Description 
      ? event.Description.replace(/[#*`]/g, '').substring(0, 160) 
      : `Join us for ${event.Title} on ${formattedDate}`;

    return {
      title: `${event.Title} | Morpheus Asia Events`,
      description,
      openGraph: {
        title: event.Title,
        description,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: event.Title,
          },
        ],
        type: 'website',
        ...(event.Date && { publishedTime: event.Date }),
      },
      twitter: {
        card: "summary_large_image",
        title: event.Title,
        description,
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error('Error generating metadata for event:', error);
    return {
      title: "Event | Morpheus Asia",
      description: "Join us for this exciting event from Morpheus Asia",
    };
  }
}

export default function EventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

