import NextImage from "next/image";
import { Props } from "./props";
import { get } from "lodash";

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
        src={`${process.env.NEXT_PUBLIC_API_URL}${logoImage}`}
      />
    );
  };

  // =============== VIEWS
  return renderImage();
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default CustomImage;
