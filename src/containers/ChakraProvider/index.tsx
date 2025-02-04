"use client";

import { ChakraProvider as Provider, defaultSystem } from "@chakra-ui/react";
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./ColorModeProvider";

export function ChakraProvider(props: ColorModeProviderProps) {
  return (
    <Provider value={defaultSystem}>
      <ColorModeProvider {...props} />
    </Provider>
  );
}
