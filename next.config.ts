import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const isDev = process.env.NODE_ENV === "development";

const withPWA = withPWAInit({
	dest: "public",
});

const nextConfig: NextConfig = withPWA({
	/* config options here */
	reactStrictMode: true,
	experimental: {
		optimizePackageImports: ["@chakra-ui/react"],
	},
	pwa: {
		dest: "public",
		register: true,
		skipWaiting: true,
		disable: isDev,
		workboxOptions: {
			mode: "development", // disables logs
			// OR you can also use this:
			debug: false,
			disable: true,
		}, // disables service worker in dev
	},
});

export default nextConfig;
