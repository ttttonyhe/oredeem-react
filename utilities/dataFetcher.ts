import { NextRouter } from "next/router"
import toast from "react-hot-toast";

const Fetcher = async (url: string, token: any, router: NextRouter) => {
  return await fetch(url, {
    headers: {
      "Authorization": "Bearer " + token
    }
  })
    .then(r => r.json())
    .catch(() => {
      toast.error("请求失败");
    })
}

export default Fetcher;