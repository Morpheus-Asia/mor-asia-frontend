import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
} from "@chakra-ui/react";

const outline = {
  borderRadius: 8,
  borderColor: "primary.600",
  _hover: {
    background: "#179c65",
    transition: "all 0.3s ease-in-out",
    boxShadow: "0 8px 24px rgba(72, 187, 120, 0.2)",
    border: "1px solid #9AE6B4",
  },
  fontWeight: "bold",
  color: "white",
  variant: "outline",
  background: "transparent",
};

export const buttonRecipe = defineRecipe({
  variants: {
    visual: {
      outline,
      "outline-secondary": {
        ...outline,
        color: "primary.600",
        _hover: {
          ...outline._hover,
          color: "#E0FFE6",
        },
      },
      solid: {
        background: "primary.600",
        _hover: {
          background: "#179c65",
          transition: "all 0.3s ease-in-out",
        },
        fontWeight: "bold",
        color: "buttonText.500",
      },
      ghost: {
        textDecoration: "none",
        transition: "all 0.3s ease-in-out",
        focusRing: "none",
        border: "none",
        background: "transparent",
        py: 2,
        px: 0,
        _hover: {
          background: "primary.600",
          color: "buttonText.500",
          px: 4,
          borderRadius: 6,
        },
        color: "primary.600",
        fontWeight: "bold",
      },
    },
  },
  defaultVariants: {
    visual: "solid",
  },
});

const config = defineConfig({
  globalCss: {
    "html, body": {
      margin: 0,
      padding: 0,
    },
    body: {
      background: "primary.500",
    },
  },
  theme: {
    recipes: {
      button: buttonRecipe,
    },
    tokens: {
      colors: {
        primary: {
          300: {
            value: "#00DC8D",
          },
          400: {
            value: "#1C4532",
          },
          500: {
            value: "#03160e",
          },
          600: {
            value: "#20DC8E",
          },
        },
        buttonText: {
          500: {
            value: "#012C33",
          },
        },
        secondaryText: {
          500: {
            value: "rgba(255, 255, 255, 0.64)",
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
