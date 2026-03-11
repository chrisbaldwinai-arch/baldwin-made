import type { Metadata } from "next";
import DarkSection from "@/components/DarkSection";
import PaymentForm from "@/components/PaymentForm";

export const metadata: Metadata = {
  title: "Woodworking — Baldwin Made",
  description:
    "Handtool woodworking by Chris Baldwin — mortise and tenon joinery, hand-cut dovetails, and furniture built to last. Commission a custom piece.",
};

const process = [
  {
    step: "01",
    title: "Design",
    description:
      "We talk through the piece — dimensions, wood species, joinery details, and how it will live in your space. I sketch and refine until it's right.",
  },
  {
    step: "02",
    title: "Build",
    description:
      "Hand tools only. No shortcuts. Each joint is cut by hand, fitted, and refined until it's tight. The wood tells you what it wants to be — you listen.",
  },
  {
    step: "03",
    title: "Deliver",
    description:
      "Finished with oil, wax, or a finish suited to the piece. Delivered ready to use, built to be handed down.",
  },
];

export default function WoodworkingPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <DarkSection glowPosition="40% 50%">
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "var(--space-section) 24px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--color-kelly)",
              margin: "0 0 1rem",
            }}
          >
            Handtool Woodworking
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "var(--text-5xl)",
              color: "var(--color-cloud)",
              lineHeight: 1.1,
              margin: "0 0 1.25rem",
              maxWidth: "20ch",
            }}
          >
            Shaped by hand,
            <br />
            <em>built to last</em>
          </h1>
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
            Mortise and tenon. Hand-cut dovetails. Furniture made the old way —
            with patience, sharp tools, and an understanding that wood has
            character worth respecting.
          </p>
        </div>
      </DarkSection>

      {/* ── The craft ────────────────────────────────────── */}
      <section
        aria-labelledby="craft-heading"
        style={{
          backgroundColor: "var(--color-cloud)",
          padding: "var(--space-section) 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "center",
          }}
          className="craft-grid"
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-kelly)",
                margin: "0 0 0.75rem",
              }}
            >
              The craft
            </p>
            <h2
              id="craft-heading"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "var(--text-4xl)",
                color: "var(--color-deep-pine)",
                lineHeight: 1.15,
                fontStyle: "italic",
                margin: "0 0 2rem",
              }}
            >
              Why hand tools
            </h2>

            {[
              `Power tools are fast. Hand tools are quiet. And in that quiet, you actually hear what the wood is telling you. The grain direction, the resistance on the chisel, the sound of a well-tuned plane — these things give you feedback that a router or table saw can't.`,
              `I came to hand tools through Japanese woodworking and the English tradition — both share a respect for the material that I find missing in a lot of modern furniture. Mortise and tenon joints cut by hand are mechanical puzzles as much as they are structural solutions. Hand-cut dovetails are unforgiving in the best possible way: you can't hide a bad line, so you learn to cut a good one.`,
              `Every piece I build is designed to outlast me. Not because I'm precious about it, but because I think that's the honest standard for furniture. If it's worth the time and the wood, it should be worth building right.`,
            ].map((para, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontSize: "var(--text-base)",
                  color: "var(--color-charcoal)",
                  lineHeight: 1.85,
                  margin: i === 0 ? 0 : "1.25rem 0 0",
                }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Visual: tool card */}
          <div
            style={{
              backgroundColor: "var(--color-deep-pine)",
              borderRadius: "20px",
              padding: "2.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
            aria-hidden="true"
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-kelly)",
                margin: 0,
              }}
            >
              Joinery techniques
            </p>
            {[
              {
                name: "Mortise & Tenon",
                note: "The foundation of furniture — strong, forgiving, timeless.",
              },
              {
                name: "Hand-Cut Dovetails",
                note: "The joint that shows its own work. No hiding bad lines.",
              },
              {
                name: "Drawbored Joints",
                note: "Mechanical clamping through the joint itself — no glue needed.",
              },
              {
                name: "Wedged Through-Tenons",
                note: "A tenon that announces itself. Structural and honest.",
              },
            ].map(({ name, note }) => (
              <div key={name} style={{ display: "flex", gap: "1rem" }}>
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-kelly)",
                    flexShrink: 0,
                    marginTop: "0.45rem",
                  }}
                />
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 700,
                      fontSize: "var(--text-sm)",
                      color: "var(--color-cloud)",
                      margin: 0,
                    }}
                  >
                    {name}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 300,
                      fontSize: "var(--text-xs)",
                      color: "var(--color-stone)",
                      margin: "0.2rem 0 0",
                      lineHeight: 1.5,
                    }}
                  >
                    {note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 767px) {
            .craft-grid {
              grid-template-columns: 1fr !important;
              gap: 2.5rem !important;
            }
          }
        `}</style>
      </section>

      {/* ── Process ──────────────────────────────────────── */}
      <section
        aria-labelledby="process-heading"
        style={{
          backgroundColor: "var(--color-white)",
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
              margin: "0 0 0.75rem",
            }}
          >
            How it works
          </p>
          <h2
            id="process-heading"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "var(--text-3xl)",
              color: "var(--color-deep-pine)",
              margin: "0 0 3rem",
              lineHeight: 1.2,
            }}
          >
            Commission a piece
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {process.map(({ step, title, description }) => (
              <div
                key={step}
                style={{
                  backgroundColor: "var(--color-cloud)",
                  border: "1px solid var(--color-mist)",
                  borderRadius: "20px",
                  padding: "2rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: "var(--text-3xl)",
                    color: "var(--color-meadow)",
                    margin: "0 0 1rem",
                    lineHeight: 1,
                  }}
                >
                  {step}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: "var(--text-base)",
                    color: "var(--color-deep-pine)",
                    margin: "0 0 0.75rem",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 300,
                    fontSize: "var(--text-sm)",
                    color: "var(--color-charcoal)",
                    margin: 0,
                    lineHeight: 1.75,
                  }}
                >
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pay Your Invoice ─────────────────────────────── */}
      <section
        id="pay"
        aria-labelledby="pay-heading"
        style={{
          backgroundColor: "var(--color-cloud)",
          padding: "var(--space-section) 24px",
        }}
      >
        <div
          style={{
            maxWidth: "480px",
            margin: "0 auto",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-kelly)",
              margin: "0 0 0.75rem",
              textAlign: "center",
            }}
          >
            Secure payment
          </p>
          <h2
            id="pay-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "var(--text-4xl)",
              color: "var(--color-deep-pine)",
              fontStyle: "italic",
              lineHeight: 1.15,
              margin: "0 0 0.75rem",
              textAlign: "center",
            }}
          >
            Pay your invoice
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "var(--text-sm)",
              color: "var(--color-charcoal)",
              margin: "0 0 2.5rem",
              lineHeight: 1.75,
              textAlign: "center",
            }}
          >
            Enter the amount from the quote or invoice you received. Payments
            are processed securely by Stripe — your card details never touch
            this server.
          </p>

          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid var(--color-mist)",
              borderRadius: "20px",
              padding: "2.5rem",
              boxShadow: "0 4px 24px rgba(30,58,30,0.06)",
            }}
          >
            <PaymentForm />
          </div>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "var(--text-xs)",
              color: "var(--color-stone)",
              margin: "1.25rem 0 0",
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            Payments secured by{" "}
            <a
              href="https://stripe.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--color-kelly)", textDecoration: "none" }}
            >
              Stripe
            </a>
            . Questions? Reach out before paying.
          </p>
        </div>
      </section>
    </>
  );
}
