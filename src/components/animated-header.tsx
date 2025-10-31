'use client';

import { motion, AnimatePresence } from 'framer-motion';
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
  const investButtonRef = useRef<HTMLButtonElement>(null);
  const [navWidth, setNavWidth] = useState<number | null>(null);
  const [isInvestOpen, setIsInvestOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (navRef.current) {
      const width = navRef.current.offsetWidth - 55;
      setNavWidth(width);
    }
  }, []);

  useEffect(() => {
    if (investButtonRef.current && isInvestOpen) {
      const rect = investButtonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 15,
        left: rect.left - 25,
      });
    }
  }, [isInvestOpen]);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsInvestOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsInvestOpen(false);
    }, 150);
  };

  return (
    <header style={{ 
      padding: "1.5rem clamp(1rem, 6vw, 2rem)", 
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: 'transparent',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
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
            <Link href="/" style={{ display: 'block', cursor: 'pointer' }}>
              <Image
                src="/ma-logo-dark-2.png"
                alt="Morpheus Asia Logo"
                width={55}
                height={55}
                priority
              />
            </Link>
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
            overflow: 'visible',
          }}
        >
          <Link href="/events" style={linkStyle}>
            Events
          </Link>
          <button
            ref={investButtonRef}
            style={{
              ...linkStyle,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => setIsInvestOpen(!isInvestOpen)}
          >
            Invest
            <span style={{ 
              fontSize: '1.25rem',
              transition: 'transform 0.2s',
              transform: isInvestOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}>
              ⌄
            </span>
          </button>
          <Link href="/learn" style={linkStyle}>
            Learn
          </Link>
          <Link href="/blog" style={linkStyle}>
            Blog
          </Link>
        </motion.nav>
      </div>
      
      {/* Dropdown Menu - Outside nav container */}
      <AnimatePresence>
        {isInvestOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: 'none',
              borderRadius: '12px',
              padding: '0.5rem',
            minWidth: '200px',
            boxShadow: 'none',
            zIndex: 9999,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link 
            href="/invest/staking-dashboard" 
            style={{
              color: 'white',
              textDecoration: 'none',
              display: 'block',
              padding: '0.75rem 1rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              fontFamily: 'MOS, sans-serif',
              borderRadius: '8px',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(31, 220, 143, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Staking Dashboard
          </Link>
          <Link 
            href="/invest/mor-token" 
            style={{
              color: 'white',
              textDecoration: 'none',
              display: 'block',
              padding: '0.75rem 1rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              fontFamily: 'MOS, sans-serif',
              borderRadius: '8px',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(31, 220, 143, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            MOR Token
          </Link>
          <Link 
            href="/invest/what-is-this" 
            style={{
              color: 'white',
              textDecoration: 'none',
              display: 'block',
              padding: '0.75rem 1rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              fontFamily: 'MOS, sans-serif',
              borderRadius: '8px',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(31, 220, 143, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            What Do I Get?
          </Link>
        </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
