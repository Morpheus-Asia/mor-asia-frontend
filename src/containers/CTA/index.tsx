"use client";
import { Box, Grid, GridItem, Span } from "@chakra-ui/react";
import MarkdownRender from "morpheus-asia/components/Markdown";
import ContainerWrapper from "../ContainerWrapper";
import "./style.css";
import { Tooltip } from "morpheus-asia/components/ui/tooltip";
import Button from "morpheus-asia/components/Button";
import { Props } from "./props";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const CTA: React.FC<Props> = (props) => {
  const { cta } = props;

  // =============== VARIABLES
  const ctaButton = cta?.ctaLink;

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
    <ContainerWrapper>
      <Grid
        templateColumns={{ lg: `repeat(12, 1fr)` }}
        color="white"
        gap={{ base: 8, lg: 0 }}
      >
        <GridItem colSpan={{ base: 12, lg: 4 }} width="100%">
          <MarkdownRender text={cta?.title} className="cta-heading" />
        </GridItem>
        <GridItem colSpan={{ base: 12, lg: 8 }} width="100%">
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
