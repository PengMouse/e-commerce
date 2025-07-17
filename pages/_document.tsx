import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en" suppressHydrationWarning>
			<Head>
				<link rel="manifest" href="/manifest.json" />
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
