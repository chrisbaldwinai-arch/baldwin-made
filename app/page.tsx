import DarkSection from "@/components/DarkSection";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Image from "next/image";

/* ─── Placeholder data ───────────────────────────────────────── */

const disciplines = [
  {
    label: "Product",
    title: "Building products people trust",
    description:
      "Fintech product leadership — from zero-to-one features to scaled platforms. Shipping work that earns confidence at every touchpoint.",
    href: "/product",
    placeholderColor: "#C8DFC8",
  },
  {
    label: "Photography",
    title: "Light, texture, and the quiet moment",
    description:
      "Landscape, portrait, and detail photography. Finding stillness in the frame and letting the subject breathe.",
    href: "/photography",
    placeholderColor: "#B8D4D8",
  },
  {
    label: "Woodworking",
    title: "Shaped by hand, built to last",
    description:
      "Handtool joinery — mortise and tenon, hand-cut dovetails, and the patience to let the wood lead the way.",
    href: "/woodworking",
    placeholderColor: "#D4C4A8",
  },
];


/* ─── Page ───────────────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      {/* ── 1. Hero ──────────────────────────────────────────── */}
      <DarkSection
        style={{ minHeight: "100svh", display: "flex", alignItems: "center" }}
        glowPosition="25% 40%"
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "var(--space-section) 24px",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--color-kelly)",
              margin: 0,
            }}
          >
            Product · Photography · Woodworking
          </p>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "var(--text-5xl)",
              color: "var(--color-cloud)",
              lineHeight: 1.1,
              margin: 0,
              maxWidth: "18ch",
            }}
          >
            Made by hand.
            <br />
            <em>Driven by craft.</em>
          </h1>

          {/* Subheading */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "var(--text-lg)",
              color: "var(--color-stone)",
              margin: 0,
              maxWidth: "52ch",
              lineHeight: 1.75,
            }}
          >
            A product manager in fintech who finds the same satisfaction in
            shipping a clean user flow as in cutting a perfect dovetail. Baldwin
            Made is where product, photography, and woodworking come together —
            intentional, considered, and built to last.
          </p>

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Button href="#disciplines" variant="primary">
              See the work
            </Button>
            <Button href="/about" variant="secondary">
              About me
            </Button>
          </div>
        </div>
      </DarkSection>

      {/* ── 2. Disciplines Strip ──────────────────────────────── */}
      <section
        id="disciplines"
        aria-labelledby="disciplines-heading"
        style={{
          backgroundColor: "var(--color-cloud)",
          padding: "var(--space-section) 24px",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-kelly)",
              marginBottom: "0.75rem",
            }}
          >
            What I do
          </p>
          <h2
            id="disciplines-heading"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "var(--text-3xl)",
              color: "var(--color-deep-pine)",
              margin: "0 0 3rem",
              lineHeight: 1.2,
            }}
          >
            Three disciplines, one perspective
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {disciplines.map((d) => (
              <Card key={d.href} {...d} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. About Teaser ───────────────────────────────────── */}
      <DarkSection glowPosition="70% 50%">
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "var(--space-section) 24px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
          className="about-grid"
        >
          {/* Text column */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-kelly)",
                marginBottom: "0.75rem",
              }}
            >
              The maker
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "var(--text-4xl)",
                color: "var(--color-cloud)",
                lineHeight: 1.15,
                margin: "0 0 1.5rem",
              }}
            >
              Precision in every medium
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                fontSize: "var(--text-base)",
                color: "var(--color-stone)",
                lineHeight: 1.8,
                margin: "0 0 2rem",
                maxWidth: "48ch",
              }}
            >
              Photography taught me to see. Woodworking taught me patience.
              Product taught me that both matter when you&apos;re building
              something people trust. Baldwin Made is where all three converge.
            </p>
            <Button href="/about" variant="secondary">
              Learn more about me
            </Button>
          </div>

          {/* Portrait placeholder */}
          <div
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              aspectRatio: "4/5",
              backgroundColor: "rgba(136,184,138,0.12)",
              border: "1px solid rgba(136,184,138,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-hidden="true"
          >
            <Image
              src="/assets/icon-on-dark.svg"
              alt=""
              width={80}
              height={80}
              style={{ opacity: 0.25 }}
            />
          </div>
        </div>
      </DarkSection>

      <style>{`
        @media (max-width: 767px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .about-grid > div:last-child {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
