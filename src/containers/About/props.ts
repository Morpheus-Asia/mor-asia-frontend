export type Props = {
  about: {
    id: number;
    title: string;
    description: string;
    ctaLink?: {
      id: number;
      text: string;
      url: string;
      target: string;
    };
  }[];
};
