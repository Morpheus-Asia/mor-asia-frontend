export type Props = {
  data: {
    footerLogo: {
      title: string;
      image: {
        url: string;
      };
      href: string;
    };
    footerText: string;
    socialIcon: {
      title: string;
      icon: {
        href: string;
        image: {
          url: string;
        };
      };
    }[];
  };
};
