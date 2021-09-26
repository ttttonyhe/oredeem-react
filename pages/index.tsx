import Link from "next/link";

const Index = () => {
	return (
		<div className='justify-center flex items-center h-screen w-full'>
			<div className='text-center'>
				<p className='flex gap-x-2'>
					<Link href='/admin/login'>管理兑换</Link>
				</p>
			</div>
		</div>
	);
};

export default Index;
