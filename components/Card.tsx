"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface CardProps {
  label: string;
  title: string;
  description: string;
  href: string;
  imageSrc?: string;
  imageAlt?: string;
  /** Hex color for placeholder gradient when no image is provided */
  placeholderColor?: string;
}

export default function Card({
  label,
  title,
  description,
  href,
  imageSrc,
  imageAlt,
  placeholderColor = "#D4ECD5",
}: CardProps) {
  return (
    <Link
      href={href}
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--color-white)",
        border: "1px solid #EDF2ED",
        borderRadius: "20px",
        boxShadow: "0 4px 16px rgba(30,58,30,0.06)",
        overflow: "hidden",
        textDecoration: "none",
        transition: "box-shadow 250ms cubic-bezier(0.16,1,0.3,1), transform 250ms cubic-bezier(0.16,1,0.3,1)",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(30,58,30,0.10)";
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 16px rgba(30,58,30,0.06)";
        e.currentTarget.style.transform = "";
      }}
      aria-label={`${title} — ${label}`}
    >
      {/* Image area */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/9",
          backgroundColor: placeholderColor,
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt ?? title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div
            aria-hidden="true"
            style={{
              width: "100%",
              height: "100%",
              background: `linear-gradient(135deg, ${placeholderColor} 0%, rgba(255,255,255,0.4) 100%)`,
            }}
          />
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
        {/* Label */}
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-kelly)",
          }}
        >
          {label}
        </span>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            fontSize: "var(--text-lg)",
            color: "var(--color-deep-pine)",
            margin: 0,
            lineHeight: 1.25,
          }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "var(--text-sm)",
            color: "var(--color-charcoal)",
            margin: "0.25rem 0 0",
            lineHeight: 1.7,
            flex: 1,
          }}
        >
          {description}
        </p>

        {/* Read more indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            marginTop: "0.75rem",
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: "var(--text-sm)",
            color: "var(--color-kelly)",
            letterSpacing: "0.03em",
          }}
        >
          Explore <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  );
}
