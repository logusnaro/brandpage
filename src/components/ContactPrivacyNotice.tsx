import { contactPrivacyNotice } from "@/lib/contactPrivacy";

export function ContactPrivacyNotice({ locale }: { locale: "ko" | "en" }) {
  const copy = contactPrivacyNotice[locale];
  return <details id="contact-privacy-notice" style={{ fontSize: 12, lineHeight: 1.7, color: "inherit", minWidth: 0 }}>
    <summary style={{ cursor: "pointer" }}>{copy.title}</summary>
    <div style={{ padding: "8px 0", overflowWrap: "anywhere" }}>
      {[copy.purpose, copy.items, copy.retention, copy.refusal, copy.sensitive].map(text => <p key={text} style={{ margin: "4px 0", fontSize: "inherit" }}>{text}</p>)}
      <p style={{ margin: "8px 0 4px", fontSize: "inherit" }}><strong>{copy.overseasTitle}</strong></p>
      <p style={{ margin: "4px 0", fontSize: "inherit" }}>{copy.overseas}</p>
      <a href={`/legal/studio/privacy?lang=${locale}`} style={{ textDecoration: "underline" }}>{copy.policy}</a>
    </div>
  </details>;
}
