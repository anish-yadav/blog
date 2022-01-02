import "../styles/globals.css";
import type { AppProps } from "next/app";
import Container from "../components/container";
import { UserContextProvider } from "../utils/useUser";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <Container>
        <Component {...pageProps} />
      </Container>
    </UserContextProvider>
  );
}

export default MyApp;
