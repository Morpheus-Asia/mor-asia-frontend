"use client";

import { ChakraProvider as Provider } from "@chakra-ui/react";
import { ReactNode } from "react";
import { system } from "./theme";

export const ChakraProvider = ({ children }: { children: ReactNode }) => {
  return (
    // TODO: remove defaultSystem
    <Provider value={system}>{children}</Provider>
  );
};
