"use client";

import { useState, type FormEvent } from "react";

export default function Home() {
  const [value, setValue] = useState("4");
  const [status, setStatus] =
    useState<"idle" | "loading" | "error">("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const numericValue = Number(value);
    if (Number.isNaN(numericValue)) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch("/py/increment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: numericValue }),
      });

      if (!response.ok) {
        throw new Error("Request failed.");
      }

      const data = (await response.json()) as { result: number };
      setValue(String(data.result));
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  };

  const statusText =
    status === "loading"
      ? "Calling service..."
      : status === "error"
        ? "Request failed."
        : "Ready.";

  return (
    <main className="page">
      <section className="card">
        <h1>Counter</h1>
        <p className="lede">Enter a number and increment it via the API.</p>

        <form className="counter-form" onSubmit={handleSubmit}>
          <input
            type="number"
            inputMode="decimal"
            value={value}
            onChange={(event) => {
              setValue(event.currentTarget.value);
              if (status === "error") {
                setStatus("idle");
              }
            }}
            placeholder="e.g. 42"
            aria-label="Number"
            step="1"
          />
          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Calling service..." : "Increment"}
          </button>
        </form>

        <p className={`status${status === "error" ? " error" : ""}`}>
          {statusText}
        </p>
      </section>
    </main>
  );
}
