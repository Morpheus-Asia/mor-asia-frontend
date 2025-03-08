export type Props = {
  cta: {
    id: number;
    title: string;
    description: string;
    ctaLink: {
      id: number;
      text: string;
      url: string;
      target: string;
      isDisabled: boolean;
    };
  };
};
