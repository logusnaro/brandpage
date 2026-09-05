"use client";

import { useState } from "react";

export function ShareButton({ releaseId }: { releaseId: string }) {
  const [label, setLabel] = useState("링크 복사");
  async function createLink() {
    const response = await fetch(`/api/manage/releases/${encodeURIComponent(releaseId)}/share`, { method: "POST" });
    const result = await response.json();
    if (!response.ok) { setLabel(result.error || "실패"); return; }
    await navigator.clipboard.writeText(result.url);
    setLabel("7일 링크 복사됨");
  }
  return <button className="manage-text-button" type="button" onClick={createLink}>{label}</button>;
}
