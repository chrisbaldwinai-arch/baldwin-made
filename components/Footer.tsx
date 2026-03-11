"use client";

import Link from "next/link";
import Image from "next/image";
const navLinks = [
  { href: "/product",     label: "Product" },
  { href: "/photography", label: "Photography" },
  { href: "/woodworking", label: "Woodworking" },
  { href: "/about",       label: "About" },
];

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

const socialLinks = [
  { href: "https://www.linkedin.com/in/chrisbaldwinpm/", label: "LinkedIn", Icon: IconLinkedIn },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--color-deep-pine)",
        position: "relative",
        overflow: "hidden",
      }}
      aria-label="Site footer"
    >
      {/* Radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 80% 50%, rgba(76,175,80,0.07) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "4rem 24px 2rem",
          position: "relative",
        }}
      >
        {/* Top row: logo + nav + social */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "start",
            gap: "2rem",
            marginBottom: "3rem",
          }}
          className="footer-grid"
        >
          {/* Logo */}
          <div>
            <Link href="/" aria-label="Baldwin Made — home">
              <Image
                src="/assets/horizontal-on-dark.svg"
                alt="Baldwin Made"
                width={200}
                height={44}
              />
            </Link>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                fontSize: "var(--text-sm)",
                color: "var(--color-stone)",
                marginTop: "1rem",
                maxWidth: "260px",
                lineHeight: 1.7,
              }}
            >
              Product · Photography · Woodworking
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <ul
              role="list"
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                alignItems: "center",
              }}
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 400,
                      fontSize: "var(--text-sm)",
                      color: "var(--color-stone)",
                      letterSpacing: "0.05em",
                      textDecoration: "none",
                      transition: "color 150ms ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--color-kelly)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--color-stone)")
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <ul
              role="list"
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                gap: "1rem",
              }}
            >
              {socialLinks.map(({ href, label, Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "44px",
                      height: "44px",
                      color: "var(--color-stone)",
                      borderRadius: "50%",
                      transition: "color 150ms ease, background 150ms ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--color-kelly)";
                      e.currentTarget.style.background = "rgba(76,175,80,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--color-stone)";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div
          aria-hidden="true"
          style={{
            borderTop: "1px solid rgba(136,184,138,0.2)",
            marginBottom: "1.5rem",
          }}
        />

        {/* Copyright */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "var(--text-xs)",
            color: "var(--color-stone)",
            opacity: 0.7,
            textAlign: "center",
            margin: "0 0 0.5rem",
          }}
        >
          © {new Date().getFullYear()} Baldwin Made. All rights reserved.
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "var(--text-xs)",
            color: "var(--color-stone)",
            opacity: 0.45,
            textAlign: "center",
            margin: 0,
            fontStyle: "italic",
          }}
        >
          Built from scratch — learning and building with AI, not a template.
        </p>
      </div>

      <style>{`
        @media (max-width: 639px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .footer-grid > div:first-child { align-items: center; display: flex; flex-direction: column; }
          .footer-grid > div:last-child  { justify-content: center !important; }
        }
      `}</style>
    </footer>
  );
}
