import { ReactNode, CSSProperties } from "react";

interface DarkSectionProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  glowPosition?: string; // e.g. "30% 50%"
}

export default function DarkSection({
  children,
  style,
  glowPosition = "30% 50%",
}: DarkSectionProps) {
  return (
    <section
      style={{
        backgroundColor: "var(--color-deep-pine)",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Radial green glow overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at ${glowPosition}, rgba(76,175,80,0.08) 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative" }}>{children}</div>
    </section>
  );
}
