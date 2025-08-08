import React from "react";

export function Button({ as: Tag = "button", className = "", ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors " +
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 disabled:opacity-50 disabled:pointer-events-none";
  return <Tag className={`${base} ${className}`} {...props} />;
}
