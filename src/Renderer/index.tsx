"use client";
import dynamic from "next/dynamic";
import map from "lodash/map";

const componentMapper: { [key: string]: any } = {
  // =============== SHARED
  "shared.button": dynamic(
    () => import("../components/Button").then((mod) => mod.default),
    { ssr: false }
  ),
  "shared.link": dynamic(
    () => import("../components/Link").then((mod) => mod.default),
    { ssr: false }
  ),
  // =============== SECTIONS
  "sections.hero": dynamic(() =>
    import("../containers/Hero").then((mod) => mod.default)
  ),
  "sections.about": dynamic(() =>
    import("../containers/About").then((mod) => mod.default)
  ),
  "sections.benefits": dynamic(() =>
    import("../containers/Benefits").then((mod) => mod.default)
  ),
  "sections.cta": dynamic(() =>
    import("../containers/CTA").then((mod) => mod.default)
  ),
  "sections.metrics": dynamic(() =>
    import("../containers/Metrics").then((mod) => mod.default)
  ),

  // =============== COMPONENTS
  "component.divider": dynamic(() =>
    import("../components/Divider").then((mod) => mod.default)
  ),
};

export const Renderer = (props: {
  items: any;
  locale: string;
  propsMapper?: (type: string, component: any) => any;
}) => {
  const { items, locale, propsMapper } = props;

  const renderComponent = () => {
    return map(items, (component) => {
      const type = component.__component;
      const Component = componentMapper[type];
      if (!Component) {
        console.warn(`No component found for: ${component.__component}`);
        return null;
      }
      return (
        <Component
          key={component.id}
          {...component}
          {...propsMapper?.(type, component)}
          locale={locale}
        />
      );
    });
  };

  return renderComponent();
};
