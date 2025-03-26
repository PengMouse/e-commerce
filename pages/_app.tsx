import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "@/components/ui/provider";
import Layout from "@/components/Layout";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store/store";
export default function App({ Component, pageProps }: AppProps) {
	return (
		<ReduxProvider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Provider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</Provider>
			</PersistGate>
		</ReduxProvider>
	);
}
