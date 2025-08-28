import React, { useState, useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";

const navLinks = [
  { to: "description", label: "About", icon: "bi bi-person-circle" },
  { to: "projects", label: "Projects", icon: "bi bi-kanban" },
  { to: "skills", label: "Skills", icon: "bi bi-lightning-charge" },
  { to: "contact", label: "Contact Me", icon: "bi bi-envelope-at" },
];

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [hoveredLink, setHoveredLink] = useState(null);

  const handleNavToggle = () => setNavOpen((open) => !open);

  const handleNavLinkClick = (to) => {
    setNavOpen(false);
    const el = document.getElementById(to);
    if (el) {
      const yOffset = -110;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setScrolled(scrollPos > 50);

      let current = null;
      for (const link of navLinks) {
        const section = document.getElementById(link.to);
        if (section) {
          const offsetTop = section.offsetTop - 180;
          if (scrollPos >= offsetTop) {
            current = link.to;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navOpen && !event.target.closest(".navbar")) {
        setNavOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [navOpen]);

  return (
    <>
      <div style={{ height: "80px" }} />
      <header
        className={`container-fluid custom-header${
          scrolled ? " custom-header-scrolled" : ""
        }`}
      >
        <div className="custom-header-container">
          <nav className="navbar custom-navbar">
            {/* Logo */}
            <button
              className="custom-logo-btn"
              onClick={() => scroll.scrollToTop({ duration: 500 })}
              aria-label="Homepage"
            >
              <div className="custom-logo-avatar">DK</div>
              {!isMobile && (
                <div className="custom-logo-text pt-2">
                  <div className="custom-logo-title text-start">
                    Deepak kumar
                  </div>
                  <div className="custom-logo-subtitle">Frontend Developer</div>
                </div>
              )}
            </button>

            {/* Desktop Navigation */}
            {!isMobile && (
              <div className="custom-desktop-nav">
                {navLinks.map((link) => (
                  <button
                    key={link.to}
                    className={`custom-nav-btn${
                      activeSection === link.to ? " active" : ""
                    }${hoveredLink === link.to ? " hovered" : ""}`}
                    onClick={() => handleNavLinkClick(link.to)}
                    onMouseEnter={() => setHoveredLink(link.to)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <i className={link.icon + " custom-nav-icon"} />
                    {link.label}
                  </button>
                ))}
              </div>
            )}

            {/* Mobile Toggle Button */}
            {isMobile && (
              <button
                className={`custom-mobile-toggle${navOpen ? " open" : ""}`}
                onClick={handleNavToggle}
                aria-label="Toggle navigation"
                aria-expanded={navOpen}
              >
                <div className="custom-mobile-bar custom-mobile-bar-top" />
                <div className="custom-mobile-bar custom-mobile-bar-mid" />
                <div className="custom-mobile-bar custom-mobile-bar-bot" />
              </button>
            )}
          </nav>

          {/* Mobile Menu */}
          {isMobile && (
            <div className={`custom-mobile-menu${navOpen ? " open" : ""}`}>
              <div className="custom-mobile-menu-inner">
                {navLinks.map((link) => (
                  <button
                    key={link.to}
                    className={`custom-mobile-nav-btn${
                      activeSection === link.to ? " active" : ""
                    }${hoveredLink === link.to ? " hovered" : ""}`}
                    onClick={() => handleNavLinkClick(link.to)}
                    onMouseEnter={() => setHoveredLink(link.to)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <i className={link.icon + " custom-nav-icon"} />
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
