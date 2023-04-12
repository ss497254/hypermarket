const prod = process.env.NODE_ENV === "production";

/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  distDir: "dist",
  reactStrictMode: true,
  trailingSlash: true,

  ...(prod
    ? {
        output: "export",
      }
    : {
        async rewrites() {
          return [
            {
              source: "/api/:path*",
              destination: "http://127.0.0.1:8080/api/:path*", // Proxy to Backend
            },
          ];
        },
      }),
};
