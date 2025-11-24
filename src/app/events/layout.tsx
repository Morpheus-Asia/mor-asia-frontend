import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Events | Morpheus Asia",
  description: "Join us for workshops, meetups, and community gatherings. Stay updated with the latest events from Morpheus Asia.",
  openGraph: {
    title: "Events | Morpheus Asia",
    description: "Join us for workshops, meetups, and community gatherings. Stay updated with the latest events from Morpheus Asia.",
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
    title: "Events | Morpheus Asia",
    description: "Join us for workshops, meetups, and community gatherings. Stay updated with the latest events from Morpheus Asia.",
    images: ["/ma-logo-dark-2.png"],
  },
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

