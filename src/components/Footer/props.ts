export type Props = {
  data: {
    footerLogo: {
      title: string;
      image: {
        url: string;
      };
      href: {
        url: string;
        target: string;
      };
    };
    footerText: string;
    socialIcon: {
      title: string;
      icon: {
        href: {
          url: string;
          target: string;
        };
        image: {
          url: string;
        };
      };
    }[];
  };
};
