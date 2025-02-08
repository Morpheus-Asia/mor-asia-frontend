import { Grid, GridItem, HStack, Icon, Link, VStack } from "@chakra-ui/react";
import { map, size } from "lodash";
import MarkdownRender from "morpheus-asia/components/Markdown";
import "./style.css";
import ContainerWrapper from "../ContainerWrapper";
import { LuArrowRight } from "react-icons/lu";
import { Props } from "./props";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const AboutSection: React.FC<Props> = (props) => {
  const { about } = props;

  // =============== VARIABLES
  const itemLength = size(about);
  const colSpan = 12 / itemLength;

  // =============== RENDER FUNCTIONS
  const renderAbout = () => {
    return map(about, (item) => {
      const ctaItem = item?.ctaLink;
      const renderCTA = () => {
        return (
          <HStack>
            <Link
              href={ctaItem?.url}
              target={ctaItem?.target}
              color={"primary.600"}
              variant={"plain"}
              style={{
                textDecoration: "none",
                transition: "all 0.3s ease-in-out",
              }}
              focusRing={"none"}
              py={2}
              _hover={{
                background: "primary.600",
                color: "buttonText.500",
                px: 4,
                borderRadius: 6,
              }}
              fontWeight={"semibold"}
            >
              {ctaItem?.text}
              <Icon>
                <LuArrowRight />
              </Icon>
            </Link>
          </HStack>
        );
      };
      return (
        <GridItem key={item?.id} colSpan={{ sm: 12, md: colSpan }}>
          <VStack alignItems={"flex-start"} color="white" gap={4}>
            <MarkdownRender text={item?.title} className="heading" />
            <MarkdownRender
              text={item?.description}
              className="about-description"
              components={{
                a: (props: any) => {
                  return (
                    <Link
                      href={props?.href}
                      color="primary.600"
                      target="_blank"
                    >
                      {props.children}
                    </Link>
                  );
                },
              }}
            />
            {ctaItem && renderCTA()}
          </VStack>
        </GridItem>
      );
    });
  };

  // =============== VIEWS
  return (
    <ContainerWrapper pt={10}>
      <Grid templateColumns={{ base: "1fr", lg: `repeat(12, 1fr)` }} gap={12}>
        {renderAbout()}
      </Grid>
    </ContainerWrapper>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default AboutSection;
