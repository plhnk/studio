/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://cdn.usefathom.com https://app.cal.com",
  "style-src 'self' 'unsafe-inline' https://app.cal.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://cdn.usefathom.com https://app.cal.com https://api.cal.com",
  "frame-src 'self' https://app.cal.com https://cal.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

function getSecurityHeaders() {
  const headers = [
    {
      key: "X-DNS-Prefetch-Control",
      value: "on",
    },
    {
      key: "X-Frame-Options",
      value: "SAMEORIGIN",
    },
    {
      key: "X-Content-Type-Options",
      value: "nosniff",
    },
    {
      key: "Referrer-Policy",
      value: "strict-origin-when-cross-origin",
    },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=()",
    },
  ];

  // CSP and HSTS are production-only — dev needs unsafe-eval for React/Turbopack
  if (isProd) {
    headers.push(
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      {
        key: "Content-Security-Policy",
        value: contentSecurityPolicy,
      }
    );
  }

  return headers;
}

const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: getSecurityHeaders(),
      },
    ];
  },
};

export default nextConfig;
