'use client';

import { Box, VStack, Text } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  contentSelector?: string;
}

export function TableOfContents({ contentSelector = '.doc-content' }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const pathname = usePathname();
  const observerRef = useRef<MutationObserver | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Extract headings from the content
  const extractHeadings = () => {
    const content = document.querySelector(contentSelector);
    if (!content) {
      setHeadings([]);
      return false;
    }

    const headingElements = content.querySelectorAll('h1, h2, h3, h4');
    const items: TocItem[] = [];

    headingElements.forEach((heading, index) => {
      const text = heading.textContent || '';
      // Create an ID if one doesn't exist
      let id = heading.id;
      if (!id) {
        id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '') || `heading-${index}`;
        heading.id = id;
      }

      const tagName = heading.tagName.toLowerCase();
      const level = parseInt(tagName.charAt(1));

      items.push({ id, text, level });
    });

    setHeadings(items);
    
    // Set initial active if we have headings
    if (items.length > 0) {
      setActiveId(items[0].id);
    }
    
    return items.length > 0;
  };

  // Watch for content to appear and extract headings
  useEffect(() => {
    // Reset state on route change
    setHeadings([]);
    setActiveId('');

    // Clean up previous observers
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Function to set up the content observer once we find the content
    const setupContentObserver = () => {
      const content = document.querySelector(contentSelector);
      if (content && !observerRef.current) {
        observerRef.current = new MutationObserver(() => {
          extractHeadings();
        });
        observerRef.current.observe(content, {
          childList: true,
          subtree: true,
        });
      }
    };

    // Try to find content immediately
    const found = extractHeadings();
    if (found) {
      setupContentObserver();
    }

    // If not found, poll for it (content loads asynchronously)
    if (!found) {
      let attempts = 0;
      const maxAttempts = 50; // 5 seconds max
      
      intervalRef.current = setInterval(() => {
        attempts++;
        const content = document.querySelector(contentSelector);
        
        if (content) {
          const hasHeadings = extractHeadings();
          if (hasHeadings) {
            setupContentObserver();
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
          }
        }
        
        if (attempts >= maxAttempts) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      }, 100);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [pathname, contentSelector]);

  // Set up intersection observer for active section tracking
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first visible heading
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by their position in the document and take the first one
          const sorted = visibleEntries.sort((a, b) => {
            const rectA = a.boundingClientRect;
            const rectB = b.boundingClientRect;
            return rectA.top - rectB.top;
          });
          setActiveId(sorted[0].target.id);
        }
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0,
      }
    );

    // Observe all headings
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveId(id);
    }
  };

  if (headings.length === 0) {
    return null;
  }

  // Get the minimum level to calculate indentation
  const minLevel = Math.min(...headings.map(h => h.level));

  return (
    <Box pt="0.5rem">
      <Text
        fontSize="0.875rem"
        fontWeight="600"
        color="rgba(255, 255, 255, 0.6)"
        textTransform="uppercase"
        letterSpacing="0.05em"
        mb="0.5rem"
        fontFamily="'Helvetica Neue', Helvetica, sans-serif"
      >
        On This Page
      </Text>
      <VStack align="stretch" gap="0.25rem" ml="-1.5rem">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          const depth = heading.level - minLevel;
          const indent = depth * 0.75; // slight indent for subheadings

          return (
            <Box
              key={heading.id}
              as="button"
              onClick={() => handleClick(heading.id)}
              textAlign="left"
              w="calc(100% + 1.5rem)"
              py="0.5rem"
              pl={`${1.5 + indent}rem`}
              pr="0.5rem"
              transition="all 0.2s ease"
              cursor="pointer"
              bg={isActive ? "rgba(31, 220, 143, 0.15)" : "transparent"}
              borderLeft={isActive ? "3px solid #1fdc8f" : "3px solid transparent"}
              _hover={{
                bg: "rgba(31, 220, 143, 0.1)",
              }}
            >
              <Text
                fontSize="0.9375rem"
                fontWeight="bold"
                color={isActive ? "#1fdc8f" : "rgba(255, 255, 255, 0.9)"}
                lineHeight="1.6"
                transition="all 0.2s ease"
                lineClamp={2}
                wordBreak="break-word"
                fontFamily="'Helvetica Neue', Helvetica, sans-serif"
              >
                {heading.text}
              </Text>
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
}
