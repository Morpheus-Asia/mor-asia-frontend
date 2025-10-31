'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "1.25rem",
  fontWeight: 'bold' as const,
  fontFamily: 'MOS, sans-serif',
  letterSpacing: '0.01em',
  whiteSpace: 'nowrap' as const,
};

export function AnimatedHeader() {
  const navRef = useRef<HTMLElement>(null);
  const [navWidth, setNavWidth] = useState<number | null>(null);

  useEffect(() => {
    if (navRef.current) {
      const width = navRef.current.offsetWidth - 55;
      setNavWidth(width);
    }
  }, []);

  return (
    <header style={{ 
      padding: "1.5rem clamp(1rem, 6vw, 2rem)", 
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: 'transparent',
      position: 'relative',
      zIndex: 10,
    }}>
      <div style={{ 
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
      }}>
        {/* Logo */}
        {navWidth !== null && (
          <motion.div
            initial={{ x: navWidth, rotate: 360, opacity: 0 }}
            animate={{ x: 0, rotate: 0, opacity: 1 }}
            transition={{ 
              duration: 0.9, 
              ease: [0.25, 0.1, 0.25, 1],
              opacity: { duration: 0.3 }
            }}
            style={{
              position: 'absolute',
              left: 0,
              zIndex: 1,
            }}
          >
            <Image
              src="/ma-logo-dark-2.png"
              alt="Morpheus Asia Logo"
              width={55}
              height={55}
              priority
            />
          </motion.div>
        )}

        {/* Navigation */}
        <motion.nav
          ref={navRef}
          initial={{ clipPath: 'inset(0 0 0 100%)' }}
          animate={navWidth !== null ? { clipPath: 'inset(0 0 0 0)' } : {}}
          transition={{ 
            duration: 1, 
            ease: [0.25, 0.1, 0.25, 1]
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(1.5rem, 4vw, 3rem)',
            paddingLeft: 'clamp(5rem, 6vw, 6rem)',
            paddingRight: 'clamp(1.5rem, 2.5vw, 2.5rem)',
            paddingTop: '0.75rem',
            paddingBottom: '0.75rem',
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: '50px',
            position: 'relative',
          }}
        >
          <Link href="/events" style={linkStyle}>
            Events
          </Link>
          <Link href="/invest" style={linkStyle}>
            Invest
          </Link>
          <Link href="/learn" style={linkStyle}>
            Learn
          </Link>
          <Link href="/blog" style={linkStyle}>
            Blog
          </Link>
        </motion.nav>
      </div>
    </header>
  );
}
