import {
  CreditCardIcon,
  LogoutIcon,
  DocumentIcon,
  DocumentTextIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import { useLocalStorage } from "react-use";

const Header = ({ height }: { height: number }) => {
  const router = useRouter();
  const [adminToken, __, removeAdminToken] = useLocalStorage(
    "oredeem-admin-token"
  );

  return (
    <>
      <Toaster />
      <header
        className={`border-b border-gray-200 w-full h-${height} justify-center fixed shadow-sm px-3 bg-white`}
      >
        <div className="lg:w-1/2 mx-auto h-full flex whitespace-nowrap">
          <div className="flex-1">
            <div className="h-12">
              <div className="flex h-full items-center gap-x-1">
                <div className="flex items-center justify-center">
                  <CreditCardIcon className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-lg font-medium">充值卡兑换管理平台</p>
                </div>
              </div>
            </div>
            {height != 12 && (
              <nav>
                <ul className="flex gap-x-5 list-none whitespace-nowrap">
                  <li
                    className={`hover:text-gray-800 cursor-pointer flex gap-x-0.5 ${
                      router.pathname == "/admin/unredeemedCards" &&
                      "border-b-4 pb-1 border-gray-700 font-medium"
                    }`}
                    onClick={() => {
                      router.push("/admin/unredeemedCards");
                    }}
                  >
                    <DocumentIcon className="w-5 h-5 mt-0.5" />
                    未兑换卡
                  </li>
                  <li
                    className={`hover:text-gray-800 cursor-pointer flex gap-x-0.5 ${
                      router.pathname == "/admin/redeemedCards" &&
                      "border-b-4 pb-1 border-gray-700 font-medium"
                    }`}
                    onClick={() => {
                      router.push("/admin/redeemedCards");
                    }}
                  >
                    <DocumentTextIcon className="w-5 h-5 mt-0.5" />
                    已兑换卡
                  </li>
                  <li
                    className={`hover:text-gray-800 cursor-pointer flex gap-x-0.5 ${
                      router.pathname == "/admin/redemption" &&
                      "border-b-4 pb-1 border-gray-700 font-medium"
                    }`}
                    onClick={() => {
                      router.push("/admin/redemption");
                    }}
                  >
                    <DocumentDuplicateIcon className="w-5 h-5 mt-0.5" />
                    兑换记录
                  </li>
                </ul>
              </nav>
            )}
          </div>
          <div className="flex flex-2 items-center justify-end">
            <div className="pt-0.5">
              <p className="text-gray-500 text-sm tracking-wide flex">
                {router.pathname == "/admin/login" ? (
                  <span>管理员登入</span>
                ) : (
                  <button
                    className="flex gap-x-1 hover:text-gray-400"
                    onClick={() => {
                      removeAdminToken();
                      router.push("/admin/login");
                    }}
                  >
                    管理面板 | 登出
                    <LogoutIcon className="w-5 h-5" />
                  </button>
                )}
              </p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
