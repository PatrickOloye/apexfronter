import type { NextConfig } from "next";
import type { RuntimeCaching } from "workbox-build";
import { runtimeCaching } from "@ducanh2912/next-pwa";

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  register: true,
  skipWaiting: true,
  dynamicStartUrl: true,
  extendDefaultRuntimeCaching: true,
  disable: false,
  workboxOptions: {
    importScripts: ["/custom-sw.js"],
    disableDevLogs: true,
    runtimeCaching: [
      {
        urlPattern: ({ url, sameOrigin }) =>
          sameOrigin &&
          (url.pathname.startsWith('/signin') ||
            url.pathname.startsWith('/signup') ||
            url.pathname.startsWith('/forgot-password') ||
            url.pathname.startsWith('/reset-password') ||
            url.pathname.startsWith('/dashboard') ||
            url.pathname.startsWith('/admin') ||
            url.pathname.startsWith('/system-admin')),
        handler: 'NetworkOnly',
        method: 'GET',
        options: {
          cacheName: 'never-cache-authenticated-pages',
        },
      },
      {
        urlPattern: ({ request, sameOrigin }) =>
          request.destination === '' && !sameOrigin,
        handler: 'NetworkOnly',
        method: 'GET',
        options: {
          cacheName: 'never-cache-backend-api',
        },
      },
      ...runtimeCaching,
    ] satisfies RuntimeCaching[],
  },
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
    ],
  },
};

export default withPWA(nextConfig);
