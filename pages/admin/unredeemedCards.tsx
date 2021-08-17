import { useState } from "react";
import toast from "react-hot-toast";
import { RefreshIcon } from "@heroicons/react/outline";
import { useLocalStorage } from "react-use";

const UnRedeemedCards = () => {
  const [userName, setUserName] = useState<string>("");
  const [userPwd, setUserPwd] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [_, setAdminToken] = useLocalStorage("oredeem-admin-token");

  const doLogin = async () => {
    setLoading(true);
    await fetch(`${process.env.BASE_URL}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userName,
        password: userPwd,
      }),
    })
      .catch(() => {
        toast.error("服务暂不可用");
      })
      .then(async (res) => {
        if (res) {
          let response = await res.json();
          if (response.status) {
            setAdminToken(response.token);
            toast.success("登入成功, 正在跳转");
          } else {
            toast.error("登入失败, 请检查身份信息");
          }
        }
      });
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center lg:bg-gray-50 h-screen">
      <div className="lg:shadow-sm lg:border lg:rounded-xl lg:w-96 w-full lg:pt-8 lg:pb-10 px-8 bg-white -mt-20">
        <section className="mb-6">
          <p className="text-gray-500 tracking-wide text-lg mb-1">Login</p>
          <h1 className="font-medium text-3xl tracking-wide">账户登入</h1>
        </section>
        <section className="mb-9">
          <div className="mb-3.5">
            <input
              name="username"
              placeholder="用户名"
              type="text"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              className="w-full border rounded-md px-3 py-2 bg-white hover:border-gray-500 focus:border-gray-500 transition-colors outline-none"
            ></input>
          </div>
          <div>
            <input
              name="password"
              placeholder="密码"
              type="password"
              onChange={(e) => {
                setUserPwd(e.target.value);
              }}
              className="w-full border rounded-md px-3 py-2 bg-white hover:border-gray-500 focus:border-gray-500 transition-colors outline-none"
            ></input>
          </div>
        </section>
        <section>
          <button
            onClick={() => doLogin()}
            className="py-2 w-full rounded-md hover:bg-gray-600 transition-colors bg-gray-700 shadow-lg text-center tracking-wide text-white flex gap-1 justify-center items-center"
          >
            <span>登入</span>
            {loading ? (
              <RefreshIcon className="animate-spin duration-100 h-5 w-5" />
            ) : (
              <span>→</span>
            )}
          </button>
        </section>
      </div>
    </div>
  );
};

export default UnRedeemedCards;
