"use client";

import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState("4");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setResult(null);

    const numericValue = Number(value);
    if (Number.isNaN(numericValue)) {
      setError("Enter a valid number to increment.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/py/increment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: numericValue }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Request failed.");
      }

      const data = await response.json();
      setResult(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="page">
      <section className="card">
        <div className="badge">Next.js + FastAPI</div>
        <h1>Counter Service</h1>
        <p className="lede">
          Send a number to the backend service and get <span>N + 1</span> in
          return.
        </p>

        <form className="counter-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Number to increment</span>
            <input
              type="number"
              inputMode="decimal"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="e.g. 42"
              step="1"
            />
          </label>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Calling service..." : "Increment"}
          </button>
        </form>

        <div className="result" aria-live="polite">
          {error ? (
            <p className="error">{error}</p>
          ) : result !== null ? (
            <div>
              <p className="result-label">Response</p>
              <p className="result-value">{result}</p>
            </div>
          ) : (
            <p className="muted">Waiting for your first request.</p>
          )}
        </div>
      </section>

      <aside className="stack">
        <div className="tile">
          <p className="tile-title">Service routing</p>
          <p className="tile-body">Frontend: /</p>
          <p className="tile-body">Backend: /api/py/increment</p>
        </div>
        <div className="tile accent">
          <p className="tile-title">Payload</p>
          <pre>{`{\n  "value": ${value || 0}\n}`}</pre>
        </div>
        <div className="tile">
          <p className="tile-title">Response shape</p>
          <pre>{`{\n  "result": N + 1\n}`}</pre>
        </div>
      </aside>
    </main>
  );
}
