import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

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
    tokens: {
      colors: {
        primary: {
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
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
