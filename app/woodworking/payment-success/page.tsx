import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Payment Received — Baldwin Made",
};

export default function PaymentSuccessPage() {
  return (
    <section
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-section) 24px",
        backgroundColor: "var(--color-cloud)",
      }}
    >
      <div style={{ maxWidth: "480px", textAlign: "center" }}>
        {/* Checkmark */}
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: "var(--color-meadow)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 2rem",
          }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1E3A1E"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "var(--text-4xl)",
            color: "var(--color-deep-pine)",
            fontStyle: "italic",
            lineHeight: 1.15,
            margin: "0 0 1rem",
          }}
        >
          Payment received
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "var(--text-base)",
            color: "var(--color-charcoal)",
            lineHeight: 1.75,
            margin: "0 0 2.5rem",
          }}
        >
          Thank you — your payment has been processed successfully. You&apos;ll
          receive a confirmation email from Stripe shortly.
        </p>

        <Link
          href="/woodworking"
          style={{
            display: "inline-block",
            padding: "12px 32px",
            borderRadius: "9999px",
            border: "1.5px solid var(--color-deep-pine)",
            backgroundColor: "transparent",
            color: "var(--color-deep-pine)",
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: "var(--text-base)",
            letterSpacing: "0.05em",
            textDecoration: "none",
            transition: "background 200ms ease, color 200ms ease",
          }}
        >
          ← Return to Baldwin Made
        </Link>
      </div>
    </section>
  );
}
