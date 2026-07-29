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

/**
 * DOČASNÉ ŘEŠENÍ: formulář nesestavuje žádný backend request, jen po
 * odeslání otevře e-mailového klienta s předvyplněnou zprávou (mailto:).
 * Funguje to bez serveru, ale není to spolehlivé sledování poptávek
 * (záleží na tom, že má návštěvník nastavený e-mailový klient v prohlížeči).
 *
 * Až budete mít e-mail/CRM řešení, nahraďte handleSubmit voláním na server
 * action nebo WP REST endpoint, který pošle e-mail / uloží poptávku.
 */
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
  const [sent, setSent] = useState(false);

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const body = fields
      .map((f) => `${f.label}: ${values[f.name] || "—"}`)
      .join("\n");

    const mailto = `mailto:${recipient}?subject=${encodeURIComponent(
      subjectPrefix
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setSent(true);
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

      <button type="submit" className="btn btn-primary btn-md w-full sm:w-auto justify-center">
        {submitLabel}
        <span aria-hidden="true" className="arrow">→</span>
      </button>

      {sent && (
        <p className="text-sm text-[var(--granite-600)]">
          Otevřel se váš e-mailový klient s předvyplněnou zprávou — jen ji
          odešlete. Pokud se nic neotevřelo, napište nám rovnou na{" "}
          <a href={`mailto:${recipient}`} className="text-[var(--amber-500)] underline">
            {recipient}
          </a>.
        </p>
      )}
    </form>
  );
}
