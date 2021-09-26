import colorDeterminer from "../../utilities/colorDeterminer";
import { useLocalStorage } from "react-use";
import useSWRInfinite from "swr/infinite";
import Fetcher from "../../utilities/dataFetcher";
import {
	DownloadIcon,
	TrashIcon,
	InboxIcon,
	RefreshIcon,
} from "@heroicons/react/outline";
import { Modal, useModal } from "@geist-ui/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ContentLoader from "react-content-loader";
import { useRouter } from "next/router";

const RedeemedCards = () => {
	const [adminToken] = useLocalStorage("oredeem-admin-token");
	const router = useRouter();

	const modal1 = useModal();
	const setVisible1 = modal1.setVisible;
	const bindings1 = modal1.bindings;

	const modal2 = useModal();
	const setVisible2 = modal2.setVisible;
	const bindings2 = modal2.bindings;

	const [modalLoading, setLoading] = useState<boolean>(false);

	const getKey = (pageIndex: number, previousPageData: any) => {
		if (previousPageData && !previousPageData.length) return null;
		return `${process.env.BASE_URL}/redeemed?page=${pageIndex}`;
	};

	const { data, size, setSize, mutate, isValidating } = useSWRInfinite(
		getKey,
		(url: string) => Fetcher(url, adminToken, router)
	);
	const isEmpty = data?.[0]?.length === 0;
	const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 25);

	const doExport = async () => {
		setLoading(true);
		const res = await fetch(`${process.env.BASE_URL}/exportRedeemed`, {
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
			setVisible1(false);
		} else {
			toast.error("导出失败");
		}
		setLoading(false);
	};

	const doDelete = async () => {
		setLoading(true);
		const res = await fetch(`${process.env.BASE_URL}/bulkDelete`, {
			method: "POST",
			headers: {
				Authorization: "Bearer " + adminToken,
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				redeemed: true,
			}),
		})
			.then((r) => r.json())
			.catch(() => {
				toast.error("删除失败");
			});
		if (res.status) {
			toast.success(res.msg);
			mutate();
			setVisible2(false);
		} else {
			toast.error("删除失败");
		}
		setLoading(false);
	};

	if (!data)
		return (
			<div className='lg:bg-gray-50 min-h-screen'>
				<section className='grid grid-cols-2 gap-5 py-28 lg:px-0 px-3 lg:w-1/2 mx-auto'>
					<div className='whitespace-nowrap overflow-auto rounded-md shadow-md hover:shadow-lg transition-all bg-white px-5 py-5'>
						<ContentLoader viewBox='0 0 380 70'>
							<rect x='0' y='0' rx='5' ry='5' width='45' height='45' />
							<rect x='60' y='2.5' rx='3' ry='3' width='300' height='20' />
							<rect x='60' y='27.5' rx='3' ry='3' width='250' height='15' />
							<rect x='0' y='55' rx='3' ry='3' width='380' height='15' />
						</ContentLoader>
					</div>
					<div className='whitespace-nowrap overflow-auto rounded-md shadow-md hover:shadow-lg transition-all bg-white px-5 py-5'>
						<ContentLoader viewBox='0 0 380 70'>
							<rect x='0' y='0' rx='5' ry='5' width='45' height='45' />
							<rect x='60' y='2.5' rx='3' ry='3' width='300' height='20' />
							<rect x='60' y='27.5' rx='3' ry='3' width='250' height='15' />
							<rect x='0' y='55' rx='3' ry='3' width='380' height='15' />
						</ContentLoader>
					</div>
					<div className='whitespace-nowrap overflow-auto rounded-md shadow-md hover:shadow-lg transition-all bg-white px-5 py-5'>
						<ContentLoader viewBox='0 0 380 70'>
							<rect x='0' y='0' rx='5' ry='5' width='45' height='45' />
							<rect x='60' y='2.5' rx='3' ry='3' width='300' height='20' />
							<rect x='60' y='27.5' rx='3' ry='3' width='250' height='15' />
							<rect x='0' y='55' rx='3' ry='3' width='380' height='15' />
						</ContentLoader>
					</div>
					<div className='whitespace-nowrap overflow-auto rounded-md shadow-md hover:shadow-lg transition-all bg-white px-5 py-5'>
						<ContentLoader viewBox='0 0 380 70'>
							<rect x='0' y='0' rx='5' ry='5' width='45' height='45' />
							<rect x='60' y='2.5' rx='3' ry='3' width='300' height='20' />
							<rect x='60' y='27.5' rx='3' ry='3' width='250' height='15' />
							<rect x='0' y='55' rx='3' ry='3' width='380' height='15' />
						</ContentLoader>
					</div>
				</section>
			</div>
		);

	return (
		<div className='lg:bg-gray-50 py-20 min-h-screen'>
			<div className='lg:w-1/2 mx-auto'>
				<section className='w-full flex mt-5'>
					<div className='flex-1 whitespace-nowrap flex lg:pl-0 pl-3'>
						<button
							onClick={() => {
								setVisible1(true);
							}}
							className='flex gap-x-1 items-center bg-white border border-gray-300 hover:border-gray-400 transition-colors rounded-md py-1.5 px-3 text-gray-600'
						>
							<DownloadIcon className='w-5 h-5' />
							导出已兑换充值卡
						</button>
						<Modal {...bindings1}>
							<Modal.Title>导出已兑换充值卡</Modal.Title>
							<Modal.Subtitle>
								提交以导出已兑换充值卡(Excel 表格)
							</Modal.Subtitle>
							<Modal.Action
								passive
								onClick={() => {
									setVisible1(false);
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
					<div className='flex-1 flex justify-end whitespace-nowrap lg:pr-0 lg:ml-0 ml-2 pr-3'>
						<button
							onClick={() => {
								setVisible2(true);
							}}
							className='flex gap-x-1 items-center bg-red-700 hover:bg-red-600 transition-colors rounded-md py-1.5 px-3 text-white'
						>
							<TrashIcon className='w-5 h-5' />
							删除已兑换充值卡
						</button>
						<Modal {...bindings2}>
							<Modal.Title>删除已兑换充值卡</Modal.Title>
							<Modal.Subtitle>提交以删除全部已兑换充值卡</Modal.Subtitle>
							<Modal.Action
								passive
								onClick={() => {
									setVisible2(false);
									setLoading(false);
								}}
							>
								取消
							</Modal.Action>
							<Modal.Action loading={modalLoading} onClick={() => doDelete()}>
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
						data.map((cards) => {
							return cards.map((card) => {
								const bg = colorDeterminer(card.cardValue).bg;
								const text = colorDeterminer(card.cardValue).text;
								const date = new Date(Date.parse(card.createdAt));
								return (
									<div
										className='whitespace-nowrap overflow-auto rounded-md shadow-md hover:shadow-lg transition-all bg-white px-5 py-4'
										key={card.cuid}
									>
										<div className='flex items-center gap-3'>
											<div
												className='w-10 h-10 rounded-md flex items-center justify-center'
												style={{
													backgroundColor: bg,
												}}
											>
												<b
													style={{
														color: text,
													}}
												>
													{card.cardValue}
												</b>
											</div>
											<div>
												<h1 className='text-base font-medium'>
													{card.cardCode}
												</h1>
												<h2 className='text-sm text-gray-600'>
													{card.cardPwd}
												</h2>
											</div>
										</div>
										<div className='mt-3 text-gray-800 leading-relaxed'>
											<p className=''>兑换者: {card.redemption.phoneNumber}</p>
											<p>
												创建于:{" "}
												{`${date.toLocaleDateString(
													"zh-CN"
												)} ${date.toLocaleTimeString("zh-CN")}`}
											</p>
										</div>
									</div>
								);
							});
						})
					) : (
						<div className='w-full h-full flex justify-center items-center rounded-md bg-white py-5 border text-gray-600'>
							<div>
								<p className='flex justify-center mb-1'>
									<InboxIcon className='w-10 h-10' />
								</p>
								<p>无数据</p>
							</div>
						</div>
					)}
				</section>
				{!isEmpty && !isReachingEnd && (
					<button
						onClick={() => {
							setSize(size + 1);
						}}
						disabled={isValidating}
						className='w-full h-full flex justify-center items-center rounded-md bg-white py-2.5 shadow-sm mt-10 border text-gray-600 hover:border-gray-300 gap-x-1'
					>
						<span>加载更多</span>
						{isValidating && (
							<RefreshIcon className='animate-spin duration-100 h-4 w-4' />
						)}
					</button>
				)}
			</div>
		</div>
	);
};

export default RedeemedCards;
