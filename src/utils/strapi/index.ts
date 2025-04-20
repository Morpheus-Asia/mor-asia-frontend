export const sanitizeLocal = (locale: string) => {
  if (locale === "cn") {
    return "zh-Hans";
  }
  return locale;
};

// Generate metadata object
export function generateMetadataObject(seo: any, locale: any) {
  if (!seo) {
    return {
      title: "Default Title",
      description: "Default Description",
    };
  }
  const localeMap: any = {
    cn: "zh_CN",
    en: "en_US",
  };
  const opengraph = seo?.opengraph;
  const title = seo?.metaTitle || "Default Title";
  const description = seo?.metaDescription || "Default Description";
  const keywords = seo?.keywords || "";
  const robots = seo?.metaRobots || "index, follow";
  const viewport = seo?.metaViewport || "width=device-width, initial-scale=1";
  const canonical = seo?.canonicalURL ? seo?.canonicalURL : "";
  const openGraphData = {
    title: opengraph?.title,
    description: opengraph?.description,
    url: opengraph?.url,
    siteName: opengraph?.siteName,
    images: opengraph?.image
      ? [{ url: getStrapiMedia(opengraph.image.url) }]
      : [],
    locale: localeMap[locale], // or map your locale field accordingly
  };
  const metaImage = seo?.metaImage?.url
    ? getStrapiMedia(seo.metaImage.url)
    : "";

  // Build Twitter metadata based on metaSocial data if available
  const twitterDefaults = {
    card: "summary_large_image",
    title,
    description,
    images: metaImage ? [{ url: metaImage }] : [],
  };

  const twitter = { ...twitterDefaults };
  if (Array.isArray(seo?.metaSocial)) {
    seo?.metaSocial.forEach((social: any) => {
      if (social.socialNetwork === "Twitter") {
        twitter.title = social.title || twitter.title;
        twitter.description = social.description || twitter.description;
        if (social.image?.url) {
          twitter.images = [{ url: getStrapiMedia(social.image.url) }];
        }
      }
    });
  }

  let structuredData = undefined;
  if (seo?.structuredData) {
    // If it's already an object, use it; if it's a string, parse it.
    structuredData =
      typeof seo.structuredData === "string"
        ? JSON.parse(seo.structuredData)
        : seo.structuredData;
  }

  return {
    title,
    description,
    keywords,
    robots,
    viewport,
    alternates: {
      canonical,
    },
    openGraph: {
      ...openGraphData,
    },
    twitter,
    structuredData,
  };
}

// Temporarily commented out
// export const getStrapiURL = (path = "") => {
//   return `${process.env.NEXT_PUBLIC_API_URL}${path}`;
// };

export const getStrapiMedia = (url: string): string => {
  return url;
  // return url?.startsWith("/") ? getStrapiURL(url) : url;
};

export const constructUrl = (locale: string, url: string) => {
  if (url === "/") return `/${locale || "en"}`;
  return `/${locale}/${url}`;
};
