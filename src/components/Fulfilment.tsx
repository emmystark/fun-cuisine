"use client";

import { business } from "@/data/site";

type Props = {
  mode: "pickup" | "delivery";
  area: string;
  onMode: (m: "pickup" | "delivery") => void;
  onArea: (a: string) => void;
  idPrefix: string;
};

export function FulfilmentFields({ mode, area, onMode, onArea, idPrefix }: Props) {
  return (
    <>
      <fieldset>
        <legend className="field-label">Pickup or delivery</legend>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {(["pickup", "delivery"] as const).map((m) => (
            <label key={m} className={`choice ${mode === m ? "choice-on" : ""}`}>
              <input type="radio" name={`${idPrefix}-mode`} value={m} checked={mode === m} onChange={() => onMode(m)} className="sr-only" />
              {m === "pickup" ? "I'll pick up" : "Deliver to me"}
            </label>
          ))}
        </div>
      </fieldset>
      {mode === "delivery" && (
        <div>
          <label htmlFor={`${idPrefix}-area`} className="field-label">Delivery area</label>
          <input
            id={`${idPrefix}-area`}
            className="field"
            required
            value={area}
            onChange={(e) => onArea(e.target.value)}
            placeholder="e.g. Lekki Phase 1"
            list={`${idPrefix}-areas`}
            autoComplete="address-level2"
          />
          <datalist id={`${idPrefix}-areas`}>
            {business.areasServed.map((a) => <option key={a} value={a} />)}
          </datalist>
          <p className="mt-1.5 text-sm text-cocoa/70">{business.deliveryNote}</p>
        </div>
      )}
    </>
  );
}
