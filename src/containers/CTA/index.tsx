"use client";
import {
  Box,
  Grid,
  GridItem,
  Span,
  useBreakpointValue,
} from "@chakra-ui/react";
import MarkdownRender from "morpheus-asia/components/Markdown";
import ContainerWrapper from "../ContainerWrapper";
import "./style.css";
import { Tooltip } from "morpheus-asia/components/ui/tooltip";
import Button from "morpheus-asia/components/Button";
import { Props } from "./props";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const CTA: React.FC<Props> = (props) => {
  const { cta } = props;

  // =============== REF
  const textDivRef = useRef(null);
  const ctaDivRef = useRef(null);

  // =============== VARIABLES
  const ctaButton = cta?.ctaLink;
  const isTextInView = useInView(textDivRef, { once: true });
  const isCTAInView = useInView(ctaDivRef, { once: true });
  const textAnimation = useBreakpointValue({
    base: { opacity: 0, y: 50 }, // Mobile: fade in + slide up
    md: { opacity: 0, x: -50 }, // Desktop: fade in + slide left
  });
  const descriptionAnimation = useBreakpointValue({
    base: { opacity: 0, y: 50 }, // Mobile: fade in + slide up
    md: { opacity: 0, x: 50 }, // Desktop: fade in + slide right
  });
  // =============== RENDER FUNCTIONS
  const renderCTAButton = () => {
    return (
      <Box pt={5}>
        <Button
          size={"lg"}
          pressableButton
          href={ctaButton?.url}
          target={ctaButton?.target}
        >
          {ctaButton?.text}
        </Button>
      </Box>
    );
  };

  // =============== VIEWS
  return (
    <ContainerWrapper overflow={"hidden"}>
      <Grid
        templateColumns={{ lg: `repeat(12, 1fr)` }}
        color="white"
        gap={{ base: 8, lg: 0 }}
      >
        <GridItem colSpan={{ base: 12, lg: 4 }} width="100%">
          <motion.div
            ref={textDivRef}
            initial={textAnimation}
            animate={isTextInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <MarkdownRender text={cta?.title} className="cta-heading" />
          </motion.div>
        </GridItem>
        <GridItem colSpan={{ base: 12, lg: 8 }} width="100%">
          <motion.div
            ref={ctaDivRef}
            initial={descriptionAnimation}
            animate={isCTAInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <MarkdownRender
              text={cta?.description}
              className="cta-description"
              components={{
                u: (props: any) => {
                  return (
                    <Span display={"inline-block"} color="primary.600">
                      {props.children.toString()}
                    </Span>
                  );
                },
                em: (props: any) => {
                  return (
                    <Tooltip content="Copy to clipboard" openDelay={0}>
                      <Span
                        display={"inline-block"}
                        textDecoration={"underline"}
                        cursor={"pointer"}
                        color="primary.600"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            props.children.toString()
                          );
                        }}
                      >
                        {props.children.toString()}
                      </Span>
                    </Tooltip>
                  );
                },
              }}
            />
            {ctaButton && renderCTAButton()}
          </motion.div>
        </GridItem>
      </Grid>
    </ContainerWrapper>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default CTA;
