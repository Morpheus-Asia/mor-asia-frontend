import { Heading, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { isEmpty, map } from "lodash";
import Button from "morpheus-asia/components/Button";
import CustomImage from "morpheus-asia/components/Image";
import NewsletterButton from "morpheus-asia/components/NewsletterButton";
import { useState } from "react";
import { LuArrowRight } from "react-icons/lu";
import { ContactForm } from "../ContactForm";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const DescriptionRenderer: React.FC<any> = (props) => {
  const { body, locale } = props;
  // =============== HOOKS

  // =============== STATE
  const [isHovered, setIsHovered] = useState(false);

  // =============== API

  // =============== EVENTS

  // =============== VARIABLES
  const descriptionBody = body?.description;
  const newsLetterConfig = body?.newsletterConfig;
  const contactFormConfig = body?.contactFormConfig;

  // =============== RENDER FUNCTIONS
  const renderButton = ({ buttonList }: any) => {
    return map(buttonList, (button, index) => {
      const variant = button?.variant;
      const hasArrow = button?.hasArrow;
      const icon = button?.icon;
      const iconHoverState = button?.iconHoverState;
      if (variant === "plain") {
        return (
          <Button
            key={index}
            size={"lg"}
            pressableButton
            href={button?.url}
            target={button?.target}
            wrappedText={false}
            border="none"
            style={{
              textDecoration: "none",
              transition: "all 0.3s ease-in-out",
            }}
            focusRing={"none"}
            background={"transparent"}
            variant={variant}
            py={2}
            _hover={{
              background: "primary.600",
              color: "buttonText.500",
              px: 4,
              borderRadius: 6,
            }}
            px={0}
            color="primary.600"
            fontWeight={"bold"}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <HStack>
              {!isEmpty(icon) && icon && (
                <CustomImage data={isHovered ? iconHoverState : icon} />
              )}
              {button?.text}
              {hasArrow && (
                <Icon>
                  <LuArrowRight />
                </Icon>
              )}
            </HStack>
          </Button>
        );
      }
      return (
        <Button
          key={index}
          size={"lg"}
          pressableButton
          href={button?.url}
          target={button?.target}
          color="primary.600"
          variant={variant}
          wrappedText={false}
          _hover={{
            background: "transparent",
          }}
        >
          <HStack>
            {!isEmpty(icon) && icon && <CustomImage data={icon} />}
            {button?.text}
            {hasArrow && (
              <Icon>
                <LuArrowRight />
              </Icon>
            )}
          </HStack>
        </Button>
      );
    });
  };
  const renderDescriptionBody = () => {
    return map(descriptionBody, (item, index) => {
      const title = item?.title;
      const description = item?.description;
      const buttonListConfiguration = item?.ctaButtonList;
      const buttonList = buttonListConfiguration?.ctaButton;
      const isNewsLetter = item?.isNewsLetter;
      const isContactForm = item?.isContactForm;

      return (
        <VStack key={index} alignItems={"flex-start"} width={"100%"}>
          {title && <Heading color="white">{title}</Heading>}
          {description && <Text color="secondaryText.500">{description}</Text>}
          <HStack
            mt={{ base: 2, md: 3 }}
            w="full"
            flexDir={{ base: "column", md: "row" }}
            gap={4}
            alignItems={"flex-start"}
          >
            {buttonListConfiguration &&
              renderButton({
                buttonListConfiguration,
                buttonList,
              })}
            {isNewsLetter && (
              <NewsletterButton config={newsLetterConfig} locale={locale} />
            )}
            {isContactForm && (
              <ContactForm config={contactFormConfig} locale={locale} />
            )}
          </HStack>
        </VStack>
      );
    });
  };

  // =============== VIEWS
  return renderDescriptionBody();
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default DescriptionRenderer;
