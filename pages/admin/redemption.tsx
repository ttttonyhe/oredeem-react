import { useLocalStorage } from "react-use";
import { useSWRInfinite } from "swr";
import Fetcher from "../../utilities/dataFetcher";
import { DownloadIcon, InboxIcon, TrashIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { useModal, Modal } from "@geist-ui/react";
import toast from "react-hot-toast";
import ContentLoader from "react-content-loader";

const RedeemedCards = () => {
  const [adminToken] = useLocalStorage("oredeem-admin-token");

  const { visible, setVisible, bindings } = useModal();
  const [modalLoading, setLoading] = useState<boolean>(false);

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null;
    return `${process.env.BASE_URL}/redemption?page=${pageIndex}`;
  };

  const { data, size, setSize } = useSWRInfinite(getKey, (url) =>
    Fetcher(url, adminToken)
  );

  if (!data)
    return (
      <div className="lg:bg-gray-50 min-h-screen">
        <section className="grid grid-cols-2 gap-5 py-28 lg:px-0 px-3 lg:w-1/2 mx-auto">
          <div className="whitespace-nowrap overflow-auto rounded-md shadow-md hover:shadow-lg transition-all bg-white px-5 py-5">
            <ContentLoader viewBox="0 0 380 70">
              <rect x="0" y="0" rx="5" ry="5" width="45" height="45" />
              <rect x="60" y="2.5" rx="3" ry="3" width="300" height="20" />
              <rect x="60" y="27.5" rx="3" ry="3" width="250" height="15" />
              <rect x="0" y="55" rx="3" ry="3" width="380" height="15" />
            </ContentLoader>
          </div>
          <div className="whitespace-nowrap overflow-auto rounded-md shadow-md hover:shadow-lg transition-all bg-white px-5 py-5">
            <ContentLoader viewBox="0 0 380 70">
              <rect x="0" y="0" rx="5" ry="5" width="45" height="45" />
              <rect x="60" y="2.5" rx="3" ry="3" width="300" height="20" />
              <rect x="60" y="27.5" rx="3" ry="3" width="250" height="15" />
              <rect x="0" y="55" rx="3" ry="3" width="380" height="15" />
            </ContentLoader>
          </div>
          <div className="whitespace-nowrap overflow-auto rounded-md shadow-md hover:shadow-lg transition-all bg-white px-5 py-5">
            <ContentLoader viewBox="0 0 380 70">
              <rect x="0" y="0" rx="5" ry="5" width="45" height="45" />
              <rect x="60" y="2.5" rx="3" ry="3" width="300" height="20" />
              <rect x="60" y="27.5" rx="3" ry="3" width="250" height="15" />
              <rect x="0" y="55" rx="3" ry="3" width="380" height="15" />
            </ContentLoader>
          </div>
          <div className="whitespace-nowrap overflow-auto rounded-md shadow-md hover:shadow-lg transition-all bg-white px-5 py-5">
            <ContentLoader viewBox="0 0 380 70">
              <rect x="0" y="0" rx="5" ry="5" width="45" height="45" />
              <rect x="60" y="2.5" rx="3" ry="3" width="300" height="20" />
              <rect x="60" y="27.5" rx="3" ry="3" width="250" height="15" />
              <rect x="0" y="55" rx="3" ry="3" width="380" height="15" />
            </ContentLoader>
          </div>
        </section>
      </div>
    );

  // count the total number of redeemed cards
  let totalCards = 0;
  for (let i = 0; i < data.length; i++) {
    totalCards += data[i].length;
  }

  const doExport = async () => {
    setLoading(true);
    const res = await fetch(`${process.env.BASE_URL}/exportRedemption`, {
      headers: {
        Authorization: "Bearer " + adminToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .catch(() => {
        toast.error("导出失败");
      });
    if (res.status) {
      toast.success("导出成功：" + res.fileID);
      const url =
        "https://oredeem.ouorz.com/files/download/" + res.fileID + ".xlsx";
      let a = document.createElement("a");
      a.setAttribute("href", url);
      a.setAttribute("target", "_blank");
      document.body.appendChild(a);
      a.click();
      setVisible(false);
    } else {
      toast.error("导出失败");
    }
    setLoading(false);
  };

  return (
    <div className="lg:bg-gray-50 py-20 min-h-screen">
      <div className="lg:w-1/2 mx-auto lg:px-0 px-3">
        <section className="w-full flex mt-5">
          <div className="flex-1 whitespace-nowrap">
            <button
              onClick={() => setVisible(true)}
              className="flex gap-x-1 items-center bg-white border border-gray-300 hover:border-gray-400 transition-colors rounded-md py-1.5 px-3 text-gray-600"
            >
              <DownloadIcon className="w-5 h-5" />
              导出兑换记录
            </button>
            <Modal {...bindings}>
              <Modal.Title>导出兑换记录</Modal.Title>
              <Modal.Subtitle>提交以导出兑换记录(Excel 表格)</Modal.Subtitle>
              <Modal.Action
                passive
                onClick={() => {
                  setVisible(false);
                  setLoading(false);
                }}
              >
                取消
              </Modal.Action>
              <Modal.Action loading={modalLoading} onClick={() => doExport()}>
                提交
              </Modal.Action>
            </Modal>
          </div>
        </section>
        <section
          className={`${
            data[0].length && "grid grid-cols-2 gap-5"
          } mt-5 lg:px-0 px-3`}
        >
          {data[0].length ? (
            data.map((records) => {
              return records.map((record) => {
                const date = new Date(Date.parse(record.modifiedAt));
                return (
                  <div
                    className="whitespace-nowrap overflow-auto rounded-md shadow-md hover:shadow-lg transition-all bg-white px-5 py-4"
                    key={record.cuid}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md flex items-center justify-center bg-gray-200">
                        <b className="text-gray-400">{record.totalValue}</b>
                      </div>
                      <div>
                        <h1 className="text-base font-medium">
                          {record.phoneNumber}
                        </h1>
                        <h2 className="text-sm text-gray-600">
                          更新于:{" "}
                          {`${date.toLocaleDateString(
                            "zh-CN"
                          )} ${date.toLocaleTimeString("zh-CN")}`}
                        </h2>
                      </div>
                    </div>
                    {record.giftCards.length ? (
                      <div className="mt-3 text-gray-800 leading-relaxed">
                        {record.giftCards.map((card) => {
                          return <p key={card.cuid}>{card.cardCode}</p>;
                        })}
                      </div>
                    ) : (
                      <div className="mt-3 text-gray-800 leading-relaxed">
                        <p className="flex gap-x-0.5 items-center">
                          <TrashIcon className="w-4 h-4" />
                          充值卡已被删除
                        </p>
                      </div>
                    )}
                  </div>
                );
              });
            })
          ) : (
            <div className="w-full h-full flex justify-center items-center rounded-md bg-white py-5 border text-gray-600">
              <div>
                <p className="flex justify-center mb-1">
                  <InboxIcon className="w-10 h-10" />
                </p>
                <p>无数据</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default RedeemedCards;
