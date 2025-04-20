import {
  Input,
  VStack,
  Field,
  Textarea,
  SimpleGrid,
  Box,
  Icon,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaPaperPlane } from "react-icons/fa6";

import Button from "morpheus-asia/components/Button";
import { useState } from "react";
import { useReCaptcha } from "next-recaptcha-v3";
import { FieldData, Props } from "./props";
import { getDictionary } from "morpheus-asia/i18n";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const ContactForm: React.FC<Props> = (props) => {
  const { config, locale } = props;

  const localeDictionary = getDictionary(locale)?.contactForm;
  const schema = yup.object().shape({
    firstName: yup.string().required(localeDictionary?.firstNameRequired),
    lastName: yup.string().required(localeDictionary?.lastNameRequired),
    email: yup
      .string()
      .email(localeDictionary?.invalidEmail)
      .required(localeDictionary?.emailRequired),
    message: yup.string().required(localeDictionary?.messageRequired),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldData>({
    resolver: yupResolver(schema),
  });

  // =============== STATE
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(false);

  // =============== HOOKS
  const { executeRecaptcha } = useReCaptcha();

  // =============== EVENTS
  const onHandleSendEmail = async (data: FieldData) => {
    setLoading(true);
    const token = await executeRecaptcha("form_submit");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/morpheus-api/sendEmail`,
        {
          method: "POST",
          body: JSON.stringify({ ...data, token }),
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
    }
  };

  // =============== RENDERS
  const renderButton = () => {
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
      <Button
        type="submit"
        visual="outline-secondary"
        px={6}
        loading={loading}
        disabled={loading || isSent}
        contentProps={{ gap: 3 }}
      >
        <Icon w={4} h={4}>
          <FaPaperPlane />
        </Icon>
        {config?.buttonText || "SEND"}
      </Button>
    );
  };

  // =============== VIEWS
  return (
    <VStack width={{ base: "100%", md: "50%" }} borderRadius={12}>
      <form
        onSubmit={handleSubmit(onHandleSendEmail)}
        style={{ width: "100%" }}
      >
        <VStack width={"100%"} justifyContent={"flex-start"} gap={5}>
          <SimpleGrid w="full" columns={{ base: 1, md: 2 }} gap={4}>
            <Field.Root invalid={!!errors.firstName}>
              <Field.Label color="primary.600">
                {config?.firstNameLabel}
              </Field.Label>
              <Input
                placeholder={localeDictionary?.firstNamePlaceholder || "John"}
                {...register("firstName")}
                borderColor="primary.600"
                _placeholder={{ color: "secondaryText.500" }}
                color="white"
              />
              {errors.firstName && (
                <Field.ErrorText>{errors.firstName.message}</Field.ErrorText>
              )}
            </Field.Root>

            {/* Last Name */}
            <Field.Root invalid={!!errors.lastName}>
              <Field.Label color="primary.600">
                {config?.lastNameLabel}
              </Field.Label>
              <Input
                placeholder={localeDictionary?.lastNamePlaceholder || "Doe"}
                {...register("lastName")}
                borderColor="primary.600"
                _placeholder={{ color: "secondaryText.500" }}
                color="white"
              />
              {errors.lastName && (
                <Field.ErrorText>{errors.lastName.message}</Field.ErrorText>
              )}
            </Field.Root>
          </SimpleGrid>

          <VStack gap={5} w="full">
            {/* Email */}
            <Field.Root invalid={!!errors.email}>
              <Field.Label color="primary.600">
                {config?.emailLabel}
              </Field.Label>
              <Input
                placeholder={
                  localeDictionary?.emailPlaceholder || "me@example.com"
                }
                {...register("email")}
                borderColor="primary.600"
                _placeholder={{ color: "secondaryText.500" }}
                color="white"
              />
              {errors.email && (
                <Field.ErrorText>{errors.email.message}</Field.ErrorText>
              )}
            </Field.Root>

            {/* Message */}
            <Field.Root invalid={!!errors.message}>
              <Field.Label color="primary.600">
                {config?.messageLabel}
              </Field.Label>
              <Textarea
                placeholder={
                  localeDictionary?.messagePlaceholder || "Your message here"
                }
                {...register("message")}
                borderColor="primary.600"
                _placeholder={{ color: "secondaryText.500" }}
                color="white"
              />
              {errors.message && (
                <Field.ErrorText>{errors.message.message}</Field.ErrorText>
              )}
            </Field.Root>
          </VStack>
          {/* Submit Button */}
          <Box
            alignSelf={"flex-start"}
            width={{ base: "100%", md: "fit-content" }}
          >
            {renderButton()}
          </Box>
        </VStack>
      </form>
    </VStack>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
