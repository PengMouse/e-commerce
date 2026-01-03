import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "@/components/ui/provider";
import Layout from "@/components/Layout";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store/store";
import Head from "next/head";
import { useRouter } from "next/router";
import { Toaster } from "@/components/ui/toaster";
export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	if (router.pathname.includes("/login")) {
		return (
			<>
				<Head>
					<title>e-Market - Shop for free</title>
				</Head>
				<ReduxProvider store={store}>
					<PersistGate loading={null} persistor={persistor}>
						<Provider>
							<Component {...pageProps} />
						</Provider>
					</PersistGate>
				</ReduxProvider>
			</>
		);
	}
	return (
		<>
			<Head>
				<title>e-Market - Shop for free</title>
			</Head>
			<ReduxProvider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Provider>
						<Toaster />
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</Provider>
				</PersistGate>
			</ReduxProvider>
		</>
	);
}
