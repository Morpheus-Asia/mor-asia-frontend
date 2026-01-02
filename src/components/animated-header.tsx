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
  const communityButtonRef = useRef<HTMLButtonElement>(null);
  const [navWidth, setNavWidth] = useState<number | null>(null);
  const [isInvestOpen, setIsInvestOpen] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [communityDropdownPosition, setCommunityDropdownPosition] = useState({ top: 0, left: 0 });
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const communityCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (navRef.current && !isMobile) {
      const width = navRef.current.offsetWidth - 55;
      setNavWidth(width);
    }
  }, [isMobile]);

  useEffect(() => {
    if (investButtonRef.current && isInvestOpen && !isMobile) {
      const rect = investButtonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 15,
        left: rect.left - 25,
      });
    }
  }, [isInvestOpen, isMobile]);

  useEffect(() => {
    if (communityButtonRef.current && isCommunityOpen && !isMobile) {
      const rect = communityButtonRef.current.getBoundingClientRect();
      setCommunityDropdownPosition({
        top: rect.bottom + 15,
        left: rect.left - 25,
      });
    }
  }, [isCommunityOpen, isMobile]);

  const handleMouseEnter = () => {
    if (isMobile) return;
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsInvestOpen(true);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    closeTimeoutRef.current = setTimeout(() => {
      setIsInvestOpen(false);
    }, 150);
  };

  const handleCommunityMouseEnter = () => {
    if (isMobile) return;
    if (communityCloseTimeoutRef.current) {
      clearTimeout(communityCloseTimeoutRef.current);
      communityCloseTimeoutRef.current = null;
    }
    setIsCommunityOpen(true);
  };

  const handleCommunityMouseLeave = () => {
    if (isMobile) return;
    communityCloseTimeoutRef.current = setTimeout(() => {
      setIsCommunityOpen(false);
    }, 150);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsInvestOpen(false);
    setIsCommunityOpen(false);
  };

  return (
    <header style={{ 
      padding: isMobile ? "1rem" : "1.5rem clamp(1rem, 6vw, 2rem)", 
      display: "flex",
      alignItems: "center",
      justifyContent: isMobile ? "space-between" : "center",
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }}>
      {/* Mobile Logo */}
      {isMobile && (
        <Link href="/" style={{ display: 'block', cursor: 'pointer' }}>
          <Image
            src="/ma-logo-dark-2.png"
            alt="Morpheus Asia Logo"
            width={45}
            height={45}
            priority
          />
        </Link>
      )}

      {/* Mobile Hamburger */}
      {isMobile && (
        <button
          onClick={toggleMobileMenu}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: 'none',
            padding: '0.75rem',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            zIndex: 1001,
          }}
        >
          <span style={{
            width: '24px',
            height: '3px',
            background: 'white',
            borderRadius: '2px',
            transition: 'all 0.3s',
            transform: isMobileMenuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
          }} />
          <span style={{
            width: '24px',
            height: '3px',
            background: 'white',
            borderRadius: '2px',
            transition: 'all 0.3s',
            opacity: isMobileMenuOpen ? 0 : 1,
          }} />
          <span style={{
            width: '24px',
            height: '3px',
            background: 'white',
            borderRadius: '2px',
            transition: 'all 0.3s',
            transform: isMobileMenuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
          }} />
        </button>
      )}

      {/* Desktop Navigation */}
      {!isMobile && (
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
            <button
              ref={communityButtonRef}
              style={{
                ...linkStyle,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
              onMouseEnter={handleCommunityMouseEnter}
              onMouseLeave={handleCommunityMouseLeave}
              onClick={() => setIsCommunityOpen(!isCommunityOpen)}
            >
              Community
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  flexShrink: 0,
                  marginTop: '2px',
                }}
              >
                <path 
                  d="M4 6L8 10L12 6" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
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
              Contribute
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  flexShrink: 0,
                  marginTop: '2px',
                }}
              >
                <path 
                  d="M4 6L8 10L12 6" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <Link href="/learn" style={{
              ...linkStyle,
              color: '#1FDC8F',
              textShadow: '0 0 20px rgba(31, 220, 143, 0.4)',
            }}>
              New Here?
            </Link>
          </motion.nav>
        </div>
      )}

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '70%',
              maxWidth: '300px',
              height: '100vh',
              background: 'rgba(0, 0, 0, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              padding: '2rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
              zIndex: 1000,
              borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div>
              <button
                style={{
                  ...linkStyle,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '1rem 0',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                onClick={() => setIsCommunityOpen(!isCommunityOpen)}
              >
                Community
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  <path 
                    d="M4 6L8 10L12 6" 
                    stroke="white" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              
              {isCommunityOpen && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  paddingLeft: '1rem',
                  marginTop: '0.5rem',
                }}>
                  <Link 
                    href="/events" 
                    style={{
                      ...linkStyle,
                      fontSize: '1rem',
                      padding: '0.75rem 0',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                    onClick={closeMobileMenu}
                  >
                    Events
                  </Link>
                  <Link 
                    href="/ambassadors" 
                    style={{
                      ...linkStyle,
                      fontSize: '1rem',
                      padding: '0.75rem 0',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                    onClick={closeMobileMenu}
                  >
                    Ambassadors
                  </Link>
                  <Link 
                    href="/clubs" 
                    style={{
                      ...linkStyle,
                      fontSize: '1rem',
                      padding: '0.75rem 0',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                    onClick={closeMobileMenu}
                  >
                    Clubs
                  </Link>
                  <Link 
                    href="/blogs/1" 
                    style={{
                      ...linkStyle,
                      fontSize: '1rem',
                      padding: '0.75rem 0',
                    }}
                    onClick={closeMobileMenu}
                  >
                    Blog
                  </Link>
                </div>
              )}
            </div>
            
            <div>
              <button
                style={{
                  ...linkStyle,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '1rem 0',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                onClick={() => setIsInvestOpen(!isInvestOpen)}
              >
                Contribute
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  <path 
                    d="M4 6L8 10L12 6" 
                    stroke="white" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              
              {isInvestOpen && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  paddingLeft: '1rem',
                  marginTop: '0.5rem',
                }}>
                  <span 
                    style={{
                      ...linkStyle,
                      fontSize: '1rem',
                      padding: '0.75rem 0',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                      color: 'rgba(255, 255, 255, 0.4)',
                      cursor: 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    Staking Dashboard
                    <span style={{
                      fontSize: '0.7rem',
                      background: 'rgba(31, 220, 143, 0.2)',
                      color: '#1fdc8f',
                      padding: '0.15rem 0.4rem',
                      borderRadius: '4px',
                    }}>
                      Soon
                    </span>
                  </span>
                  <Link 
                    href="/contribute/mor-token" 
                    style={{
                      ...linkStyle,
                      fontSize: '1rem',
                      padding: '0.75rem 0',
                    }}
                    onClick={closeMobileMenu}
                  >
                    MOR Token
                  </Link>
                </div>
              )}
            </div>

            <Link 
              href="/learn" 
              style={{
                ...linkStyle,
                display: 'block',
                padding: '1rem 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#1FDC8F',
                textShadow: '0 0 20px rgba(31, 220, 143, 0.4)',
              }}
              onClick={closeMobileMenu}
            >
              New Here?
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div
          onClick={closeMobileMenu}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          }}
        />
      )}

      {/* Desktop Dropdown Menu - Community */}
      <AnimatePresence>
        {!isMobile && isCommunityOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              top: `${communityDropdownPosition.top}px`,
              left: `${communityDropdownPosition.left}px`,
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
            onMouseEnter={handleCommunityMouseEnter}
            onMouseLeave={handleCommunityMouseLeave}
          >
            <Link 
              href="/events" 
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
              Events
            </Link>
            <Link 
              href="/ambassadors" 
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
              Ambassadors
            </Link>
            <Link 
              href="/clubs" 
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
              Clubs
            </Link>
            <Link 
              href="/blogs/1" 
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
              Blog
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Dropdown Menu - Contribute */}
      <AnimatePresence>
        {!isMobile && isInvestOpen && (
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
            <span 
              style={{
                color: 'rgba(255, 255, 255, 0.4)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                fontFamily: 'MOS, sans-serif',
                borderRadius: '8px',
                cursor: 'not-allowed',
              }}
            >
              Staking Dashboard
              <span style={{
                fontSize: '0.7rem',
                background: 'rgba(31, 220, 143, 0.2)',
                color: '#1fdc8f',
                padding: '0.15rem 0.4rem',
                borderRadius: '4px',
              }}>
                Soon
              </span>
            </span>
            <Link 
              href="/contribute/mor-token" 
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
