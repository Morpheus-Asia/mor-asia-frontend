"use client";

import { useEffect } from "react";
import { useSlugContext } from "morpheus-asia/containers/SlugProvider";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const ClientSlugHandler = ({
  localizedSlugs,
}: {
  localizedSlugs: Record<string, string>;
}) => {
  // =============== HOOKS
  const { dispatch } = useSlugContext();

  // =============== EFFECTS
  useEffect(() => {
    if (localizedSlugs) {
      dispatch({ type: "SET_SLUGS", payload: localizedSlugs });
    }
  }, [localizedSlugs, dispatch]);

  // =============== VIEWS
  return null; // This component only handles the state and doesn't render anything.
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default ClientSlugHandler;
