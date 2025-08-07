import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en" suppressHydrationWarning>
			<Head>
				{/* open graph */}
				<meta property="og:type" content="website" />
				<meta property="og:site_name" content="e-Market" />
				<meta property="og:title" content="e-Market - Shop for free" key="title" />
				<meta
					property="og:description"
					content="e-Market is an E-commerce PWA(Progressive Web App) built with Next.js, ChakraUI and Paystack Payment Gateway"
				/>
				<meta property="og:url" content="https://e-commerce-tan-pi.vercel.app/" />
				<meta property="og:author" name="Afolabi Babatunde Joseph" />

				<link rel="apple-touch-icon" href="/icon512_rounded.png" />
				<meta name="theme-color" content="#ffffff" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
