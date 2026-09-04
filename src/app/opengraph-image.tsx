import { ImageResponse } from "next/og";
import { fetchPageData } from "@/sanity/lib/fetchPageData";

export const alt = "logUs Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const { settings } = await fetchPageData();

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: "#f8f2e9",
        color: "#24211e",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", fontSize: 28, fontWeight: 700, letterSpacing: "-1px" }}>
          logUs Studio<span style={{ color: "#ed7456" }}>:</span>
        </div>
        <div style={{ display: "flex", color: "#ed7456", fontSize: 34, fontWeight: 700 }}>[:]</div>
      </div>
      <div style={{ display: "flex", maxWidth: 900, whiteSpace: "pre-wrap", fontSize: 72, fontWeight: 650, letterSpacing: "-4px", lineHeight: 1.08 }}>
        {settings.daily.title.ko}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14, color: "#6b625b", fontSize: 20 }}>
        <span style={{ display: "flex", width: 9, height: 9, borderRadius: 999, background: "#ed7456" }} />
        logusstudio.com
      </div>
    </div>,
    size,
  );
}
