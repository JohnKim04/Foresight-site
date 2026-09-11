import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = "Foresight: Notice what your choices change.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#f8f6f0",
          color: "#1c211d",
          display: "flex",
          height: "100%",
          padding: "70px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "57%",
          }}
        >
          <div style={{ alignItems: "center", display: "flex", fontFamily: "Georgia, serif", fontSize: 42, gap: 16 }}>
            <div style={{ alignItems: "center", background: "#dbe4d6", border: "3px solid #586a8f", borderRadius: 8, display: "flex", height: 28, justifyContent: "center", transform: "rotate(45deg)", width: 28 }}>
              <div style={{ background: "#586a8f", borderRadius: 999, height: 10, width: 10 }} />
            </div>
            {siteConfig.name}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ color: "#586a8f", fontFamily: "Arial, sans-serif", fontSize: 22, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" }}>
              A consequence journal
            </div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 68, letterSpacing: -3, lineHeight: 1.02, marginTop: 22 }}>
              Notice what your choices change.
            </div>
          </div>
          <div style={{ color: "#61685f", display: "flex", fontFamily: "Arial, sans-serif", fontSize: 22, lineHeight: 1.4, maxWidth: 560 }}>
            Write it down. Look back later.
          </div>
        </div>

        <div
          style={{
            background: "#fffdf8",
            border: "2px solid #d9d9cf",
            borderRadius: 28,
            display: "flex",
            flexDirection: "column",
            marginLeft: 45,
            padding: 34,
            transform: "rotate(3deg)",
            width: "43%",
          }}
        >
          <div style={{ color: "#61685f", display: "flex", fontFamily: "Arial, sans-serif", fontSize: 17, fontWeight: 600, justifyContent: "space-between", letterSpacing: 1.3 }}>
            <span>JOURNAL EXAMPLE</span>
            <span style={{ background: "#dbe4d6", borderRadius: 999, color: "#1c211d", padding: "6px 12px" }}>7 OF 9</span>
          </div>
          <div style={{ background: "#1c211d", borderRadius: 999, display: "flex", height: 13, marginTop: 50, width: "72%" }} />
          <div style={{ background: "#d9d9cf", borderRadius: 999, display: "flex", height: 13, marginTop: 16, width: "100%" }} />
          <div style={{ background: "#d9d9cf", borderRadius: 999, display: "flex", height: 13, marginTop: 16, width: "58%" }} />
          <div style={{ alignItems: "flex-end", background: "#f8f6f0", border: "2px solid #d9d9cf", borderRadius: 18, display: "flex", gap: 14, height: 185, marginTop: 48, padding: 28 }}>
            <div style={{ background: "#9aac96", borderRadius: "5px 5px 0 0", display: "flex", height: 58, width: 18 }} />
            <div style={{ background: "#9aac96", borderRadius: "5px 5px 0 0", display: "flex", height: 83, width: 18 }} />
            <div style={{ background: "#586a8f", borderRadius: "5px 5px 0 0", display: "flex", height: 120, width: 18 }} />
            <div style={{ background: "#9aac96", borderRadius: "5px 5px 0 0", display: "flex", height: 94, width: 18 }} />
            <div style={{ background: "#586a8f", borderRadius: "5px 5px 0 0", display: "flex", height: 138, width: 18 }} />
          </div>
        </div>
      </div>
    ),
    size,
  );
}
