import "../styles/globals.scss";
import "../styles/tailwind.css";
import Header from "../components/Header";
import { useRouter } from "next/router";

function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      {router.pathname.indexOf("admin") != -1 && (
        <Header height={router.pathname == "/admin/login" ? 12 : 20} />
      )}
      <Component {...pageProps} />
    </>
  );
}

export default App;
