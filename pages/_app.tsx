import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "@/components/ui/provider";
import Layout from "@/components/Layout";
export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}
