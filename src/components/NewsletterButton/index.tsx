import { Box, HStack, Input } from "@chakra-ui/react";
import { InputGroup } from "../ui/input-group";
import Button from "../Button";
import { useState } from "react";
import { useReCaptcha } from "next-recaptcha-v3";
import { Props } from "./props";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getDictionary } from "morpheus-asia/i18n";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const NewsletterButton: React.FC<Props> = (props) => {
  const { config, locale } = props;
  console.log("locale", locale);
  const localeDictionary = getDictionary(locale)?.newsLetterButton;

  console.log("localeDictionary", localeDictionary);
  // =============== HOOKS
  const schema = yup.object().shape({
    email: yup
      .string()
      .email(localeDictionary.invalidEmail)
      .required(localeDictionary.emailRequired),
  });
  const { executeRecaptcha } = useReCaptcha();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // =============== STATE
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(false);

  // =============== EVENTS
  const onHandleSubscribe = async (data: { email: string }) => {
    setLoading(true);
    const token = await executeRecaptcha("form_submit");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/engagement/subscriber/add`,
        {
          method: "POST",
          body: JSON.stringify({ email: data.email, token }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setIsSent(true);
      setLoading(false);
      reset();
    }
  };

  // =============== RENDER FUNCTIONS
  const renderIsSent = () => {
    if (isSent) {
      return (
        <Box
          color="primary.600"
          border="1px solid"
          borderColor={"primary.600"}
          py={2}
          px={6}
          borderRadius={10}
        >
          {error ? localeDictionary?.wentWrong : localeDictionary?.success}
        </Box>
      );
    }
    return (
      <form onSubmit={handleSubmit(onHandleSubscribe)}>
        <InputGroup
          flex="1"
          endElement={
            <Button
              type="submit"
              pressableButton={false}
              loading={loading}
              disabled={loading}
            >
              {config?.buttonText || "Subscribe"}
            </Button>
          }
          endElementProps={{ px: 0 }}
        >
          <Input
            placeholder={config?.placeholderText || "Enter your email"}
            width={"xs"}
            borderRadius={8}
            borderColor="primary.600"
            color="white"
            _placeholder={{ color: "secondaryText.500" }}
            {...register("email")}
          />
        </InputGroup>
        {errors.email && (
          <Box color="red.500" mt={1} fontSize="sm">
            {errors.email.message}
          </Box>
        )}
      </form>
    );
  };

  // =============== VIEWS
  return <HStack pb={4}>{renderIsSent()}</HStack>;
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default NewsletterButton;
