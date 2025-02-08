export type Props = {
  benefitsItem: {
    id: number;
    icon: {
      name: string;
      width: number;
      height: number;
      url: string;
    };
    details: {
      id: number;
      title: string;
      description: string;
      ctaLink: {
        id: number;
        text: string;
        url: string;
        target: string;
      };
    };
  }[];
};
