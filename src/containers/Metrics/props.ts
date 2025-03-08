export type Props = {
  title: string;
  subTitle: string;
  metricsButton: {
    id: number;
    text: string;
    url: string;
    target: string;
    variant: any;
    icon: any;
    hasArrow: boolean;
    iconHoverState: any;
    isDisabled: boolean;
  };
  locale: string;
};
