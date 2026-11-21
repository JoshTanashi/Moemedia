"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { services, timings } from "@/data/services";
import { contact, whatsappLink } from "@/data/contact";

const NOT_SURE = "not-sure";
const STEPS = 4;

export function ServiceFinder() {
  const params = useSearchParams();
  const preset = services.some((s) => s.id === params.get("s")) ? params.get("s") : null;

  const [serviceId, setServiceId] = useState<string | null>(preset);
  const [step, setStep] = useState(preset ? 1 : 0);
  const [option, setOption] = useState<string | null>(null);
  const [timing, setTiming] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  useEffect(() => {
    if (serviceId !== "moe") return;
    const root = document.documentElement;
    root.dataset.theme = "moe";
    return () => {
      delete root.dataset.theme;
    };
  }, [serviceId]);

  const service = services.find((s) => s.id === serviceId);
  const serviceLabel = service
    ? `${service.name}${option ? ` (${option})` : ""}`
    : "Not sure yet";

  const brief = [
    "Hi MOE Media",
    `Service: ${serviceLabel}`,
    timing && `Timing: ${timing}`,
    name.trim() && `Name: ${name.trim()}`,
    business.trim() && `Business: ${business.trim()}`,
  ]
    .filter(Boolean)
    .join("\n");

  const pickService = (id: string) => {
    setServiceId(id);
    setOption(null);
    setStep(id === NOT_SURE ? 2 : 1);
  };

  const back = () => {
    if (step === 2 && serviceId === NOT_SURE) setStep(0);
    else setStep((s) => Math.max(0, s - 1));
  };

  return (
    <div className="finder">
      <div className="finder-top">
        {step > 0 ? (
          <button type="button" className="finder-back" onClick={back}>
            ‹ Back
          </button>
        ) : (
          <span />
        )}
        <ol className="finder-dots" aria-label={`Step ${Math.min(step + 1, STEPS)} of ${STEPS}`}>
          {Array.from({ length: STEPS }, (_, i) => (
            <li key={i} className={i <= step ? "is-on" : ""} />
          ))}
        </ol>
      </div>

      <div className="finder-step" key={step}>
        {step === 0 && (
          <>
            <h1 className="finder-q">What do you need?</h1>
            <div className="finder-options">
              {services.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`finder-option${serviceId === s.id ? " is-picked" : ""}`}
                  onClick={() => pickService(s.id)}
                >
                  {s.name}
                </button>
              ))}
              <button
                type="button"
                className={`finder-option finder-option--quiet${serviceId === NOT_SURE ? " is-picked" : ""}`}
                onClick={() => pickService(NOT_SURE)}
              >
                Not sure yet
              </button>
            </div>
          </>
        )}

        {step === 1 && service && (
          <>
            <p className="finder-kicker">{service.name}</p>
            <h1 className="finder-q">Which fits best?</h1>
            <div className="finder-options">
              {service.options.map((o) => (
                <button
                  key={o}
                  type="button"
                  className={`finder-option${option === o ? " is-picked" : ""}`}
                  onClick={() => {
                    setOption(o);
                    setStep(2);
                  }}
                >
                  {o}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="finder-q">When?</h1>
            <div className="finder-options">
              {timings.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`finder-option${timing === t ? " is-picked" : ""}`}
                  onClick={() => {
                    setTiming(t);
                    setStep(3);
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h1 className="finder-q">Who&apos;s asking?</h1>
            <p className="finder-hint">Optional.</p>
            <form
              className="finder-form"
              onSubmit={(e) => {
                e.preventDefault();
                setStep(4);
              }}
            >
              <label className="finder-field">
                <span>Your name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  maxLength={60}
                />
              </label>
              <label className="finder-field">
                <span>Business</span>
                <input
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                  autoComplete="organization"
                  maxLength={80}
                />
              </label>
              <button type="submit" className="pill pill--primary pill--block">
                Continue
              </button>
            </form>
          </>
        )}

        {step === 4 && (
          <>
            <h1 className="finder-q">You&apos;re set.</h1>
            <dl className="finder-summary">
              <div>
                <dt>Service</dt>
                <dd>{serviceLabel}</dd>
              </div>
              <div>
                <dt>When</dt>
                <dd>{timing}</dd>
              </div>
              {(name.trim() || business.trim()) && (
                <div>
                  <dt>From</dt>
                  <dd>{[name.trim(), business.trim()].filter(Boolean).join(", ")}</dd>
                </div>
              )}
            </dl>
            <a
              href={whatsappLink(brief)}
              target="_blank"
              rel="noreferrer noopener"
              className="pill pill--primary pill--block"
              data-finder-send
            >
              Send on WhatsApp
            </a>
            <a href={`mailto:${contact.email}?body=${encodeURIComponent(brief)}`} className="finder-alt">
              Or email {contact.email}
            </a>
          </>
        )}
      </div>
    </div>
  );
}
