import { Metadata } from 'next';
import { getBlogPostBySlug } from 'morpheus-asia/lib/strapi';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params;
    const response = await getBlogPostBySlug(slug);
    const post = response.data;

    if (!post) {
      return {
        title: "Blog Post | Morpheus Asia",
        description: "Read the latest blog post from Morpheus Asia",
      };
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
    const imageUrl = post.featured_image?.url
      ? (post.featured_image.url.startsWith('http')
          ? post.featured_image.url
          : `${baseUrl}${post.featured_image.url}`)
      : '/ma-logo-dark-2.png';

    const description = post.summary || (post.content ? post.content.replace(/[#*`]/g, '').substring(0, 160) : '') || "Read the latest blog post from Morpheus Asia";

    return {
      title: `${post.title} | Morpheus Asia Blog`,
      description,
      openGraph: {
        title: post.title,
        description,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        type: 'article',
        publishedTime: post.date,
        authors: post.author?.name ? [post.author.name] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description,
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error('Error generating metadata for blog post:', error);
    return {
      title: "Blog Post | Morpheus Asia",
      description: "Read the latest blog post from Morpheus Asia",
    };
  }
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

