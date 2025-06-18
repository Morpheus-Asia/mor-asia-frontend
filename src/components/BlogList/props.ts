export type BlogPost = {
  id: number;
  documentId: string;
  Title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  Body: string;
  Date: string;
  slug: string;
  author: {
    id: number;
    Name: string;
    Avatar?: {
      formats: {
        small: {
          url: string;
        };
      };
    };
  };
  Tags: string;
  Featured_Image?: {
    url: string;
    formats?: {
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