"use client";

import { useState } from "react";

export type FormField = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "date" | "number" | "select" | "textarea";
  required?: boolean;
  options?: string[];
  placeholder?: string;
};

export default function InquiryForm({
  fields,
  recipient,
  subjectPrefix,
  submitLabel = "Odeslat poptávku",
}: {
  fields: FormField[];
  recipient: string;
  subjectPrefix: string;
  submitLabel?: string;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient,
          subject: subjectPrefix,
          fields: fields.map((f) => ({
            name: f.name,
            label: f.label,
            value: values[f.name] || "",
          })),
        }),
      });

      if (!res.ok) throw new Error("send failed");

      setStatus("sent");
      setValues({});
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {fields.map((field) => (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className="block text-sm mb-1.5 text-[var(--spruce-900)]"
          >
            {field.label}
            {field.required && (
              <span className="text-[var(--amber-500)]"> *</span>
            )}
          </label>

          {field.type === "select" ? (
            <select
              id={field.name}
              required={field.required}
              value={values[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="w-full rounded-sm border border-[var(--granite-300)] bg-white px-3 py-2.5 text-[var(--spruce-950)] focus:outline-none focus:border-[var(--amber-500)]"
            >
              <option value="" disabled>
                Vyberte…
              </option>
              {field.options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : field.type === "textarea" ? (
            <textarea
              id={field.name}
              required={field.required}
              placeholder={field.placeholder}
              rows={4}
              value={values[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="w-full rounded-sm border border-[var(--granite-300)] bg-white px-3 py-2.5 text-[var(--spruce-950)] focus:outline-none focus:border-[var(--amber-500)]"
            />
          ) : (
            <input
              id={field.name}
              type={field.type}
              required={field.required}
              placeholder={field.placeholder}
              value={values[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="w-full rounded-sm border border-[var(--granite-300)] bg-white px-3 py-2.5 text-[var(--spruce-950)] focus:outline-none focus:border-[var(--amber-500)]"
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn btn-primary btn-md w-full sm:w-auto justify-center disabled:opacity-60"
      >
        {status === "sending" ? "Odesílám…" : submitLabel}
        <span aria-hidden="true" className="arrow">→</span>
      </button>

      {status === "sent" && (
        <p className="text-sm text-[var(--granite-600)]">
          Děkujeme, poptávka byla odeslána. Ozveme se vám co nejdřív.
        </p>
      )}

      {status === "error" && (
        <p className="text-sm text-red-700">
          Poptávku se nepodařilo odeslat. Napište nám prosím přímo na{" "}
          <a
            href={`mailto:${recipient}`}
            className="text-[var(--amber-500)] underline"
          >
            {recipient}
          </a>
          .
        </p>
      )}
    </form>
  );
}
