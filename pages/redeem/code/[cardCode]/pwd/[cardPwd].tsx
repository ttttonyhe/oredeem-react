import "weui";
import "react-weui/build/packages/react-weui.css";
import { useRouter } from 'next/router'

export default () => {
  const router = useRouter()
  const { cardCode, cardPwd } = router.query;
  return <div></div>;
};
