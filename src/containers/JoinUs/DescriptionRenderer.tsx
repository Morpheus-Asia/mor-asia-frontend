import { Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { map } from "lodash";
import Button from "morpheus-asia/components/Button";
import NewsletterButton from "morpheus-asia/components/NewsletterButton";
import { ContactForm } from "../ContactForm";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const DescriptionRenderer: React.FC<any> = (props) => {
  const { body, locale } = props;
  // =============== HOOKS

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

      return (
        <Button
          key={index}
          size={"lg"}
          href={button?.url}
          target={button?.target}
          visual={variant}
          icon={icon}
          iconHoverState={iconHoverState}
          hasArrow={hasArrow}
          disabled={button?.isDisabled}
        >
          {button?.text}
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
