import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#FBF4EA" }}>
        <svg width="132" height="132" viewBox="0 0 32 32">
          <g fill="none" stroke="#3A2418" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.6 14.2c3.9-3.1 6.9-7 6.1-9.6-.8-2.5-5.4-1.4-8.6 2.4-2.9 3.5-3.4 6.4-1.6 7.6" />
            <path d="M16.2 13.4c1.6-3.2 3.3-6.6 5.4-8.4" />
            <path d="M15.4 14.8c3-1.4 6.7-3.9 8.5-6.6" />
            <path d="M14.6 15.6 6.3 25.7" />
          </g>
          <circle cx="25" cy="23" r="2.4" fill="#D6452A" />
        </svg>
      </div>
    ),
    size,
  );
}
