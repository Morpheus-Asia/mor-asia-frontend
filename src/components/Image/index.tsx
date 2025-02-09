import NextImage from "next/image";
import { Props } from "./props";
import { get, isEmpty } from "lodash";
import { getStrapiMedia } from "morpheus-asia/utils/strapi";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const CustomImage: React.FC<Props> = (props) => {
  const { data, width, height } = props;

  // =============== VARIABLES
  const logoImage = get(data, "url", "");
  const logoAlt = get(data, "name", "");
  const logoWidth = get(data, "width", 30);
  const logoHeight = get(data, "height", 30);

  // =============== RENDER FUNCTIONS
  const renderImage = () => {
    return (
      <NextImage
        priority={true}
        width={width || logoWidth}
        height={height || logoHeight}
        alt={logoAlt}
        src={`${getStrapiMedia(logoImage)}`}
      />
    );
  };

  // =============== VIEWS
  return !isEmpty(logoImage) && renderImage();
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default CustomImage;
