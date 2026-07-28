import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#171717",
          padding: "80px 90px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 40, height: 3, background: "#A3A3A3" }} />
          <div
            style={{
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#A3A3A3",
            }}
          >
            Paul Mandele
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: "-0.03em",
            color: "#FAFAFA",
            maxWidth: 980,
          }}
        >
          Venture-Building Strategist &amp; Innovation Advisor
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 400,
            color: "#A3A3A3",
            maxWidth: 880,
          }}
        >
          Building ventures that survive Africa&rsquo;s toughest markets, then teaching the method.
        </div>
      </div>
    ),
    { ...size },
  )
}
