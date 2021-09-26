import "../styles/globals.scss";
import "../styles/tailwind.css";
import Header from "../components/Header";
import { useRouter } from "next/router";
import Head from "next/head";
import { useLocalStorage } from "react-use";
import { useEffect } from "react";
import toast from "react-hot-toast";
import NextNprogress from "nextjs-progressbar";

function App({ Component, pageProps }) {
	const router = useRouter();
	const [adminToken, _] = useLocalStorage("oredeem-admin-token");

	// run once, check token validity
	useEffect(() => {
		if (adminToken) {
			fetch(`${process.env.BASE_URL}/ping/auth`, {
				headers: {
					Authorization: "Bearer " + adminToken,
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			})
				.catch(() => {
					toast.error("登录已过期，请重新登录");
					router.push("/admin/login");
				})
				.then(async (res) => {
					if (res) {
						const response = await res.json();
						if (response.message !== "pong") {
							toast.error("登录已过期，请重新登录");
							router.push("/admin/login");
						}
					}
				});
		}
	}, []);

	return (
		<>
			<Head>
				<title>充值卡兑换管理平台</title>
			</Head>
			<NextNprogress
				color='#333333'
				height={2}
				options={{ showSpinner: false }}
			/>
			{router.pathname.indexOf("admin") != -1 && (
				<Header height={router.pathname == "/admin/login" ? 12 : 20} />
			)}
			<Component {...pageProps} />
		</>
	);
}

export default App;
