"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

type IncrementResponse = {
  result: number;
};

type Status = "idle" | "loading" | "error";

export default function Home() {
  const [value, setValue] = useState("4");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("Ready.");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const numericValue = Number(value);
    if (Number.isNaN(numericValue)) {
      setStatus("error");
      setMessage("Enter a valid number to increment.");
      return;
    }

    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch("/py/increment", {
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

      const data: IncrementResponse = await response.json();
      setValue(String(data.result));
      setStatus("idle");
      setMessage(`Result: ${data.result}`);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <main className="page">
      <section className="card">
        <p className="eyebrow">Next.js + FastAPI</p>
        <h1>Counter</h1>
        <p className="lede">
          Enter a number, then the API response becomes the next value.
        </p>

        <form className="counter-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Number</span>
            <input
              type="number"
              inputMode="decimal"
              value={value}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setValue(event.target.value)
              }
              placeholder="e.g. 42"
              step="1"
            />
          </label>
          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Calling service..." : "Increment"}
          </button>
        </form>

        <p
          className={`status${status === "error" ? " error" : ""}`}
          aria-live="polite"
        >
          {status === "loading" ? "Calling service..." : message || "Ready."}
        </p>
      </section>
    </main>
  );
}
