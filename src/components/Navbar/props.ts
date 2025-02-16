export type Props = {
  data?: any;
  locale: string;
};

type StrapiData = {
  __component: string;
  id: number;
  text: string;
  url: string;
  target: string | null;
};

type StrapiImage = {
  id: number;
  title: string;
  image: {
    name: string;
    width: number;
    height: number;
    url: string;
  };
  href: {
    url: string;
  };
};

export type NavbarData = {
  leftNavBarItems: StrapiData[];
  rightNavBarItems: StrapiData[];
  navBarLogo: StrapiImage;
};

export type DesktopNavBarProps = {
  data: NavbarData;
  locale: string;
};

export type MobileNavBarProps = {
  data: NavbarData;
  locale: string;
};
