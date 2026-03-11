"use client";

import Link from "next/link";
import { CSSProperties, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "dark";

interface ButtonProps {
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
}

const styles: Record<Variant, CSSProperties> = {
  primary: {
    backgroundColor: "var(--color-kelly)",
    color: "#ffffff",
    border: "none",
  },
  secondary: {
    backgroundColor: "transparent",
    color: "var(--color-kelly)",
    border: "1.5px solid var(--color-kelly)",
  },
  ghost: {
    backgroundColor: "transparent",
    color: "var(--color-deep-pine)",
    border: "none",
  },
  dark: {
    backgroundColor: "var(--color-deep-pine)",
    color: "var(--color-cloud)",
    border: "none",
  },
};

const hoverStyles: Record<Variant, CSSProperties> = {
  primary: {
    backgroundColor: "var(--color-spring)",
    boxShadow: "0 4px 16px rgba(76,175,80,0.3)",
  },
  secondary: {
    backgroundColor: "var(--color-meadow)",
    borderColor: "var(--color-spring)",
  },
  ghost: {
    color: "var(--color-kelly)",
  },
  dark: {
    backgroundColor: "var(--color-charcoal)",
    boxShadow: "0 4px 16px rgba(30,58,30,0.2)",
  },
};

const baseStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.5rem",
  padding: "12px 32px",
  borderRadius: "9999px",
  fontFamily: "var(--font-body)",
  fontWeight: 500,
  fontSize: "var(--text-sm)",
  letterSpacing: "0.05em",
  textDecoration: "none",
  cursor: "pointer",
  transition: "background-color 250ms cubic-bezier(0.16,1,0.3,1), color 250ms cubic-bezier(0.16,1,0.3,1), box-shadow 250ms cubic-bezier(0.16,1,0.3,1), transform 250ms cubic-bezier(0.16,1,0.3,1), border-color 250ms cubic-bezier(0.16,1,0.3,1)",
  whiteSpace: "nowrap",
};

export default function Button({
  variant = "primary",
  href,
  onClick,
  children,
  type = "button",
  ariaLabel,
}: ButtonProps) {
  const combined: CSSProperties = { ...baseStyle, ...styles[variant] };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    Object.assign(e.currentTarget.style, hoverStyles[variant]);
    e.currentTarget.style.transform = "translateY(-1px)";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const reset = styles[variant];
    e.currentTarget.style.backgroundColor = reset.backgroundColor as string ?? "";
    e.currentTarget.style.color = reset.color as string ?? "";
    e.currentTarget.style.boxShadow = "";
    e.currentTarget.style.borderColor = (reset.border as string ?? "").split(" ").pop() ?? "";
    e.currentTarget.style.transform = "";
  };

  if (href) {
    return (
      <Link
        href={href}
        aria-label={ariaLabel}
        style={combined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      onClick={onClick}
      style={combined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}
