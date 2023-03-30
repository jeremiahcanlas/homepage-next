import { ChakraProvider } from "@chakra-ui/react";
import Mainpage from "@component/components/Mainpage";
import Meta from "@component/components/Meta";

export default function Home() {
  return (
    <ChakraProvider>
      <Meta title="Homepage by J" />
      <Mainpage />
    </ChakraProvider>
  );
}
