import "weui";
import "react-weui/build/packages/react-weui.css";
import {
	Page,
	Button,
	Form,
	FormCell,
	CellsTitle,
	CellHeader,
	Label,
	Select,
	CellBody,
	Input,
	ButtonArea,
	Dialog,
	Toast,
} from "react-weui";
import { useRouter } from "next/router";
import { useState } from "react";

const RedeemCodePwd = () => {
	const router = useRouter();
	const { cardCode, cardPwd } = router.query;
	const [code, setCode] = useState();
	const [pwd, setPwd] = useState();
	const [phone, setPhone] = useState();
	const [loading, setLoading] = useState<boolean>(false);
	const [money, setMoney] = useState<number>(0);
	const [successVisible, setSuccessVisible] = useState<boolean>(false);
	const [failureVisible, setFailureVisible] = useState<boolean>(false);

	const doRedeem = async () => {
		setLoading(true);
		const res = await fetch(`${process.env.BASE_URL}/redeem`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				cardCode: cardCode || code,
				cardPwd: cardPwd || pwd,
				phoneNumber: phone,
			}),
		})
			.then((r) => r.json())
			.catch(() => {
				setFailureVisible(true);
			});
		if (res.status) {
			setMoney(res.value);
			setSuccessVisible(true);
		} else {
			setFailureVisible(true);
		}
		setLoading(false);
	};

	return (
		<Page transition={true} infiniteLoader={true} ptr={false}>
			<Toast icon='loading' show={loading}>
				加载中
			</Toast>
			<Dialog
				type='ios'
				title='兑换成功'
				buttons={[
					{
						label: "确认",
						onClick: () => {
							setSuccessVisible(false);
						},
					},
				]}
				show={successVisible}
			>
				充值金额 ￥{money}，将于 3 个工作日内到账
			</Dialog>
			<Dialog
				type='ios'
				title='兑换失败'
				buttons={[
					{
						label: "重试",
						onClick: () => {
							setFailureVisible(false);
						},
					},
				]}
				show={failureVisible}
			>
				请检查信息后再试
			</Dialog>
			<div className='text-center py-12'>
				<h1 className='text-gray-700 text-2xl mb-1 font-medium'>充值卡兑换</h1>
				<p className='text-gray-400 text-base'>
					兑换成功后金额将于 3 个工作日内到账
				</p>
			</div>
			<CellsTitle>充值号码</CellsTitle>
			<Form>
				<FormCell select selectPos='before'>
					<CellHeader>
						<Select>
							<option value='1'>+86</option>
						</Select>
					</CellHeader>
					<CellBody>
						<Input
							type='tel'
							placeholder='易校园账户手机号码'
							value={phone}
							onChange={(e) => {
								setPhone(e.target.value);
							}}
						/>
					</CellBody>
				</FormCell>
			</Form>

			<CellsTitle>充值卡</CellsTitle>
			<Form>
				<FormCell>
					<CellHeader>
						<Label>卡号</Label>
					</CellHeader>
					<CellBody>
						<Input
							type='text'
							placeholder={cardCode || "请输入充值卡卡号"}
							onChange={(e) => {
								setCode(e.target.value);
							}}
						/>
					</CellBody>
				</FormCell>
				<FormCell>
					<CellHeader>
						<Label>卡密</Label>
					</CellHeader>
					<CellBody>
						<Input
							type='text'
							placeholder={cardPwd || "请输入充值卡卡密"}
							onChange={(e) => {
								setPwd(e.target.value);
							}}
						/>
					</CellBody>
				</FormCell>
			</Form>
			<ButtonArea className='py-10'>
				<Button onClick={() => doRedeem()}>兑换</Button>
			</ButtonArea>
		</Page>
	);
};

export default RedeemCodePwd;
