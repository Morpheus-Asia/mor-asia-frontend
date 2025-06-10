type CommonBlogPost = {
  id: number;
  documentId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  content: string;
  date: string;
  slug: string;
  author: {
    id: number;
    name: string;
    avatar: {
      formats: {
        small: { url: string };
      };
      url: string;
    };
  };
  tags: {
    name: string;
  }[];
  featured_image?: {
    url: string;
    formats: {
      small: {
        url: string;
      };
    };
  };
  localizations?: Array<{
    locale: string;
    slug: string;
  }>;
};
export type BlogPost = CommonBlogPost & {
  tags?: string[];
};

export type ResponseBlogPost = CommonBlogPost & {
  tags?: {
    name: string;
  }[];
};
