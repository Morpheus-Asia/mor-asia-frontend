import { Grid, GridItem, VStack } from "@chakra-ui/react";
import { map, size } from "lodash";
import MarkdownRender from "morpheus-asia/components/Markdown";
import ContainerWrapper from "../ContainerWrapper";
import CustomImage from "morpheus-asia/components/Image";
import "./style.css";
import { Props } from "./props";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const Benefits: React.FC<Props> = (props) => {
  const { benefitsItem } = props;

  // =============== VARIABLES
  const itemLength = size(benefitsItem);
  const colSpan = 12 / itemLength;

  // =============== RENDER FUNCTIONS
  const renderBenefitsItem = () => {
    return map(benefitsItem, (item) => {
      const details = item?.details;
      return (
        <GridItem key={item?.id} colSpan={{ md: colSpan }} width="100%">
          <VStack
            color="white"
            alignItems={"center"}
            textAlign={"center"}
            gap={3}
          >
            <VStack
              bg="#173629"
              p={2}
              borderRadius={6}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <CustomImage data={item?.icon} width={30} height={30} />
            </VStack>
            <VStack gap={1}>
              <MarkdownRender
                text={details?.title}
                className="benefit-heading"
              />
              <MarkdownRender text={details?.description} />
            </VStack>
          </VStack>
        </GridItem>
      );
    });
  };

  // =============== VIEWS
  return (
    <ContainerWrapper pt={10} pb={20}>
      <Grid templateColumns={{ lg: `repeat(${itemLength}, 1fr)` }} gap={12}>
        {renderBenefitsItem()}
      </Grid>
    </ContainerWrapper>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default Benefits;
