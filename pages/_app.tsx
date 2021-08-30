import "../styles/globals.scss";
import "../styles/tailwind.css";
import Header from "../components/Header";
import { useRouter } from "next/router";
import Head from "next/head";

function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>充值卡兑换管理平台</title>
      </Head>
      {router.pathname.indexOf("admin") != -1 && (
        <Header height={router.pathname == "/admin/login" ? 12 : 20} />
      )}
      <Component {...pageProps} />
    </>
  );
}

export default App;
