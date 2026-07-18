"use client";

import { useState } from "react";
import { Check, Trash2, X } from "lucide-react";

export default function DestructiveSubmitButton({
  label,
  confirmation,
  compact = false,
}: {
  label: string;
  confirmation: string;
  compact?: boolean;
}) {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <span className={`admin-inline-confirm ${compact ? "admin-inline-confirm--compact" : ""}`} role="group" aria-label={confirmation}>
        {!compact && <span className="admin-inline-confirm__copy">{confirmation}</span>}
        <button
          type="button"
          className="signal-icon-button"
          aria-label="Cancel deletion"
          title="Cancel"
          onClick={() => setConfirming(false)}
        >
          <X className="h-4 w-4" />
        </button>
        <button
          type="submit"
          className={compact ? "signal-icon-button" : "signal-button signal-button-primary"}
          aria-label={compact ? `Confirm ${label.toLowerCase()}` : undefined}
          title={compact ? "Confirm deletion" : undefined}
        >
          {compact ? <Check className="h-4 w-4" /> : <Trash2 className="h-4 w-4" />}
          {!compact && "Confirm"}
        </button>
      </span>
    );
  }

  return (
    <button
      type="button"
      className={compact ? "signal-icon-button" : "signal-button"}
      aria-label={compact ? label : undefined}
      title={compact ? label : undefined}
      onClick={() => setConfirming(true)}
    >
      <Trash2 className="h-4 w-4" />
      {!compact && label}
    </button>
  );
}
