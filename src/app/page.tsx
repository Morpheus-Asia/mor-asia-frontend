'use client';

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Box, Container, Heading, Text, Grid, VStack, Button, HStack, Link } from "@chakra-ui/react";
import { Tooltip } from "../components/ui/tooltip";

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      // Skip 20% of columns randomly to reduce density
      if (Math.random() > 0.2) {
        drops[i] = Math.random() * -100;
      } else {
        drops[i] = -9999;
      }
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        opacity: 0.3,
        pointerEvents: 'none',
      }}
    />
  );
};

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is Morpheus?",
    answer: "Morpheus is a decentralized AI network that enables developers and users to build, deploy, and interact with intelligent agents. It combines blockchain technology with artificial intelligence to create a permissionless ecosystem for Smart Agents and Personal AI."
  },
  {
    question: "What is the MOR token?",
    answer: "MOR is the native token of the Morpheus network. It's distributed to participants who contribute to the network through four pillars: Capital (staking stETH), Code (developing the protocol), Compute (providing processing power), and Community (building applications and content)."
  },
  {
    question: "How can I earn MOR tokens?",
    answer: "You can earn MOR tokens by contributing to the network in various ways: stake stETH as a capital provider, contribute code to the protocol, provide compute resources to run AI agents, or build applications and content for the community."
  },
  {
    question: "What is Morpheus Asia?",
    answer: "Morpheus Asia is the regional hub for the Morpheus network in Asia. We bring together developers, researchers, and enthusiasts interested in decentralized AI, hosting events, workshops, and fostering collaboration across the Asian community."
  },
  {
    question: "How do I get started with Morpheus?",
    answer: "Start by joining our community channels on Telegram and Discord. Explore our Learn section for documentation and tutorials. If you're a developer, check out the SDK and API documentation. If you want to contribute capital or compute, visit our Invest section."
  },
  {
    question: "What are Smart Agents?",
    answer: "Smart Agents are AI-powered programs that can autonomously interact with blockchain networks, execute tasks, and make decisions on behalf of users. They combine the intelligence of AI models with the trustless execution of smart contracts."
  },
];

const FAQAccordion = ({ faq }: { faq: FAQItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      border="1px solid"
      borderColor={isOpen ? "#1fdc8f" : "rgba(255, 255, 255, 0.2)"}
      transition="all 0.3s"
      bg={isOpen ? "rgba(31, 220, 143, 0.05)" : "transparent"}
      overflow="hidden"
    >
      <Button
        w="100%"
        h="auto"
        p={{ base: "1rem", md: "1.5rem" }}
        bg="transparent"
        color="white"
        fontSize={{ base: "1rem", md: "1.25rem" }}
        fontWeight="bold"
        textAlign="left"
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        borderRadius="0"
        _hover={{ bg: "rgba(31, 220, 143, 0.05)" }}
        onClick={() => setIsOpen(!isOpen)}
        whiteSpace="normal"
      >
        <Text 
          flex="1" 
          pr={{ base: "0.75rem", md: "1rem" }}
          wordBreak="break-word"
          overflowWrap="break-word"
        >
          {faq.question}
        </Text>
        <Text
          fontSize={{ base: "1.25rem", md: "1.5rem" }}
          fontWeight="bold"
          color="#1fdc8f"
          transition="transform 0.3s"
          transform={isOpen ? "rotate(45deg)" : "rotate(0deg)"}
          flexShrink={0}
          ml="0.5rem"
        >
          +
        </Text>
      </Button>
      {isOpen && (
        <Box
          p={{ base: "1rem", md: "1.5rem" }}
          pt="0"
          fontSize={{ base: "1rem", md: "1.125rem" }}
          lineHeight="1.8"
          color="rgba(255, 255, 255, 0.85)"
          wordBreak="break-word"
          overflowWrap="break-word"
        >
          {faq.answer}
        </Box>
      )}
    </Box>
  );
};

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Box as="main" position="relative" minH="100vh" pt="0rem" overflowX="hidden">
      <MatrixRain />
      <Box position="relative" w="100%" zIndex={1} overflowX="hidden">
        {/* bg-1.png absolutely positioned above hero, but above stars */}
        <Container
          as="section"
          maxW="1000px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
          textAlign="center"
          gap="1rem"
          px={{ base: "1rem", md: "2rem" }}
        >
          <Box mb="0.5rem">
            <Image
              src="/morpheus_sigil_design.png"
              alt="Morpheus Logo"
              width={250}
              height={250}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Box>
          <Heading
            as="h1"
            fontSize={{ base: "2rem", sm: "2.5rem", md: "3rem", lg: "3.5rem" }}
            fontWeight="normal"
            letterSpacing="0.02em"
            lineHeight="1.3"
            maxW="900px"
            px={{ base: "1rem", md: "0" }}
          >
            Join The Asia Layer Of <Box as="span" fontWeight="bold">Morpheus</Box>
          </Heading>
          <Text
            fontSize={{ base: "1.125rem", sm: "1.25rem", md: "1.5rem" }}
            maxW="800px"
            lineHeight="1.6"
            mb="2rem"
            px={{ base: "1rem", md: "0" }}
          >
            Morpheus Asia is a community of the best Smart Agent, DeAI, Personal AI minds in Asia
          </Text>
        </Container>

        {/* Exclamation section */}
        <Container
          as="section"
          maxW="1200px"
          textAlign="center"
          mt={{ base: "6rem", md: "12rem" }}
          px={{ base: "1rem", md: "2rem" }}
        >
          <Heading
            as="h2"
            fontSize={{ base: "2rem", sm: "2.5rem", md: "3rem", lg: "3.5rem" }}
            fontWeight="bold"
            mb="2rem"
          >
            Morpheus Smart Contracts
          </Heading>
          <Text 
            fontSize={{ base: "1.125rem", sm: "1.25rem", md: "1.5rem" }}
            maxW="800px"
            lineHeight="1.6"
            mb="3rem"
            mx="auto"
            px={{ base: "1rem", md: "0" }}
          >
            <Box as="span" display={{ base: "inline", md: "none" }}>Tap On Each To Learn More</Box>
            <Box as="span" display={{ base: "none", md: "inline" }}>Hover On Each To Learn More</Box>
          </Text>
        </Container>
        <Grid
          as="section"
          templateColumns={{ base: "1fr", lg: "1fr 0.2fr 1fr" }}
          gap={{ base: "2rem", md: "3rem" }}
          alignItems="center"
          mb="4rem"
          maxW="1600px"
          mx="auto"
          px={{ base: "1rem", md: "2rem" }}
        >
          <VStack gap="2rem" justify="center" align="center">
            <Tooltip 
              content="Capital providers stake stETH to earn yield and MOR tokens" 
              showArrow 
              openDelay={0} 
              closeDelay={0} 
              positioning={{ placement: isMobile ? "top" : "right" }}
              interactive
            >
              <Box 
                cursor="pointer" 
                onClick={(e) => e.stopPropagation()}
                tabIndex={0}
              >
                <Image
                  src="/1-capital.png"
                  alt="Capital"
                  width={450}
                  height={300}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </Box>
            </Tooltip>
            <Tooltip 
              content="Compute providers contribute processing power to run AI agents" 
              showArrow 
              openDelay={0} 
              closeDelay={0} 
              positioning={{ placement: isMobile ? "top" : "right" }}
              interactive
            >
              <Box 
                cursor="pointer"
                onClick={(e) => e.stopPropagation()}
                tabIndex={0}
              >
                <Image
                  src="/3-compute.png"
                  alt="Computer"
                  width={450}
                  height={300}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </Box>
            </Tooltip>
          </VStack>
          <Box display={{ base: "none", lg: "flex" }} justifyContent="center" alignItems="center">
            <Image
              src="/exclamation-nobg.png"
              alt="Exclamation"
              width={200}
              height={400}
              style={{
                width: "auto",
                height: "400px",
                maxHeight: "400px",
              }}
            />
          </Box>
                    <VStack gap="2rem" justify="center" align="center">
            <Tooltip 
              content="Code contributors develop and maintain the Morpheus protocol" 
              showArrow 
              openDelay={0} 
              closeDelay={0} 
              positioning={{ placement: isMobile ? "top" : "left" }}
              interactive
            >
              <Box 
                cursor="pointer"
                onClick={(e) => e.stopPropagation()}
                tabIndex={0}
              >
                <Image
                  src="/2-coders.png"
                  alt="Coders"
                  width={450}
                  height={300}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </Box>
            </Tooltip>
            <Tooltip 
              content="Builders create applications and agents on the Morpheus network" 
              showArrow 
              openDelay={0} 
              closeDelay={0} 
              positioning={{ placement: isMobile ? "top" : "left" }}
              interactive
            >
              <Box 
                cursor="pointer"
                onClick={(e) => e.stopPropagation()}
                tabIndex={0}
              >
                <Image
                  src="/4-builders.png"
                  alt="Builders"
                  width={450}
                  height={300}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </Box>
            </Tooltip>
          </VStack>
        </Grid>

        {/* What is Morpheus section */}
        <Container
          as="section"
          maxW="1300px"
          my="5rem"
          px={{ base: "1rem", md: "2rem" }}
          textAlign="center"
        >
          <Heading
            as="h2"
            fontSize={{ base: "2rem", sm: "2.5rem", md: "3rem" }}
            fontWeight="bold"
            mb="2.5rem"
            display="flex"
            flexDirection={{ base: "column", sm: "row" }}
            alignItems="center"
            justifyContent="center"
            gap={{ base: "0.5rem", sm: "0rem" }}
          >
            What is{' '}
            <Image
              src="/mor_horiz_logo_white.png"
              alt="Morpheus"
              width={500}
              height={100}
              style={{
                display: 'inline-block',
                maxWidth: '100%',
                height: 'auto',
              }}
            />
            ?
          </Heading>
          <Text
            fontSize={{ base: "1.125rem", sm: "1.25rem", md: "1.5rem" }}
            lineHeight="1.9"
            maxW="1000px"
            mx="auto"
          >
            Morpheus is a decentralized AI network that empowers developers and users to build, deploy, and interact with intelligent agents. It combines the power of blockchain technology with artificial intelligence to create a new paradigm for Smart Agents and Personal AI.
          </Text>
        </Container>

        {/* FAQ Section */}
        <Container
          as="section"
          maxW="1000px"
          my="5rem"
          px={{ base: "1rem", md: "2rem" }}
        >
          <Heading
            as="h2"
            fontSize={{ base: "2rem", sm: "2.5rem", md: "3rem" }}
            fontWeight="bold"
            mb="1.5rem"
            textAlign="center"
          >
            FAQ
          </Heading>
          <Text
            fontSize={{ base: "1rem", md: "1.25rem" }}
            color="rgba(255, 255, 255, 0.8)"
            textAlign="center"
            mb="3rem"
            lineHeight="1.7"
          >
            Get answers to common questions about Morpheus and Morpheus Asia
          </Text>
          <VStack gap="1rem" align="stretch">
            {faqs.map((faq, index) => (
              <FAQAccordion key={index} faq={faq} />
            ))}
          </VStack>
        </Container>

        {/* Community Links Section */}
        <Container
          as="section"
          maxW="1200px"
          my="5rem"
          px={{ base: "1rem", md: "2rem" }}
          textAlign="center"
        >
          <Heading
            as="h2"
            fontSize={{ base: "2rem", sm: "2.5rem", md: "3rem" }}
            fontWeight="bold"
            mb="2rem"
          >
            Join Our Community
          </Heading>
          <HStack gap={{ base: "0.75rem", md: "1rem" }} flexWrap="wrap" justify="center">
            <Link href="https://t.me/MorpheusAsia" target="_blank" rel="noopener noreferrer" _hover={{ textDecoration: 'none' }}>
              <Button
                size={{ base: "sm", md: "md" }}
                bg="#1fdc8f"
                color="black"
                fontSize={{ base: "0.875rem", md: "1rem" }}
                fontWeight="bold"
                fontFamily="MOS"
                px={{ base: "1rem", md: "1.5rem" }}
                py={{ base: "0.875rem", md: "1rem" }}
                h="auto"
                borderRadius="0"
                textTransform="uppercase"
                _hover={{ bg: "#18c57d" }}
              >
                Join Our Telegram Group
              </Button>
            </Link>
            <Link href="https://twitter.com/MorpheusAsia" target="_blank" rel="noopener noreferrer" _hover={{ textDecoration: 'none' }}>
              <Button
                size={{ base: "sm", md: "md" }}
                bg="#1fdc8f"
                color="black"
                fontSize={{ base: "0.875rem", md: "1rem" }}
                fontWeight="bold"
                fontFamily="MOS"
                px={{ base: "1rem", md: "1.5rem" }}
                py={{ base: "0.875rem", md: "1rem" }}
                h="auto"
                borderRadius="0"
                textTransform="uppercase"
                _hover={{ bg: "#18c57d" }}
              >
                Follow Us On X
              </Button>
            </Link>
            <Link href="https://discord.gg/morpheus" target="_blank" rel="noopener noreferrer" _hover={{ textDecoration: 'none' }}>
              <Button
                size={{ base: "sm", md: "md" }}
                bg="#1fdc8f"
                color="black"
                fontSize={{ base: "0.875rem", md: "1rem" }}
                fontWeight="bold"
                fontFamily="MOS"
                px={{ base: "1rem", md: "1.5rem" }}
                py={{ base: "0.875rem", md: "1rem" }}
                h="auto"
                borderRadius="0"
                textTransform="uppercase"
                _hover={{ bg: "#18c57d" }}
              >
                Join The Morpheus Discord
              </Button>
            </Link>
            <Link href="https://www.instagram.com/morpheusasia/" target="_blank" rel="noopener noreferrer" _hover={{ textDecoration: 'none' }}>
              <Button
                size={{ base: "sm", md: "md" }}
                bg="#1fdc8f"
                color="black"
                fontSize={{ base: "0.875rem", md: "1rem" }}
                fontWeight="bold"
                fontFamily="MOS"
                px={{ base: "1rem", md: "1.5rem" }}
                py={{ base: "0.875rem", md: "1rem" }}
                h="auto"
                borderRadius="0"
                textTransform="uppercase"
                _hover={{ bg: "#18c57d" }}
              >
                Check Out Our Instagram
              </Button>
            </Link>
            <Link href="https://www.youtube.com/@MorpheusAsia" target="_blank" rel="noopener noreferrer" _hover={{ textDecoration: 'none' }}>
              <Button
                size={{ base: "sm", md: "md" }}
                bg="#1fdc8f"
                color="black"
                fontSize={{ base: "0.875rem", md: "1rem" }}
                fontWeight="bold"
                fontFamily="MOS"
                px={{ base: "1rem", md: "1.5rem" }}
                py={{ base: "0.875rem", md: "1rem" }}
                h="auto"
                borderRadius="0"
                textTransform="uppercase"
                _hover={{ bg: "#18c57d" }}
              >
                Morpheus Asia On YouTube
              </Button>
            </Link>
          </HStack>
        </Container>

        {/* Our Team Section */}
        <Container
          as="section"
          maxW="1200px"
          my="5rem"
          px={{ base: "1rem", md: "2rem" }}
        >
          <Heading
            as="h2"
            fontSize={{ base: "2rem", sm: "2.5rem", md: "3rem" }}
            fontWeight="bold"
            mb="1.5rem"
            textAlign="center"
          >
            Our Team
          </Heading>
          <Text
            fontSize={{ base: "1rem", md: "1.25rem" }}
            color="rgba(255, 255, 255, 0.8)"
            textAlign="center"
            mb="4rem"
            lineHeight="1.7"
            maxW="800px"
            mx="auto"
          >
            Meet the passionate individuals driving the Morpheus Asia community forward
          </Text>
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
            gap="2rem"
          >
            {[
              { name: "Rene", role: "Asia Community Lead & Co-Founder Morpheus Asia", image: "/rene.jpg", link: "https://x.com/rene05x" },
              { name: "Eric", role: "Asia Community Lead & Co-Founder Morpheus Asia", image: "/eric.jpg", link: "https://x.com/canmasu" },
              { name: "Hussain", role: "Morpheus Asia Project Officer", image: "/hussain.jpg", link: "http://x.com/nothussainrana" },
            ].map((member, index) => (
              <VStack
                key={index}
                gap="1rem"
                p="2rem"
                bg="rgba(255, 255, 255, 0.03)"
                border="1px solid rgba(255, 255, 255, 0.1)"
                borderRadius="8px"
                transition="all 0.3s"
                _hover={{
                  bg: "rgba(31, 220, 143, 0.05)",
                  borderColor: "#1fdc8f",
                  transform: "translateY(-4px)",
                }}
              >
                <Box
                  w="150px"
                  h="150px"
                  borderRadius="50%"
                  border="2px solid #1fdc8f"
                  overflow="hidden"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={150}
                    height={150}
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </Box>
                <Heading
                  as="h3"
                  fontSize="1.5rem"
                  fontWeight="bold"
                  color="white"
                  textAlign="center"
                >
                  {member.name}
                </Heading>
                <Text
                  fontSize="1.125rem"
                  color="#1fdc8f"
                  textAlign="center"
                  fontWeight="bold"
                >
                  {member.role}
                </Text>
                <Link
                  href={member.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  _hover={{ textDecoration: 'none' }}
                >
                  <Button
                    size="sm"
                    bg="#1fdc8f"
                    color="black"
                    fontSize="0.875rem"
                    fontWeight="bold"
                    fontFamily="MOS"
                    px="1.5rem"
                    py="0.75rem"
                    h="auto"
                    borderRadius="4px"
                    textTransform="uppercase"
                    _hover={{ bg: "#18c57d" }}
                    mt="0.5rem"
                  >
                    Follow on X
                  </Button>
                </Link>
              </VStack>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
