"use client";
import { Props } from "./props";
import ContainerWrapper from "morpheus-asia/containers/ContainerWrapper";
import { MobileNavbar } from "./mobile";

import { motion } from "framer-motion";
import DesktopNavBar from "./desktop";

const MotionContainer = motion(ContainerWrapper);

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const Navbar: React.FC<Props> = (props) => {
  const { data, locale } = props;

  // =============== VIEWS
  return (
    <MotionContainer
      position="fixed"
      top="0"
      mx="auto"
      insetX="0"
      zIndex="50"
      pt={5}
    >
      <DesktopNavBar data={data} locale={locale} />
      <MobileNavbar data={data} locale={locale} />
    </MotionContainer>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default Navbar;
