"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const stripeAppearance = {
  theme: "stripe" as const,
  variables: {
    colorPrimary: "#4CAF50",
    colorBackground: "#ffffff",
    colorText: "#2C3E2C",
    colorDanger: "#c0392b",
    borderRadius: "12px",
    fontFamily: "Raleway, sans-serif",
    spacingUnit: "5px",
  },
  rules: {
    ".Input": {
      border: "1.5px solid #C8DFC8",
      boxShadow: "none",
    },
    ".Input:focus": {
      border: "1.5px solid #4CAF50",
      boxShadow: "0 0 0 3px rgba(76,175,80,0.15)",
    },
    ".Label": {
      fontWeight: "500",
      fontSize: "0.75rem",
      letterSpacing: "0.05em",
    },
  },
};

/* ─── Inner checkout form (must be inside <Elements>) ─── */

function CheckoutForm({ amount, invoiceNumber }: { amount: number; invoiceNumber: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setStatus("processing");
    setErrorMessage("");

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message ?? "Payment failed. Please try again.");
      setStatus("error");
    } else {
      setStatus("success");
    }
  };

  if (status === "success") {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "3rem 2rem",
        }}
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            backgroundColor: "var(--color-meadow)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
          }}
        >
          <svg
            width="28"
            height="28"
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
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "var(--text-2xl)",
            color: "var(--color-deep-pine)",
            fontStyle: "italic",
            margin: "0 0 0.75rem",
          }}
        >
          Payment received
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "var(--text-base)",
            color: "var(--color-charcoal)",
            margin: 0,
          }}
        >
          Thank you — ${amount.toFixed(2)} has been processed
          {invoiceNumber ? ` for invoice ${invoiceNumber}` : ""}.
          You&apos;ll receive a confirmation email from Stripe.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Amount confirmation */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "var(--color-cloud)",
          border: "1px solid var(--color-mist)",
          borderRadius: "12px",
          padding: "1rem 1.25rem",
          marginBottom: "1.5rem",
        }}
      >
        <div>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: "var(--text-sm)",
              color: "var(--color-charcoal)",
              display: "block",
            }}
          >
            Invoice amount
          </span>
          {invoiceNumber && (
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                fontSize: "var(--text-xs)",
                color: "var(--color-stone)",
                display: "block",
                marginTop: "0.15rem",
              }}
            >
              Invoice #{invoiceNumber}
            </span>
          )}
        </div>
        <span
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            fontSize: "var(--text-xl)",
            color: "var(--color-deep-pine)",
          }}
        >
          ${amount.toFixed(2)}
        </span>
      </div>

      <PaymentElement />

      {errorMessage && (
        <p
          role="alert"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: "var(--text-sm)",
            color: "#c0392b",
            margin: "1rem 0 0",
          }}
        >
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={!stripe || status === "processing"}
        style={{
          marginTop: "1.5rem",
          width: "100%",
          padding: "14px 32px",
          borderRadius: "9999px",
          border: "none",
          backgroundColor:
            status === "processing"
              ? "var(--color-stone)"
              : "var(--color-kelly)",
          color: "#ffffff",
          fontFamily: "var(--font-body)",
          fontWeight: 500,
          fontSize: "var(--text-base)",
          letterSpacing: "0.05em",
          cursor: status === "processing" ? "not-allowed" : "pointer",
          transition: "background 200ms ease, transform 200ms ease",
        }}
        onMouseEnter={(e) => {
          if (status !== "processing")
            (e.currentTarget as HTMLButtonElement).style.transform =
              "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "";
        }}
      >
        {status === "processing"
          ? "Processing…"
          : `Pay $${amount.toFixed(2)}`}
      </button>
    </form>
  );
}

/* ─── Outer component: amount entry ─────────────────────── */

export default function PaymentForm() {
  const [amountInput, setAmountInput] = useState("");
  const [invoiceInput, setInvoiceInput] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [amountError, setAmountError] = useState("");

  const handleAmountSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAmountError("");

    const parsed = parseFloat(amountInput);
    if (isNaN(parsed) || parsed < 1) {
      setAmountError("Please enter an amount of at least $1.00");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: parsed, invoiceNumber: invoiceInput.trim() }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setAmount(parsed);
      setInvoiceNumber(invoiceInput.trim());
      setClientSecret(data.clientSecret);
    } catch {
      setAmountError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (clientSecret && amount !== null) {
    return (
      <Elements
        stripe={stripePromise}
        options={{ clientSecret, appearance: stripeAppearance }}
      >
        <CheckoutForm amount={amount} invoiceNumber={invoiceNumber} />
      </Elements>
    );
  }

  return (
    <form onSubmit={handleAmountSubmit}>
      <div style={{ marginBottom: "1.25rem" }}>
        <label
          htmlFor="invoice-number"
          style={{
            display: "block",
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color-charcoal)",
            marginBottom: "0.5rem",
          }}
        >
          Invoice Number{" "}
          <span
            style={{ fontWeight: 300, textTransform: "none", letterSpacing: 0 }}
          >
            (optional)
          </span>
        </label>
        <input
          id="invoice-number"
          type="text"
          placeholder="e.g. INV-2024-001"
          value={invoiceInput}
          onChange={(e) => setInvoiceInput(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 1rem",
            borderRadius: "12px",
            border: "1.5px solid var(--color-mist)",
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: "var(--text-base)",
            color: "var(--color-deep-pine)",
            backgroundColor: "#ffffff",
            outline: "none",
            boxSizing: "border-box",
          }}
          onFocus={(e) => {
            e.currentTarget.style.border = "1.5px solid var(--color-kelly)";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(76,175,80,0.15)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.border = "1.5px solid var(--color-mist)";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "var(--text-xs)",
            color: "var(--color-stone)",
            margin: "0.5rem 0 0",
          }}
        >
          Found on your quote or invoice — helps match your payment on our end.
        </p>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label
          htmlFor="invoice-amount"
          style={{
            display: "block",
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color-charcoal)",
            marginBottom: "0.5rem",
          }}
        >
          Invoice Amount
        </label>
        <div style={{ position: "relative" }}>
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "var(--text-lg)",
              color: "var(--color-stone)",
              pointerEvents: "none",
            }}
          >
            $
          </span>
          <input
            id="invoice-amount"
            type="number"
            min="1"
            step="0.01"
            placeholder="0.00"
            value={amountInput}
            onChange={(e) => setAmountInput(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "14px 1rem 14px 2.25rem",
              borderRadius: "12px",
              border: amountError
                ? "1.5px solid #c0392b"
                : "1.5px solid var(--color-mist)",
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "var(--text-xl)",
              color: "var(--color-deep-pine)",
              backgroundColor: "#ffffff",
              outline: "none",
              boxSizing: "border-box",
            }}
            onFocus={(e) => {
              e.currentTarget.style.border = "1.5px solid var(--color-kelly)";
              e.currentTarget.style.boxShadow =
                "0 0 0 3px rgba(76,175,80,0.15)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.border = amountError
                ? "1.5px solid #c0392b"
                : "1.5px solid var(--color-mist)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>
        {amountError && (
          <p
            role="alert"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: "var(--text-xs)",
              color: "#c0392b",
              margin: "0.4rem 0 0",
            }}
          >
            {amountError}
          </p>
        )}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "var(--text-xs)",
            color: "var(--color-stone)",
            margin: "0.5rem 0 0",
          }}
        >
          Enter the amount from your invoice or quote.
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          padding: "14px 32px",
          borderRadius: "9999px",
          border: "none",
          backgroundColor: loading
            ? "var(--color-stone)"
            : "var(--color-kelly)",
          color: "#ffffff",
          fontFamily: "var(--font-body)",
          fontWeight: 500,
          fontSize: "var(--text-base)",
          letterSpacing: "0.05em",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "background 200ms ease, transform 200ms ease",
          marginTop: "0.5rem",
        }}
        onMouseEnter={(e) => {
          if (!loading)
            (e.currentTarget as HTMLButtonElement).style.transform =
              "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "";
        }}
      >
        {loading ? "Loading…" : "Continue to Payment →"}
      </button>
    </form>
  );
}
