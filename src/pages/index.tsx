import Mainpage from "@component/components/Mainpage";
import Meta from "@component/components/Meta";

export default function Home() {
  return (
    <div>
      <Meta title={`Homie`} />
      <Mainpage />
    </div>
  );
}
