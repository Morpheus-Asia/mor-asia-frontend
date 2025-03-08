import { ImageProps } from "next/image";

export type Props = {
  errPlaceholderImg?: string;
  pressable?: boolean;
  data?: any;
  width?: number;
  height?: number;
  style?: ImageProps["style"];
  href?: string;
  target?: string;
};
